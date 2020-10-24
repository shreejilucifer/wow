import 'reflect-metadata';
import 'dotenv-safe/config';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { User } from './entities/User';
import { Company } from './entities/Company';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/user';
import { CompanyResolver } from './resolvers/company';
import { PreviousValue } from './entities/PreviousValue';
import { Watchlist } from './entities/Watchlist';
import { WatchlistResolver } from './resolvers/watchlist';
import { CurrentHolding } from './entities/CurrentHolding';
import { News } from './entities/News';
import { Transaction } from './entities/Transaction';
import { TransactionResolver } from './resolvers/transaction';
import { Dashboard } from './entities/Dashboard';
import { DashboardResolver } from './resolvers/dashboard';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: true,
		synchronize: true,
		entities: [
			User,
			Company,
			PreviousValue,
			Watchlist,
			CurrentHolding,
			Transaction,
			News,
			Dashboard,
		],
	});

	await conn.runMigrations();

	const app = express();

	const RedisStore = connectRedis(session);
	const redis = new Redis(process.env.REDIS_URL);

	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		})
	);

	app.use(
		session({
			name: 'qid',
			store: new RedisStore({ client: redis, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 Years
				httpOnly: true,
				sameSite: 'lax',
			},
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET,
			resave: false,
		})
	);

	app.get('/', (_, res) => {
		res.send('Welcome to Wallstreet 3 Backend API');
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				HelloResolver,
				UserResolver,
				CompanyResolver,
				WatchlistResolver,
				TransactionResolver,
				DashboardResolver,
			],
			validate: false,
		}),
		playground: true,
		context: ({ req, res }) => ({ em: conn, req, res, redis }),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(process.env.PORT, () => {
		console.log(`Server Started on http://localhost:${process.env.PORT}`);
	});
};

main().catch((err) => {
	console.log(err);
});
