using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using WebApp.Host.Services.TableService;
using WebApp.Host.Services.TableService.Models;

namespace WebApp.Host.Hubs
{
    public class TableHub : Hub
    {
        private readonly ITableService _tableService;
        public TableHub(ITableService tableService)
        {
            _tableService = tableService;
        }

        public async Task<List<RowDto>> GetRowList()
        {
            return await _tableService.GetRowList(1);
        }
        public async Task<RowDto> AddRow(RowDto row)
        {
            var addedRow = await _tableService.AddRow(1, row);
            if (addedRow is null)
                return null;
            Clients.Others.SendAsync("AddRow", addedRow);
            return addedRow;
        }
        public async Task<RowDto> UpdateRow(RowDto row)
        {
            var updatedRow = await _tableService.UpdateRow(1, row);
            if (updatedRow is null)
                return null;
            Clients.Others.SendAsync("UpdateRow", updatedRow);
            return updatedRow;
        }
        public async Task<bool> RemoveRow(int id)
        {
            var removeSuccess = await _tableService.RemoveRow(1, id);
            if (!removeSuccess)
                return false;
            Clients.Others.SendAsync("RemoveCell", id);
            return true;
        }
        
        public async Task<List<RowDto>> UpdateRows(List<RowDto> rows)
        {
            var updatedRows = await _tableService.UpdateRows(1, rows);
            if (updatedRows is null)
                return null;
            Clients.Others.SendAsync("UpdateRows", updatedRows);
            return rows;
        }

        
        public async Task<List<CellDto>> GetCellList(int rowId = 0)
        {
            return await _tableService.GetCellList(1, rowId);
        }
        public async Task<CellDto> AddCell(CellDto cell)
        {
            var addedCell = await _tableService.AddCell(1, cell);
            if (addedCell is null)
                return null;
            Clients.Others.SendAsync("AddCell", addedCell);
            return addedCell;
        }
        public async Task<CellDto> UpdateCell(CellDto cell)
        {
            var updatedCell = await _tableService.UpdateCell(1, cell);
            if (updatedCell is null)
                return null;
            Clients.Others.SendAsync("UpdateCell", updatedCell);
            return updatedCell;
        }
        public async Task<bool> RemoveCell(int id)
        {
            var removeSuccess = await _tableService.RemoveCell(1, id);
            if (!removeSuccess)
                return false;
            
            Clients.Others.SendAsync("RemoveCell", id);
            return true;
        }
    }
}