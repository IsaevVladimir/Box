using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataModels;
using DataAccess.Entity;

namespace DataAccess.Components
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