using Microsoft.AspNetCore.Mvc;
using ProjectAPI.Helpers;

namespace ProjectAPI.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        
    }
}