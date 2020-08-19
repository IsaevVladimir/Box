using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.DataModels;
using DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Components
{
    public abstract class CrudRepository<TEntity, TDataModel, TContext> : IRepository<TEntity, TDataModel>
        where TEntity : BaseEntity
        where TDataModel : BaseDataModel
        where TContext : CustomDbContext
    {
        private readonly TContext _context;
        protected CrudRepository(TContext context)
        {
            this._context = context;
        }
        
        public async Task<TDataModel> Get(int id)
        {
            var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
                return null;

            return DataAccessMapper.Mapper.Map<TDataModel>(entity);
        }
        
        public async Task<List<TDataModel>> GetAll()
        {
            return await _context.Set<TEntity>().Select(x => DataAccessMapper.Mapper.Map<TDataModel>(x)).ToListAsync();
        }
        
        public async Task<TDataModel> Add(TDataModel dataModel)
        {
            var entity = DataAccessMapper.Mapper.Map<TEntity>(dataModel);
            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();
            return DataAccessMapper.Mapper.Map<TDataModel>(entity);
        }
        
        public async Task<TDataModel> Update(TDataModel dataModel)
        {
            var entity = DataAccessMapper.Mapper.Map<TEntity>(dataModel);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return DataAccessMapper.Mapper.Map<TDataModel>(entity);
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
                return false;

            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}