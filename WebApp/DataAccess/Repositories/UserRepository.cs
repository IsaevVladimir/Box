using DataAccess.Components;
using DataAccess.DataModels;
using DataAccess.Entity;

namespace DataAccess.Repositories
{
    public class UserRepository : CrudRepository<User, UserDm, CustomDbContext>
    {
        public UserRepository(CustomDbContext context) : base(context)
        {
        }
    }
}