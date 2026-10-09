export interface ProjectArchitecture {
  overview: string;
  components: string[];
  flowDiagram: string[];
}

export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  headline: string;
  scaleLabel?: string;
  problemStatement: string;
  engineeringContributions: string[];
  architecture: ProjectArchitecture;
  technicalStack: string[];
  engineeringChallenges: string[];
  tags: string[];
  verifiedLinks: {
    github?: string | null;
    demo?: string | null;
    docs?: string | null;
  };
}

export type SkillCategory = 'Backend' | 'Frontend' | 'AI & Integration' | 'Database & Data' | 'Tools & Infrastructure';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  roleContext: string;
  isHighlight?: boolean;
}

export interface McpFlowStep {
  step: number;
  actor: string;
  action: string;
  description: string;
  codeSnippet?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface InquiryItem {
  ticket_id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  created_at?: string;
  client_ip?: string;
  status?: string;
  email_status?: string;
  provider?: string;
}
