using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Repositories;
using WebApp.Host.Services.FinanceService.Models;

namespace WebApp.Host.Services.FinanceService.Implementations
{
    public partial class FinanceService : IFinanceService
    {
        public async Task<CheckCategoryDto> GetCheckCategory(int userId, int checkCategoryId)
        {
            var dataModel = await _checkCategoryRepository.Get(checkCategoryId);
            if (dataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckCategoryDto>(dataModel);
        }

        public async Task<CheckCategoryDto> AddCheckCategory(int userId, CheckCategoryDto checkCategory)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckCategoryDm>(checkCategory);
            var addedDataModel = await _checkCategoryRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckCategoryDto>(dataModel);
        }

        public async Task<CheckCategoryDto> UpdateCheckCategory(int userId, CheckCategoryDto checkCategory)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckCategoryDm>(checkCategory);;
            var updatedDataModel = await _checkCategoryRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckCategoryDto>(dataModel);
        }

        public async Task<bool> RemoveCheckCategory(int userId, int checkCategoryId)
        {
            return await _checkCategoryRepository.Delete(checkCategoryId);
        }
        
        public async Task<List<CheckCategoryDto>> GetCheckCategories(int userId)
        {
            var categories = await _checkCategoryRepository.GetAll();
            return categories?.Select(x => ServiceMapper.Mapper.Map<CheckCategoryDto>(x)).ToList();
        }
    }
}