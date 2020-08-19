using System.Collections.Generic;

namespace DataAccess.DataModels
{
    public class UserDm : BaseDataModel
    {
        public string Name { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
    }
}