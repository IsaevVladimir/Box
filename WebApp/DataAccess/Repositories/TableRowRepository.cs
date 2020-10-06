using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Entity;
using WebApp.DataAccess.Repositories.Base;

namespace WebApp.DataAccess.Repositories
{
    public class TableRowRepository: CrudRepository<TableRow, TableRowDm, CustomDbContext>
    {
        public TableRowRepository(CustomDbContext context) : base(context)
        {
        }
    }
}