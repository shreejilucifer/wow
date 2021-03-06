import { Request, Response } from 'express';
import { RedisClient } from 'redis';
import { Connection } from 'typeorm';

export type MyContext = {
	em: Connection;
	req: Request;
	res: Response;
	redis: RedisClient;
};
