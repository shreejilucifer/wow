import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { Connection } from 'typeorm';

export type MyContext = {
	em: Connection;
	req: Request;
	res: Response;
	redis: Redis;
};
