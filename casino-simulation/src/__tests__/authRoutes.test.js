import request from "supertest";


const mockUserModel = {
  create: jest.fn(async (data) => ({
    username: data.username,
    email: data.email,
  })),

  findOne: jest.fn(async ({ email }) => {
    if (email === "testuser@example.com") {
      return {
        username: "testuser",
        email: "testuser@example.com",
        passwordHash: "hashedpw",
        comparePassword: jest.fn(async (pw) => pw === "password123"),
      };
    }
    return null;
  }),
};


jest.mock("mongoose", () => ({
  Schema: function () {},
  model: jest.fn(() => mockUserModel),
  connect: jest.fn(() => Promise.resolve()),
  connection: {
    close: jest.fn(() => Promise.resolve())
  }
}));


import app from "../../server/server.js";

describe("Auth Routes", () => {
  const testUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
  };

  test("POST /api/auth/register creates a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe(testUser.email);
  });

  test("POST /api/auth/login logs in existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /api/auth/login fails with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
