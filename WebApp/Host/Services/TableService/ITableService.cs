using System.Collections.Generic;
using System.Threading.Tasks;
using WebApp.Host.Services.TableService.Models;

namespace WebApp.Host.Services.TableService
{
    public interface ITableService
    {
        public Task<List<RowDto>> GetRowList(int userId);
        public Task<RowDto> GetRow(int userId, int rowId);
        public Task<RowDto> AddRow(int userId, RowDto row);
        public Task<RowDto> UpdateRow(int userId, RowDto row);
        public Task<bool> RemoveRow(int userId, int id);
        
        /// <summary>
        /// Ленивая построчная подрузка ячеек
        /// </summary>
        public Task<List<CellDto>> GetCellList(int userId, int rowId);
        public Task<CellDto> GetCell(int userId, int rowId, int id);
        public Task<CellDto> AddCell(int userId, CellDto cell);
        public Task<CellDto> UpdateCell(int userId, CellDto cell);
        public Task<bool> RemoveCell(int userId, int id);
    }
}