using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DataAccess.DataModels;
using WebApp.Host.Services.FinanceService.Models;

namespace WebApp.Host.Services.FinanceService.Implementations
{
    public partial class FinanceService : IFinanceService
    {
        private async void FillData()
        {
            var category1 = await _checkCategoryRepository.Add(new CheckCategoryDm
            {
                Name = "Category1",
                Description = "Description 1",
                ParentId = null
            });

            var category2 = await _checkCategoryRepository.Add(new CheckCategoryDm
            {
                Name = "Category2",
                Description = "Description 2",
                ParentId = category1.Id
            });

            var category3 = await _checkCategoryRepository.Add(new CheckCategoryDm
            {
                Name = "Category3",
                Description = "Description 3",
                ParentId = category1.Id
            });

            var category4 = await _checkCategoryRepository.Add(new CheckCategoryDm
            {
                Name = "Category4",
                Description = "Description 4",
                ParentId = category2.Id
            });


            var check1 = await _checkRepository.Add(new CheckDm
            {
                Name = "Check 1",
                Description = "Description 1",
                PayDt = DateTime.Now,
                CategoryId = category1.Id,
                Price = 100
            });
            
            var check2 = await _checkRepository.Add(new CheckDm
            {
                Name = "Check 2",
                Description = "Description 2",
                PayDt = DateTime.Now.AddDays(-13),
                CategoryId = category1.Id,
                Price = 150
            });
            
            var check3 = await _checkRepository.Add(new CheckDm
            {
                Name = "Check 3",
                Description = "Description 3",
                PayDt = DateTime.Now.AddDays(-5),
                CategoryId = category4.Id,
                Price = 70
            });
            
            var check4 = await _checkRepository.Add(new CheckDm
            {
                Name = "Check 4",
                Description = "Description 4",
                PayDt = DateTime.Now.AddDays(-2),
                CategoryId = category2.Id,
                Price = 10
            });
            
            var check5 = await _checkRepository.Add(new CheckDm
            {
                Name = "Check 5",
                Description = "Description 5",
                PayDt = DateTime.Now.AddDays(-3),
                CategoryId = category3.Id,
                Price = 200
            });
            
            var check6 = await _checkRepository.Add(new CheckDm
            {
                Name = "Check 6",
                Description = "Description 6",
                PayDt = DateTime.Today,
                CategoryId = category3.Id,
                Price = 150
            });
        }
        
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