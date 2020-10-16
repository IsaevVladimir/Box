using System.Collections.Generic;
using System.Threading.Tasks;
using WebApp.Host.Services.TableService.Models;

namespace WebApp.Host.Services.TableService
{
    public interface ITableService
    {
        #region row
        public Task<List<RowDto>> GetRowList(int userId);
        public Task<RowDto> GetRow(int userId, int rowId);
        public Task<RowDto> AddRow(int userId, RowDto row);
        public Task<RowDto> UpdateRow(int userId, RowDto row);
        public Task<bool> RemoveRow(int userId, int id);

        public Task<List<RowDto>> UpdateRows(int userId, List<RowDto> rows);
        #endregion

        #region cell
        public Task<List<CellDto>> GetCellList(int userId, int rowId);
        public Task<CellDto> GetCell(int userId, int rowId, int id);
        public Task<CellDto> AddCell(int userId, CellDto cell);
        public Task<CellDto> UpdateCell(int userId, CellDto cell);
        public Task<bool> RemoveCell(int userId, int id);
        
        public bool DisableCell(int userId, int cellId);
        public bool EnableCell(int userId, int cellId);
        #endregion
    }
}