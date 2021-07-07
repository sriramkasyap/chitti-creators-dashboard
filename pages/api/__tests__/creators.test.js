import { testApiHandler } from "next-test-api-route-handler";
import mongoose from "mongoose";
import * as endpoint from "../creators/signup";

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany();
  }
}

beforeAll(() => {
  removeAllCollections();
});

describe("Creators API", () => {
  test("Creator Signup", async () => {
    await testApiHandler({
      handler: endpoint,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify({
            fullName: "Tester",
            emailId: "test@test.com",
            password: "test@123",
          }),
        });

        const resBody = await response.json();
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);
        expect(resBody).toMatchObject({ success: true });
      },
    });
  });
});

afterAll(() => {
  removeAllCollections();
  mongoose.connection.close();
});
