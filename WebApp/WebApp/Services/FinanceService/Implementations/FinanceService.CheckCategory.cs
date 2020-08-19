using System.Collections.Generic;
using System.Linq;
using DataAccess.DataModels;
using DataAccess.Interfaces;
using WebApp.Services.FinanceService.Models;

namespace WebApp.Services.FinanceService.Implementations
{
    public partial class FinanceService : IFinanceService
    {
        private readonly ICheckCategoryRepository _checkCategoryRepository;
        public FinanceService(ICheckCategoryRepository checkCategoryRepository)
        {
            _checkCategoryRepository = checkCategoryRepository;
        }
        
        public CheckCategoryDto GetCheckCategory(int userId, int checkCategoryId)
        {
            var dataModel = _checkCategoryRepository.Get(checkCategoryId);
            if (dataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckCategoryDto>(dataModel);
        }

        public CheckCategoryDto AddCheckCategory(int userId, CheckCategoryDto checkCategory)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckCategoryDm>(checkCategory);;
            var addedDataModel = _checkCategoryRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckCategoryDto>(dataModel);
        }

        public CheckCategoryDto UpdateCheckCategory(int userId, CheckCategoryDto checkCategory)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckCategoryDm>(checkCategory);;
            var updatedDataModel = _checkCategoryRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckCategoryDto>(dataModel);
        }

        public bool RemoveCheckCategory(int userId, int checkCategoryId)
        {
            return _checkCategoryRepository.Remove(checkCategoryId);
        }
        
        public IEnumerable<CheckCategoryDto> GetCheckCategories(int userId)
        {
            return _checkCategoryRepository.Get().Select(x => ServiceMapper.Mapper.Map<CheckCategoryDto>(x));
        }
    }
}