import db from "./config/database";

export const testDbConnection = async () => {
  const res = await db.query("SELECT NOW()");
  console.log(res.rows[0].now);
  console.log("Successful connection");
};