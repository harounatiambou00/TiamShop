namespace api.Services.EmailService
{
    public class EmailService : IEmailService
    {
        public Task<ServiceResponse<string?>> SendEmail(string to, string subject, string message)
        {
            throw new NotImplementedException();
        }
    }
}
