import withDB from "../../../src/middleware/withDB";
import Subscriber from "../../../src/models/Subscriber";
import { ucFirst } from "../../../src/utils";

export default withDB(async (req, res) => {
  try {
    let { data } = await fetch("https://dummyapi.io/data/api/user?limit=50", {
      headers: {
        "app-id": "60cf03b08eb6a1260f81ff55",
      },
    }).then((response) => response.json());

    data = data.map((user) => ({
      ...user,
      name: `${ucFirst(user.title)}. ${user.firstName} ${user.lastName}`,
      registeredAt: Date.now(),
      subscriptions: [],
      payments: [],
    }));

    let resut = await Subscriber.insertMany(data);

    data = (
      await fetch("https://dummyapi.io/data/api/user?limit=50&page=1", {
        headers: {
          "app-id": "60cf03b08eb6a1260f81ff55",
        },
      }).then((response) => response.json())
    ).data;

    data = data.map((user) => ({
      ...user,
      name: `${ucFirst(user.title)}. ${user.firstName} ${user.lastName}`,
      registeredAt: Date.now(),
      subscriptions: [],
      payments: [],
    }));

    resut = await Subscriber.insertMany(data);

    return res.send({
      success: true,
      resut,
    });
  } catch (error) {
    console.error(error);
    res.status(501).send({
      error: true,
      message: error.message,
    });
  }
});
