describe("Environment Variables", () => {
  test("Cookie Name", () => {
    expect(process.env.AUTH_COOKIE_NAME).toBeDefined();
  });
  test("Cookie Password", () => {
    expect(process.env.APPLICATION_SECRET).toBeDefined();
  });
  test("Mongo URL", () => {
    expect(process.env.MONGO_URL).toBeDefined();
  });
  test("Mongo DB", () => {
    expect(process.env.MONGO_DB).toBeDefined();
  });
  test("Sendgrid Key", () => {
    expect(process.env.SENDGRID_DASHBOARD_KEY).toBeDefined();
  });
});
