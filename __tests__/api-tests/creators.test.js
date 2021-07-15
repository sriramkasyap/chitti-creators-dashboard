/* eslint-disable no-undef */
import { testApiHandler } from "next-test-api-route-handler";
import mongoose from "mongoose";
import * as signup from "../../pages/api/creators/signup";
import * as login from "../../pages/api/creators/login";
import * as getCreator from "../../pages/api/creators";
import * as profile from "../../pages/api/creators/profile";
import * as plans from "../../pages/api/creators/plans";
import * as PlanActions from "../../pages/api/creators/plans/[planId]";
import * as GetCreatorCards from "../../pages/api/creators/cards";

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
            displayPicture: expect.any(String),
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

  test("Creator Login - Incorrect Email Id", async () => {
    const dummyData1 = {
      emailId: "test@test1.com",
      password: "test@123", // Wrong Password
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

  test("Creator Login - Incorrect Password", async () => {
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

  test("Creator Login - No Credentials", async () => {
    await testApiHandler({
      handler: login,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({}),
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

  test("Creator Login - Incorrect Method", async () => {
    await testApiHandler({
      handler: login,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
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

  test("Creator Login - Already Logged in", async () => {
    await testApiHandler({
      handler: login,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
          headers: {
            Cookie: sessionCookie,
          },
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

  test("Get Creator - Invalid Method", async () => {
    await testApiHandler({
      handler: getCreator,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
          },
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
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

  test("Update Creator Profile - Invalid Method", async () => {
    await testApiHandler({
      handler: profile,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
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
        expect(response.status).toEqual(404);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Update Creator Profile - Invalid Data", async () => {
    await testApiHandler({
      handler: profile,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({}),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
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

  test("Create new plan", async () => {
    const planData1 = {
      planFee: 10,
      planFeatures: ["Hello, this is a plan feature"],
    };
    await testApiHandler({
      handler: plans,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify(planData1),
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
        expect(resBody.plan).toBeDefined();
        expect(resBody.plan).toMatchObject({
          _id: expect.any(String),
          planFee: planData1.planFee,
          planFeatures: planData1.planFeatures,
          planRZPid: null,
        });

        planId = resBody.plan._id;
      },
    });
  });

  test("Create new plan - Without Token", async () => {
    const planData1 = {
      planFee: 10,
      planFeatures: ["Hello, this is a plan feature"],
    };
    await testApiHandler({
      handler: plans,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(planData1),
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

  test("Create new plan - Missing Params 1", async () => {
    const planData1 = {
      planFeatures: ["Hello, this is a plan feature"],
    };
    await testApiHandler({
      handler: plans,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify(planData1),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Create new plan - Missing Params 2", async () => {
    const planData1 = {
      planFee: 10,
    };
    await testApiHandler({
      handler: plans,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify(planData1),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Get Single plan", async () => {
    await testApiHandler({
      handler: PlanActions,
      params: { planId },
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
        expect(resBody.plan).toBeDefined();
        expect(resBody.plan).toMatchObject({
          _id: planId,
        });
      },
    });
  });

  test("Get Single plan - Invalid Id", async () => {
    await testApiHandler({
      handler: PlanActions,
      params: { planId: planId.replace("a", "b").replace("c", "g") },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
          headers: {
            Cookie: sessionCookie,
          },
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message).toContain("does not exist");
      },
    });
  });

  test("Get Single plan - Invalid Method", async () => {
    await testApiHandler({
      handler: PlanActions,
      params: { planId: planId.replace("a", "b").replace("c", "g") },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
          },
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Update creator plan", async () => {
    await testApiHandler({
      handler: PlanActions,
      params: { planId },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            plan: planData,
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
        expect(resBody.plan).toBeDefined();
        expect(resBody.plan).toMatchObject({
          _id: expect.any(String),
          planFee: planData.planFee,
          planFeatures: planData.planFeatures,
          planRZPid: null,
        });
      },
    });
  });

  test("Update creator plan - Missing Params 1", async () => {
    const planData1 = {
      planFeatures: ["Hello, this is a plan feature", "This is a new Feature"],
    };
    await testApiHandler({
      handler: PlanActions,
      params: { planId },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            plan: planData1,
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
        expect(resBody.plan).toBeDefined();
        expect(resBody.plan).toMatchObject({
          _id: expect.any(String),
          planFee: planData.planFee,
          planFeatures: planData1.planFeatures,
          planRZPid: null,
        });
      },
    });
  });

  test("Update creator plan - Can't set Razorpay plan id manually", async () => {
    const planData1 = {
      planRZPid: "plan_wojdvoaejfsvouabf",
    };
    await testApiHandler({
      handler: PlanActions,
      params: { planId },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            plan: planData1,
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
        expect(resBody.plan).toBeDefined();
        expect(resBody.plan).toMatchObject({
          _id: expect.any(String),
          planFee: planData.planFee,
          planRZPid: null,
        });
      },
    });
  });

  test("Get Creator dashboard data", async () => {
    await testApiHandler({
      handler: GetCreatorCards,
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
        expect(resBody.success).toEqual(true);
        expect(resBody.activeSubscribers).toEqual(expect.any(Number));
        expect(resBody.totalPaidSubscribers).toEqual(expect.any(Number));
        expect(resBody.revenue).toEqual(expect.any(Number));
        expect(resBody.newslettersSent).toEqual(expect.any(Number));
      },
    });
  });

  test("Get Creator dashboard data - Without Auth", async () => {
    await testApiHandler({
      handler: GetCreatorCards,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(401);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toContain("logged in");
      },
    });
  });

  test("Get Creator dashboard data - Invalid Method", async () => {
    await testApiHandler({
      handler: GetCreatorCards,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
          },
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response  Headers
        const { headers } = response;
        expect(headers).toBeDefined();

        // Test Response  Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toContain("Invalid");
      },
    });
  });
});

afterAll(() => {
  // Close connection to Mongo database
  mongoose.connection.close();
});
