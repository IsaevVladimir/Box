using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DataAccess.DataModels;
using WebApp.Host.Services.TableService.Models;

namespace WebApp.Host.Services.TableService.Implementations
{
    public partial class TableService : ITableService
    {
        // <ячейка,пользователь> - словарь ячеек в фокусе у пользователей
        private static Dictionary<int, int> _cellDisabledByUserDict = new Dictionary<int, int>();

        public async Task<List<CellDto>> GetCellList(int userId, int rowId)
        {
            var allCells = await _tableCellRepository.GetAll();
            return allCells
                .Where(x => x.RowId == rowId)
                .Select(cellDm => ConvertToDto(cellDm, userId))
                .ToList();
        }
        public async Task<CellDto> GetCell(int userId, int rowId, int id)
        {
            var cellDm = await _tableCellRepository.Get(id);
            if (cellDm is null)
                return null;

            return ConvertToDto(cellDm, userId);
        }
        public async Task<CellDto> AddCell(int userId, CellDto cell)
        {
            var dataModel = ServiceMapper.Mapper.Map<TableCellDm>(cell);;
            var addedDataModel = await _tableCellRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ConvertToDto(addedDataModel, userId);
        }
        public async Task<CellDto> UpdateCell(int userId, CellDto cell)
        {
            var dataModel = ServiceMapper.Mapper.Map<TableCellDm>(cell);;
            var updatedDataModel = await _tableCellRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ConvertToDto(updatedDataModel, userId);
        }
        public async Task<bool> RemoveCell(int userId, int id)
        {
            return await _tableCellRepository.Delete(id);
        }
        
        public bool DisableCell(int userId, int cellId)
        {
            if (_cellDisabledByUserDict.ContainsKey(cellId))
            {
                // если уже заблокирована текущем пользователем
                return _cellDisabledByUserDict[cellId] == userId;
            }
            
            return _cellDisabledByUserDict.TryAdd(cellId, userId);
        }
        public bool EnableCell(int userId, int cellId)
        {
            if (!_cellDisabledByUserDict.ContainsKey(cellId))
                return true;

            _cellDisabledByUserDict.Remove(cellId);
            return true;
        }
        
        private CellDto ConvertToDto(TableCellDm cellDm, int userId)
        {
            var dto = ServiceMapper.Mapper.Map<CellDto>(cellDm);
            
            dto.ActiveUserId = _cellDisabledByUserDict.ContainsKey(cellDm.Id)
                ? _cellDisabledByUserDict[cellDm.Id] 
                : default(int?);
            
            return dto;
        }
    }
}