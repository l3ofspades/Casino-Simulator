import request from "supertest";


const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

jest.mock("../../server/models/User.js", () => ({
  __esModule: true,
  default: mockUserModel,
}));


import app from "../../server/server.js";

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("registers a new user", async () => {
    mockUserModel.findOne.mockResolvedValue(null);
    mockUserModel.create.mockResolvedValue({
      username: "testuser",
      email: "test@example.com",
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  test("rejects duplicate email", async () => {
    mockUserModel.findOne.mockResolvedValue({
      username: "testuser",
      email: "test@example.com",
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already in use");
  });

  test("logins an existing user", async () => {
    const fakeUser = {
      _id: "123",
      username: "testuser",
      email: "test@example.com",
      passwordHash: "hashedpw",
      chips: 1000,
      comparePassword: jest.fn().mockResolvedValue(true),
    };

    mockUserModel.findOne.mockResolvedValue(fakeUser);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.username).toBe("testuser");
    expect(res.body.token).toBeDefined();
  });
});
