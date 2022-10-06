using RestSharp.Authenticators;
using RestSharp;

namespace api.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<ServiceResponse<string?>> SendEmail(string to, string subject, string message)
        {
            //create client
            RestClient client = new RestClient(_config.GetSection("EmailConfig:BASE_URL").Value);

            client.Authenticator = new HttpBasicAuthenticator("api",
                                       _config.GetSection("EmailConfig:API_KEY").Value);

            //create request
            var request = new RestRequest();

            request.AddParameter("domain", "sandboxb8179cfd209c41cfb35f83dddfea5ffe.mailgun.org", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "Excited User <mailgun@YOUR_DOMAIN_NAME>");
            request.AddParameter("to", to);
            request.AddParameter("subject", subject);
            request.AddParameter("html", "<html>" + message + "</html>");
            request.Method = Method.Post;

            var response = client.Execute(request);

            if (response.IsSuccessful)
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = true,
                    Message = "EMAIL_SENT_SUCCESSFULLY"
                };
            }
            else
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = false,
                    Message = response.Content
                };
            }
        }
    }
}
