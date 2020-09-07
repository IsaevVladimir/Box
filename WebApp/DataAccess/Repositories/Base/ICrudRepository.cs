using System.Collections.Generic;
using System.Threading.Tasks;
using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Entity;

namespace WebApp.DataAccess.Repositories.Base
{
    public interface IRepository<TEntity, TDataModel> 
        where TEntity : BaseEntity
        where TDataModel : BaseDataModel
    {
        Task<List<TDataModel>> GetAll();
        Task<TDataModel> Get(int id);
        Task<TDataModel> Add(TDataModel entity);
        Task<TDataModel> Update(TDataModel entity);
        Task<bool> Delete(int id);
    }
}