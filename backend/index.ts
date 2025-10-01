import "dotenv/config";
import app from "./src/app";
import { initializeTypeORM } from "./src/data-source";
const PORT = process.env.PORT || 3000;

//don't run if imported
if (require.main === module) {
  //init db first
  (async () => {
    try {
      await initializeTypeORM();
      console.log("Database connection success");
    } catch (error) {
      console.log("Failed to intialize db", error);
      process.exit(1);
    }
  })();

  //only start server after db
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

