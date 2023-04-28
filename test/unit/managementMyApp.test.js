const request = require("supertest");
const app = require("../../app.js");

describe("add_new_user", () => {
  it("returns 201 when new user registration is successful", async () => {
    const response = await request(app)
      .post("/api/v1/managementMyApp")
      .send({
        username: "cino",
        password: "123456eRy",
        confirmPassword: "123456eRy",
        name: "Dario",
        surname: "fava",
        email: "mrleon@live.yu",
        role: "athlete",
        category: ["danza", "akido"],
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(201);
  });
  it("should respond with 401 if credentials are missing", async () => {
    const response = await request(app)
      .post("/api/v1/managementMyApp")
      .send({});
    expect(response.body.status).toBe(406);
  });
  it("returns 402 if the user is already registered", async () => {
    const response = await request(app)
      .post("/api/v1/managementMyApp")
      .send({
        username: "cino",
        password: "123456eRy",
        confirmPassword: "123456eRy",
        name: "Dario",
        surname: "fava",
        email: "mrleon@live.yu",
        role: "athlete",
        category: ["danza", "akido"],
      })
      .expect("Content-Type", /json/);

    expect(response.body.status).toBe(402);
  });
  it("returns 405 if password and confirm password do not match", async () => {
    const response = await request(app)
      .post("/api/v1/managementMyApp")
      .send({
        username: "cino",
        password: "123456eRy",
        confirmPassword: "12345678",
        name: "Dario",
        surname: "fava",
        email: "mrleon@live.yu",
        role: "athlete",
        category: ["danza", "akido"],
      });

    expect(response.body.status).toBe(405);
  });
});
