const express = require('express');
const { PrismaClient } = require('@prisma/client');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { randomUUID } = require('crypto');

const prisma = new PrismaClient();
const app = express();

const { PORT = 3001, NODE_ENV } = process.env;

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(morgan('tiny'));
app.use(cookieParser());

const setVisitor = (req, res, next) => {
  let { visitor_id } = req.cookies;
  if (!visitor_id) {
    visitor_id = randomUUID();
    res.cookie('visitor_id', visitor_id, { path: '/' });
  }
  req.visitor_id = visitor_id;
  next();
};

app.use(setVisitor);

app.get('/:code', async (req, res) => {
  const { visitor_id, params } = req;
  const { code } = params;
  const matchingLink = await prisma.link.findUnique({
    where: { code },
    select: {
      id: true,
      original_url: true
    }
  });
  if (!matchingLink) return res.status(404).send('Link Not Found');
  const { original_url, id: link_id } = matchingLink;
  await prisma.linkVisit.create({
    data: {
      visitor_id,
      link_id
    }
  });
  return res.redirect(original_url);
});

app.listen(PORT, () => {
  console.log(`
Express Server started on Port ${app.get('port')}
Environment : ${app.get('env')}`);
});
