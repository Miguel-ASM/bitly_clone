const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { serializeLinksList, serializeNewLinkResponse } = require('./serializers/links');
const linksService = require('./services/links')({ db: prisma });
const generateRandomCode = require('./services/generateRandomCode');
const validateUrl = require('./utils/validateUrl');

const { PORT, NODE_ENV } = process.env;

const app = express();
app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/api/links', async (req, res) => {
  const links = await linksService.getLinks().then(serializeLinksList);
  return res.json(links);
});

app.post('/api/links', async (req, res) => {
  const { original_url } = req.body;
  if (!validateUrl(original_url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const code = generateRandomCode();
  const newLink = await linksService.createLink({ original_url, code });
  return res.json(serializeNewLinkResponse(newLink));
});

app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
  );
});
