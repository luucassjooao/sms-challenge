import 'express-async-errors';
import express from 'express';
import { client } from './database';
import { routes } from './app/routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8693;

(async () => {
  try {
    await client.connect();
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (err) {
    console.log(err);
  }
})();
