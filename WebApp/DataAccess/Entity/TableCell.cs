namespace WebApp.DataAccess.Entity
{
    public class TableCell : BaseEntity
    {
        public int RowId { get; set; }
        public int Number { get; set; }
        public string Value { get; set; }
    }
}