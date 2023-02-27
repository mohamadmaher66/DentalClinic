namespace DBModels
{
    public class AppointmentTreatment
    {
        public int AppointmentId { get; set; }
        public Appointment Appointment { get; set; }
        public int TreatmentId { get; set; }
        public Treatment Treatment { get; set; }
    }
}
