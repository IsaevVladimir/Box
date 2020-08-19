using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess.DataModels;
using DataAccess.Interfaces;
using WebApp.Services.FinanceService.Models;

namespace WebApp.Services.FinanceService.Implementations
{
    public partial class FinanceService : IFinanceService
    {
        private readonly ICheckRepository _checkRepository;
        public FinanceService(ICheckRepository checkRepository)
        {
            _checkRepository = checkRepository;
        }
        
        public CheckDto GetCheck(int userId, int checkId)
        {
            var dataModel = _checkRepository.Get(checkId);
            if (dataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckDto>(dataModel);
        }

        public CheckDto AddCheck(int userId, CheckDto check)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckDm>(check);;
            var addedDataModel = _checkRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckDto>(dataModel);
        }

        public CheckDto UpdateCheck(int userId, CheckDto check)
        {
            var dataModel = ServiceMapper.Mapper.Map<CheckDm>(check);;
            var updatedDataModel = _checkRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CheckDto>(dataModel);
        }

        public bool RemoveCheck(int userId, int checkId)
        {
            return _checkRepository.Remove(checkId);
        }

        public IEnumerable<CheckDto> GetChecks(int userId)
        {
            return _checkRepository.Get().Select(x => ServiceMapper.Mapper.Map<CheckDto>(x));
        }

        public IEnumerable<CheckDto> GetChecksByPredicate(int userId, DateTime? fromDt, DateTime? toDt, int? categoryId)
        {
            throw new NotImplementedException();
        }
    }
}