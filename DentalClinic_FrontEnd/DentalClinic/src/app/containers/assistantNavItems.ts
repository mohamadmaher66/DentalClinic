import { INavData } from '@coreui/angular';

export const assistantNavItems: INavData[] = [
  {
    title: true,
    name: 'القائمة'
  },
  {
    name: 'كشوفات اليوم',
    url: '/appointment/dashboard',
    icon: 'cil-calendar-check'
  },
  {
    name: 'الكشوفات',
    url: '/appointment',
    icon: 'cil-briefcase'
  }
];
