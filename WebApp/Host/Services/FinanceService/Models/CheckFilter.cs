using System;
using System.Collections.Generic;

namespace WebApp.Host.Services.FinanceService.Models
{
    public class CheckFilter
    {
        public List<int> Categories { get; set; }
        
        public DateTime FromDt { get; set; }
        
        public DateTime ToDt { get; set; }

        public double MinPrice { get; set; }
        
        public double MaxPrice { get; set; }
    }
}