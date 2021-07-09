/* eslint-disable no-undef */
import { testApiHandler } from "next-test-api-route-handler";
import * as Newsletters from "../../pages/api/newsletters/index";
import * as NewsletterByID from "../../pages/api/newsletters/[newsletterId]/index";
import * as login from "../../pages/api/creators/login";

describe("Testing Newsletters API", () => {
  // Need top login Creator to get the session cookie
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
      },
    });
  });

  test("Create newsletter", async () => {
    await testApiHandler({
      handler: Newsletters,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({ newsletter: dummyNewsletter }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);

        // Test Response Body
        const resBody = await response.json();
        expect(resBody.success).toBeDefined();
        expect(resBody.success).toEqual(true);
        expect(resBody.newsletter).toBeDefined();
        expect(resBody.newsletter).toMatchObject({
          _id: expect.any(String),
          reference: dummyNewsletter.reference,
          emailSubject: dummyNewsletter.emailSubject,
          keywords: dummyNewsletter.keywords,
          body: dummyNewsletter.body,
        });

        newsletterId = resBody.newsletter._id;
      },
    });
  });

  test("Create newsletter - Missing Params", async () => {
    const dummyNewsletter1 = dummyNewsletter;
    delete dummyNewsletter1.keywords;
    await testApiHandler({
      handler: Newsletters,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({ newsletter: dummyNewsletter1 }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(501);

        // Test Response Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("invalid");
      },
    });
  });

  test("Create newsletter - Without Auth", async () => {
    await testApiHandler({
      handler: Newsletters,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ newsletter: dummyNewsletter }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(401);

        // Test Response Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message.toLowerCase()).toContain("logged in");
      },
    });
  });

  test("Update newsletter", async () => {
    const dummyNewsletter1 = { keywords: ["new", "keywords"] };
    await testApiHandler({
      handler: NewsletterByID,
      params: { newsletterId },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            Cookie: sessionCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({ newsletter: dummyNewsletter1 }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(200);

        // Test Response Body
        const resBody = await response.json();
        expect(resBody.success).toBeDefined();
        expect(resBody.success).toEqual(true);
        expect(resBody.newsletter).toBeDefined();
        expect(resBody.newsletter).toMatchObject({
          _id: expect.any(String),
          reference: dummyNewsletter.reference,
          emailSubject: dummyNewsletter.emailSubject,
          keywords: dummyNewsletter1.keywords,
          body: dummyNewsletter.body,
        });
      },
    });
  });

  test("Update newsletter - Without Auth", async () => {
    const dummyNewsletter1 = { keywords: ["new", "keywords"] };
    await testApiHandler({
      handler: NewsletterByID,
      params: { newsletterId },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            Cookie: sessionCookie.replace("e", "f"),
            "content-type": "application/json",
          },
          body: JSON.stringify({ newsletter: dummyNewsletter1 }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(401);

        // Test Response Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message).toContain("logged in");
      },
    });
  });

  test("Update newsletter - Incorrect Auth", async () => {
    const dummyNewsletter1 = { keywords: ["new", "keywords"] };
    await testApiHandler({
      handler: NewsletterByID,
      params: { newsletterId },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ newsletter: dummyNewsletter1 }),
        });

        // Test Response Status
        expect(response).toHaveProperty("status");
        expect(response.status).toEqual(401);

        // Test Response Body
        const resBody = await response.json();
        expect(resBody.error).toBeDefined();
        expect(resBody.error).toEqual(true);
        expect(resBody.message).toBeDefined();
        expect(resBody.message).toContain("logged in");
      },
    });
  });

  // test("Publish newsletter", async () => {});

  // test("Update newsletter - Already Published", async () => {});

  // test("Publish newsletter - Already Published", async () => {});

  // test("Publish newsletter - Missing Params", async () => {});

  // test("Publish newsletter - Without Auth", async () => {});

  // test("Get Creator's Newsletters", async () => {});

  // test("Get Creator's Newsletters - Without Auth", async () => {});
});
