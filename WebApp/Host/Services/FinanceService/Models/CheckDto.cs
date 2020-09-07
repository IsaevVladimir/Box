using System;

namespace WebApp.Host.Services.FinanceService.Models
{
    public class CheckDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime PayDt { get; set; }
        public double Price { get; set; }
        public int? CategoryId { get; set; }
    }
}