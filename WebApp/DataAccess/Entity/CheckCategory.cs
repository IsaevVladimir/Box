namespace DataAccess.Entity
{
    public class CheckCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }
    }
}