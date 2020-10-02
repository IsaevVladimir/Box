using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Repositories;
using WebApp.Host.Services.TableService.Models;

namespace WebApp.Host.Services.TableService
{
    public class TableService : ITableService
    {
        private readonly TableCellRepository _tableRepository;
        public TableService(TableCellRepository tableRepository)
        {
            _tableRepository = tableRepository;
        }
        
        public async Task<List<RowDto>> GetRowList(int userId)
        {
            var allCells = await _tableRepository.GetAll();
            var uniqueRows = allCells.Select(x => x.RowId).Distinct();
            return uniqueRows.Select(x => new RowDto { Id = x, HasCell = true }).ToList();
        }
        public async Task<RowDto> GetRow(int userId, int rowId)
        {
            return new RowDto { Id = rowId, HasCell = true };
        }

        
        public async Task<List<CellDto>> GetCellList(int userId, int rowId)
        {
            var allCells = await _tableRepository.GetAll();
            return allCells
                .Where(x => x.RowId == rowId)
                .Select(cellDm => ServiceMapper.Mapper.Map<CellDto>(cellDm))
                .ToList();
        }
        public async Task<CellDto> GetCell(int userId, int rowId, int id)
        {
            var cellDm = await _tableRepository.Get(id);
            if (cellDm is null)
                return null;

            return ServiceMapper.Mapper.Map<CellDto>(cellDm);
        }
        public async Task<CellDto> AddCell(int userId, CellDto cell)
        {
            var dataModel = ServiceMapper.Mapper.Map<TableCellDm>(cell);;
            var addedDataModel = await _tableRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CellDto>(dataModel);
        }
        public async Task<CellDto> UpdateCell(int userId, CellDto cell)
        {
            var dataModel = ServiceMapper.Mapper.Map<TableCellDm>(cell);;
            var updatedDataModel = await _tableRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<CellDto>(dataModel);
        }
        public async Task<bool> RemoveCell(int userId, int id)
        {
            return await _tableRepository.Delete(id);
        }
    }
}