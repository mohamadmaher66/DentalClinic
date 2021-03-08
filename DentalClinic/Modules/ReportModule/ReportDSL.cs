using Infrastructure;
using System;
using DBContext;
using DTOs;
using System.Collections.Generic;
using AutoMapper;
using Request;
using Enums;
using MedicalHistoryModule;
using System.Text;
using AspNetCore.Reporting;
using Microsoft.Extensions.Hosting;
using ExpenseModule;
using ClinicModule;
using UserModule;
using System.Linq;
using AppointmentModule;
using PatientModule;
using AppointmentCategoryModule;

namespace ReportModule
{
    public class ReportDSL
    {
        IMapper mapper;
        private readonly IHostEnvironment _hostEnvironment;

        public ReportDSL(IMapper _mapper, IHostEnvironment hostEnvironment)
        {
            mapper = _mapper;
            _hostEnvironment = hostEnvironment;
        }

        public byte[] GetExpenseReport(ExpenseFilterDTO expenseFilter)
        {
            try
            {
                ExpenseDSL expenseDSL = new ExpenseDSL(mapper);
                List<ExpenseDTO> expenseList = expenseDSL.GetExpenseReport(expenseFilter.DateFrom, expenseFilter.DateTo, expenseFilter.ClinicId, expenseFilter.UserId, expenseFilter.Type);
                double inSum = expenseList.Where(e => e.Type == ExpenseType.In).Sum(e => e.Cost);
                double outSum = expenseList.Where(e => e.Type == ExpenseType.Out).Sum(e => e.Cost);
                if (expenseFilter.ClinicId > 0)
                {
                    expenseFilter.ClinicName = new ClinicDSL(mapper).GetById(expenseFilter.ClinicId).Name;
                }
                if (expenseFilter.UserId > 0)
                {
                    expenseFilter.UserFullName = new UserDSL(mapper).GetById(expenseFilter.UserId).FullName;
                }
                switch (expenseFilter.Type)
                {
                    case 0: expenseFilter.TypeName = "الكل"; break;
                    case ExpenseType.In: expenseFilter.TypeName = "داخل للعيادة"; break;
                    case ExpenseType.Out: expenseFilter.TypeName = "خارج من العيادة"; break;
                }
                Dictionary<string, string> parameters = new Dictionary<string, string>()
                {
                    { "DateFrom", expenseFilter.DateFrom.ToString("dd/MM/yyyy") },
                    { "DateTo" , expenseFilter.DateTo.ToString("dd/MM/yyyy") },
                    { "ClinicName" , expenseFilter.ClinicId == 0 ? "الكل" : expenseFilter.ClinicName },
                    { "UserFullName" , expenseFilter.UserId == 0 ? "الكل" : expenseFilter.UserFullName },
                    { "TypeName" , expenseFilter.TypeName },
                    { "InSum" , inSum.ToString() },
                    { "OutSum" , outSum.ToString() },
                };
                return GenerateReportAsync("ExpenseReport", "ExpenseList", expenseList, parameters);
            }
            catch (Exception e) { throw e; }
        }
        public byte[] GetAppointmentReport(AppointmentFilterDTO appointmentFilter)
        {
            try
            {
                AppointmentDSL appointmentDSL = new AppointmentDSL(mapper);
                List<AppointmentReportDTO> appointmentList = appointmentDSL.GetAppointmentReport(appointmentFilter.DateFrom, appointmentFilter.DateTo, appointmentFilter.PatientId,
                                                                               appointmentFilter.CategoryId, appointmentFilter.ClinicId, appointmentFilter.UserId, appointmentFilter.State);
                double totalPaid = appointmentList.Sum(a => a.PaidAmount);

                if (appointmentFilter.ClinicId > 0)
                {
                    appointmentFilter.ClinicName = new ClinicDSL(mapper).GetById(appointmentFilter.ClinicId).Name;
                }
                if (appointmentFilter.UserId > 0)
                {
                    appointmentFilter.UserFullName = new UserDSL(mapper).GetById(appointmentFilter.UserId).FullName;
                }
                if (appointmentFilter.PatientId > 0)
                {
                    appointmentFilter.PatientFullName = new PatientDSL(mapper).GetById(appointmentFilter.PatientId).FullName;
                }
                if (appointmentFilter.CategoryId > 0)
                {
                    appointmentFilter.CategoryName = new AppointmentCategoryDSL(mapper).GetById(appointmentFilter.CategoryId).Name;
                }
                switch (appointmentFilter.State)
                {
                    case 0: appointmentFilter.StateName = "الكل"; break;
                    case AppointmentStateEnum.Cancelled: appointmentFilter.StateName = "ملغي"; break;
                    case AppointmentStateEnum.Current: appointmentFilter.StateName = "جارى"; break;
                    case AppointmentStateEnum.Finished: appointmentFilter.StateName = "انتهى"; break;
                    case AppointmentStateEnum.Pending: appointmentFilter.StateName = "قيد الانتظار"; break;
                }
                Dictionary<string, string> parameters = new Dictionary<string, string>()
                {
                    { "DateFrom", appointmentFilter.DateFrom.ToString("dd/MM/yyyy") },
                    { "DateTo" , appointmentFilter.DateTo.ToString("dd/MM/yyyy") },
                    { "ClinicName" , appointmentFilter.ClinicId == 0 ? "الكل" : appointmentFilter.ClinicName },
                    { "UserFullName" , appointmentFilter.UserId == 0 ? "الكل" : appointmentFilter.UserFullName },
                    { "PatientFullName" , appointmentFilter.PatientId == 0 ? "الكل" : appointmentFilter.PatientFullName },
                    { "CategoryName" , appointmentFilter.CategoryId == 0 ? "الكل" : appointmentFilter.CategoryName },
                    { "StateName" , appointmentFilter.StateName },
                    { "TotalPaid" , totalPaid.ToString() }
                };
                return GenerateReportAsync("AppointmentReport", "AppointmentList", appointmentList, parameters);
            }
            catch (Exception e) { throw e; }
        }

        public List<DetailsList> GetExpenseDetailsLists()
        {
            try
            {
                List<DetailsList> detailsList = new List<DetailsList>();

                List<ClinicDTO> clinicList = new ClinicDSL(mapper).GetAllLite();
                detailsList.Add(new DetailsList()
                {
                    DetailsListId = (int)DetailsListEnum.Clinic,
                    List = clinicList
                });

                List<UserDTO> doctorList = new UserDSL(mapper).GetAllDoctorsLite();
                detailsList.Add(new DetailsList()
                {
                    DetailsListId = (int)DetailsListEnum.User,
                    List = doctorList
                });

                return detailsList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<DetailsList> GetAppointmentDetailsLists()
        {
            return (new AppointmentDSL(mapper)).GetDetailsLists();
        }


        public byte[] GenerateReportAsync<T>(string reportName, string dataSourceName, List<T> dataSourceList, Dictionary<string, string> parameters)
        {
            string rdlcFilePath = string.Format("{0}\\Reports\\{1}.rdlc", _hostEnvironment.ContentRootPath, reportName);
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding("windows-1252");
            LocalReport report = new LocalReport(rdlcFilePath);

            report.AddDataSource(dataSourceName, dataSourceList);
            var result = report.Execute(RenderType.Pdf, 1, parameters);
            return result.MainStream;
        }
    }
}
