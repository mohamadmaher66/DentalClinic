using AutoMapper;
using DBContext;
using DTOs;
using Infrastructure;
using Request;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TreatmentModule
{
    public class TreatmentDSL
    {
        TreatmentRepository treatmentRepository;
        UnitOfWork UoW;

        public TreatmentDSL(IMapper _mapper)
        {
            UoW = new UnitOfWork(new DentalClinicDBContext());
            treatmentRepository = new TreatmentRepository(UoW, _mapper);
        }

        public List<TreatmentDTO> GetAll(GridSettings gridSettings)
        {
            try
            {
                return treatmentRepository.GetAll(gridSettings).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<TreatmentDTO> GetAllLite()
        {
            try
            {
                return treatmentRepository.GetAllLite().ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public TreatmentDTO GetById(int treatmentId)
        {
            try
            {
                return treatmentRepository.GetById(treatmentId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Add(TreatmentDTO treatment, int treatmentId)
        {
            try
            {
                treatmentRepository.Add(treatment, treatmentId);
                UoW.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(TreatmentDTO treatment, int treatmentId)
        {
            try
            {
                treatmentRepository.Update(treatment, treatmentId);
                UoW.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<TreatmentDTO> Delete(TreatmentDTO treatment, GridSettings gridSettings)
        {
            try
            {
                treatmentRepository.Delete(treatment);
                UoW.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            return GetAll(gridSettings);
        }
    }
}
