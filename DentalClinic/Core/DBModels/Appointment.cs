using Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DBModels
{
    public class Appointment : AuditModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public int PatientId { get; set; }
        public int ClinicId { get; set; }
        public DateTime Date { get; set; }
        public float TotalPrice { get; set; }
        public float DiscountPercentage { get; set; }
        public float PaidAmount { get; set; }
        public AppointmentStateEnum State { get; set; }
        public string Notes { get; set; }
    }
}
