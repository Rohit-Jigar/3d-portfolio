import type { ProjectDetail } from '../types';

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: 'alef-migration',
    slug: 'alef-migration',
    title: 'Alef Migration',
    subtitle: 'High-Volume Data Migration Pipeline & Python ETL Automation',
    category: 'Data Engineering | Python Automation | Data Migration',
    headline: 'Engineered advanced Python scripts to prepare and migrate approximately two million records from a source server to a destination server with different acceptance criteria.',
    scaleLabel: '~2,000,000 Records Scale',
    problemStatement:
      'The source data required substantial preparation before it could be accepted by the destination system. Records exhibited incompatible schemas, missing non-null constraints, and legacy format inconsistencies. They needed to be extracted, cleaned, validated, transformed, and aligned with target acceptance criteria without risking data corruption.',
    engineeringContributions: [
      'Developed advanced Python migration scripts for high-throughput batch extraction and transformation.',
      'Processed and transformed datasets at approximately two-million-record scale.',
      'Implemented data cleansing, character normalization, and string sanitization workflows.',
      'Constructed deterministic schema transformation logic aligned with destination acceptance criteria.',
      'Engineered granular validation routines and robust migration error handling.',
      'Supported the safe transfer of prepared records from Server A to Server B.',
      'Investigated duplicate records, invalid payloads, and migration failure edge cases.'
    ],
    architecture: {
      overview: 'Multi-stage batch ETL pipeline built with Python, featuring stream ingestion, field-level cleansing, schema transformation, and verification checks.',
      components: [
        'Source Database Connector (Server A)',
        'Streaming Batch Extraction Engine',
        'Data Cleansing & Sanitization Layer',
        'Field-Level Validation & Type Checking',
        'Schema Transformation & Normalizer',
        'Destination Compatibility Gate',
        'Network Ingestion Engine (Server B)',
        'Audit Logging & Ledger Reconciliation'
      ],
      flowDiagram: [
        'SOURCE SERVER',
        'DATA EXTRACTION',
        'DATA CLEANING',
        'VALIDATION',
        'SCHEMA TRANSFORMATION',
        'DESTINATION COMPATIBILITY CHECK',
        'DATA MIGRATION',
        'RESULT VERIFICATION'
      ]
    },
    technicalStack: [
      'Python 3.11',
      'Data Engineering',
      'Batch Processing Logic',
      'Schema Validation Workflows',
      'Database Ingestion Scripts',
      'Logging & Error Isolation'
    ],
    engineeringChallenges: [
      'Discrepant Target Acceptance Rules: The target server strictly rejected fields accepted by the legacy source, requiring conditional mutation logic.',
      'High-Volume Memory Footprint: Prevented memory bloat across ~2M records by orchestrating chunked generator streams rather than loading monolithic payloads.',
      'Fail-Safe Error Segregation: Quarantined malformed records into dedicated anomaly logs without interrupting the broader migration batch.',
      'Zero Discrepancy Verification: Designed checksums and row count audits to cross-verify total processed batches.'
    ],
    tags: ['Python', 'Data Engineering', 'Data Migration', 'Data Validation', 'Data Transformation', 'Automation'],
    verifiedLinks: {
      github: null,
      demo: null,
      docs: null
    }
  },
  {
    id: 'ims-inventory-system',
    slug: 'ims-inventory-system',
    title: 'IMS: Inventory Management System',
    subtitle: 'Enterprise Hardware Asset Tracking & IT Support Platform',
    category: 'Enterprise Application | Backend Engineering | RBAC',
    headline: 'Developed an inventory management and IT ticketing system that combines hardware asset tracking with structured IT support workflows.',
    scaleLabel: 'Enterprise Multi-Role Platform',
    problemStatement:
      'Organizations struggle with managing hardware assets, user ownership, workstation specifications, and technical support requests across disparate spreadsheets and disjointed messaging threads. A centralized, role-governed platform was required to oversee inventory states and streamline ticket resolution.',
    engineeringContributions: [
      'Architected Role-Based Access Control (RBAC) supporting distinct access tiers for Admins, Support Engineers, and Developers.',
      'Developed responsive frontend interfaces using React and Tailwind CSS.',
      'Built high-performance, asynchronous REST APIs using FastAPI in Python.',
      'Engineered relational database models and indexes in PostgreSQL.',
      'Managed version-controlled, automated database migrations using Flyway.',
      'Engineered asset inventory, hardware allocation, and user assignment workflows.',
      'Implemented Jira-style IT support ticket triage, assignment, priority queuing, and resolution tracking.',
      'Structured application logic around strict role-based permissions and API-driven operations.'
    ],
    architecture: {
      overview: 'Enterprise client-server architecture with React SPA, FastAPI backend microservices, RBAC authorization middleware, and PostgreSQL managed by Flyway migrations.',
      components: [
        'React + Tailwind UI (Asset Dashboards & Ticket Queues)',
        'FastAPI REST Layer & Request Handlers',
        'RBAC Permission Enforcement Middleware',
        'PostgreSQL Relational Storage Layer',
        'Flyway Migration Engine (Versioned SQL Scripts)',
        'Ticket State Machine & Audit Ledger'
      ],
      flowDiagram: [
        'CLIENT APP (React)',
        'AUTH & RBAC GATEWAY',
        'FASTAPI ROUTERS',
        'SERVICE WORKFLOWS',
        'POSTGRESQL (Flyway Migrations)',
        'AUDIT & STATE MACHINE'
      ]
    },
    technicalStack: [
      'React',
      'Tailwind CSS',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Flyway',
      'RBAC',
      'REST APIs'
    ],
    engineeringChallenges: [
      'Granular Role Segregation: Developers must only access their own assigned assets and submit personal tickets, Support Engineers manage queues, while Admins retain total system control.',
      'Schema Evolution without Downtime: Coordinated table alterations, foreign key integrity, and seed scripts using versioned Flyway migration files.',
      'State-Machine Transitions: Ensured tickets follow valid operational transitions (Open -> In Progress -> Escalated -> Resolved -> Closed) without state desync.'
    ],
    tags: ['React', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'Flyway', 'RBAC', 'REST APIs'],
    verifiedLinks: {
      github: null,
      demo: null,
      docs: null
    }
  },
  {
    id: 'namogpt-platform',
    slug: 'namogpt-platform',
    title: 'NamoGPT',
    subtitle: 'Multi-Provider AI Gateway & Intelligent Model Orchestration',
    category: 'AI Engineering | Multi-Model Platform | LLM Integration',
    headline: 'Built a multi-provider GPT-style AI application that integrates multiple model providers and routing services, with an automatic model-selection mode and user-configurable API credentials.',
    scaleLabel: 'Multi-Provider LLM Gateway',
    problemStatement:
      'Direct reliance on a single AI provider introduces provider lock-in, rate limit throttling, and cost inefficiencies. Developers need a unified interface capable of intelligently routing queries between diverse models and specialized inference providers while keeping credentials strictly confidential.',
    engineeringContributions: [
      'Built multi-provider AI integration architecture supporting unified prompt dispatching.',
      'Engineered automatic model-selection routing based on task heuristics and context classification.',
      'Implemented granular manual provider and model selection controls.',
      'Constructed user-configurable API key architecture ensuring zero server-side credential leakage.',
      'Integrated a unified conversational interface abstracting heterogeneous model endpoints.',
      'Supported configurable integration architecture allowing seamless onboarding of new model providers.'
    ],
    architecture: {
      overview: 'Unified AI routing hub normalizing request payloads, routing through heuristic evaluation engines, and streaming model responses securely.',
      components: [
        'Unified Web Interface & Key Vault',
        'Prompt Analysis & Heuristic Classifier',
        'Intelligent Model Router',
        'Provider Adapters (Google, Groq, Anthropic, Ollama, Cloudflare, etc.)',
        'LiteLLM Multi-Model Proxy Layer',
        'Streaming Response Aggregator'
      ],
      flowDiagram: [
        'USER PROMPT',
        'REQUEST ANALYSIS',
        'MODEL ROUTER',
        'PROVIDER / MODEL SELECTION',
        'RESPONSE GENERATION',
        'RESPONSE TO USER'
      ]
    },
    technicalStack: [
      'Python',
      'AI/LLM Integration',
      'Model Routing',
      'API Integration',
      'LiteLLM',
      'Multi-Provider Architecture'
    ],
    engineeringChallenges: [
      'Provider Normalization: Bridging divergent response schemas, parameter configurations (temperature, top_p), and streaming formats across 11+ providers and services.',
      'Zero-Trust Key Management: Guaranteeing that user-provided API credentials remain strictly isolated and never recorded in persistent logs or exposed in frontend client bundles.',
      'Failover Resilience: Gracefully switching to fallback providers when a primary model experiences capacity throttling or network timeout.'
    ],
    tags: ['Python', 'AI/LLM Integration', 'Model Routing', 'API Integration', 'LiteLLM', 'Multi-Provider Architecture'],
    verifiedLinks: {
      github: null,
      demo: null,
      docs: null
    }
  }
];

