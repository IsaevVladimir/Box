using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApp.Host.Services.FinanceService;
using WebApp.Host.Services.FinanceService.Models;

namespace WebApp.Host.Controllers.Finance
{
    [Route("api/[controller]")]
    public class CheckCategoryController : Controller
    {
        private readonly IFinanceService _financeService;
        public CheckCategoryController(IFinanceService financeService)
        {
            _financeService = financeService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<CheckCategoryDto>>> Get()
        {
            return await _financeService.GetCheckCategories(0);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<CheckCategoryDto>> Get(int id)
        {
            return await _financeService.GetCheckCategory(0, id);
        }
        
        [HttpPost]
        public async Task<ActionResult<CheckCategoryDto>> Post(CheckCategoryDto category)
        {
            return await _financeService.AddCheckCategory(0, category);
        }
        
        [HttpPatch]
        public async Task<ActionResult<CheckCategoryDto>> Patch(CheckCategoryDto category)
        {
            return await _financeService.UpdateCheckCategory(0, category);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _financeService.RemoveCheckCategory(0, id);
        }
    }
}