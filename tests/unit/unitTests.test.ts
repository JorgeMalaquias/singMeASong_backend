import { jest } from '@jest/globals';
import * as errorUtils from '../../src/utils/errorUtils';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';


describe('Testing the function insert from services',()=>{
    it.todo('The function should call either the function from repository findByname to check if the recommendation already exists, simulate a case in wich this does not happen and then call the function that finally creates the new recommendation');
    it.todo('The function should call either the function from repository findByname to check if the recommendation already exists, simulate a case in wich this happen and then not call the function that would create the new recommendation');
    //pay attention to the format of the parameter data
})

describe('Testing the function upvote from services',()=>{
    it.todo('The function should call the functio that checks if the id of the recommendation exists and return it or throw an error. Simulate a case in which the id is found mocking the function that check that, then check if the updatescore function from repository is called. ');
    it.todo('The function should call the functio that checks if the id of the recommendation exists and return it or throw an error. Simulate a case in which the id is not found and an erro is thrown mocking the function that check that, then check if the updatescore function from repository is called.');
})
describe('Testing the function downvote from services',()=>{
    it.todo('The function should call the function that checks if the id of the recommendation exists and return it or throw an error. Simulate a case in which the id is found mocking the function that check that, then check if the updatescore function from repository is called mocking it to return an object to be used in the upcoming "if" and not corresponding to the condition, so the function remove from repository called inside the if is not called. ');
    it.todo('The function should call the function that checks if the id of the recommendation exists and return it or throw an error. Simulate a case in which the id is not found and an error is thrown mocking the function that check that, then check if the updatescore function from repository is not called. ');
    it.todo('The function should call the function that checks if the id of the recommendation exists and return it or throw an error. Simulate a case in which the id is found mocking the function that check that, then check if the updatescore function from repository is called mocking it to return an object to be used in the upcoming "if" and corresponding to the condition, so the function remove from repository called inside the if is called. ');
    it.todo('');
    it.todo('');
    it.todo('');
    it.todo('');
})


describe('Testing the function getRandom from services',()=>{
    it.todo('Testing a case in which the funcion that gets the data from getByscore return an array bigger than length zero  and one of its element is returned randomly');
    it.todo('Testing a case in which the funcion that gets the data from getByscore return an empty array and an error is thrown, to do that the function that throws the error must be mocked');
})

describe('Testing the function get from services',()=>{
    it.todo('Testing if this function calls the function findAll from the repository, mocking that');
})
describe('Testing the function getById: getByIdOrFail from services',()=>{
    it.todo('Testing if this function calls the function find from the repository, mocking that. In this case simulate that this function return some object and then this is returned');
    it.todo('Testing if this function calls the function find from the repository, mocking that. In this case simulate that this function does not return any object and then an error is thrown');
    it.todo('');
})

describe('Testing the function getTop from services',()=>{
    it.todo('Testing if this function calls the function getAmountByScore from the repository, mocking that');
})