import { jest } from '@jest/globals';
import * as errorUtils from '../../src/utils/errorUtils';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';

import {prisma} from "../../src/database"
import { not } from 'joi';

const newRecommendation = {
    name: 'what i ve done',
    youtubeLink: 'https://www.youtube.com/watch?v=8sgycukafqQ'
}
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
    await prisma.recommendation.deleteMany();
    jest.resetAllMocks();
    jest.clearAllMocks();
});


afterAll(async () => {
    await prisma.$disconnect();
});

describe('Testing the function insert from services', () => {
    it('Case in which a newRecommendation would be successfully registered', async () => {
        const body = newRecommendation;
        jest.spyOn(recommendationRepository,'findByName').mockImplementationOnce(():any=>{});
        jest.spyOn(recommendationRepository,'create').mockImplementationOnce(():any=>{});
        await recommendationService.insert(body);

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
       
    })

    it('Case in which a newRecommendation has a name that is already used by other one on the database and a conflict error is thrown', async () => {
        const body = newRecommendation;
        jest.spyOn(recommendationRepository,'findByName').mockImplementationOnce(():any=>{return {
            ...body,
            id: 99 //could be any number
        }});
        jest.spyOn(recommendationRepository,'create').mockImplementationOnce(():any=>{});

        const promise = recommendationService.insert(body);

        expect(recommendationRepository.findByName).toBeCalled();
        expect(promise).rejects.toEqual({
            type: 'conflict',
            message: 'Recommendations names must be unique'
        });
        expect(recommendationRepository.create).not.toBeCalled();
       
    });
    //pay attention to the format of the parameter data
})

describe('Testing the function upvote from services', () => {
    it('Case in which the upvote goes well ', async ()=>{
        const obj = newRecommendation;
        await seeding();
        jest.spyOn(recommendationRepository,'find').mockImplementationOnce(():any=>{return {...obj,id:75}});
        jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce(():any=>{});

        await recommendationService.upvote(75);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it('Case in which the upvote return a not found error ', async ()=>{
        const obj = newRecommendation;
        await seeding();
        jest.spyOn(recommendationRepository,'find').mockImplementationOnce(():any=>{});
        jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce(():any=>{});

        

        const promise = recommendationService.upvote(75);

        expect(recommendationRepository.find).toBeCalled();
        expect(promise).rejects.toEqual({
            type: 'not_found',
            message: ''
        });
        expect(recommendationRepository.updateScore).not.toBeCalled();
    });
})


describe('Testing the function downvote from services', () => {
    it('Case in which the downvote goes well ', async ()=>{
        const obj = newRecommendation;
        await seeding();
        jest.spyOn(recommendationRepository,'find').mockImplementationOnce(():any=>{return {...obj,id:75}});
        jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce(():any=>{return {score:7}});
        jest.spyOn(recommendationRepository,'remove').mockImplementationOnce(():any=>{});

        await recommendationService.downvote(75);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    });

    it('Case in which the downvote return a not found error ', async ()=>{
        const obj = newRecommendation;
        await seeding();
        jest.spyOn(recommendationRepository,'find').mockImplementationOnce(():any=>{});
        jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce(():any=>{return {score:7}});
        jest.spyOn(recommendationRepository,'remove').mockImplementationOnce(():any=>{});

        const promise = recommendationService.downvote(75);

        expect(recommendationRepository.find).toBeCalled();
        expect(promise).rejects.toEqual({
            type: 'not_found',
            message: ''
        });
        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    });


    it('Case in which the downvote goes well and the score returned is less than -5 ', async ()=>{
        const obj = newRecommendation;
        await seeding();
        jest.spyOn(recommendationRepository,'find').mockImplementationOnce(():any=>{return {...obj,id:75}});
        jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce(():any=>{return {score:-6}});
        jest.spyOn(recommendationRepository,'remove').mockImplementationOnce(():any=>{});

        await recommendationService.downvote(75);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });
})


describe('Testing the function getRandom from services', () => {
    it.todo('Testing a case in which the funcion that gets the data from getByscore return an array bigger than length zero  and one of its element is returned randomly');
    it.todo('Testing a case in which the funcion that gets the data from getByscore return an empty array and an error is thrown, to do that the function that throws the error must be mocked');
})

describe('Testing the function get from services', () => {
    it.todo('Testing if this function calls the function findAll from the repository, mocking that');
})
describe('Testing the function getById: getByIdOrFail from services', () => {
    it.todo('Testing if this function calls the function find from the repository, mocking that. In this case simulate that this function return some object and then this is returned');
    it.todo('Testing if this function calls the function find from the repository, mocking that. In this case simulate that this function does not return any object and then an error is thrown');
    it.todo('');
})

describe('Testing the function getTop from services', () => {
    it.todo('Testing if this function calls the function getAmountByScore from the repository, mocking that');
})