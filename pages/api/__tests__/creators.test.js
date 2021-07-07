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
  // Reset Database before testing
  removeAllCollections();
});

describe("Creators API", () => {
  test("Creator Signup - Valid", async () => {
    const dummyData = {
      fullName: "Tester",
      emailId: "test@test.com",
      password: "test@123",
    };

    await testApiHandler({
      handler: endpoint,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData),
        });

        const resBody = await response.json();
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);
        expect(resBody.success).toBeDefined();
        expect(resBody.success).toEqual(true);
        expect(resBody.creator).toBeDefined();
        expect(resBody.creator).toMatchObject({
          _id: expect.any(String),
          emailId: dummyData.emailId,
          profile: {
            fullName: dummyData.fullName,
            shortBio: null,
            longBio: null,
            displayPicture: null,
          },
          plans: expect.any(Array),
        });
        expect(resBody.creator.password).toBeUndefined();
        expect(resBody.creator.plans).toHaveLength(1);
        expect(resBody.creator.plans[0]).toMatchObject({
          _id: expect.any(String),
          planFee: 0,
          subscribers: [],
          planFeatures: [],
          planRZPid: null,
        });
      },
    });
  });
  test("Creator Signup - Without Full Name", async () => {
    const dummyData = {
      emailId: "test@test.com",
      password: "test@123",
    };

    await testApiHandler({
      handler: endpoint,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData),
        });

        const resBody = await response.json();
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Creator Signup - Without Email ID", async () => {
    const dummyData = {
      fullName: "Tester",
      password: "test@123",
    };

    await testApiHandler({
      handler: endpoint,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData),
        });

        const resBody = await response.json();
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Creator Signup - Without Password", async () => {
    const dummyData = {
      fullName: "Tester",
      emailId: "test@test.com",
    };

    await testApiHandler({
      handler: endpoint,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData),
        });

        const resBody = await response.json();
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

});

afterAll(() => {
  // Close connection to Mongo database
  mongoose.connection.close();
});
