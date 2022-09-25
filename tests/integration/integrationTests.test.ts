import app from "../../src/app";
import supertest from "supertest";

describe('post - "/"',()=>{
    it.todo('Testing case in which the body of the request is not valid and an error about schema is thrown');
    it.todo('Testing case in which the recommendation name already exists and a conflict error is thrown');
    it.todo('Testing case in which the recommendation is successfully created and a status code 201 is returned');
})
describe('get - "/",',()=>{
    it.todo('Testing if the route returns an array');
})
describe('get - "/random",',()=>{
    it.todo('Testing if the route returns an object that match the type of the database');
    it.todo('Testing if the route returns an error code when the returning is empty');
})
describe('get - "/top/:amount",',()=>{
    it.todo('Testing if the route returns an array with the lenght equal to the amount variable, plus would be if this check if the score is in desc order');
})
describe('get - "/:id",',()=>{
    it.todo('Testing if the route returns an object that match the type of the database and matches the id given');
    it.todo('Testing if the route returns an error found code when the recommendataion does not exist');
})
describe('post - "/:id/upvote",',()=>{
    it.todo('Testing if the route returns a status 200 when the upvote is well done');
    it.todo('Testing if the route returns an error found code when the recommendataion does not exist');
})
describe('post - "/:id/downvote",',()=>{
    it.todo('Testing if the route returns a status 200 when the upvote is well done');
    it.todo('Testing if the route returns an error found code when the recommendataion does not exist');
    it.todo('Testing if the route deletes the recommendation when the downvote makes the score go under -5');
})