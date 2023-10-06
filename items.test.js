process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const itemsRoutes = require("./itemRoutes");
let items = require("./fakeDb");

let sugar = {
  name: "sugar",
  price: 6.25,
};

beforeEach(function () {
  items.push(sugar);
});

afterEach(function () {
  items.length = 0;
});

describe("GET/items", () => {
  test("Get all items", async () => {
    let resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [sugar] });
  });
});

describe("GET/items/:name", () => {
  test("Get one items", async () => {
    let resp = await request(app).get(`/items/${sugar.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(sugar);
  });
  test("Responds with 404 for invalid name", async () => {
    let resp = await request(app).get("/items/paco");
    expect(resp.statusCode).toBe(404);
  });
});

describe("POST/items", () => {
  test("Add an Item", async () => {
    let newItem = {
      name: "milk",
      price: 5.55,
    };
    let resp = await request(app).post("/items").send(newItem);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual(newItem);
  });
});

describe("PATCH/items/:name", () => {
  test("modify item", async () => {
    let modifyItem = {
      name: "brown sugar",
      price: 2.35,
    };
    let resp = await request(app)
      .patch(`/items/${sugar.name}`)
      .send(modifyItem);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(modifyItem);
  });
  test("Responds with 404 for invalid name", async () => {
    let resp = await request(app).patch("/items/jesus").send({
      name: "brown sugar",
      price: 2.35,
    });
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE/items/:name", () => {
  test("delete item", async () => {
    let resp = await request(app).delete(`/items/${sugar.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
  test("Responds with 404 for invalid name", async () => {
    let resp = await request(app).delete("/items/paco");
    expect(resp.statusCode).toBe(404);
  });
});
