export type Language = 'en' | 'hi' | 'te';

export interface Remedy {
  name: string;
  type?: 'kitchen_scrap' | 'herbal' | 'mineral' | 'physical' | string;
  ingredients: string[];
  preparationSteps: string[];
  howToApply: string;
  whenToApply: string;
  frequency: string;
}

export interface Identification {
  issueName: string;
  scientificOrCommonNote?: string;
  severity: 'mild' | 'moderate' | 'severe';
  clarificationQuestion?: string | null;
}

export interface KVKAlert {
  isNeeded: boolean;
  message?: string | null;
}

export interface GreenGuruDiagnosis {
  identification: Identification;
  remedies: Remedy[];
  safetyNotes: string[];
  preventionTips: string[];
  kvkAlert?: KVKAlert;
  friendlySummary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  diagnosisData?: GreenGuruDiagnosis;
  image?: string;
  timestamp: string;
}
