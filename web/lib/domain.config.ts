export type PrimitiveFieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'enum'
  | 'text'
  | 'location'
  | 'user_ref'
  | 'object';

export interface EntityFieldSpec {
  name: string;
  label: string;
  type: PrimitiveFieldType;
  required?: boolean;
  options?: string[];
  description?: string;
  defaultValue?: any;
  validationRules?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface EntityRelationshipSpec {
  type: 'one_to_one' | 'one_to_many' | 'many_to_many';
  targetEntity: string;
  field: string;
  description?: string;
}

export interface EntityStatusSpec {
  key: string;
  label: string;
  color: 'emerald' | 'amber' | 'blue' | 'rose' | 'indigo' | 'violet' | 'zinc';
  bg: string;
  text: string;
  border?: string;
  description?: string;
  isTerminal?: boolean;
}

export interface DomainEntitySpec {
  name: string;
  pluralName: string;
  description: string;
  isPrimary?: boolean;
  fields: EntityFieldSpec[];
  statuses: EntityStatusSpec[];
  relationships?: EntityRelationshipSpec[];
  categories?: string[];
  permissions?: {
    createRoles: string[];
    readRoles: string[];
    updateRoles: string[];
    deleteRoles: string[];
  };
}

export interface RoleSpec {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  permissions: string[];
  defaultRoute: string;
  customProfileFields?: EntityFieldSpec[];
}

export interface WorkflowTransitionSpec {
  fromStatus: string;
  toStatus: string;
  actionLabel: string;
  allowedRoles: string[];
  requiresReason?: boolean;
  triggersNotification?: {
    recipientRoles: string[];
    titleTemplate: string;
    messageTemplate: string;
  };
}

export interface WorkflowSpec {
  id: string;
  name: string;
  description: string;
  entityName: string;
  initialStatus: string;
  transitions: WorkflowTransitionSpec[];
}

export interface NavigationItemSpec {
  id: string;
  name: string;
  href: string;
  iconName: string;
  allowedRoles?: string[];
  badgeKey?: string;
  description?: string;
}

export type DashboardWidgetType =
  | 'metric_card'
  | 'status_breakdown'
  | 'workflow_action_feed'
  | 'recent_items_table'
  | 'category_progress'
  | 'ai_action_assistant'
  | 'timeline_tracker'
  | 'emergency_banner'
  | 'quick_create_action';

export interface DashboardWidgetSpec {
  id: string;
  type: DashboardWidgetType;
  title: string;
  subtitle?: string;
  gridSpan: 'full' | 'half' | 'third' | 'two_thirds';
  config?: Record<string, any>;
  allowedRoles?: string[];
}

export interface RoleDashboardSpec {
  roleId: string;
  welcomeMessage: string;
  primaryAction: {
    label: string;
    href: string;
    iconName?: string;
  };
  widgets: DashboardWidgetSpec[];
}

export type LandingSectionType =
  | 'hero'
  | 'problem_solution'
  | 'workflow_pipeline'
  | 'role_breakdown'
  | 'capability_matrix'
  | 'real_time_sync'
  | 'interactive_demo'
  | 'faq'
  | 'cta_banner';

export interface LandingSectionSpec {
  id: string;
  type: LandingSectionType;
  title?: string;
  subtitle?: string;
  content: Record<string, any>;
  order: number;
}

export interface BespokeLandingSpec {
  badge: string;
  headlineHighlightWords: {
    text: string;
    colorHex?: string;
    bgHex?: string;
  }[];
  tagline: string;
  detailedSubheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sections: LandingSectionSpec[];
}

export interface AuthExperienceSpec {
  requireRoleSelectionOnSignup: boolean;
  availableRoles: { id: string; name: string; description: string }[];
  customSignupFields: EntityFieldSpec[];
  loginGuidanceText?: string;
}

export interface MobileExperienceSpec {
  appName: string;
  tabBarItems: {
    key: string;
    label: string;
    iconName: string;
    allowedRoles?: string[];
  }[];
  quickActionTitle: string;
  primaryEntityWorkflowName: string;
}

export interface CompleteProductSpec {
  id: string;
  version: string;
  createdAt: string;
  updatedAt: string;

  meta: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    objective: string;
    problemSummary: string;
    targetUsers: string[];
    accentColorHex: string;
    themeGradient: [string, string];
  };

  roles: RoleSpec[];
  entities: DomainEntitySpec[];
  workflows: WorkflowSpec[];
  navigation: NavigationItemSpec[];
  roleDashboards: RoleDashboardSpec[];
  landingPage: BespokeLandingSpec;
  authExperience: AuthExperienceSpec;
  mobileExperience?: MobileExperienceSpec;
  aiSystemPrompt: string;
}

