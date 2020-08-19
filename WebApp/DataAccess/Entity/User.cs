using System.Collections.Generic;

namespace DataAccess.Entity
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        
        public IEnumerable<UserSection> UserSections { get; set; }
    }
}