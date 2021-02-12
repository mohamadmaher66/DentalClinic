using Enums;
using System;
using System.Collections.Generic;

namespace DTOs
{
    public class AppointmentDTO
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public AppointmentCategoryDTO Category { get; set; }
        public int UserId { get; set; }
        public UserDTO User { get; set; }
        public int PatientId { get; set; }
        public PatientDTO Patient { get; set; }
        public DateTime Date { get; set; }
        public float TotalPrice { get; set; }
        public float DiscountPercentage { get; set; }
        public float PaidAmount { get; set; }
        public AppointmentStateEnum State { get; set; }
        public string Notes { get; set; }
        public List<AttachmentDTO> AttachmentList { get; set; }
        public List<AppointmentToothDTO> ToothList { get; set; }
    }
}
