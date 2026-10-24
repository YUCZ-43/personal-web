export interface ProjectEntry {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  previewType: 'env-checker' | 'exam-master' | 'knowledge-base';
  highlights: string[];
  /** Optional verified external URL. If omitted/empty, no broken external link is rendered. */
  externalUrl?: string;
}

export interface ExpertiseEntry {
  id: string;
  index: string;
  title: string;
  summary: string;
  focusAreas: string[];
  deliverables: string;
}

export const PERSONAL_CONFIG = {
  /** Replace with your preferred name or studio handle */
  wordmark: '[YOUR NAME]',
  roleEyebrow: 'AI PRODUCT BUILDER / CREATIVE TECHNOLOGIST',
  heroHeadline: "Designing intelligent products. Building what's next.",
  heroSupportingText:
    'I explore the intersection of artificial intelligence, product design, automation, and software engineering — turning complex ideas into usable digital experiences.',
  /** Configurable contact email used by the honest email fallback in the Contact section & Footer */
  email: 'hello@example.com',
  /** Configurable GitHub profile URL */
  githubUrl: 'https://github.com',
  /** Optional custom webhook/API endpoint if you later connect a backend */
  contactEndpoint: '',
};

export const NAV_ITEMS = [
  { label: 'Work', href: '#work', sectionId: 'work' },
  { label: 'Expertise', href: '#expertise', sectionId: 'expertise' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
] as const;

export const PROJECTS: ProjectEntry[] = [
  {
    id: 'ai-local-env-checker',
    number: '01',
    title: 'AI Local Environment Checker',
    category: 'Developer Tools / Automation',
    description:
      'A tool focused on simplifying local AI development environment detection, installation, and troubleshooting.',
    previewType: 'env-checker',
    highlights: [
      'Runtime & GPU compute capability inspection',
      'Automated dependency & local model runtime checks',
      'Actionable diagnostic reporting for developer setups',
    ],
  },
  {
    id: 'exam-master-local',
    number: '02',
    title: 'Exam Master Local',
    category: 'AI Education / Knowledge Systems',
    description:
      'An experimental educational platform designed to organize learning resources and support intelligent knowledge exploration.',
    previewType: 'exam-master',
    highlights: [
      'Structured study topic hierarchies & curriculum mapping',
      'Interactive concept synthesis and question generation',
      'Local-first workspace designed for focused study sessions',
    ],
  },
  {
    id: 'ai-knowledge-base',
    number: '03',
    title: 'AI Knowledge Base',
    category: 'Knowledge Engineering / AI Systems',
    description:
      'Exploring structured knowledge organization, search, and AI-assisted learning workflows.',
    previewType: 'knowledge-base',
    highlights: [
      'Semantic indexing across technical notes and documentation',
      'Contextual cross-referencing and synthesis pipelines',
      'Clean editorial reading and retrieval interface',
    ],
  },
];

export const EXPERTISE_ITEMS: ExpertiseEntry[] = [
  {
    id: 'ai-product-design',
    index: '01',
    title: 'AI Product Design',
    summary:
      'Product discovery, user experience, prototypes, and AI-native interfaces.',
    focusAreas: [
      'Human-centered interaction patterns for generative & analytical workflows',
      'Rapid interactive prototyping to validate complex technical assumptions',
      'Transparent feedback states, confidence cues, and controllable UI',
    ],
    deliverables: 'Interactive Prototypes · Interface Systems · Product Architecture',
  },
  {
    id: 'ai-agents-automation',
    index: '02',
    title: 'AI Agents & Automation',
    summary:
      'Agent workflows, developer tooling, orchestration, and practical automation.',
    focusAreas: [
      'Multi-step task orchestration with deterministic validation guardrails',
      'Local and cloud model integration for repeatable engineering pipelines',
      'Tool-use schemas, structured outputs, and human-in-the-loop controls',
    ],
    deliverables: 'Agent Pipelines · Workflow Automation · Custom Tooling',
  },
  {
    id: 'web-experiences',
    index: '03',
    title: 'Web Experiences',
    summary:
      'Responsive interfaces, creative interaction, frontend engineering, and performance.',
    focusAreas: [
      'Editorial typography, spatial motion systems, and tactile micro-interactions',
      'Accessible, keyboard-navigable React & TypeScript architectures',
      'Frame-rate-conscious animations respecting reduced-motion preferences',
    ],
    deliverables: 'Design Systems · Interactive Web Apps · Creative Frontends',
  },
  {
    id: 'systems-developer-tools',
    index: '04',
    title: 'Systems & Developer Tools',
    summary:
      'CLI environments, deployment workflows, integrations, and technical infrastructure.',
    focusAreas: [
      'Environment diagnostics, reproducible local setups, and developer ergonomics',
      'Modular API integrations, build pipelines, and configuration management',
      'Clear documentation and maintainable TypeScript/Node codebases',
    ],
    deliverables: 'CLI Utilities · Environment Tooling · System Integrations',
  },
];

export const ABOUT_CONTENT = {
  headline: 'Curiosity drives the work. Engineering brings it to life.',
  paragraphs: [
    "I'm interested in the space where technology, systems thinking, design, and practical problem-solving intersect.",
    'My work focuses on understanding complex problems, experimenting with emerging tools, and building products that make technology more useful and accessible.',
  ],
  exploringTitle: 'Currently Exploring',
  exploringTopics: [
    'AI-native product experiences',
    'Autonomous agents and workflows',
    'Developer productivity',
    'Human-computer interaction',
    'Knowledge systems',
    'Practical deployment automation',
  ],
};

export const CONTACT_SERVICE_OPTIONS = [
  'AI Product',
  'Automation',
  'Web Experience',
  'Consulting',
] as const;
