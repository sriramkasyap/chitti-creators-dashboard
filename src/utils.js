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

export const getIronConfig = () => ({
  cookieName: process.env.AUTH_COOKIE_NAME,
  password: process.env.APPLICATION_SECRET,
  cookieOptions: {
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 Days
  },
});

export const checkAuthentication = async ({ req, res }) => {
  if (!(req.session && req.session.get("creator"))) {
    res.setHeader("Location", "/login");
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {
      standardLayout: true,
    },
  };
};

export const serializeObject = function (objct) {
  var str = [];
  for (var i in objct)
    if (objct.hasOwnProperty(i)) {
      str.push(encodeURIComponent(i) + "=" + encodeURIComponent(objct[i]));
    }
  return str.join("&");
};

export const validateURL = (input) => {
  var regex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i" // Ignore case
  );
  return regex.test(input);
};
