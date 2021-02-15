using DBModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace DBContext
{
    public class DentalClinicDBContext : DbContext
    {
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<AppointmentAddition> AppointmentAddition { get; set; }
        public DbSet<AppointmentCategory> AppointmentCategory { get; set; }
        public DbSet<Attachment> Attachment { get; set; }
        public DbSet<MedicalHistory> MedicalHistory { get; set; }
        public DbSet<Patient> Patient { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Expense> Expense { get; set; }
        public DbSet<AppointmentTooth> AppointmentTooth { get; set; }
        public DbSet<Clinic> Clinic { get; set; }


        private static string _connectionString;
        private static string ConnectionString
        {
            get
            {
                if (string.IsNullOrEmpty(_connectionString))
                {
                    var config = new ConfigurationBuilder()
                        .AddJsonFile(Path.Combine(Environment.CurrentDirectory, "appsettings.json"))
                        .Build();
                    _connectionString = config.GetSection("ConnectionStrings")["DBConnectionString"];
                    _connectionString = _connectionString.Replace("[DataDirectory]", Directory.GetCurrentDirectory());
                }
                return _connectionString;
            }
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }
}
