namespace ProjectAPI.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string Username { get; set; }
        public string Contaier { get; set; } = "Unread";
    }
}