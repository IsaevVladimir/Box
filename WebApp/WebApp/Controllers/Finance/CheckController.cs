using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services.FinanceService;
using WebApp.Services.FinanceService.Models;

namespace WebApp.Controllers.Finance
{
    public class CheckController : Controller
    {
        private readonly IFinanceService _financeService;
        public CheckController(IFinanceService financeService)
        {
            _financeService = financeService;
        }

        [HttpGet]
        public ActionResult<List<CheckDto>> Get()
        {
            return _financeService.GetChecks(0).ToList();
        }
        
        [HttpGet("{id}")]
        public ActionResult<CheckDto> Get(int id)
        {
            return _financeService.GetCheck(0, id);
        }
        
        [HttpPost]
        public ActionResult<CheckDto> Post(CheckDto check)
        {
            return _financeService.AddCheck(0, check);
        }
        
        [HttpPatch]
        public ActionResult<CheckDto> Patch(CheckDto check)
        {
            return _financeService.UpdateCheck(0, check);
        }
        
        [HttpDelete("{id}")]
        public ActionResult<CheckDto> Delete(int id)
        {
            return _financeService.RemoveCheck(0, id);
        }
    }
}