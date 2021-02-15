using AutoMapper;
using DBModels;

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
            CreateMap<Patient, PatientDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<AppointmentTooth, AppointmentToothDTO>().ReverseMap();
            CreateMap<Clinic, ClinicDTO>().ReverseMap();

        }
    }
}
