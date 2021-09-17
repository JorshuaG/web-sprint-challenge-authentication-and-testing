// Write your tests here
const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");
const { testing } = require("../knexfile");
const User = require("./model/model");

const user1 = {
  id: 1,
  username: "KingCoder",
  password: "1234",
};
const user2 = {
  id: 2,
  username: "KingDebugger",
  password: "4321",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

test("testing for correct environment variable", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

test("sanity", () => {
  expect(true).toBe(true);
});
