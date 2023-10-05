process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const itemsRoutes = require("./itemRoutes");
let items = require("./fakeDb");
const { beforeEach, afterEach } = require("node:test");

let sugar = {
  name: "sugar",
  price: 6.25,
};

beforeEach(function () {
  items.push(sugar);
  console.log(its);
});

afterEach(function () {
  items.length = 0;
});

describe("GET/items", () => {
  test("Get all items", async () => {
    let resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [] });
  });
});
