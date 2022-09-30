using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Services.JwtService
{
    public class JwtService : IJwtService
    {
        private readonly string _secureKey;
        public JwtService(IConfiguration config)
        {
            _secureKey = config.GetSection("AppSettings:SecureKey").Value;
        }

        public string GenerateToken(int id, string email, bool remenberMe)
        {
            var symetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey));
            var credentials = new SigningCredentials(symetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email)
            };

            var payLoad = new JwtPayload(id.ToString(), null, claims, null, remenberMe == true ? DateTime.Now.AddDays(365) : DateTime.Now.AddHours(1));

            var token = new JwtSecurityToken(header, payLoad);

            //This will parse the token to string and return it.
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public JwtSecurityToken Verify(string jwtString)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secureKey);

            tokenHandler.ValidateToken(jwtString, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
