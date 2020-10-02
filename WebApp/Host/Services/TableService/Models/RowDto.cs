namespace WebApp.Host.Services.TableService.Models
{
    public class RowDto
    {
        public int Id { get; set; }
        
        /// <summary>
        /// Имеются не пустые ячейки, т.к. пустые ячейки не будут храниться
        /// </summary>
        public bool HasCell { get; set; }
    }
}