using System;
using WebApp.Common.enums;

namespace WebApp.DataAccess.DataModels
{
    public class CheckDm : BaseDataModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime PayDt { get; set; }
        public CurrencyEnum Currency { get; set; }
        public double Price { get; set; }
        public int? CategoryId { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}