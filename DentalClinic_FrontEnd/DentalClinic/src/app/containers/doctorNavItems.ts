import { INavData } from '@coreui/angular';

export const doctorNavItems: INavData[] = [
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
  },
  {
    name: 'Users',
    url: '/user',
    icon: 'cil-user'
  },
  {
    name: 'Patients',
    url: '/patient',
    icon: 'cil-medical-cross'
  },
  // {
  //   name: 'المصاريف',
  //   url: '/expense',
  //   icon: 'cil-dollar'
  // },
  {
    name: 'Main data',
    url: '/base',
    icon: 'cil-bookmark',
    children: [
      {
        name: 'Clinics',
        url: '/clinic',
        icon: 'cil-location-pin'
      },
      {
        name: 'Chronic diseases',
        url: '/medicalhistory',
        icon: 'cil-hospital'
      },
      {

        name: 'Visit additions',
        url: '/appointmentaddition',
        icon: 'cil-plus'
      },
      {
        name: 'Visits categories',
        url: '/appointmentcategory',
        icon: 'cil-layers'
      },
      {
        name: 'Treatments',
        url: '/treatment',
        icon: 'cil-medical-cross'
      }
    ]
  },
  // {
  //   name: 'التقارير',
  //   url: '/report',
  //   icon: 'cil-print',
  //   children: [
  //     {
  //       name: 'تقرير المصاريف',
  //       url: '/report/expensereport',
  //       icon: 'cil-dollar'
  //     },
  //     {
  //       name: 'تقرير الكشوفات',
  //       url: '/report/appointmentreport',
  //       icon: 'cil-briefcase'
  //     },
  //     {
  //       name: 'تقرير اجمالى المصاريف',
  //       url: '/report/totalexpensereport',
  //       icon: 'cil-chart-line'
  //     }
      
  //   ]
  // }
];
