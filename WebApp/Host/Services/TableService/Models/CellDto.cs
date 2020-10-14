namespace WebApp.Host.Services.TableService.Models
{
    public class CellDto
    {
        public int Id { get; set; }
        public int RowId { get; set; }
        public int Number { get; set; }
        public string Value { get; set; }
        
        public int? ActiveUserId { get; set; }
    }
}