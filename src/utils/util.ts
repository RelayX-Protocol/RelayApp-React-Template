/**
 * Generates a random alphanumeric string with a length of 4 characters.
 * The string includes uppercase letters, lowercase letters, and digits.
 *
 * @returns {string} A randomly generated 4-character string
 */
const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = ""; //Result string
  const charactersLength = characters.length;
  // Loop 4 times to build a 4-character string
  for (let i = 0; i < 4; i++) {
    //Pick a random character from the character set and append it
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export {generateRandomString}