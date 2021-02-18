import { INavData } from '@coreui/angular';

export const doctorNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'اعداد البيانات الرئيسية',
    url: '/base',
    icon: 'cil-bookmark',
    children: [
      {
        name: 'التاريخ الطبي',
        url: '/medicalhistory',
        icon: 'cil-hospital'
      }
    ]
  },
  {
    name: 'المستخدمين',
    url: '/user',
    icon: 'cil-user'
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  }
];
