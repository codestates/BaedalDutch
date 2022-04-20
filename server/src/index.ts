import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

// modules
// import boardRouter from './routers/boardRouter';

const PORT = 80;

const app = express();
const logger = morgan('dev');

// db connection
createConnection()
  .then(() => {
    console.log('Database Connected :)');
    app.listen(PORT, () =>
      console.log(`Server Listening on http://localhost:${PORT}`),
    );
  })
  .catch(error => console.log(error));

// middleware
app.use(express.json()); //body parser(json)
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(__dirname+'/../src/imageStorage'));
app.use(express.static('./src/imageStorage'));
// app.use(express.static('.'));

app.use(logger);
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// route
app.get('/', (req, res) => {
  res.send('server connected');
});

// 라우터 연결
// app.use('/', globalRouter);
