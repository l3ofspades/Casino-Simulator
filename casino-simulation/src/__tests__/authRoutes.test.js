
const request = require("supertest");
const express = require("express");


const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};


jest.mock("mongoose", () => {
  return {
    Schema: function () {},
    model: jest.fn(() => mockUserModel),
    connect: jest.fn(() => Promise.resolve()),
    connection: {
      close: jest.fn(() => Promise.resolve()),
    },
  };
});


const authRoutes = require("../../server/routes/auth");
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

describe("Auth Routes", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUserModel.findOne.mockReset();
    mockUserModel.create.mockReset();
  });

  test("registers a new user", async () => {
    mockUserModel.findOne.mockResolvedValue(null);
    mockUserModel.create.mockResolvedValue({
      id: "123",
      username: "testuser",
      password: "hashedpassword",
    });

    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  test("rejects duplicate username", async () => {
    mockUserModel.findOne.mockResolvedValue({
      id: "999",
      username: "testuser",
    });

    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Username already exists");
  });

  test("logins an existing user", async () => {
    mockUserModel.findOne.mockResolvedValue({
      id: "123",
      username: "testuser",
      password: "hashedpassword",
      comparePassword: jest.fn(() => Promise.resolve(true)),
    });

    const res = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });
});
