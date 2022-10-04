using System.IdentityModel.Tokens.Jwt;

namespace api.Services.JwtService
{
    public interface IJwtService
    {
        //This will generate a token based on the id of the user
        string GenerateToken(int id, bool remenberMe);

        //This will verify a string representing a token and will return the token(validatedToken)
        JwtSecurityToken Verify(string jwtString);
    }
}