export interface DomainNavigationItem {
  name: string;
  href: string;
  iconName: 'LayoutDashboard' | 'Layers' | 'Sparkles' | 'FolderOpen' | 'Bell' | 'Activity' | 'Shield' | 'Users' | 'MapPin' | 'HeartPulse' | string;
  badge?: string | number | null;
  description?: string;
  allowedRoles?: string[];
}

export interface DomainStatusOption {
  key: string;
  label: string;
  color: string;
  bg: string;
  text: string;
  border?: string;
}

export interface DomainLandingHero {
  badge: string;
  headlineWords: {
    text: string;
    highlightBg?: string;
    textColor?: string;
  }[];
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface DomainLandingFeature {
  title: string;
  description: string;
  category: string;
  iconName: string;
  badge?: string;
}

export interface DomainConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    accentColor: string;
    themeGradient: [string, string];
  };
  domain: {
    primaryEntityName: string;
    entityPluralName: string;
    categories: string[];
    statuses: DomainStatusOption[];
    roles: string[];
    aiSystemPrompt: string;
  };
  navigation: DomainNavigationItem[];
  landing: {
    hero: DomainLandingHero;
    features: DomainLandingFeature[];
    problemSolution: {
      problem: string;
      solution: string;
    };
    faqs: { question: string; answer: string }[];
  };
  dashboard: {
    metrics: {
      key: string;
      label: string;
      iconName: string;
      color: string;
      accentBg: string;
    }[];
  };
  productSpec: CompleteProductSpec;
}

