import {query} from "./config/database";

export const testDbConnection = async () => {
  const res = await query("SELECT NOW()");
  console.log(res.rows[0].now);
  console.log("Successful connection");
};