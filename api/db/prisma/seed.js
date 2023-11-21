const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const links = [
  {
    original_url: 'https://www.google.com',
    code: 'code1'
  },
  {
    original_url: 'https://www.facebook.com',
    code: 'code2'
  },
  {
    original_url: 'https://www.twitter.com',
    code: 'code3'
  },
  {
    original_url: 'https://www.github.com',
    code: 'code4'
  },
  {
    original_url: 'https://www.linkedin.com',
    code: 'code5'
  },
  {
    original_url: 'https://www.youtube.com',
    code: 'code6'
  },
  {
    original_url: 'https://www.instagram.com',
    code: 'code7'
  },
  {
    original_url: 'https://www.tiktok.com',
    code: 'code8'
  },
  {
    original_url: 'https://www.spotify.com',
    code: 'code9'
  },
  {
    original_url: 'https://www.netflix.com',
    code: 'code10'
  },
  {
    original_url: 'https://www.apple.com',
    code: 'code11'
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of links) {
    const link = await prisma.link.create({
      data: u
    });
    console.log(`Created link with id: ${link.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