export const pulseStarterProductSpec: CompleteProductSpec = {
  id: 'pulse-default-starter',
  version: '1.0.0',
  createdAt: '2026-09-16T05:42:04Z',
  updatedAt: '2026-09-16T05:42:04Z',
  meta: {
    name: 'SurvivalRun',
    shortName: 'SurvivalRun',
    tagline: 'Broke But Functional — Survive the Month (₹10,000 Budget Runway)',
    description: '30-day survival budget management connecting daily burn rate allowance, scheduled commitments, and protected savings.',
    objective: 'Empower users to survive a 30-day budget cycle with ₹10,000 using precision integer paise accounting, What-If decision simulation, and deterministic financial risk scoring.',
    problemSummary: 'Managing tight budgets leads to mid-month deficits due to impulsive spending, hidden subscriptions, and uncoordinated emergency expenses.',
    targetUsers: ['Students & Early Professionals', 'Freelancers on Fixed Cash', 'Budget Optimizers', 'Disciplined Savers'],
    accentColorHex: '#5B45F5',
    themeGradient: ['#101226', '#5B45F5'],
  },
  roles: [
    {
      id: 'operator',
      name: 'Runway Navigator',
      description: 'Primary user managing cash allocations, logging expenses, and simulating decisions',
      responsibilities: ['Track daily expenses', 'Simulate financial decisions', 'Lock protected savings cushion'],
      permissions: ['transactions:create', 'transactions:read', 'transactions:update', 'transactions:delete', 'simulations:run'],
      defaultRoute: '/dashboard',
    },
    {
      id: 'admin',
      name: 'Financial Auditor',
      description: 'Governance authority inspecting integer paise ledger accuracy and audit trails',
      responsibilities: ['Verify budget invariants', 'Audit recurring commitments', 'Review shortfall flags'],
      permissions: ['*'],
      defaultRoute: '/dashboard',
    },
  ],
  entities: [
    {
      name: 'Incident',
      pluralName: 'Incidents',
      description: 'Primary operational record representing an urgent event requiring lifecycle tracking',
      isPrimary: true,
      categories: ['Critical', 'High Priority', 'Logistics', 'Medical', 'General'],
      statuses: [
        { key: 'pending', label: 'Triage / Pending', color: 'amber', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
        { key: 'in_progress', label: 'In Transit / Active', color: 'blue', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        { key: 'completed', label: 'Resolved / Done', color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', isTerminal: true },
      ],
      fields: [
        { name: 'title', label: 'Incident Title', type: 'string', required: true, description: 'Concise summary of the incident' },
        { name: 'description', label: 'Detailed Description', type: 'text', required: false },
        { name: 'category', label: 'Operational Category', type: 'enum', required: true, options: ['Critical', 'High Priority', 'Logistics', 'Medical', 'General'] },
        { name: 'priority', label: 'Severity Level', type: 'enum', required: true, options: ['low', 'medium', 'high', 'urgent'], defaultValue: 'medium' },
        { name: 'location', label: 'Incident Coordinates / Location', type: 'string', required: false },
        { name: 'assignedUnit', label: 'Assigned Unit / Responder', type: 'string', required: false },
      ],
      permissions: {
        createRoles: ['coordinator', 'field_responder', 'admin'],
        readRoles: ['coordinator', 'field_responder', 'admin'],
        updateRoles: ['coordinator', 'field_responder', 'admin'],
        deleteRoles: ['coordinator', 'admin'],
      },
    },
  ],
  workflows: [
    {
      id: 'incident-lifecycle',
      name: 'Incident Resolution Lifecycle',
      description: 'End-to-end transition path from dispatch intake through on-scene action to resolution',
      entityName: 'Incident',
      initialStatus: 'pending',
      transitions: [
        {
          fromStatus: 'pending',
          toStatus: 'in_progress',
          actionLabel: 'Dispatch & Claim Incident',
          allowedRoles: ['coordinator', 'field_responder', 'admin'],
          triggersNotification: {
            recipientRoles: ['coordinator', 'field_responder'],
            titleTemplate: 'Incident Dispatched: {title}',
            messageTemplate: 'Field response initiated by {user}.',
          },
        },
        {
          fromStatus: 'in_progress',
          toStatus: 'completed',
          actionLabel: 'Mark Incident Resolved',
          allowedRoles: ['coordinator', 'field_responder', 'admin'],
          triggersNotification: {
            recipientRoles: ['coordinator', 'admin'],
            titleTemplate: 'Incident Resolved: {title}',
            messageTemplate: 'Field incident has been finalized and verified.',
          },
        },
        {
          fromStatus: 'completed',
          toStatus: 'in_progress',
          actionLabel: 'Reopen Incident',
          allowedRoles: ['coordinator', 'admin'],
        },
      ],
    },
  ],
  navigation: [
    { id: 'nav-dashboard', name: 'Dashboard', href: '/dashboard', iconName: 'LayoutDashboard', description: 'Real-time telemetry and operational metrics' },
    { id: 'nav-items', name: 'Incident Hub', href: '/items', iconName: 'Layers', description: 'Core domain records and status lifecycle' },
    { id: 'nav-files', name: 'Files & Media', href: '/files', iconName: 'FolderOpen', description: 'Evidence files and attachments' },
    { id: 'nav-alerts', name: 'Notifications', href: '/notifications', iconName: 'Bell', description: 'Dispatch alerts and priority activity' },
  ],
  roleDashboards: [
    {
      roleId: 'coordinator',
      welcomeMessage: 'Welcome to Command Dispatch. Review active telemetry and assign field units.',
      primaryAction: { label: 'Log Incident', href: '/items/new', iconName: 'Plus' },
      widgets: [
        { id: 'w-kpis', type: 'metric_card', title: 'Operational KPIs', gridSpan: 'full' },
        { id: 'w-recent', type: 'recent_items_table', title: 'Live Incident Feed', gridSpan: 'two_thirds' },
        { id: 'w-categories', type: 'category_progress', title: 'Category Breakdown', gridSpan: 'third' },
      ],
    },
    {
      roleId: 'field_responder',
      welcomeMessage: 'Field Mode Active. Prioritize assigned urgent triage cases.',
      primaryAction: { label: 'Quick Field Log', href: '/items/new', iconName: 'Plus' },
      widgets: [
        { id: 'w-kpis', type: 'metric_card', title: 'Field Queue Stats', gridSpan: 'full' },
        { id: 'w-recent', type: 'recent_items_table', title: 'Assigned Incidents', gridSpan: 'two_thirds' },
        { id: 'w-actions', type: 'workflow_action_feed', title: 'Pending State Actions', gridSpan: 'third' },
      ],
    },
    {
      roleId: 'admin',
      welcomeMessage: 'System Governance Console. Full audit visibility and role oversight.',
      primaryAction: { label: 'Log Incident', href: '/items/new', iconName: 'Plus' },
      widgets: [
        { id: 'w-kpis', type: 'metric_card', title: 'System-Wide Metrics', gridSpan: 'full' },
        { id: 'w-recent', type: 'recent_items_table', title: 'All System Records', gridSpan: 'two_thirds' },
        { id: 'w-categories', type: 'category_progress', title: 'Domain Distribution', gridSpan: 'third' },
      ],
    },
  ],
  landingPage: {
    badge: 'Real-Time Multi-Platform Coordination',
    tagline: 'Multi-Platform Operational Intelligence & AI Workflow Platform',
    detailedSubheadline: 'Synchronize critical domain workflows instantly across desktop command centers and touch-first mobile devices.',
    primaryCta: { label: 'Launch Workspace', href: '/login' },
    secondaryCta: { label: 'Explore Platform', href: '#features' },
    headlineHighlightWords: [
      { text: 'Precision', bgHex: '#2563EB', colorHex: '#FFFFFF' },
      { text: 'Operations', bgHex: '#EC4899', colorHex: '#FFFFFF' },
      { text: 'on' },
      { text: 'Desktop,', bgHex: '#10B981', colorHex: '#FFFFFF' },
      { text: 'Native' },
      { text: 'Velocity', bgHex: '#6366F1', colorHex: '#FFFFFF' },
      { text: 'on' },
      { text: 'Mobile.' },
    ],
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        order: 1,
        content: {},
      },
      {
        id: 'sec-problem-solution',
        type: 'problem_solution',
        title: 'The Operational Gap',
        order: 2,
        content: {
          problem: 'Fragmented operations across slow web dashboards and disconnected mobile tools lead to critical delays.',
          solution: 'A unified single-source-of-truth platform connecting desktop decision-makers with mobile responders in real time.',
        },
      },
      {
        id: 'sec-capabilities',
        type: 'capability_matrix',
        title: 'Purpose-Built Capabilities',
        order: 3,
        content: {
          items: [
            {
              title: 'Instant Triage & Dispatch',
              description: 'Categorize, prioritize, and route high-impact domain items in sub-second cycles.',
              category: 'Workflows',
              badge: 'Zero Latency',
            },
            {
              title: 'Bi-Directional Mobile Sync',
              description: 'Field responders receive real-time updates and push logs seamlessly via native Expo client.',
              category: 'Mobility',
              badge: 'Dual-Platform',
            },
            {
              title: 'Operational Telemetry',
              description: 'Real-time telemetry metrics, automated health tracking, and incident event logs.',
              category: 'Operations',
              badge: 'Real-Time',
            },
          ],
        },
      },
      {
        id: 'sec-roles',
        type: 'role_breakdown',
        title: 'Tailored for Every Operational Role',
        order: 4,
        content: {
          roles: [
            {
              name: 'Command Coordinator',
              tagline: 'Desktop control room view with full triage feed, filters, and priority dispatch.',
            },
            {
              name: 'Field Responder',
              tagline: 'Native mobile client with instant tap-to-update statuses and secure credentials.',
            },
            {
              name: 'Operations Analyst',
              tagline: 'Automated AI synthesis, audit histories, and cross-platform completion metrics.',
            },
          ],
        },
      },
      {
        id: 'sec-faq',
        type: 'faq',
        title: 'Frequently Asked Questions',
        order: 5,
        content: {
          faqs: [
            {
              question: 'How do Web and Mobile remain synchronized?',
              answer: 'Both platforms consume the same REST backend and database. Status transitions and records created on Mobile reflect instantly on Web upon refresh or polling.',
            },
            {
              question: 'Can this product adapt to other problem domains?',
              answer: 'Yes! The product generator parses any problem statement into a structured product specification that regenerates models, workflows, landing copy, and RBAC views.',
            },
          ],
        },
      },
    ],
  },
  authExperience: {
    requireRoleSelectionOnSignup: true,
    availableRoles: [
      { id: 'coordinator', name: 'Coordinator', description: 'Manage dispatch, triage records, and oversee workflows' },
      { id: 'field_responder', name: 'Field Responder', description: 'Log frontline updates and claim assigned tasks on mobile' },
    ],
    customSignupFields: [
      { name: 'organization', label: 'Organization / Team Name', type: 'string', required: true },
      { name: 'roleSpecificIdentifier', label: 'Department / Unit Identifier', type: 'string', required: false },
    ],
    loginGuidanceText: 'Sign in with your operational credentials to access your designated workspace.',
  },
  mobileExperience: {
    appName: 'Pulse',
    tabBarItems: [
      { key: 'home', label: 'Home', iconName: 'Home' },
      { key: 'items', label: 'Records', iconName: 'Shield' },
      { key: 'create', label: 'Log', iconName: 'Plus' },
      { key: 'ai', label: 'AI Copilot', iconName: 'Sparkles' },
      { key: 'notifications', label: 'Alerts', iconName: 'Bell' },
    ],
    quickActionTitle: 'Log Operational Incident',
    primaryEntityWorkflowName: 'Field Incident Triage',
  },
  aiSystemPrompt: 'Act as a specialized operational intelligence copilot. Extract urgent actions, prioritize domain tasks, and synthesize cross-platform incident updates.',
};

import { defaultProductSpec as generatedDefaultSpec } from './productSpec.default';

export const defaultProductSpec: CompleteProductSpec = generatedDefaultSpec;

/**
 * Active Product Specification for Web
 * Autonomous single-source-of-truth generated by the Product Generation Engine.
 */
export const activeProductSpec: CompleteProductSpec = generatedDefaultSpec;

export function deriveDomainConfig(spec: CompleteProductSpec): DomainConfig {
  const primaryEntity = spec.entities.find((e: any) => e.isPrimary) || spec.entities[0] || {
    name: 'Item',
    pluralName: 'Items',
    categories: ['General'],
    statuses: [
      { key: 'pending', label: 'Pending', color: 'amber' as const, bg: 'bg-amber-50', text: 'text-amber-700' },
      { key: 'in_progress', label: 'In Progress', color: 'blue' as const, bg: 'bg-blue-50', text: 'text-blue-700' },
      { key: 'completed', label: 'Completed', color: 'emerald' as const, bg: 'bg-emerald-50', text: 'text-emerald-700' },
    ],
  };

  const heroWords = spec.landingPage.headlineHighlightWords.map((w: any) => ({
    text: w.text,
    highlightBg: w.bgHex,
    textColor: w.colorHex,
  }));

  const capabilitySection = spec.landingPage.sections.find((s: any) => s.type === 'capability_matrix');
  const features: DomainLandingFeature[] = capabilitySection?.content?.items?.map((item: any) => ({
    title: item.title,
    description: item.description,
    category: item.category || 'Feature',
    iconName: item.iconName || 'Activity',
    badge: item.badge,
  })) || [
      {
        title: 'Real-Time Sync',
        description: 'Instant state synchronization between web command center and mobile field clients.',
        category: 'Real-Time',
        iconName: 'Activity',
        badge: 'Zero Latency',
      },
    ];

  const problemSection = spec.landingPage.sections.find((s: any) => s.type === 'problem_solution');
  const faqSection = spec.landingPage.sections.find((s: any) => s.type === 'faq');

  return {
    brand: {
      name: spec.meta.name,
      shortName: spec.meta.shortName,
      tagline: spec.meta.tagline,
      description: spec.meta.description,
      accentColor: spec.meta.accentColorHex,
      themeGradient: spec.meta.themeGradient,
    },
    domain: {
      primaryEntityName: primaryEntity.name,
      entityPluralName: primaryEntity.pluralName,
      categories: primaryEntity.categories || ['General'],
      statuses: primaryEntity.statuses.map((s: any) => ({
        key: s.key,
        label: s.label,
        color: s.color,
        bg: s.bg,
        text: s.text,
        border: s.border,
      })),
      roles: spec.roles.map((r: any) => r.name),
      aiSystemPrompt: spec.aiSystemPrompt,
    },
    navigation: spec.navigation.map((n: any) => ({
      name: n.name,
      href: n.href,
      iconName: n.iconName as any,
      description: n.description,
      allowedRoles: n.allowedRoles,
    })),
    landing: {
      hero: {
        badge: spec.landingPage.badge,
        headlineWords: heroWords,
        subheadline: spec.landingPage.detailedSubheadline,
        ctaPrimary: spec.landingPage.primaryCta,
        ctaSecondary: spec.landingPage.secondaryCta,
      },
      features,
      problemSolution: {
        problem: problemSection?.content?.problem || spec.meta.problemSummary,
        solution: problemSection?.content?.solution || spec.meta.objective,
      },
      faqs: faqSection?.content?.faqs || [],
    },
    dashboard: {
      metrics: [
        { key: 'total', label: `Total ${primaryEntity.pluralName}`, iconName: 'Layers', color: spec.meta.accentColorHex, accentBg: 'bg-indigo-50' },
        { key: 'inProgress', label: 'Active / In-Flight', iconName: 'Activity', color: '#2563EB', accentBg: 'bg-blue-50' },
        { key: 'pending', label: 'Pending Triage', iconName: 'Bell', color: '#D97706', accentBg: 'bg-amber-50' },
        { key: 'completed', label: 'Resolved', iconName: 'Shield', color: '#059669', accentBg: 'bg-emerald-50' },
      ],
    },
    productSpec: spec,
  };
}

export const domainConfig: DomainConfig = deriveDomainConfig(activeProductSpec);

export default domainConfig;
