using Microsoft.AspNetCore.Mvc;
using System;

namespace Module.MedicalHistoryAPI
{
    [ApiController]
    [Route("API/MedicalHistory")]
    public class MedicalHistoryController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "API Medical History is working :D";
        }
    }
}
