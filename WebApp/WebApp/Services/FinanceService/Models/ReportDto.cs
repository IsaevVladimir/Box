using System;
using System.Collections.Generic;

namespace WebApp.Services.FinanceService.Models
{
    public class ReportDto
    {
        public DateTime? FromDt { get; set; }
        public DateTime? ToDt { get; set; }
        public int? CategoryId { get; set; }
        
        public IEnumerable<CheckDto> Checks { get; set; }
    }
}