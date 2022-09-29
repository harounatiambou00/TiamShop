using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace api.Services.JwtService
{
    public class JwtService : IJwtService
    {
        public string GenerateToken(int id, bool remenberMe)
        {
            throw new NotImplementedException();
        }

        public JwtSecurityToken Verify(string jwtString)
        {
            throw new NotImplementedException();
        }
    }
}
