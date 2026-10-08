import type { SkillCategory, SkillItem } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Backend',
  'AI & Integration',
  'Database & Data',
  'Frontend',
  'Tools & Infrastructure'
];

export const SKILLS_DATA: SkillItem[] = [
  // Backend
  {
    name: 'Python',
    category: 'Backend',
    roleContext: 'Core language for async backend engineering, automation, and data processing',
    isHighlight: true
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    roleContext: 'High-performance asynchronous REST microservices with Pydantic validation',
    isHighlight: true
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    roleContext: 'Resource-oriented API design, error surfaces, rate limiting, and OpenAPI schemas'
  },
  {
    name: 'Flask',
    category: 'Backend',
    roleContext: 'Lightweight WSGI services, utility scripting, and quick microservice prototypes'
  },
  {
    name: 'API Integration',
    category: 'Backend',
    roleContext: 'Third-party webhook ingestion, credential isolation, and resilient client adapters'
  },
  {
    name: 'Auth & Authorization (RBAC)',
    category: 'Backend',
    roleContext: 'Role-based access controls, JWT tokens, permission hierarchies, and audit logging',
    isHighlight: true
  },

  // AI & Integration
  {
    name: 'MCP Integration',
    category: 'AI & Integration',
    roleContext: 'Model Context Protocol server/client architecture, JSON-RPC 2.0 tool binding',
    isHighlight: true
  },
  {
    name: 'LLM API Integration',
    category: 'AI & Integration',
    roleContext: 'Multi-provider inference integration (Anthropic, Gemini, Groq, Ollama)',
    isHighlight: true
  },
  {
    name: 'Multi-Model Orchestration',
    category: 'AI & Integration',
    roleContext: 'Dynamic model selection, task routing, latency profiling, and cost balancing',
    isHighlight: true
  },
  {
    name: 'AI Tool Integration',
    category: 'AI & Integration',
    roleContext: 'Connecting autonomous models to structured schemas, databases, and APIs'
  },
  {
    name: 'Prompt Engineering',
    category: 'AI & Integration',
    roleContext: 'Structured output steering, system prompts, few-shot conditioning, and guardrails'
  },
  {
    name: 'Provider Routing & Fallbacks',
    category: 'AI & Integration',
    roleContext: 'Circuit breaker patterns and graceful failover during upstream AI outages'
  },

  // Database & Data
  {
    name: 'PostgreSQL',
    category: 'Database & Data',
    roleContext: 'Relational data modeling, schema indexing, constraints, and query execution',
    isHighlight: true
  },
  {
    name: 'SQL',
    category: 'Database & Data',
    roleContext: 'Complex joins, aggregation, transactional consistency, and data auditing'
  },
  {
    name: 'Flyway',
    category: 'Database & Data',
    roleContext: 'Deterministic, version-controlled SQL database migrations across environments',
    isHighlight: true
  },
  {
    name: 'Data Cleansing',
    category: 'Database & Data',
    roleContext: 'String sanitization, null byte removal, format normalization, and outlier detection'
  },
  {
    name: 'Data Validation',
    category: 'Database & Data',
    roleContext: 'Schema integrity verification, non-null assertions, and regex criteria enforcement'
  },
  {
    name: 'Data Transformation',
    category: 'Database & Data',
    roleContext: 'Adapting legacy records into modern destination schemas without loss'
  },
  {
    name: 'Data Migration Pipelines',
    category: 'Database & Data',
    roleContext: 'Engineered batch pipelines handling high volumes at ~2,000,000 records scale',
    isHighlight: true
  },

  // Frontend
  {
    name: 'React',
    category: 'Frontend',
    roleContext: 'Component architectures, custom hooks, state synchronization, and reactive UIs',
    isHighlight: true
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    roleContext: 'Strict type safety, shared schema interfaces, and robust refactoring'
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    roleContext: 'Modern utility styling, glassmorphism design tokens, and dark aesthetic layouts'
  },
  {
    name: 'Responsive UI Development',
    category: 'Frontend',
    roleContext: 'Pixel-perfect mobile to desktop viewports with fluid typography'
  },
  {
    name: 'Animation & Interactive UIs',
    category: 'Frontend',
    roleContext: 'Framer Motion micro-interactions, 3D perspective cards, and timeline transitions'
  },

  // Tools & Infrastructure
  {
    name: 'Git & GitHub',
    category: 'Tools & Infrastructure',
    roleContext: 'Branching workflows, monorepos, code reviews, and semantic release tagging',
    isHighlight: true
  },
  {
    name: 'Docker',
    category: 'Tools & Infrastructure',
    roleContext: 'Containerizing Python services, reproducible build environments, and Compose stacks',
    isHighlight: true
  },
  {
    name: 'Render Deployment',
    category: 'Tools & Infrastructure',
    roleContext: 'Continuous web service and static site deployments with health checks'
  },
  {
    name: 'Environment Configuration',
    category: 'Tools & Infrastructure',
    roleContext: '12-factor application configs, secret isolation, and .env management'
  },
  {
    name: 'Automated Testing',
    category: 'Tools & Infrastructure',
    roleContext: 'Pytest test suites, API test client automation, and boundary regression testing'
  }
];
