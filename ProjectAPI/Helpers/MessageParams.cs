namespace ProjectAPI.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string UserName { get; set; }
        public string Contaier { get; set; } = "Unread";
    }
}