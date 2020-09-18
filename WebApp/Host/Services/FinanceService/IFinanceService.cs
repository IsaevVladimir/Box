using System.Collections.Generic;
using System.Threading.Tasks;
using WebApp.Host.Services.FinanceService.Models;

namespace WebApp.Host.Services.FinanceService
{
    public interface IFinanceService
    {
        public Task<List<CheckDto>> GetChecks(int userId);
        public Task<CheckDto> GetCheck(int userId, int checkId);
        public Task<List<CheckDto>> GetChecks(int userId, CheckFilter filter);
        public Task<CheckDto> AddCheck(int userId, CheckDto check);
        public Task<CheckDto> UpdateCheck(int userId, CheckDto check);
        public Task<bool> RemoveCheck(int userId, int checkId);

        
        public Task<List<CheckCategoryDto>> GetCheckCategories(int userId);
        public Task<CheckCategoryDto> GetCheckCategory(int userId, int checkCategoryId);
        public Task<CheckCategoryDto> AddCheckCategory(int userId, CheckCategoryDto checkCategory);
        public Task<CheckCategoryDto> UpdateCheckCategory(int userId, CheckCategoryDto checkCategory);
        public Task<bool> RemoveCheckCategory(int userId, int checkCategoryId);
    }
}