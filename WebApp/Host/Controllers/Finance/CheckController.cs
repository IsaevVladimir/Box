using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApp.Host.Services.FinanceService;
using WebApp.Host.Services.FinanceService.Models;

namespace WebApp.Host.Controllers.Finance
{
    [Route("api/[controller]")]
    public class CheckController : Controller
    {
        private readonly IFinanceService _financeService;
        public CheckController(IFinanceService financeService)
        {
            _financeService = financeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CheckDto>>> Get()
        {
            return await _financeService.GetChecks(0);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<CheckDto>> Get(int id)
        {
            return await _financeService.GetCheck(0, id);
        }
        
        [HttpPost]
        public async Task<ActionResult<CheckDto>> Post(CheckDto check)
        {
            return await _financeService.AddCheck(0, check);
        }
        
        [HttpPatch]
        public async Task<ActionResult<CheckDto>> Patch(CheckDto check)
        {
            return await _financeService.UpdateCheck(0, check);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _financeService.RemoveCheck(0, id);
        }
    }
}