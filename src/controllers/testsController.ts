
import { Request, Response } from 'express';

import { testsService } from '../services/testsService.js';

async function resetDatabase(req: Request, res: Response) {
  await testsService.reseting();
  res.sendStatus(200);
}

 async function seed(req: Request, res: Response) {
    await testsService.seeding();
  res.sendStatus(200);
}

export const testsController =  {
    resetDatabase,
    seed
}
