import { Box, Flex, Heading, Stack } from '@chakra-ui/core';
import * as React from 'react';
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
	return (
		<Flex w="full" flexDirection="column">
			<Heading size="sm" my={4}>
				News
			</Heading>
			<Stack>
				<ListItem
					title="Title 01"
					description="Description 01...."
					time={new Date()}
					id={1}
				/>
			</Stack>
		</Flex>
	);
};

export default ListNews;
