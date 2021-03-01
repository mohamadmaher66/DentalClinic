import { INavData } from '@coreui/angular';

export const assistantNavItems: INavData[] = [
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
    name: 'الكشوفات',
    url: '/appointment',
    icon: 'cil-briefcase'
  },
  {
    name: 'المستخدمين',
    url: '/user',
    icon: 'cil-user'
  },
  {
    name: 'المرضي',
    url: '/patient',
    icon: 'cil-medical-cross'
  }
];
