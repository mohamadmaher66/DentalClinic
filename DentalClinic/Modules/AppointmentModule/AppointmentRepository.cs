using AutoMapper;
using DTOs;
using Infrastructure;
using DBModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System;
using Request;

namespace AppointmentModule
{
    public class AppointmentRepository
    {
        private DbContext entities;
        private DbSet<Appointment> dbset;
        private readonly IMapper _mapper;

        public AppointmentRepository(UnitOfWork UoW, IMapper mapper)
        {
            entities = UoW.DbContext;
            dbset = UoW.DbContext.Set<Appointment>();
            _mapper = mapper;
        }

        public IEnumerable<AppointmentDTO> GetAll(GridSettings gridSettings)
        {
            //IEnumerable<Appointment> appointmentList = dbset.Where(x => string.IsNullOrEmpty(gridSettings.SearchText) ? true :
            //                        (x.FullName.Contains(gridSettings.SearchText)
            //                        || x.Address.Contains(gridSettings.SearchText)
            //                        || x.Phone.Contains(gridSettings.SearchText)
            //                        ));

            //gridSettings.RowsCount = appointmentList.Count();
            //return _mapper.Map<List<AppointmentDTO>>(appointmentList.OrderByDescending(m => m.CreationDate)
            //                         .Skip(gridSettings.PageSize * gridSettings.PageIndex)
            //                         .Take(gridSettings.PageSize));
            return null;
        }

        public IEnumerable<AppointmentDTO> GetAllLite()
        {
            return _mapper.Map<List<AppointmentDTO>>(dbset.OrderBy(m => m.Id));
        }

        public AppointmentDTO GetById(int appointmentId)
        {
            //return _mapper.Map<AppointmentDTO>(entities.Set<Appointment>()
            //    .Include(PMH => PMH.AppointmentMedicalHistoryList)
            //    .ThenInclude(MH => MH.MedicalHistory)
            //    .AsNoTracking().FirstOrDefault(c => c.Id == appointmentId));
            return null;
        }

        public int Add(AppointmentDTO appointment, int userId)
        {
            Appointment model = _mapper.Map<Appointment>(appointment);
            model.CreationDate = DateTime.Now;
            model.CreatedBy = userId;

            dbset.Add(model);
            entities.SaveChanges();
            return model.Id;
        }

        public void Update(AppointmentDTO appointment, int userId)
        {
            Appointment model = _mapper.Map<Appointment>(appointment);
            model.ModifiedDate = DateTime.Now;
            model.ModifiedBy = userId;

            entities.Entry(model).State = EntityState.Modified;
            entities.Entry(model).Property(m => m.CreatedBy).IsModified = false;
            entities.Entry(model).Property(m => m.CreationDate).IsModified = false;
        }

        public void Delete(AppointmentDTO appointment)
        {
            dbset.Remove(_mapper.Map<Appointment>(appointment));
        }
    }
}
