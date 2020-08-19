using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services.FinanceService;
using WebApp.Services.FinanceService.Models;

namespace WebApp.Controllers.Finance
{
    public class CheckCategoryController : Controller
    {
        private readonly IFinanceService _financeService;
        public CheckCategoryController(IFinanceService financeService)
        {
            _financeService = financeService;
        }
        
        [HttpGet]
        public ActionResult<List<CheckCategoryDto>> Get()
        {
            return _financeService.GetCheckCategories(0).ToList();
        }
        
        [HttpGet("{id}")]
        public ActionResult<CheckCategoryDto> Get(int id)
        {
            return _financeService.GetCheckCategory(0, id);
        }
        
        [HttpPost]
        public ActionResult<CheckCategoryDto> Post(CheckCategoryDto category)
        {
            return _financeService.AddCheckCategory(0, category);
        }
        
        [HttpPatch]
        public ActionResult<CheckCategoryDto> Patch(CheckCategoryDto category)
        {
            return _financeService.UpdateCheckCategory(0, category);
        }
        
        [HttpDelete("{id}")]
        public ActionResult<CheckCategoryDto> Delete(int id)
        {
            return _financeService.RemoveCheckCategory(0, id);
        }
    }
}