using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Entity;
using WebApp.DataAccess.Repositories.Base;

namespace WebApp.DataAccess.Repositories
{
    public class CheckRepository : CrudRepository<Check, CheckDm, CustomDbContext>
    {
        public CheckRepository(CustomDbContext context) : base(context)
        {
        }
    }
}