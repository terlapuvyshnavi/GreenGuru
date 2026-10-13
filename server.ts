import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI server-side with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export const GREENGURU_RAW_SYSTEM_PROMPT = `You are GreenGuru, an expert in organic home gardening and nursery care.

For every plant problem:
1. Identify the likely pest or disease. If the problem is unclear, ask ONE short question about the plant or symptoms, while still giving a first suggestion.
2. Suggest natural remedies first, made from household waste or common ingredients (kitchen scraps, neem, garlic, chilli, soap, wood ash, sour buttermilk, baking soda, compost tea, etc.).
3. Give: ingredients, quantities, preparation steps, how and when to apply, and how often. Do not invent quantities you are not sure about.
4. Add safety notes: test on one leaf first (24-hour patch test), spray only in the evening / late afternoon to prevent leaf burn and protect bees, keep away from children and pets, wash edible parts before eating.
5. Add short prevention tips (companion planting like marigolds with tomatoes, watering at base without wetting leaves, soil care and mulching).
6. NEVER recommend raw human excreta or untreated waste for any plant. If anything like this is mentioned or implied, explicitly state that it is unsafe and unhygienic, and recommend well-rotted aerobic compost, aged cow dung manure, Jeevamrutha, or fermented plant liquids instead.
7. If the problem is serious, spreading fast, or you are unsure, advise the user to contact a local agriculture officer / Krishi Vigyan Kendra (KVK - Kisan Call Centre toll-free 1800-180-1551 in India) or a trusted local nursery expert.
8. Keep the language simple, practical, empathetic, and step-by-step.
9. MULTILINGUAL RULE: If the user writes or speaks in Telugu (తెలుగు), reply entirely in Telugu. If the user writes or speaks in Hindi (हिंदी), reply entirely in Hindi. If written in English, reply in English.`;

const GREENGURU_STRUCTURED_SYSTEM_PROMPT = `
${GREENGURU_RAW_SYSTEM_PROMPT}

OUTPUT FORMAT:
Always return a valid JSON object matching the following structure:
{
  "identification": {
    "issueName": "Name of pest/disease/deficiency",
    "scientificOrCommonNote": "Short explanation of why this occurs and affected parts",
    "severity": "mild" | "moderate" | "severe",
    "clarificationQuestion": "ONE short question to confirm details if symptoms were ambiguous (or null if diagnosis is clear)"
  },
  "remedies": [
    {
      "name": "Remedy Name",
      "type": "kitchen_scrap" | "herbal" | "mineral" | "physical",
      "ingredients": [
        "1 litre lukewarm water",
        "5 ml pure cold-pressed neem oil",
        "2-3 drops mild liquid soap or baby shampoo"
      ],
      "preparationSteps": [
        "Mix the liquid soap into water first.",
        "Add neem oil and shake vigorously until a milky mixture forms."
      ],
      "howToApply": "Spray thoroughly under the leaves and on stems.",
      "whenToApply": "In the evening after sunset",
      "frequency": "Once every 5 to 7 days"
    }
  ],
  "safetyNotes": [
    "Always test on a single leaf 24 hours prior.",
    "Spray in late evening when honeybees are not active.",
    "Keep raw concoctions away from young children and pets.",
    "Rinse vegetables and fruits thoroughly with clean water."
  ],
  "preventionTips": [
    "Plant companion flowers like African marigolds.",
    "Water at the base of the plant in the morning.",
    "Mulch with dry leaves."
  ],
  "kvkAlert": {
    "isNeeded": boolean,
    "message": "Advice to reach local KVK / Agriculture Officer (or null if mild)"
  },
  "friendlySummary": "A warm, encouraging 2-3 sentence overview from GreenGuru in the user's language."
}

Do not wrap the JSON with conversational text outside the JSON block. Return pure valid JSON.
`;

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'GreenGuru LLM Model Engine',
    model: 'gemini-3.8-flash',
    version: '1.0.0',
  });
});

// RAW LLM MODEL ENDPOINT (Plain text or JSON, configurable temperature)
app.post('/api/model/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, format = 'text', temperature = 0.3, systemInstruction } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const sysInstruction =
      systemInstruction || (format === 'json' ? GREENGURU_STRUCTURED_SYSTEM_PROMPT : GREENGURU_RAW_SYSTEM_PROMPT);

    const config: any = {
      systemInstruction: sysInstruction,
      temperature: Number(temperature) || 0.3,
    };

    if (format === 'json') {
      config.responseMimeType = 'application/json';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config,
    });

    const outputText = response.text || '';

    return res.json({
      model: 'gemini-3.8-flash',
      systemPrompt: sysInstruction,
      output: outputText,
      usage: response.usageMetadata,
    });
  } catch (error: any) {
    console.error('Raw LLM generation error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini model.',
    });
  }
});

// Diagnose endpoint
app.post('/api/diagnose', async (req: Request, res: Response) => {
  try {
    const { prompt, imageBase64, mimeType, language } = req.body;

    if (!prompt && !imageBase64) {
      return res.status(400).json({ error: 'Please provide a plant symptom description or upload a photo.' });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    let contentsParts: any[] = [];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
      contentsParts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    let userQuery = prompt || 'Please examine this plant photo, diagnose the pest or disease, and suggest organic kitchen/household remedies following GreenGuru guidelines.';
    if (language && language !== 'auto') {
      userQuery += `\n[IMPORTANT: Please generate the response in ${language} language].`;
    }

    contentsParts.push({ text: userQuery });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: contentsParts },
      config: {
        systemInstruction: GREENGURU_STRUCTURED_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse GreenGuru structured response');
      }
    }

    return res.json({ success: true, data: parsedData, raw: responseText });
  } catch (error: any) {
    console.error('GreenGuru diagnose error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze plant problem. Please try again.',
    });
  }
});

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, language } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    if (language && language !== 'auto') {
      const lastUser = formattedContents[formattedContents.length - 1];
      if (lastUser && lastUser.role === 'user') {
        lastUser.parts[0].text += `\n[Respond in ${language}]`;
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: GREENGURU_STRUCTURED_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        parsedData = {
          friendlySummary: responseText,
          identification: { issueName: 'Gardening Consultation', severity: 'mild' },
          remedies: [],
          safetyNotes: ['Test any remedy on one leaf first.', 'Spray in the evening.'],
          preventionTips: ['Ensure good soil drainage.'],
        };
      }
    }

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('GreenGuru chat error:', error);
    return res.status(500).json({
      error: error?.message || 'Chat consultation failed. Please try again.',
    });
  }
});

// Setup Vite middleware for development or serve dist for production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🌿 GreenGuru LLM Server running on http://localhost:${PORT}`);
  });
}

startServer();
