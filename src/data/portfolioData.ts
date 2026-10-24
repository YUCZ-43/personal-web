import { BRAND_IDENTITY, TRANSLATIONS, type SupportedLanguage } from './translations';

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
  wordmarkZh: BRAND_IDENTITY.zh,
  wordmarkEn: BRAND_IDENTITY.en,
  wordmark: `${BRAND_IDENTITY.zh} ${BRAND_IDENTITY.en}`,
  roleEyebrow: TRANSLATIONS['zh-CN'].hero.eyebrow,
  heroHeadline: `${TRANSLATIONS['zh-CN'].hero.headlineLine1}${TRANSLATIONS['zh-CN'].hero.headlineHighlight}`,
  heroSupportingText: TRANSLATIONS['zh-CN'].hero.supportingText,
  email: BRAND_IDENTITY.email,
  githubUrl: BRAND_IDENTITY.githubUrl,
  contactEndpoint: '',
};

export const NAV_ITEMS = [
  { key: 'work', label: 'Work', href: '#work', sectionId: 'work' },
  { key: 'expertise', label: 'Expertise', href: '#expertise', sectionId: 'expertise' },
  { key: 'about', label: 'About', href: '#about', sectionId: 'about' },
  { key: 'contact', label: 'Contact', href: '#contact', sectionId: 'contact' },
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
    deliverables:
      'Interactive Prototypes · Interface Systems · Product Architecture',
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

export const CONTACT_SERVICE_OPTIONS = [
  'AI Product',
  'Automation',
  'Web Experience',
  'Consulting',
] as const;

export function getLocalizedProjects(lang: SupportedLanguage): ProjectEntry[] {
  const dict = TRANSLATIONS[lang].work.projects;
  return PROJECTS.map((proj) => {
    const loc = dict[proj.id];
    if (!loc) return proj;
    return {
      ...proj,
      category: loc.category,
      description: loc.description,
      highlights: loc.highlights,
    };
  });
}

export function getLocalizedExpertise(lang: SupportedLanguage): ExpertiseEntry[] {
  const dict = TRANSLATIONS[lang].expertise.items;
  return EXPERTISE_ITEMS.map((item) => {
    const loc = dict[item.id];
    if (!loc) return item;
    return {
      ...item,
      title: loc.title,
      summary: loc.summary,
      focusAreas: loc.focusAreas,
      deliverables: loc.deliverables,
    };
  });
}
