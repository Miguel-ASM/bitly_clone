const express = require('express');
const { PrismaClient } = require('@prisma/client');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const { randomUUID } = require('crypto');

const prisma = new PrismaClient();
const app = express();

const { PORT = 3001, NODE_ENV } = process.env;
console.log(process.env.DATABASE_URL);

app.set('port', PORT);
app.set('env', NODE_ENV);

// app.use(morgan('tiny'));
// app.use(cookieParser());

// const setVisitor = (req, res, next) => {
//   let { visitorId } = req.cookies;
//   if (!visitorId) {
//     visitorId = randomUUID();
//     res.cookie('visitorId', visitorId, { path: '/' });
//   }
//   req.visitorId = visitorId;
//   next();
// };

// app.use(setVisitor);

// app.get('/:linkIdentifier', async (req, res) => {
//   const { visitorId, params } = req;
//   const { linkIdentifier } = params;
//   const allLinks = await prisma.Link.findAll();
//   console.log(allLinks);
//   return res.json({ linkIdentifier, visitorId });
//   //get complete url from db and redirect
// });

app.get('/', async (req, res) => {
  const links = await prisma.Link.findMany();
  return res.json(links);
});

app.listen(PORT, () => {
  console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
});
