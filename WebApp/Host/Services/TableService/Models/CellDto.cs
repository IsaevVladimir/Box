namespace WebApp.Host.Services.TableService.Models
{
    public class CellDto
    {
        public int Id { get; set; }
        public int RowId { get; set; }
        public string Value { get; set; }
        
        /// <summary>
        /// Блокируется, в случае если другой пользователь начал её редактирование
        /// </summary>
        public bool Disabled { get; set; }
    }
}