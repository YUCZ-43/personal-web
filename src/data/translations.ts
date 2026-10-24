export type SupportedLanguage = 'zh-CN' | 'en';

export const BRAND_IDENTITY = {
  zh: '魚橙子',
  en: 'YU CHENGZI',
  email: 'hello@yuchengzi.studio',
  githubUrl: 'https://github.com/YUCZ-43',
} as const;

export interface LocalizedProjectText {
  category: string;
  description: string;
  highlights: string[];
  previewLabels: {
    headerLeft: string;
    headerRight: string;
    footerLeft: string;
    footerRight: string;
  };
}

export interface LocalizedExpertiseText {
  title: string;
  summary: string;
  focusAreas: string[];
  deliverables: string;
}

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    work: string;
    expertise: string;
    about: string;
    contact: string;
    letsTalk: string;
    langSwitchLabel: string;
    openMenu: string;
    closeMenu: string;
    reducedMotionOn: string;
    reducedMotionOff: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineHighlight: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    scrollExplore: string;
    interactionHint: string;
    backdropWatermark: string;
  };
  work: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    discussAction: string;
    viewAction: string;
    projects: Record<string, LocalizedProjectText>;
  };
  expertise: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    focusLabel: string;
    items: Record<string, LocalizedExpertiseText>;
  };
  about: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    exploringTitle: string;
    exploringTopics: string[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    supportingText: string;
    areasTitle: string;
    areasSubtitle: string;
    serviceOptions: Array<{ id: string; label: string }>;
    emptyAreasHint: string;
    selectedAreasPrefix: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      selectedAreasLabel: string;
      noneSelectedValue: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      errors: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
      };
      fallback: {
        title: string;
        descriptionPrefix: string;
        openEmailButton: string;
        copyButton: string;
        copiedButton: string;
      };
    };
  };
  footer: {
    roleSignature: string;
    github: string;
    email: string;
    backToTop: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  'zh-CN': {
    meta: {
      title: '魚橙子 YU CHENGZI — 智能产品构建者 / 创意技术专家',
      description:
        '魚橙子 (YU CHENGZI) 个人作品集 — 以人工智能、产品设计与工程技术为基础，将复杂构想转化为真正可用的数字体验。',
    },
    nav: {
      work: '作品',
      expertise: '能力',
      about: '关于',
      contact: '联系',
      letsTalk: '开启对话',
      langSwitchLabel: '切换语言至英文 (Switch to English)',
      openMenu: '打开导航菜单',
      closeMenu: '关闭导航菜单',
      reducedMotionOn: '精简动效：开启',
      reducedMotionOff: '宇宙动效：标准',
    },
    hero: {
      eyebrow: 'AI PRODUCT BUILDER · 智能产品构建者 / 创意技术专家',
      headlineLine1: '构建智能产品，',
      headlineHighlight: '探索数字世界的下一种可能。',
      supportingText:
        '以人工智能、产品设计与工程技术为基础，将复杂构想转化为真正可用的数字体验。',
      primaryCta: '探索作品',
      secondaryCta: '联系合作',
      scrollExplore: '向下滚动探索宇宙',
      interactionHint: '移动光标与数字人及星系互动 · 点击释放星尘脉冲',
      backdropWatermark: 'COSMIC INTELLIGENCE',
    },
    work: {
      eyebrow: '02 / SELECTED WORK · 精选作品',
      heading: '精选作品',
      subtitle: '围绕人工智能工具链、知识系统与自动化工作流构建的产品与实验。',
      discussAction: '探讨该系统架构',
      viewAction: '访问项目',
      projects: {
        'ai-local-env-checker': {
          category: '开发者工具 / 自动化系统',
          description:
            '专注于简化本地 AI 开发环境检测、依赖安装与故障诊断的工程化工具。',
          highlights: [
            '本地运行时与 GPU 算力环境自动检测',
            '模型依赖项与环境变量一键校验',
            '面向开发者的结构化诊断与修复建议',
          ],
          previewLabels: {
            headerLeft: 'env-inspector — 本地诊断会话',
            headerRight: '算力与运行时检测',
            footerLeft: 'CLI 与本地交互界面',
            footerRight: '自动化诊断架构',
          },
        },
        'exam-master-local': {
          category: 'AI 教育 / 知识系统',
          description:
            '旨在组织结构化学习资源并支持智能知识探索的实验性教育平台。',
          highlights: [
            '结构化课题层级与知识图谱映射',
            '交互式概念提炼与智能问答辅助',
            '专注深度研习的本地优先工作空间',
          ],
          previewLabels: {
            headerLeft: 'Knowledge Workspace — 知识工作台',
            headerRight: '结构化研习流',
            footerLeft: '课程索引引擎',
            footerRight: '智能知识探索',
          },
        },
        'ai-knowledge-base': {
          category: '知识工程 / AI 系统',
          description:
            '探索结构化知识组织、语义检索与 AI 辅助学习工作流的系统实践。',
          highlights: [
            '跨技术笔记与文档的语义向量索引',
            '上下文交叉引用与知识综合管线',
            '兼具编辑美感与高效率的阅读检索界面',
          ],
          previewLabels: {
            headerLeft: 'Semantic Graph — 语义知识图谱',
            headerRight: '检索与关联管线',
            footerLeft: '结构化检索',
            footerRight: 'AI 辅助工作流',
          },
        },
      },
    },
    expertise: {
      eyebrow: '03 / CAPABILITIES · 核心能力',
      heading: '我所构建的领域',
      subtitle: '融合前沿智能技术、系统架构与实验性交互设计。',
      focusLabel: '交付与实践方向',
      items: {
        'ai-product-design': {
          title: 'AI 产品设计',
          summary: '产品探索、用户体验、交互原型与 AI 原生界面设计。',
          focusAreas: [
            '面向生成式与分析型工作流的人本交互模式',
            '通过高保真交互原型快速验证复杂技术假设',
            '透明的推理状态反馈、置信度提示与可控界面',
          ],
          deliverables: '交互原型 · 界面系统 · 产品架构',
        },
        'ai-agents-automation': {
          title: 'AI 智能体与自动化',
          summary: '智能体工作流、开发者工具、任务编排与实用自动化方案。',
          focusAreas: [
            '具备确定性校验边界的多步任务编排机制',
            '本地与云端模型协同的可复用工程管线',
            '工具调用架构、结构化输出与人机协同控制',
          ],
          deliverables: '智能体管线 · 工作流自动化 · 定制工具链',
        },
        'web-experiences': {
          title: '数字交互与 Web 体验',
          summary: '响应式界面、创意交互设计、前端工程架构与性能调优。',
          focusAreas: [
            '兼具编辑排版美感、空间深度与微交互反馈的视觉系统',
            '语义化、全键盘无障碍支持的 React 与 TypeScript 架构',
            '兼顾高帧率渲染与减弱动态偏好 (Reduced Motion) 的动效工程',
          ],
          deliverables: '设计系统 · 交互式 Web 应用 · 创意前端体验',
        },
        'systems-developer-tools': {
          title: '系统工程与开发者工具',
          summary: 'CLI 命令行环境、部署工作流、系统集成与底层技术设施。',
          focusAreas: [
            '本地环境自动诊断、可复现开发配置与工程效率提升',
            '模块化 API 集成、构建管线与清晰的配置管理',
            '高可维护性的 TypeScript / Node 系统代码架构',
          ],
          deliverables: 'CLI 实用工具 · 环境诊断工具 · 系统集成架构',
        },
      },
    },
    about: {
      eyebrow: '04 / PERSPECTIVE · 创作理念',
      headline: '好奇心驱动探索，工程力将构想变为现实。',
      paragraphs: [
        '我长期关注技术、系统思维、交互设计与实际问题求解的交汇地带。',
        '我的工作聚焦于拆解复杂问题、实验新兴工具，并构建让前沿技术真正易于理解、可靠且富有美感的数字产品。',
      ],
      exploringTitle: '当前探索方向 / Currently Exploring',
      exploringTopics: [
        'AI 原生产品体验 (AI-native product experiences)',
        '自主智能体与工作流 (Autonomous agents and workflows)',
        '开发者生产力工具 (Developer productivity)',
        '人机交互新范式 (Human-computer interaction)',
        '结构化知识系统 (Knowledge systems)',
        '实用化部署与自动化 (Practical deployment automation)',
      ],
    },
    contact: {
      eyebrow: '05 / CONTACT · 开启合作',
      heading: '有值得共同构建的想法？',
      supportingText:
        '无论是 AI 原生产品、自动化开发工作流，还是极具实验性的数字交互体验，都欢迎与我交流。',
      areasTitle: '合作与探讨方向',
      areasSubtitle: '可多选相关领域',
      serviceOptions: [
        { id: 'AI Product', label: 'AI 产品设计' },
        { id: 'Automation', label: '智能体与自动化' },
        { id: 'Web Experience', label: '创意 Web 体验' },
        { id: 'Consulting', label: '技术与架构咨询' },
      ],
      emptyAreasHint: '点击上方标签选择您希望探讨的领域（可选多项）。',
      selectedAreasPrefix: '已选探讨领域：',
      form: {
        nameLabel: '您的称呼 / NAME',
        namePlaceholder: '请输入您的姓名或称呼',
        emailLabel: '联系邮箱 / EMAIL',
        emailPlaceholder: 'you@example.com',
        selectedAreasLabel: '已选关注领域 / SELECTED AREAS',
        noneSelectedValue: '未特定选择（综合交流）',
        messageLabel: '项目构想或留言 / PROJECT OR MESSAGE',
        messagePlaceholder: '请简要描述您正在探索的项目背景、目标或合作设想...',
        submitButton: '发起连接',
        errors: {
          nameRequired: '请输入您的姓名或称呼。',
          emailRequired: '请输入您的联系邮箱。',
          emailInvalid: '请输入格式有效的电子邮箱地址。',
          messageRequired: '请简要填写您的项目构想或留言内容。',
        },
        fallback: {
          title: '邮件草稿已就绪（无后端直连模式）',
          descriptionPrefix:
            '当前静态部署未接入后端邮件服务器，系统已为您自动生成结构化邮件内容，可直接发送至 ',
          openEmailButton: '在邮件客户端中打开',
          copyButton: '复制格式化留言内容',
          copiedButton: '已复制到剪贴板',
        },
      },
    },
    footer: {
      roleSignature: '智能产品构建者 · 创意技术专家',
      github: 'GitHub',
      email: '电子邮箱',
      backToTop: '返回顶部',
    },
  },
  en: {
    meta: {
      title: '魚橙子 YU CHENGZI — AI Product Builder & Creative Technologist',
      description:
        'Portfolio of 魚橙子 (YU CHENGZI) — Exploring artificial intelligence, product design, and engineering to transform complex ideas into meaningful digital experiences.',
    },
    nav: {
      work: 'Work',
      expertise: 'Expertise',
      about: 'About',
      contact: 'Contact',
      letsTalk: "Let's Talk",
      langSwitchLabel: 'Switch language to Chinese (切换至中文)',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      reducedMotionOn: 'Motion: Reduced',
      reducedMotionOff: 'Motion: Full Cosmic',
    },
    hero: {
      eyebrow: 'AI PRODUCT BUILDER / CREATIVE TECHNOLOGIST',
      headlineLine1: 'Designing intelligent products.',
      headlineHighlight: 'Exploring what comes next.',
      supportingText:
        'Exploring artificial intelligence, product design, and engineering to transform complex ideas into meaningful digital experiences.',
      primaryCta: 'Explore My Work',
      secondaryCta: 'Get in Touch',
      scrollExplore: 'Scroll to explore the universe',
      interactionHint: 'Move cursor to interact with human & galaxy · Click for starlight pulse',
      backdropWatermark: 'COSMIC INTELLIGENCE',
    },
    work: {
      eyebrow: '02 / SELECTED WORK',
      heading: 'Selected Work',
      subtitle:
        "A selection of products, experiments, and systems I've been building.",
      discussAction: 'Discuss this system',
      viewAction: 'View Project',
      projects: {
        'ai-local-env-checker': {
          category: 'Developer Tools / Automation',
          description:
            'A tool focused on simplifying local AI development environment detection, installation, and troubleshooting.',
          highlights: [
            'Runtime & GPU compute capability inspection',
            'Automated dependency & local model runtime checks',
            'Actionable diagnostic reporting for developer setups',
          ],
          previewLabels: {
            headerLeft: 'env-inspector — diagnostic session',
            headerRight: 'local runtime check',
            footerLeft: 'CLI & Local Interface',
            footerRight: 'Diagnostic Architecture',
          },
        },
        'exam-master-local': {
          category: 'AI Education / Knowledge Systems',
          description:
            'An experimental educational platform designed to organize learning resources and support intelligent knowledge exploration.',
          highlights: [
            'Structured study topic hierarchies & curriculum mapping',
            'Interactive concept synthesis and question generation',
            'Local-first workspace designed for focused study sessions',
          ],
          previewLabels: {
            headerLeft: 'Knowledge Workspace',
            headerRight: 'Structured Study Flow',
            footerLeft: 'Curriculum Indexing',
            footerRight: 'Knowledge Exploration',
          },
        },
        'ai-knowledge-base': {
          category: 'Knowledge Engineering / AI Systems',
          description:
            'Exploring structured knowledge organization, search, and AI-assisted learning workflows.',
          highlights: [
            'Semantic indexing across technical notes and documentation',
            'Contextual cross-referencing and synthesis pipelines',
            'Clean editorial reading and retrieval interface',
          ],
          previewLabels: {
            headerLeft: 'Semantic Knowledge Graph',
            headerRight: 'Retrieval & Linking',
            footerLeft: 'Structured Search',
            footerRight: 'AI-Assisted Workflows',
          },
        },
      },
    },
    expertise: {
      eyebrow: '03 / CAPABILITIES',
      heading: 'What I Do',
      subtitle:
        'Bridging artificial intelligence, systems architecture, and expressive interactive interfaces.',
      focusLabel: 'Focus Areas & Deliverables',
      items: {
        'ai-product-design': {
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
        'ai-agents-automation': {
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
        'web-experiences': {
          title: 'Web Experiences',
          summary:
            'Responsive interfaces, creative interaction, frontend engineering, and performance.',
          focusAreas: [
            'Editorial typography, spatial motion systems, and tactile micro-interactions',
            'Accessible, keyboard-navigable React & TypeScript architectures',
            'Frame-rate-conscious animations respecting reduced-motion preferences',
          ],
          deliverables:
            'Design Systems · Interactive Web Apps · Creative Frontends',
        },
        'systems-developer-tools': {
          title: 'Systems & Developer Tools',
          summary:
            'CLI environments, deployment workflows, integrations, and technical infrastructure.',
          focusAreas: [
            'Environment diagnostics, reproducible local setups, and developer ergonomics',
            'Modular API integrations, build pipelines, and configuration management',
            'Clear documentation and maintainable TypeScript/Node codebases',
          ],
          deliverables:
            'CLI Utilities · Environment Tooling · System Integrations',
        },
      },
    },
    about: {
      eyebrow: '04 / PERSPECTIVE',
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
    },
    contact: {
      eyebrow: '05 / CONTACT',
      heading: 'Have an idea worth building?',
      supportingText:
        "Whether it's an AI product, a development workflow, or an experimental digital experience, I'd be interested in hearing about it.",
      areasTitle: 'Areas of interest',
      areasSubtitle: 'Select all that apply',
      serviceOptions: [
        { id: 'AI Product', label: 'AI Product' },
        { id: 'Automation', label: 'Automation' },
        { id: 'Web Experience', label: 'Web Experience' },
        { id: 'Consulting', label: 'Consulting' },
      ],
      emptyAreasHint: 'Select one or more areas above to tailor your inquiry.',
      selectedAreasPrefix: 'Selected areas: ',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        selectedAreasLabel: 'Selected areas of interest',
        noneSelectedValue: 'None selected (General Inquiry)',
        messageLabel: 'Project or message',
        messagePlaceholder:
          "Tell me about the problem, timeline, or idea you're exploring...",
        submitButton: "Let's Connect",
        errors: {
          nameRequired: 'Please enter your name.',
          emailRequired: 'Please enter your email address.',
          emailInvalid: 'Please enter a valid email address.',
          messageRequired:
            'Please share a brief overview of your project or idea.',
        },
        fallback: {
          title: 'Direct Email Handoff Ready',
          descriptionPrefix:
            'No backend mail server is configured on this static deployment. Your inquiry has been formatted for direct email delivery to ',
          openEmailButton: 'Open in Email Client',
          copyButton: 'Copy Formatted Message',
          copiedButton: 'Copied to Clipboard',
        },
      },
    },
    footer: {
      roleSignature: 'AI PRODUCT BUILDER / CREATIVE TECHNOLOGIST',
      github: 'GitHub',
      email: 'Email',
      backToTop: 'Back to Top',
    },
  },
};