export const PIPELINE_STAGES = [
  {
    step: 1,
    title: 'Source Server',
    subtitle: 'Legacy Records Store',
    description: 'Direct connection to source database instance housing legacy unstructured records.',
    inputSchema: 'Raw database tables (inconsistent fields, mixed encodings)',
    outputSchema: 'Raw record stream'
  },
  {
    step: 2,
    title: 'Data Extraction',
    subtitle: 'Stream-Chunk Extraction',
    description: 'Memory-optimized chunked extraction pipeline querying batches of records with cursor tracking.',
    inputSchema: 'Target table cursors',
    outputSchema: 'Indexed batch chunks (~10k records/chunk)'
  },
  {
    step: 3,
    title: 'Data Cleaning',
    subtitle: 'Sanitization & Normalization',
    description: 'Strips null bytes, unescaped characters, inconsistent phone/date formats, and legacy string artifacts.',
    inputSchema: 'Raw uncleaned payloads',
    outputSchema: 'Sanitized unicode data structures'
  },
  {
    step: 4,
    title: 'Validation',
    subtitle: 'Field & Constraint Verification',
    description: 'Enforces business logic rules, non-null guarantees, regex pattern checks, and foreign key prerequisites.',
    inputSchema: 'Sanitized records',
    outputSchema: 'Verified valid records & isolated quarantine logs'
  },
  {
    step: 5,
    title: 'Schema Transformation',
    subtitle: 'Target Mapping & Mutation',
    description: 'Transforms source table structure to match destination server target entity requirements and column types.',
    inputSchema: 'Source schema model',
    outputSchema: 'Target-compatible JSON/SQL models'
  },
  {
    step: 6,
    title: 'Destination Compatibility Check',
    subtitle: 'Pre-flight Ingestion Gate',
    description: 'Dry-run compatibility validation against target server acceptance rules before performing physical writes.',
    inputSchema: 'Transformed payloads',
    outputSchema: 'Pre-flight verified ingestion payload'
  },
  {
    step: 7,
    title: 'Data Migration',
    subtitle: 'Transactional Transfer to Server B',
    description: 'Atomic batch insertion into destination server with connection pooling and retry policies.',
    inputSchema: 'Verified payloads',
    outputSchema: 'Server B write acknowledgments'
  },
  {
    step: 8,
    title: 'Result Verification',
    subtitle: 'Reconciliation & Integrity Audit',
    description: 'Post-migration ledger comparison, record counts matching, and duplicate suppression verification.',
    inputSchema: 'Server A extracted counts vs Server B inserted counts',
    outputSchema: 'Zero-discrepancy migration audit ledger'
  }
];

