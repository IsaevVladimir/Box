using BCrypt.Net;

namespace WebApp.Common
{
    public class PasswordHelper
    {
        public static string Encrypt(string value)
        {
            return BCrypt.Net.BCrypt.HashPassword(value, 13, SaltRevision.Revision2Y);
        }

        public static bool Verify(string value, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(value, hash);
        }

    }
}