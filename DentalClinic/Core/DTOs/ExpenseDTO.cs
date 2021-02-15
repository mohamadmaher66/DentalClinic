using Enums;

namespace DTOs
{
    public class ExpenseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public string Description { get; set; }
        public ExpenseType Type { get; set; }
    }
}
