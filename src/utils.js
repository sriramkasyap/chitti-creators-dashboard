import { createStandaloneToast } from "@chakra-ui/react";
import Notification from "./components/common/Notification/Notification";

import theme from "../theme";

export const noop = () => {};

export const ucFirst = (word) => {
  return word[0].toUpperCase() + word.slice(1, word.length);
};

export const generateRandomString = (length = 6, numbers = false) => {
  var result = "";
  var characters = numbers
    ? "1234567890"
    : "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const getIronConfig = () => ({
  cookieName: process.env.AUTH_COOKIE_NAME,
  password: process.env.APPLICATION_SECRET,
  ttl: 60 * 60 * 24,
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

export const getFormattedDate = (date) => {
  const formattedDate = new Date(date);
  let year = formattedDate.getFullYear();
  let month = formattedDate.getMonth() + 1;
  let dt = formattedDate.getDate();
  let time = formattedDate.toLocaleTimeString();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${dt}-${month}-${year} ${time}`;
};

export const showNotification = (message) => {
  const toast = createStandaloneToast({ theme });
  const id = "active-notification-toast";
  if (!toast.isActive(id)) {
    toast({
      position: "bottom-right",
      variant: "left-accent",
      render: () => <Notification message={message} />,
    });
  }
};

export const tablifyEmailer = (body) => {
  return `
  <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>

  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700"
        rel="stylesheet"
      />
    </head>

    <body
      style="background-color: #e1e1e1; font-family: Quicksand; padding: 20px"
    >
      <table
        style="
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          border: 1px solid #25252550;
          border-radius: 5px;
          background-image: url('https://res.cloudinary.com/chitti/image/upload/v1625216006/preview-bg-white_bjhlho.jpg');
          background-size: cover;
          background-repeat: repeat;
          box-shadow: 0px 0px 15px 5px #25252511;
          border-collapse: collapse;
        "
      >
        <tr>
          <td style="vertical-align: middle; padding: 40px 20px; height: 600px">
          ${body}
          </td>
        </tr>
        <tr>
          <td
            style="
              vertical-align: middle;
              padding: 15px;
              background-color: #252525;
            "
          >
            <p
              style="
                text-align: center;
                color: #e1e1e1;
                font-family: Quicksand;
                font-size: 14px;
                line-height: 1;
                margin: 0;
                font-weight: 300;
              "
            >
              Sent via
              <a
                style="
                  color: #e1e1e1;
                  text-decoration: none;
                  font-weight: 400;
                  font-family: 'Josefin Sans';
                  font-size: 16px;
                "
                href="${process.env.VERCEL_URL}"
              >
                Chitti
              </a>
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

export const debounce = (fn, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, delay);
  };
};
