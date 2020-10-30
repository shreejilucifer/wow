import {
	Box,
	Divider,
	Flex,
	Heading,
	IconButton,
	SimpleGrid,
	Text,
} from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { CompanyType } from '../interfaces';
import { InputField } from './InputField';

interface IListCompanyProps {}

const ListItem: React.FunctionComponent<CompanyType> = (props) => {
	const [editable, setEditable] = React.useState(false);

	return (
		<SimpleGrid
			columns={5}
			borderBottom="1px"
			borderBottomColor="gray.100"
			py={2}
		>
			<Flex alignItems="center">
				<Text>{props.id}</Text>
			</Flex>
			<Flex alignItems="center">
				<Text>{props.name}</Text>
			</Flex>
			<Flex alignItems="center">
				<Text>{props.category}</Text>
			</Flex>
			<Flex alignItems="center">
				<Text>{props.shareCount}</Text>
			</Flex>
			<Flex alignItems="center">
				{editable ? (
					<Formik
						initialValues={{ shareValue: '' }}
						onSubmit={() => {
							console.log('Submit');
							setEditable(false);
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<Flex w="full" flexDirection="row">
									<InputField
										type="number"
										name="shareValue"
										placeholder="Share Value"
										label=""
									/>
									<IconButton
										isLoading={isSubmitting}
										aria-label="Change Share Value"
										icon="check-circle"
										type="submit"
									/>
									<IconButton
										isLoading={isSubmitting}
										aria-label="Cancel"
										icon="not-allowed"
										onClick={() => {
											setEditable(false);
										}}
									/>
								</Flex>
							</Form>
						)}
					</Formik>
				) : (
					<Flex w="full" flexDirection="row" justifyContent="space-between">
						<Text>{props.shareValue}</Text>
						<IconButton
							aria-label="Edit Share Value"
							icon="edit"
							size="sm"
							onClick={() => setEditable(true)}
						/>
					</Flex>
				)}
			</Flex>
		</SimpleGrid>
	);
};

const ListCompany: React.FunctionComponent<IListCompanyProps> = () => {
	return (
		<Flex w="full" flexDirection="column">
			<Heading size="sm" my={4}>
				Companies
			</Heading>
			<SimpleGrid columns={5} spacing={1}>
				<Box>
					<Text fontWeight="bold">ID</Text>
				</Box>
				<Box>
					<Text fontWeight="bold">Name</Text>
				</Box>
				<Box>
					<Text fontWeight="bold">Category</Text>
				</Box>
				<Box>
					<Text fontWeight="bold">Share Count</Text>
				</Box>
				<Box>
					<Text fontWeight="bold">Share Value</Text>
				</Box>
			</SimpleGrid>
			<Divider />
			<ListItem
				id={1}
				name="Reliance Jio"
				category="Telecom"
				shareCount={300}
				shareValue={30}
			/>
		</Flex>
	);
};

export default ListCompany;
