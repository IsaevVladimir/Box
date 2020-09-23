using System;
using WebApp.Common.enums;

namespace WebApp.DataAccess.Entity
{
    public class Check : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime PayDt { get; set; }
        public double Price { get; set; }
        public CurrencyEnum Currency { get; set; }
        public int? CategoryId { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}