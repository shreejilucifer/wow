import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Admin } from './entities/Admin';
import { Company } from './entities/Company';
import { CurrentHolding } from './entities/CurrentHolding';
import { Dashboard } from './entities/Dashboard';
import { News } from './entities/News';
import { PreviousValue } from './entities/PreviousValue';
import { Transaction } from './entities/Transaction';
import { User } from './entities/User';
import { Watchlist } from './entities/Watchlist';
import { AdminResolver } from './resolvers/admin';
import { CompanyResolver } from './resolvers/company';
import { CurrentHoldingResolver } from './resolvers/currentholding';
import { DashboardResolver } from './resolvers/dashboard';
import { HelloResolver } from './resolvers/hello';
import { NewsResolver } from './resolvers/news';
import { TransactionResolver } from './resolvers/transaction';
import { UserResolver } from './resolvers/user';
import { WatchlistResolver } from './resolvers/watchlist';

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
			Admin,
		],
	});

	await conn.runMigrations();

	const app = express();

	const RedisStore = connectRedis(session);

	const redisClient = redis.createClient({
		url: process.env.REDIS_URL,
	});

	app.use(
		cors({
			origin: [
				'http://localhost:3000',
				'https://wow-admin.shreejipedhadiya.in',
				'https://wow.shreejipedhadiya.in',
			],
			credentials: true,
		})
	);

	app.use(
		session({
			name: 'qid',
			store: new RedisStore({ client: redisClient, disableTouch: true }),
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
				NewsResolver,
				CurrentHoldingResolver,
				AdminResolver,
			],
			validate: false,
		}),
		playground: true,
		context: ({ req, res }) => ({ em: conn, req, res, redis: redisClient }),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(process.env.PORT, () => {
		console.log(`Server Started on http://localhost:${process.env.PORT}`);
	});
};

main().catch((err) => {
	console.log(err);
});
