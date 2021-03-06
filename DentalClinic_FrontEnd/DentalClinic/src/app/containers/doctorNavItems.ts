import { INavData } from '@coreui/angular';

export const doctorNavItems: INavData[] = [
  {
    title: true,
    name: 'Components'
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
  }
];
