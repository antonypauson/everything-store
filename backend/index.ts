import app from './src/app'; //express app
import {testDbConnection} from './src/db'; //this function

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await testDbConnection(); 
});