export const IMS_MODULES = [
  {
    id: 'assets',
    name: 'Asset Inventory',
    description: 'Tracks workstations, laptops, monitors, serial numbers, hardware specs, and health status.'
  },
  {
    id: 'assignment',
    name: 'Asset Assignment & Ownership',
    description: 'Maps physical machines to active employees with custody timestamps and checkout history.'
  },
  {
    id: 'tickets',
    name: 'IT Support Ticket Management',
    description: 'Jira-style issue tracking with priority flags (Low, Medium, High, Blocker) and assignment queues.'
  },
  {
    id: 'rbac',
    name: 'Role-Based Access Control',
    description: 'Granular permissions matrix separating Admin, Support Engineer, and Developer roles.'
  },
  {
    id: 'users',
    name: 'User & System Information',
    description: 'Centralized directory linking staff profiles, department units, and operating systems.'
  },
  {
    id: 'migrations',
    name: 'Database Migration Management',
    description: 'Flyway version-controlled SQL migration scripts for deterministic schema evolution.'
  }
];

export const NAMO_PROVIDERS_EXPLORED = [
  { name: 'Google Gemini', type: 'Multimodal Frontier LLM', focus: 'Deep reasoning, 2M context window' },
  { name: 'Groq', type: 'Ultra-Fast LPU Inference', focus: 'Sub-150ms time-to-first-token execution' },
  { name: 'Anthropic', type: 'Frontier AI (Claude)', focus: 'Complex coding, tool use & nuance' },
  { name: 'Ollama', type: 'Local Edge Execution', focus: 'Privacy-first offline model execution' },
  { name: 'Cloudflare Workers AI', type: 'Serverless Edge AI', focus: 'Distributed global low-latency inference' },
  { name: 'LiteLLM', type: 'Multi-Provider Abstraction', focus: 'Unified proxy bridging 100+ model APIs' },
  { name: 'NVIDIA NIM', type: 'Microservice Acceleration', focus: 'Optimized enterprise enterprise inference' },
  { name: 'Nemotron', type: 'Domain Specialized Models', focus: 'Synthetic data alignment & structured reasoning' },
  { name: 'GPT-OSS 120B', type: 'Open Weights Frontier', focus: 'High-parameter unaligned open intelligence' },
  { name: '9Router', type: 'AI Gateway Routing', focus: 'Dynamic load balancing & prompt dispatch' },
  { name: 'OmniRoute', type: 'Model Broker Architecture', focus: 'Cost & latency-optimized token routing' }
];
