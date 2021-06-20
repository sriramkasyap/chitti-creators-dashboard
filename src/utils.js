export function ucFirst(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

export function generateRandomString(length = 6, numbers = false) {
  var result = "";
  var characters = numbers
    ? "1234567890"
    : "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
