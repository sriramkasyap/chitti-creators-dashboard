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
      data: null,
    },
  };
};
