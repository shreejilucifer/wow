import { Alert, Box, Flex, Heading, Skeleton, Stack } from '@chakra-ui/core';
import * as React from 'react';
import { useNewsAdminQuery } from '../generated/graphql';
import { NewsType } from '../interfaces';

interface IListNewsProps {}

const ListItem: React.FunctionComponent<NewsType> = (props) => {
	return (
		<Box
			role="group"
			overflow="hidden"
			rounded="md"
			p={5}
			cursor="pointer"
			bg="white"
			boxShadow="md"
			mb={4}
		>
			<Box fontWeight="semibold" fontSize="lg" mb={1} color="gray.900">
				{props.title} - {props.time.toLocaleTimeString()}
			</Box>
			<Box color="gray.700" mb={2}>
				{props.description}
			</Box>
		</Box>
	);
};

const ListNews: React.FunctionComponent<IListNewsProps> = () => {
	const { data, loading, error } = useNewsAdminQuery();

	return (
		<Flex w="full" flexDirection="column">
			<Heading size="sm" my={4}>
				News
			</Heading>
			<Stack>
				{error && <Alert>{error.message}</Alert>}
				{loading && (
					<>
						<Skeleton height="20px" my="10px" />
						<Skeleton height="20px" my="10px" />
						<Skeleton height="20px" my="10px" />
					</>
				)}

				{data?.newsAdmin.length === 0 && <Alert>No News Added</Alert>}

				{data?.newsAdmin.map((news) => (
					<ListItem
						key={news.id}
						title={news.title}
						description={news.description}
						time={new Date(parseInt(news.time))}
						id={news.id}
					/>
				))}
			</Stack>
		</Flex>
	);
};

export default ListNews;
