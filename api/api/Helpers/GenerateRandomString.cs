namespace api.Helpers
{
    public class GenerateRandomString
    {
        /// <summary>
        /// Generates a random alphanumeric string.
        /// </summary>
        /// <param name="length">The desired length of the string</param>
        /// <returns>The string which has been generated</returns>
        public static string Generate(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZazertyuiopqsdfghjklmwxcvbn0123456789";

            var random = new Random();
            var randomString = new string(Enumerable.Repeat(chars, length)
                                                    .Select(s => s[random.Next(s.Length)]).ToArray());
            return randomString;
        }
    }
}
