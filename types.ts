
export enum IssueType {
  DELAY = 'DELAY',
  CANCELLED = 'CANCELLED',
  CONNECTION = 'CONNECTION',
  OVERBOOKING = 'OVERBOOKING',
  LUGGAGE = 'LUGGAGE'
}

export interface IssueContent {
  title: string;
  now: string[];
  rights: { label: string; desc: string }[];
  evidence: string[];
  templates: {
    label: string;
    text: string;
  }[];
}

export interface CalculationResult {
  score: number;
  level: 'Baixa' | 'Moderada' | 'Forte' | 'Robusto';
  message: string;
}

export interface UserSession {
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface AccessReport {
  userEmail: string;
  userPhone: string;
  timestamp: string;
  issueType?: IssueType;
  action: string;
}
