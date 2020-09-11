import 'reflect-metadata';
import 'dotenv-safe/config';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: true,
		synchronize: true,
		entities: [User],
	});

	const app = express();

	app.get('/', (_, res) => {
		res.send('Welcome to Wallstreet 3 Backend API');
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver],
			validate: false,
		}),
		context: () => ({ em: conn }),
	});

	apolloServer.applyMiddleware({ app });

	app.listen(process.env.PORT, () => {
		console.log(`Server Started on http://localhost:${process.env.PORT}`);
	});
};

main().catch((err) => {
	console.log(err);
});
