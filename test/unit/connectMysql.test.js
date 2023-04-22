const ConnectMysql = require("../../src/connectMysql.js");

ConnectMysql.db = jest.fn();

describe("connectMysql.db", () => {
  it("ConnectMysql.db", async () => {
    await ConnectMysql.db();
    expect(ConnectMysql.db).toHaveBeenCalled();
  });
});
