// tslint:disable: import-name
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectRedis from 'connect-redis';
import apiRouter from './routes/api';
import dotenv from 'dotenv';
import seedDb from './db/index';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const redisStore = connectRedis(session);
const client = require('redis').createClient(process.env.REDIS_URL);

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONFIG
const connectionUri = process.env.NODE_ENV === 'test' ? process.env.TEST : `${process.env.PROD}`;

// Connect to MongoDB
mongoose
  .connect(connectionUri!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    process.env.NODE_ENV !== 'test' && (await seedDb());
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

try {
  app.use(
    session({
      secret: `${process.env.KEY}`,
      // create new redis store.
      store: new redisStore({
        client,
        host: 'localhost',
        port: 6379,
        ttl: 1800,
      }),
      saveUninitialized: false,
      resave: false,
    }),
  );
} catch (error) {
  console.log({ error });
}

app.use(cors());
app.use(helmet());

// Use Routes
app.get('/', (req, res) => {
  res.send('Hello, Welcome to the Premier League Live!!!.\n');
});
app.use('/api/v1', apiRouter);

const PORT = process.env.PORT || 4040;
const HOST = process.env.PROD || 'localhost';

app.listen(PORT, () => console.log(`Server running on http://${HOST}:${PORT}`));

export default app;
