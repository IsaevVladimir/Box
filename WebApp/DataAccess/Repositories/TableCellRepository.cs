using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Entity;
using WebApp.DataAccess.Repositories.Base;

namespace WebApp.DataAccess.Repositories
{
    public class TableCellRepository : CrudRepository<TableCell, TableCellDm, CustomDbContext>
    {
        public TableCellRepository(CustomDbContext context) : base(context)
        {
        }
    }
}