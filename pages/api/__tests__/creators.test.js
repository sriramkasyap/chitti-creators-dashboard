import { testApiHandler } from "next-test-api-route-handler";
import mongoose from "mongoose";
import * as signup from "../creators/signup";
import * as login from "../creators/login";
import * as getCreator from "../creators";
import * as profile from "../creators/profile";

let sessionCookie = "";

const dummyData = {
  fullName: "Tester",
  emailId: "test@test.com",
  password: "test@123",
};

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
  test("Creator Signup - Valid Data", async () => {
    await testApiHandler({
      handler: signup,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();
        expect(headers.has("set-cookie")).toEqual(true);
        expect(headers.get("set-cookie")).toContain(
          process.env.AUTH_COOKIE_NAME
        );
        expect(headers.get("set-cookie")).toContain("HttpOnly");

        // Test Response  Body
        const resBody = await response.json();
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
          planFeatures: [],
          planRZPid: null,
        });
      },
    });
  });

  test("Creator Signup - Without Full Name", async () => {
    const dummyData1 = {
      emailId: "test@test.com",
      password: "test@123",
    };

    await testApiHandler({
      handler: signup,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData1),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();
        expect(headers.has("set-cookie")).toEqual(false);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Creator Signup - Without Email ID", async () => {
    const dummyData1 = {
      fullName: "Tester",
      password: "test@123",
    };

    await testApiHandler({
      handler: signup,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData1),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();
        expect(headers.has("set-cookie")).toEqual(false);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Creator Signup - Without Password", async () => {
    const dummyData1 = {
      fullName: "Tester",
      emailId: "test@test.com",
    };

    await testApiHandler({
      handler: signup,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(dummyData1),
        });
        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();
        expect(headers.has("set-cookie")).toEqual(false);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Creator Login - Correct Credentials", async () => {
    const dummyData1 = {
      emailId: "test@test.com",
      password: "test@123",
    };
    await testApiHandler({
      handler: login,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(dummyData1),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();
        expect(headers.has("set-cookie")).toEqual(true);
        expect(headers.get("set-cookie")).toContain(
          process.env.AUTH_COOKIE_NAME
        );
        expect(headers.get("set-cookie")).toContain("HttpOnly");

        sessionCookie = headers.get("set-cookie");

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.success).toBeDefined();
        expect(resBody.success).toEqual(true);
        expect(resBody.creator).toBeDefined();
        expect(resBody.creator).toMatchObject({
          _id: expect.any(String),
          emailId: dummyData.emailId,
          profile: {
            fullName: dummyData.fullName,
          },
          plans: expect.any(Array),
        });
        expect(resBody.creator.password).toBeUndefined();
        expect(resBody.creator.plans).toHaveLength(1);
        expect(resBody.creator.plans[0]).toMatchObject({
          _id: expect.any(String),
          planFee: 0,
          planFeatures: [],
          planRZPid: null,
        });
      },
    });
  });

  test("Creator Login - Incorrect Credentials", async () => {
    const dummyData1 = {
      emailId: "test@test.com",
      password: "test@124", // Wrong Password
    };
    await testApiHandler({
      handler: login,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(dummyData1),
        });
        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();
        expect(headers.has("set-cookie")).toEqual(false);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("incorrect");
      },
    });
  });

  test("Get Creator", async () => {
    await testApiHandler({
      handler: getCreator,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
          headers: {
            Cookie: sessionCookie,
          },
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.success).toBeDefined();
        expect(resBody.success).toEqual(true);
        expect(resBody.creator).toBeDefined();
        expect(resBody.creator).toMatchObject({
          _id: expect.any(String),
          emailId: dummyData.emailId,
          profile: {
            fullName: dummyData.fullName,
          },
          plans: expect.any(Array),
        });
        expect(resBody.creator.password).toBeUndefined();
        expect(resBody.creator.plans).toHaveLength(1);
        expect(resBody.creator.plans[0]).toMatchObject({
          _id: expect.any(String),
          planFee: 0,
          planFeatures: [],
          planRZPid: null,
        });
      },
    });
  });

  test("Get Creator - Without Token", async () => {
    await testApiHandler({
      handler: getCreator,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(401);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("logged in");
      },
    });
  });

  test("Update Creator profile", async () => {
    await testApiHandler({
      handler: profile,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            profile: {
              fullName: "Tester 007",
            },
          }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.success).toBeDefined();
        expect(resBody.success).toEqual(true);
        expect(resBody.creator).toBeDefined();
        expect(resBody.creator).toMatchObject({
          _id: expect.any(String),
          emailId: dummyData.emailId,
          profile: {
            fullName: "Tester 007",
          },
          plans: expect.any(Array),
        });
        expect(resBody.creator.password).toBeUndefined();
        expect(resBody.creator.plans).toHaveLength(1);
        expect(resBody.creator.plans[0]).toMatchObject({
          _id: expect.any(String),
          planFee: 0,
          planFeatures: [],
          planRZPid: null,
        });
      },
    });
  });

  test("Update Creator Profile - Without Token", async () => {
    await testApiHandler({
      handler: profile,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            profile: {
              fullName: "Tester 007",
            },
          }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(401);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("logged in");
      },
    });
  });

  // test("Get Creator plans", () => {});
  // test("Create new plan", () => {});
  // test("Update creator plan", () => {});
  // test("Get Creator dashboard data", () => {});
});

afterAll(() => {
  // Close connection to Mongo database
  mongoose.connection.close();
});