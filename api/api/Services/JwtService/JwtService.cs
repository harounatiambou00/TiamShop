using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
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

        public string GenerateToken(int id, bool remenberMe)
            {
                var symetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey));
                var credentials = new SigningCredentials(symetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
                var header = new JwtHeader(credentials);

                var payLoad = new JwtPayload(id.ToString(), null, null, null, remenberMe ? DateTime.Now.AddDays(365) : DateTime.Now.AddDays(1));

                var token = new JwtSecurityToken(header, payLoad);

                //This will parse the token to string and return it.
                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            public JwtSecurityToken Verify(string jwtString)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secureKey);

                SecurityToken validatedToken;
                IPrincipal principal = tokenHandler.ValidateToken(jwtString, new TokenValidationParameters()
                {
                    ValidateLifetime = false,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                }, out validatedToken);

                return (JwtSecurityToken)validatedToken;
            }
        }
    }
