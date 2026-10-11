import { CompleteProductSpec } from './domain.config';

export const defaultProductSpec: CompleteProductSpec = {
  id: 'survival-spec-2026',
  version: '1.0.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  meta: {
    name: 'SurvivalRun',
    shortName: 'Survive',
    tagline: 'Broke But Functional — Survive the Month Financial Runway',
    description: 'Emergency financial runway & daily burn rate tracker to make finite cash stretch until payday.',
    objective: 'Provide high-density financial runway tracking, daily burn rate budgeting, non-negotiable expense management, and survival hacks.',
    problemSummary: 'College students and young professionals face severe cash shortages before payday. SurvivalRun provides a survival runbook with remaining balance tracking, essential vs discretionary segregation, and sacrifice strategies.',
    targetUsers: ['Frugal Survivor', 'Budget Accountability Buddy'],
    accentColorHex: '#10B981',
    themeGradient: ['#064E3B', '#047857'],
  },
  roles: [
    {
      id: 'frugal_survivor',
      name: 'Frugal Survivor',
      description: 'Individual managing a tight monthly budget to reach the next payday without debt',
      responsibilities: ['Log daily expenses', 'Track safe daily burn rate', 'Record sacrifice & savings decisions'],
      permissions: ['*'],
      defaultRoute: '/dashboard',
      customProfileFields: [
        { name: 'monthlyAllowance', label: 'Remaining Cash / Monthly Runway ($)', type: 'number', required: true },
        { name: 'daysUntilPayday', label: 'Days Remaining Until Payday', type: 'number', required: true },
      ],
    },
    {
      id: 'money_mentor',
      name: 'Budget Accountability Buddy',
      description: 'Trusted peer or financial mentor providing oversight and frugal advice',
      responsibilities: ['Review discretionary expenses', 'Encourage zero-spend streaks', 'Flag high-risk transactions'],
      permissions: ['items:read', 'items:create', 'items:update'],
      defaultRoute: '/items',
      customProfileFields: [
        { name: 'relationship', label: 'Relationship / Accountability Circle', type: 'string', required: true },
      ],
    },
  ],
  entities: [
    {
      name: 'Survival Expense',
      pluralName: 'Survival Expenses',
      description: 'Primary financial transaction and survival allocation record',
      isPrimary: true,
      categories: [
        'Essential Rent & Utilities',
        'Staple Groceries',
        'Transit & Commute',
        'Prescription & Medical',
        'Discretionary / Leisure',
        'Zero-Spend Hack',
      ],
      statuses: [
        {
          key: 'pending',
          label: 'Planned / Unpaid',
          color: 'amber',
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
        },
        {
          key: 'in_progress',
          label: 'Active / Committed',
          color: 'blue',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
        },
        {
          key: 'completed',
          label: 'Settled & Cleared',
          color: 'emerald',
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          isTerminal: true,
        },
      ],
      fields: [
        {
          name: 'title',
          label: 'Expense / Survival Item',
          type: 'string',
          required: true,
        },
        {
          name: 'description',
          label: 'Notes & Alternative Free Hacks',
          type: 'text',
          required: false,
        },
        {
          name: 'category',
          label: 'Budget Classification',
          type: 'enum',
          required: true,
          options: [
            'Essential Rent & Utilities',
            'Staple Groceries',
            'Transit & Commute',
            'Prescription & Medical',
            'Discretionary / Leisure',
            'Zero-Spend Hack',
          ],
        },
        {
          name: 'priority',
          label: 'Survival Urgency',
          type: 'enum',
          required: true,
          options: ['low', 'medium', 'high', 'urgent'],
          defaultValue: 'medium',
        },
      ],
      permissions: {
        createRoles: ['frugal_survivor', 'money_mentor', 'coordinator', 'admin'],
        readRoles: ['frugal_survivor', 'money_mentor', 'coordinator', 'admin'],
        updateRoles: ['frugal_survivor', 'money_mentor', 'coordinator', 'admin'],
        deleteRoles: ['frugal_survivor', 'coordinator', 'admin'],
      },
    },
  ],
  workflows: [
    {
      id: 'survival-expense-lifecycle',
      name: 'Survival Budget Lifecycle',
      description: 'Planned / Unpaid -> Spent / Committed -> Sacrificed / Avoided (Saved)',
      entityName: 'Survival Expense',
      initialStatus: 'pending',
      transitions: [
        {
          fromStatus: 'pending',
          toStatus: 'in_progress',
          actionLabel: 'Commit & Deduct from Runway',
          allowedRoles: ['frugal_survivor', 'money_mentor', 'coordinator', 'admin'],
        },
        {
          fromStatus: 'in_progress',
          toStatus: 'completed',
          actionLabel: 'Mark Settled & Cleared',
          allowedRoles: ['frugal_survivor', 'money_mentor', 'coordinator', 'admin'],
        },
        {
          fromStatus: 'pending',
          toStatus: 'completed',
          actionLabel: 'Sacrifice Expense (Preserve Cash)',
          allowedRoles: ['frugal_survivor', 'money_mentor', 'coordinator', 'admin'],
        },
      ],
    },
  ],
  navigation: [
    {
      id: 'nav-dash',
      name: 'Runway Command',
      href: '/dashboard',
      iconName: 'LayoutDashboard',
      description: 'Burn rate telemetry & safe daily budget',
    },
    {
      id: 'nav-items',
      name: 'Expense Ledger',
      href: '/items',
      iconName: 'Layers',
      description: 'Manage essential and discretionary items',
    },
    {
      id: 'nav-files',
      name: 'Receipts & Proof',
      href: '/files',
      iconName: 'FolderOpen',
      description: 'Attached receipts and grocery invoices',
    },
    {
      id: 'nav-alerts',
      name: 'Burn Alerts',
      href: '/notifications',
      iconName: 'Bell',
      description: 'Overspend warnings and zero-spend milestones',
    },
  ],
  roleDashboards: [
    {
      roleId: 'frugal_survivor',
      welcomeMessage: 'Survival Runway Active. Guard your daily burn rate and make it to payday.',
      primaryAction: {
        label: 'Log Survival Expense',
        href: '/items/new',
        iconName: 'Plus',
      },
      widgets: [
        {
          id: 'w-survivor-kpis',
          type: 'metric_card',
          title: 'Runway KPIs',
          gridSpan: 'full',
        },
        {
          id: 'w-survivor-recent',
          type: 'recent_items_table',
          title: 'Recent Expenses & Sacrifices',
          gridSpan: 'two_thirds',
        },
        {
          id: 'w-survivor-breakdown',
          type: 'category_progress',
          title: 'Category Allocation',
          gridSpan: 'third',
        },
      ],
    },
  ],
  landingPage: {
    badge: 'Broke But Functional — Survive the Month',
    tagline: 'Emergency Financial Runway & Daily Burn Rate Tracker',
    detailedSubheadline: 'Eliminate overspending and stretch finite cash until payday with automated burn rate telemetry, essential cost segregation, and zero-spend milestones.',
    primaryCta: {
      label: 'Open Runway Workspace',
      href: '/login',
    },
    secondaryCta: {
      label: 'Explore Capabilities',
      href: '#platform',
    },
    headlineHighlightWords: [
      { text: 'Survive', bgHex: '#10B981', colorHex: '#FFFFFF' },
      { text: 'the' },
      { text: 'Month', bgHex: '#059669', colorHex: '#FFFFFF' },
      { text: 'on' },
      { text: 'Finite', bgHex: '#F59E0B', colorHex: '#FFFFFF' },
      { text: 'Cash' },
      { text: 'with' },
      { text: 'Precision.', bgHex: '#2563EB', colorHex: '#FFFFFF' },
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
        title: 'The Cash Crunch Dilemma',
        order: 2,
        content: {
          problem: 'College students and young adults run out of money mid-month due to opaque daily spending limits, surprise utilities, and unchecked discretionary leaks.',
          solution: 'SurvivalRun turns complex personal finance into a daily survival playbook: remaining runway, daily max spend, essential vs discretionary segregation, and sacrifice tracking.',
        },
      },
      {
        id: 'sec-capabilities',
        type: 'capability_matrix',
        title: 'Core Survival Capabilities',
        order: 3,
        content: {
          items: [
            {
              title: 'Daily Burn Rate Budgeting',
              description: 'Calculates your safe daily maximum spend so you never run out of money before the next payday.',
              category: 'Telemetry',
              badge: 'Real-Time',
            },
            {
              title: 'Essential vs Discretionary Ledger',
              description: 'Strictly isolate non-negotiable rent, groceries, and transit from discretionary impulse buys.',
              category: 'Triage',
              badge: 'Automated',
            },
            {
              title: 'Sacrifice & Savings Tracking',
              description: 'Turn skipped coffees or takeout into positive survival milestone records that extend runway.',
              category: 'Behavioral',
              badge: 'High Impact',
            },
          ],
        },
      },
      {
        id: 'sec-roles',
        type: 'role_breakdown',
        title: 'Engineered for Accountability',
        order: 4,
        content: {
          roles: [
            {
              name: 'Frugal Survivor',
              tagline: 'Real-time daily expense logging, runway metrics, and burn rate management.',
            },
            {
              name: 'Budget Accountability Buddy',
              tagline: 'Discretionary review, streak encouragement, and emergency cost mitigation.',
            },
          ],
        },
      },
    ],
  },
  authExperience: {
    requireRoleSelectionOnSignup: true,
    availableRoles: [
      {
        id: 'frugal_survivor',
        name: 'Frugal Survivor',
        description: 'Track daily expenses and stretch your remaining balance to payday',
      },
      {
        id: 'money_mentor',
        name: 'Budget Accountability Buddy',
        description: 'Provide frugal guidance and monitor discretionary spending',
      },
    ],
    customSignupFields: [
      {
        name: 'monthlyAllowance',
        label: 'Current Remaining Cash ($)',
        type: 'number',
        required: true,
      },
    ],
    loginGuidanceText: 'Sign in to access your financial runway and daily burn rate tracker.',
  },
  aiSystemPrompt: 'You are an emergency frugal financial survival copilot. Calculate remaining runway, evaluate non-essential expenses, and suggest zero-cost survival strategies.',
};
