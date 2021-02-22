using AutoMapper;
using DBModels;
using System;
using System.Linq;

namespace DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Appointment, AppointmentDTO>().ReverseMap();
            CreateMap<AppointmentAddition, AppointmentAdditionDTO>().ReverseMap();
            CreateMap<AppointmentCategory, AppointmentCategoryDTO>().ReverseMap();
            CreateMap<Attachment, AttachmentDTO>().ReverseMap();
            CreateMap<Expense, ExpenseDTO>().ReverseMap();
            CreateMap<MedicalHistory, MedicalHistoryDTO>().ReverseMap();
            CreateMap<Patient, PatientDTO>()
                    .ForMember(dto => dto.MedicalHistoryList, PMH => PMH.MapFrom(MH => MH.PatientMedicalHistoryList.Select(cs => cs.MedicalHistory)))
                    .ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<AppointmentTooth, AppointmentToothDTO>().ReverseMap();
            CreateMap<Clinic, ClinicDTO>().ReverseMap();

        }
    }
}
