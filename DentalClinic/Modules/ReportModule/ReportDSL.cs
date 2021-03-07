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

namespace ReportModule
{
    public class ReportDSL
    {
        UnitOfWork UoW;
        IMapper mapper;
        private readonly IHostEnvironment _hostEnvironment;

        public ReportDSL(IMapper _mapper, IHostEnvironment hostEnvironment)
        {
            UoW = new UnitOfWork(new DentalClinicDBContext());
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
