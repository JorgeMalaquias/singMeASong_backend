import app from "../../src/app";
import supertest from "supertest";
import {prisma} from "../../src/database"

export async function createNewRecommendation() {
    return await prisma.recommendation.create({
       data: {
           name: 'what i ve done',
           youtubeLink: 'https://www.youtube.com/watch?v=8sgycukafqQ'
       }
     })
}

export async function seeding() {
   return await prisma.recommendation.createMany({
     data: [
       { name: 'Nightmare', youtubeLink: 'https://www.youtube.com/watch?v=94bGzWyHbu0' },
       { name: 'Hail To The King', youtubeLink: 'https://www.youtube.com/watch?v=DelhLppPSxY' },
       { name: 'Highway to Hell', youtubeLink: 'https://www.youtube.com/watch?v=l482T0yNkeo' },
       { name: 'Welcome to the Jungle', youtubeLink: 'https://www.youtube.com/watch?v=o1tj2zJ2Wvg' },
     ],
     skipDuplicates: true,
   })
}
beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
});
describe('post - "/"',()=>{
    it('Testing case in which the body of the request is not valid and an error about schema is thrown', async () => {
        const body = {
            name: 'xablau'
        }
    
        const result = await supertest(app).post(`/recommendations`).send(body);
    
        expect(result.status).toBe(422);
      });
    it('Testing case in which the recommendation name already exists and a conflict error is thrown', async () => {
        const body =  { name: 'Nightmare', youtubeLink: 'https://www.youtube.com/watch?v=94bGzWyHbu0' }
        await supertest(app).post(`/recommendations`).send(body);
    
        const result = await supertest(app).post(`/recommendations`).send(body);
    
        expect(result.status).toBe(409);
      });
    it('Testing case in which the recommendation is successfully created and a status code 201 is returned', async () => {
        const body =  { name: 'Nightmare', youtubeLink: 'https://www.youtube.com/watch?v=94bGzWyHbu0' }
    
        const result = await supertest(app).post(`/recommendations`).send(body);
    
        expect(result.status).toBe(201);
    });
})
describe('get - "/",',()=>{
    it('Testing if the route returns an array', async () => {
        await seeding();
        const result = await supertest(app).get(`/recommendations`);
        expect(result.body).toBeInstanceOf(Array);
    });
})
describe('get - "/random",',()=>{
    it('Testing if the route returns an object that match the type of the database', async () => {
        const recommendation = await createNewRecommendation();
        const result = await supertest(app).get(`/recommendations/random`);
        expect(result.body).toMatchObject(recommendation);
    });
    it('Testing if the route returns an error code when the returning is empty', async () => {
        const result = await supertest(app).get(`/recommendations/random`);
        expect(result.status).toBe(404);
    });
})
describe('get - "/top/:amount",',()=>{
    it('Testing if the route returns an array with the lenght equal to the amount variable', async () => {
        await seeding();
        const amount = 3;
        const result = await supertest(app).get(`/recommendations/top/${amount}`);
        console.log(result.body.length);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body.length).toBe(amount);
    });
})

describe('get - "/:id",',()=>{
    it('Testing if the route returns an object that match the type of the database and matches the id given', async () => {
        const body =  { name: 'Nightmare', youtubeLink: 'https://www.youtube.com/watch?v=94bGzWyHbu0' }
    
        const post = await supertest(app).post(`/recommendations`).send(body);

        const result = await supertest(app).get(`/recommendations/${post.body.id}`);
    
        expect(result.body).toEqual(post.body);
    });
    it('Testing if the route returns an error found code when the recommendataion does not exist', async () => {
    
        const result = await supertest(app).get(`/recommendations/5`);
    
        expect(result.status).toBe(404);
    });
})
describe('post - "/:id/upvote",',()=>{
    it('Testing if the route returns a status 200 when the upvote is well done', async () => {
        await seeding();
    
        const recommendation = await supertest(app).get(`/recommendations/random`);

        const result = await supertest(app).post(`/recommendations/${recommendation.body.id}/upvote`);
    
        expect(result.status).toBe(200);
    });
    it('Testing if the route returns an error found code when the recommendation does not exist', async () => {

        const result = await supertest(app).post(`/recommendations/6/upvote`);
    
        expect(result.status).toBe(404);
    });
})
describe('post - "/:id/downvote",',()=>{
    it('Testing if the route returns a status 200 when the downvote is well done', async () => {
        await seeding();
    
        const recommendation = await supertest(app).get(`/recommendations/random`);

        const result = await supertest(app).post(`/recommendations/${recommendation.body.id}/downvote`);
    
        expect(result.status).toBe(200);
    });
    it('Testing if the route returns an error found code when the recommendation does not exist', async () => {

        const result = await supertest(app).post(`/recommendations/6/downvote`);
    
        expect(result.status).toBe(404);
    });
    it('Testing if the route deletes the recommendation when the downvote makes the score go under -5', async () => {
        await seeding();
    
        const recommendation = await supertest(app).get(`/recommendations/random`);

        await supertest(app).post(`/recommendations/${recommendation.body.id}/downvote`);
        await supertest(app).post(`/recommendations/${recommendation.body.id}/downvote`);
        await supertest(app).post(`/recommendations/${recommendation.body.id}/downvote`);
        await supertest(app).post(`/recommendations/${recommendation.body.id}/downvote`);
        await supertest(app).post(`/recommendations/${recommendation.body.id}/downvote`);
        await supertest(app).post(`/recommendations/${recommendation.body.id}/downvote`);
        
        const result = await supertest(app).get(`/recommendations/${recommendation.body.id}`);

        expect(result.status).toBe(404);
    });
})