import app from './src/app'; //express app
import {testDbConnection} from './src/db'; //testing by a query
import { intializeDB, closeDB } from './src/config/database';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await intializeDB(); 
    await testDbConnection(); 
  } catch (error) {
    console.log('Failed to intialize db', error); 
  }
});
