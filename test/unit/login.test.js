const request = require("supertest");
const login = require("../../routing/logIn.js");
const app = require("../../app.js");

describe("login", () => { 
  it("returns 201 and the user object when given valid credentials", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ username: "Lee", password: "123456Op" })
 
      .expect("Content-Type", /json/);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(201);
    expect(response.body.data).toEqual([
      {
        email: "lele@hotmail.com",
        hours_minutes_of_training_mounth: 0,
        name: "Lele",
        password:
          "$2a$12$sV9BV340pFs0K.1d1Jdhges99/E5Fl1qpDSZhikFt1/TMUloO8E7G",
        role: "athlete",
        surname: "Rossi",
        username: "Lee",
      },
    ]);
    expect(response.body.data[0].username).toBe("Lee");
    expect(response.body.data[0].password).toBe(
      "$2a$12$sV9BV340pFs0K.1d1Jdhges99/E5Fl1qpDSZhikFt1/TMUloO8E7G"
    );
    expect(response.headers["set-cookie"]).toBeDefined();
  });
  it("It should return a JWT", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ username: "Lee", password: "123456Op" });
    const token = response.headers["set-cookie"][0].split(";")[0].split("=")[1];
    expect(token).toBeDefined();
  });
  it("should respond with 401 if username or password are missing", async () => {
    const response = await request(app).post("/api/v1/login").send({});
    expect(response.body.status).toBe(404);
  });
  it("returns 400 and the user object when given incorrect credentials", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ username: "Lee", password: "1234455456Op" })

      .expect("Content-Type", /json/);
    expect(response.body.status).toBe(401);
  });


});

describe("routing.login", () => {
  it("should hava create function", () => {
    expect(typeof login).toBe("function");
  });
});
