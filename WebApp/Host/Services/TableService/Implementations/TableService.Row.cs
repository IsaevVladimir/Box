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
                .Select(ConvertToDto)
                .ToList();
        }
        public async Task<RowDto> GetRow(int userId, int rowId)
        {
            var rowDm = await _tableRowRepository.Get(rowId);
            if (rowDm is null)
                return null;

            return ConvertToDto(rowDm);
        }
        public async Task<RowDto> AddRow(int userId, RowDto row)
        {
            var dataModel = ConvertToDm(row);;
            var addedDataModel = await _tableRowRepository.Add(dataModel);
            if (addedDataModel is null)
                return null;

            return ConvertToDto(addedDataModel);
        }
        public async Task<RowDto> UpdateRow(int userId, RowDto row)
        {
            var dataModel = ConvertToDm(row);;
            var updatedDataModel = await _tableRowRepository.Update(dataModel);
            if (updatedDataModel is null)
                return null;

            return ConvertToDto(updatedDataModel);
        }
        public async Task<bool> RemoveRow(int userId, int id)
        {
            return await _tableRowRepository.Delete(id);
        }
        
        public async Task<List<RowDto>> UpdateRows(int userId, List<RowDto> rows)
        {
            var dataModels = rows.Select(ConvertToDm);
                
            var updatedDataModels = new List<TableRowDm>();
            foreach (var row in dataModels)
            {
                updatedDataModels.Add(await _tableRowRepository.Update(row));
            }

            return updatedDataModels.Select(ConvertToDto).ToList();
        }

        
        private RowDto ConvertToDto(TableRowDm rowDm)
        {
            return ServiceMapper.Mapper.Map<RowDto>(rowDm);
        }
        private TableRowDm ConvertToDm(RowDto rowDm)
        {
            return ServiceMapper.Mapper.Map<TableRowDm>(rowDm);
        }
    }
}