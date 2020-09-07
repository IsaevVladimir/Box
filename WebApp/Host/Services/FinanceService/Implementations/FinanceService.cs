using WebApp.DataAccess.Repositories;

namespace WebApp.Host.Services.FinanceService.Implementations
{
    public partial class FinanceService : IFinanceService
    {
        private readonly CheckRepository _checkRepository;
        private readonly CheckCategoryRepository _checkCategoryRepository;
        
        public FinanceService(CheckRepository checkRepository, CheckCategoryRepository checkCategoryRepository)
        {
            _checkRepository = checkRepository;
            _checkCategoryRepository = checkCategoryRepository;
        }
    }
}