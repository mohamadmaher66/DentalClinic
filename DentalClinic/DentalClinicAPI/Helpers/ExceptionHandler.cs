using Enums;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Request;
using System.Collections.Generic;

namespace DentalClinicAPI.Helpers
{
    public class ExceptionHandler
    {
        public static async void HandleException(HttpContext context)
        {
            var feature = context.Features.Get<IExceptionHandlerPathFeature>();
            var exception = feature.Error;

            Logger.Log(exception.Message + "\n" + exception.InnerException);

            RequestedData<object> requestedData = new RequestedData<object>
            {
                Alerts = new List<Alert>()
                    {
                        new Alert
                        {
                            Type = AlertTypeEnum.Error,
                            Message = exception.Message,
                            Title = "Error"
                        }
                    }
            };

            var result = JsonConvert.SerializeObject(requestedData, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
            context.Response.ContentType = "application/json";
            context.Response.Headers.Add("access-control-allow-origin", "*");
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync(result);
        }
    }
}
