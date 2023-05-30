using ProjectAPI.DTO;
using ProjectAPI.Helpers;
using ProjectAPI.Models;

namespace ProjectAPI.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserId, string recipientId);
        Task<bool> SaveAllAsync();
    }
}