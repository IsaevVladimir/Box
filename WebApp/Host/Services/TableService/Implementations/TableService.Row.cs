using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Repositories;
using WebApp.Host.Services.TableService.Models;

namespace WebApp.Host.Services.TableService.Implementations
{
    public partial class TableService : ITableService
    {
        private readonly TableCellRepository _tableCellRepository;
        private readonly TableRowRepository _tableRowRepository;
        public TableService(TableCellRepository tableCellRepository, TableRowRepository tableRowRepository)
        {
            _tableCellRepository = tableCellRepository;
            _tableRowRepository = tableRowRepository;
        }
        
        public async Task<List<RowDto>> GetRowList(int userId)
        {
            var allRows = await _tableRowRepository.GetAll();
            return allRows
                .Select(cellDm => ServiceMapper.Mapper.Map<RowDto>(cellDm))
                .ToList();
        }
        public async Task<RowDto> GetRow(int userId, int rowId)
        {
            var rowDm = await _tableRowRepository.Get(rowId);
            if (rowDm is null)
                return null;

            return ServiceMapper.Mapper.Map<RowDto>(rowDm);
        }
        public async Task<RowDto> AddRow(int userId, RowDto row)
        {
            var dataModel = ServiceMapper.Mapper.Map<TableRowDm>(row);;
            var addedDataModel = await _tableRowRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<RowDto>(addedDataModel);
        }
        public async Task<RowDto> UpdateRow(int userId, RowDto row)
        {
            var dataModel = ServiceMapper.Mapper.Map<TableRowDm>(row);;
            var updatedDataModel = await _tableRowRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ServiceMapper.Mapper.Map<RowDto>(updatedDataModel);
        }
        public async Task<bool> RemoveRow(int userId, int id)
        {
            return await _tableRowRepository.Delete(id);
        }
    }
}