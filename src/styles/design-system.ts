
export const designSystem = {
  colors: {
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    accent: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    }
  },
  gradients: {
    primary: 'bg-gradient-to-r from-emerald-500 to-blue-500',
    primaryHover: 'hover:from-emerald-600 hover:to-blue-600',
    card: 'bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-700/70',
    background: 'bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950'
  },
  shadows: {
    card: 'shadow-lg shadow-slate-200/50 dark:shadow-slate-800/50',
    button: 'shadow-md shadow-emerald-200/50 dark:shadow-emerald-800/30',
    hover: 'hover:shadow-xl hover:shadow-slate-300/30 dark:hover:shadow-slate-700/30'
  },
  spacing: {
    cardPadding: 'p-6',
    sectionSpacing: 'space-y-6',
    buttonPadding: 'px-6 py-3',
    iconSize: 'h-5 w-5'
  },
  transitions: {
    default: 'transition-all duration-300 ease-out',
    fast: 'transition-all duration-200 ease-out',
    slow: 'transition-all duration-500 ease-out'
  },
  borderRadius: {
    card: 'rounded-xl',
    button: 'rounded-lg',
    input: 'rounded-lg'
  }
};

export const roleColors = {
  admin: 'from-purple-500 to-indigo-500',
  business_partner: 'from-emerald-500 to-blue-500',
  client: 'from-blue-500 to-cyan-500',
  location: 'from-orange-500 to-yellow-500'
};
