import { INavData } from '@coreui/angular';

export const assistantNavItems: INavData[] = [
  {
    title: true,
    name: 'Pages'
  },
  {
    name: 'Today`s visits',
    url: '/appointment/dashboard',
    icon: 'cil-calendar-check'
  },
  {
    name: 'Visits',
    url: '/appointment',
    icon: 'cil-briefcase'
}
];
