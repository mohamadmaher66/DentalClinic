using AutoMapper;
using DBModels;
using DTOs;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Request;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TreatmentModule
{
    public class TreatmentRepository
    {
        private DbContext entities;
        private DbSet<Treatment> dbset;
        private readonly IMapper _mapper;

        public TreatmentRepository(UnitOfWork UoW, IMapper mapper)
        {
            entities = UoW.DbContext;
            dbset = UoW.DbContext.Set<Treatment>();
            _mapper = mapper;
        }

        public IEnumerable<TreatmentDTO> GetAll(GridSettings gridSettings)
        {
            double.TryParse(gridSettings.SearchText, out double price);
            IEnumerable<Treatment> treatmentList = dbset.Where(x => string.IsNullOrEmpty(gridSettings.SearchText) ? true :
                                                                                    x.Name.Contains(gridSettings.SearchText));

            gridSettings.RowsCount = treatmentList.Count();
            return _mapper.Map<List<TreatmentDTO>>(treatmentList.OrderByDescending(m => m.CreationDate)
                                     .Skip(gridSettings.PageSize * gridSettings.PageIndex)
                                     .Take(gridSettings.PageSize));
        }
        public IEnumerable<TreatmentDTO> GetAllLite()
        {
            return _mapper.Map<List<TreatmentDTO>>(dbset.OrderBy(m => m.Name));
        }

        public TreatmentDTO GetById(int treatmentId)
        {
            return _mapper.Map<TreatmentDTO>(entities.Set<Treatment>().AsNoTracking().FirstOrDefault(c => c.Id == treatmentId));
        }

        public void Add(TreatmentDTO treatment, int treatmentId)
        {
            Treatment model = _mapper.Map<Treatment>(treatment);
            model.CreationDate = DateTime.Now;
            model.CreatedBy = treatmentId;
            dbset.Add(model);
        }

        public void Update(TreatmentDTO treatment, int treatmentId)
        {
            Treatment model = _mapper.Map<Treatment>(treatment);
            model.ModifiedDate = DateTime.Now;
            model.ModifiedBy = treatmentId;

            entities.Entry(model).State = EntityState.Modified;
            entities.Entry(model).Property(m => m.CreatedBy).IsModified = false;
            entities.Entry(model).Property(m => m.CreationDate).IsModified = false;
        }
        public void Delete(TreatmentDTO treatment)
        {
            dbset.Remove(_mapper.Map<Treatment>(treatment));
        }
    }
}
