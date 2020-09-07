namespace WebApp.Host.Services.FinanceService.Models
{
    public class CheckCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }
    }
}