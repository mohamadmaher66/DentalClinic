using Microsoft.AspNetCore.Mvc;

namespace DentalClinicAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "API is working :D";
        }
        [HttpPost]
        [Route("TestPost")]
        public string TestPost()
        {
            return "API is working :D";
        }
    }
}
