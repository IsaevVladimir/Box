using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Entity;
using WebApp.DataAccess.Repositories.Base;

namespace WebApp.DataAccess.Repositories
{
    public class CheckCategoryRepository : CrudRepository<CheckCategory, CheckCategoryDm, CustomDbContext>
    {
        public CheckCategoryRepository(CustomDbContext context) : base(context)
        {
        }
    }
}