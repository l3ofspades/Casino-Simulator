import request from "supertest";
import app from "../../server/server.js"; // go up from src/__tests__ to reach server.js

describe("Auth Routes", () => {
  const testUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
  };

  test("POST /api/auth/register creates a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    // Expect a success status code (adjust based on your route)
    expect(res.statusCode).toBe(200);

    // Expect the response to contain user info or token
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", testUser.email);
  });

  test("POST /api/auth/login logs in the existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /api/auth/login fails with wrong credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
