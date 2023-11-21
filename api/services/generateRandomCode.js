const CODE_LENGTH = 6;
const getRandomChar = () => {
  const validChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const randomIndex = Math.floor(Math.random() * validChars.length);
  return validChars.charAt(randomIndex);
};
module.exports = () => {
  const codeLength = CODE_LENGTH;
  const randomChars = Array.from({ length: codeLength }, getRandomChar);
  return randomChars.join('');
};
