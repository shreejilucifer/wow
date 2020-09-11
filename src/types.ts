import { Connection } from 'typeorm';

export type MyContext = {
	em: Connection;
};
