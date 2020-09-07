﻿using System;

namespace WebApp.DataAccess.DataModels
{
    public class CheckDm : BaseDataModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime PayDt { get; set; }
        public double Price { get; set; }
        public int? CategoryId { get; set; }
    }
}