import "dotenv/config";
import app from "./src/app"; //express app
import { initializeTypeORM } from "./src/data-source";
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    // await intializeDB();
    await initializeTypeORM();
  } catch (error) {
    console.log("Failed to intialize db", error);
  }
});
