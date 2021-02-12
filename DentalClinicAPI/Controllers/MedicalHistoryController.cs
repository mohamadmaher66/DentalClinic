using Microsoft.AspNetCore.Mvc;

namespace DentalClinicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalHistoryController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "API Medical History is working :D";
        }
    }
}