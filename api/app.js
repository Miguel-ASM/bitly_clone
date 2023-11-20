import express, { Router } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { randomUUID } from 'crypto';

const { PORT = 3001, NODE_ENV } = process.env;

const app = express();
app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(morgan('tiny'));
app.use(cookieParser());

// app.use()

const apiRouter = new Router();
apiRouter.get('/links', (req, res) => res.json({ link: 'asdasd' }));

const setVisitor = (req, res, next) => {
  let { visitorId } = req.cookies;
  if (!visitorId) {
    visitorId = randomUUID();
    res.cookie('visitorId', visitorId, { path: '/links' });
  }
  req.visitorId = visitorId;
  next();
};

app.use('/api', apiRouter);
app.get('/links/:linkId', setVisitor, (req, res) => {
  const { visitorId } = req;
  console.log({ visitorId });
  console.log({ visitorId });
  console.log({ visitorId });
  console.log({ visitorId });
  return res.json({ linkId: req.params.linkId });
});

app.listen(PORT, () => {
  console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
});
