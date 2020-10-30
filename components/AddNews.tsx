import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { InputField } from './InputField';

interface IAddNewsProps {}

const AddNews: React.FunctionComponent<IAddNewsProps> = () => {
	return (
		<Flex w="full" justifyContent="center">
			<Box p={10} w="full" shadow="md">
				<Heading size="sm" mb={8}>
					Add News
				</Heading>
				<Formik
					initialValues={{ title: '', description: '' }}
					onSubmit={() => {
						console.log('Submit');
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField name="title" label="Title" placeholder="Title" />
							<Box mt={4}>
								<InputField
									name="description"
									label="Description"
									placeholder="Description...."
									textarea
								/>
							</Box>
							<Flex mt={4} alignItems="center" justifyContent="space-between">
								<Button
									type="submit"
									variantColor="green"
									isLoading={isSubmitting}
								>
									Add
								</Button>
							</Flex>
						</Form>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};

export default AddNews;
