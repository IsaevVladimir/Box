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


        public async Task<List<CellDto>> GetCellList(int rowId = 0)
        {
            return await _tableService.GetCellList(1, rowId);
        }
        public async Task AddCell(CellDto cell)
        {
            var addedCell = await _tableService.AddCell(1, cell);
            if (addedCell is null)
                return;
            await Clients.All.SendAsync("AddCell", addedCell);
        }
        public async Task UpdateCell(CellDto cell)
        {
            var updatedCell = await _tableService.UpdateCell(1, cell);
            if (updatedCell is null)
                return;
            await Clients.All.SendAsync("UpdateCell", updatedCell);
        }
        public async Task RemoveCell(int id)
        {
            var removeSuccess = await _tableService.RemoveCell(1, id);
            if (removeSuccess)
                return;
            await Clients.All.SendAsync("RemoveCell", id);
        }
    }
}