import {prisma} from './../database.js';

 async function reseting() {
  return prisma.recommendation.deleteMany();
}

 async function seeding() {
  return prisma.recommendation.createMany({
    data: [
      { name: 'Nightmare', youtubeLink: 'https://www.youtube.com/watch?v=94bGzWyHbu0' },
      { name: 'Hail To The King', youtubeLink: 'https://www.youtube.com/watch?v=DelhLppPSxY' },
      { name: 'Highway to Hell', youtubeLink: 'https://www.youtube.com/watch?v=l482T0yNkeo' },
      { name: 'Welcome to the Jungle', youtubeLink: 'https://www.youtube.com/watch?v=o1tj2zJ2Wvg' },
    ],
    skipDuplicates: true,
  })
}

export const testsRepository = {
    reseting,
    seeding
}