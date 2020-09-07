using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Entity;
using WebApp.DataAccess.Repositories.Base;

namespace WebApp.DataAccess.Repositories
{
    public class UserRepository : CrudRepository<User, UserDm, CustomDbContext>
    {
        public UserRepository(CustomDbContext context) : base(context)
        {
        }
    }
}