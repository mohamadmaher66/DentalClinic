using Infrastructure;
using System;
using System.Linq;
using DBContext;
using DTOs;
using System.Collections.Generic;
using AutoMapper;
using Request;
using Enums;
using MedicalHistoryModule;
using ClinicModule;
using PatientModule;
using UserModule;
using AppointmentCategoryModule;
using AppointmentAdditionModule;

namespace AppointmentModule
{
    public class AppointmentDSL
    {
        AppointmentRepository appointmentRepository;
        UnitOfWork UoW;
        IMapper mapper;

        public AppointmentDSL(IMapper _mapper)
        {
            UoW = new UnitOfWork(new DentalClinicDBContext());
            appointmentRepository = new AppointmentRepository(UoW, _mapper);
            mapper = _mapper;
        }

        public List<AppointmentDTO> GetAll(GridSettings gridSettings)
        {
            try
            {
                return appointmentRepository.GetAll(gridSettings).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public AppointmentDTO GetById(int appointmentId)
        {
            try
            {
                return appointmentRepository.GetById(appointmentId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<AppointmentDTO> GetAllLite()
        {
            try
            {
                return appointmentRepository.GetAllLite().ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Add(AppointmentDTO appointment, int userId)
        {
            try
            {
                appointment.State = AppointmentStateEnum.Pending;
                appointment.Id = appointmentRepository.Add(appointment, userId);
                UoW.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(AppointmentDTO appointment, int userId)
        {
            try
            {
                appointmentRepository.Update(appointment, userId);
                UoW.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<AppointmentDTO> Delete(AppointmentDTO appointment, GridSettings gridSettings)
        {
            try
            {
                appointmentRepository.Delete(appointment);
                UoW.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            return GetAll(gridSettings);
        }

        public List<DetailsList> GetDetailsLists()
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

                List<PatientDTO> patientList = new PatientDSL(mapper).GetAllLite();
                detailsList.Add(new DetailsList()
                {
                    DetailsListId = (int)DetailsListEnum.Patient,
                    List = patientList
                });

                List<UserDTO> userList = new UserDSL(mapper).GetAllDoctorsLite();
                detailsList.Add(new DetailsList()
                {
                    DetailsListId = (int)DetailsListEnum.User,
                    List = userList
                });

                List<AppointmentCategoryDTO> catList = new AppointmentCategoryDSL(mapper).GetAllLite();
                detailsList.Add(new DetailsList()
                {
                    DetailsListId = (int)DetailsListEnum.AppointmentCategory,
                    List = catList
                });

                List<AppointmentAdditionDTO> additionList = new AppointmentAdditionDSL(mapper).GetAllLite();
                detailsList.Add(new DetailsList()
                {
                    DetailsListId = (int)DetailsListEnum.AppointmentAddition,
                    List = additionList
                });

                return detailsList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
