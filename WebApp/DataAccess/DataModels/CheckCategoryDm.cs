namespace DataAccess.DataModels
{
    public class CheckCategoryDm : BaseDataModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }
    }
}