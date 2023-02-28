using AutoMapper;
using DTOs;
using Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Request;
using TreatmentModule;

namespace DentalClinicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TreatmentController : ControllerBase
    {
        private readonly TreatmentDSL treatmentDSL;

        public TreatmentController(IMapper _mapper)
        {
            treatmentDSL = new TreatmentDSL(_mapper);
        }

        [HttpPost]
        [Route("GetAllTreatments")]
        public IActionResult GetTreatments([FromBody] RequestedData<TreatmentDTO> requestedData)
        {
            requestedData.EntityList = treatmentDSL.GetAll(requestedData.GridSettings);
            return Ok(requestedData);
        }

        [HttpPost]
        [Route("GetAllTreatmentLite")]
        public IActionResult GetAllTreatmentLite([FromBody] RequestedData<TreatmentDTO> requestedData)
        {
            requestedData.EntityList = treatmentDSL.GetAllLite();
            return Ok(requestedData);
        }

        [HttpPost]
        [Route("GetTreatment")]
        public IActionResult GetTreatment([FromBody] RequestedData<TreatmentDTO> requestedData)
        {
            requestedData.Entity = treatmentDSL.GetById(requestedData.Entity.Id);
            return Ok(requestedData);
        }

        [HttpPost]
        [Route("AddTreatment")]
        public IActionResult AddTreatment([FromBody] RequestedData<TreatmentDTO> requestedData)
        {
            treatmentDSL.Add(requestedData.Entity, requestedData.UserId);
            requestedData.Alerts.Add(new Alert { Title = "تم بنجاح", Type = AlertTypeEnum.Success, Message = "تم الاضافة بنجاح" });
            return Ok(requestedData);
        }

        [HttpPost]
        [Route("EditTreatment")]
        public IActionResult EditTreatment([FromBody] RequestedData<TreatmentDTO> requestedData)
        {
            treatmentDSL.Update(requestedData.Entity, requestedData.UserId);
            requestedData.Alerts.Add(new Alert { Title = "تم بنجاح", Type = AlertTypeEnum.Success, Message = "تم التعديل بنجاح" });
            return Ok(requestedData);
        }

        [HttpPost]
        [Route("DeleteTreatment")]
        public IActionResult DeleteTreatment([FromBody] RequestedData<TreatmentDTO> requestedData)
        {
            requestedData.EntityList = treatmentDSL.Delete(requestedData.Entity, requestedData.GridSettings);
            requestedData.Alerts.Add(new Alert { Title = "تم بنجاح", Type = AlertTypeEnum.Success, Message = "تم الحذف بنجاح" });
            return Ok(requestedData);
        }
    }
}
