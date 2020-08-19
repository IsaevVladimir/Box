using DataAccess.Components;
using DataAccess.DataModels;
using DataAccess.Entity;

namespace DataAccess.Repositories
{
    public class CheckCategoryRepository : CrudRepository<CheckCategory, CheckCategoryDm, CustomDbContext>
    {
        public CheckCategoryRepository(CustomDbContext context) : base(context)
        {
        }
    }
}