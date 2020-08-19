using System;
using System.Collections.Generic;
using WebApp.Services.FinanceService.Models;

namespace WebApp.Services.FinanceService
{
    public interface IFinanceService
    {
        public CheckDto GetCheck(int userId, int checkId);
        public CheckDto AddCheck(int userId, CheckDto check);
        public CheckDto UpdateCheck(int userId, CheckDto check);
        public bool RemoveCheck(int userId, int checkId);
        public IEnumerable<CheckDto> GetChecks(int userId);
        public IEnumerable<CheckDto> GetChecksByPredicate(int userId, DateTime? fromDt, DateTime? toDt, int? categoryId);
        
        
        public CheckCategoryDto GetCheckCategory(int userId, int checkCategoryId);
        public CheckCategoryDto AddCheckCategory(int userId, CheckCategoryDto checkCategory);
        public CheckCategoryDto UpdateCheckCategory(int userId, CheckCategoryDto checkCategory);
        public bool RemoveCheckCategory(int userId, int checkCategoryId);
        public IEnumerable<CheckCategoryDto> GetCheckCategories(int userId);
    }
}