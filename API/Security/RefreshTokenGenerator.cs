using System;
using System.Security.Cryptography;

namespace API.Security
{
    public class RefreshTokenGenerator
    {
        public static string GenerateRefreshToken(int size = 32)
        {
            var randomNumber = new byte[size];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}