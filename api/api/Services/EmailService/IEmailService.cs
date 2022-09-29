namespace api.Services.EmailService
{
    public interface IEmailService
    {
        Task<ServiceResponse<string?>> SendEmail(string to, string subject, string message);    
    }
}
