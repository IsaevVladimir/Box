using System;
using System.Collections.Generic;
using WebApp.Common.enums;

namespace WebApp.Host.Services.FinanceService.Models
{
    public class CheckDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime PayDt { get; set; }
        public double Price { get; set; }
        public CurrencyEnum Currency { get; set; }
        public int? CategoryId { get; set; }
        public List<double> Coordinates { get; set; }
    }
}