using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DataAccess.DataModels;
using WebApp.Host.Services.FinanceService.Models;

namespace WebApp.Host.Services.FinanceService.Implementations
{
    public partial class FinanceService : IFinanceService
    {
        public async Task<List<CheckDto>> GetChecks(int userId)
        {
            var checks = await _checkRepository.GetAll();
            return checks?.Select(x => ServiceMapper.Mapper.Map<CheckDto>(x)).ToList();
        }
        
        public async Task<CheckDto> GetCheck(int userId, int checkId)
        {
            var dataModel = await _checkRepository.Get(checkId);
            return ServiceMapper.Mapper.Map<CheckDto>(dataModel);
        }
        
        public async Task<List<CheckDto>> GetChecks(int userId, CheckFilter filter)
        {
            var checks = (await _checkRepository.GetAll());
            checks = checks.Where(x => 
                x.Price >= filter.MinPrice && x.Price <= filter.MaxPrice &&
                x.PayDt >= filter.FromDt && x.PayDt <= filter.ToDt).ToList();
                

            if (filter.Categories != null && filter.Categories.Any())
            {
                checks = checks.Where(x => x.CategoryId.HasValue && filter.Categories.Contains(x.CategoryId.Value)).ToList();
            }
            
            return checks.Select(x => ServiceMapper.Mapper.Map<CheckDto>(x)).ToList();
        }

        public async Task<CheckDto> AddCheck(int userId, CheckDto check)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckDm>(check);;
            var addedDataModel = await _checkRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckDto>(dataModel);
        }

        public async Task<CheckDto> UpdateCheck(int userId, CheckDto check)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckDm>(check);;
            var updatedDataModel = await _checkRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckDto>(dataModel);
        }

        public async Task<bool> RemoveCheck(int userId, int checkId)
        {
            return await _checkRepository.Delete(checkId);
        }
    }
}