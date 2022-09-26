import {testsRepository} from "../repositories/testsRepository.js"



async function reseting(){
    await testsRepository.reseting();
}
async function seeding(){
    await testsRepository.seeding();
}

export const testsService = {
    reseting,
    seeding
}