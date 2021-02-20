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
        name: 'العيادات',
        url: '/clinic',
        icon: 'cil-location-pin'
      },
      {
        name: 'التاريخ الطبي',
        url: '/medicalhistory',
        icon: 'cil-hospital'
      },
      {

        name: 'اضافات للكشف',
        url: '/appointmentaddition',
        icon: 'cil-plus'
      },
      {
        name: 'انواع الكشف',
        url: '/appointmentcategory',
        icon: 'cil-layers'
      },
      {
        name: 'المصاريف',
        url: '/expense',
        icon: 'cil-dollar'
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
    name: 'Icons',
    url: '/icons',
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
