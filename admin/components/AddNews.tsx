import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useAddNewsAdminMutation } from '../generated/graphql';
import { InputField } from './InputField';

interface IAddNewsProps {}

const AddNews: React.FunctionComponent<IAddNewsProps> = () => {
	const [addNews, { loading }] = useAddNewsAdminMutation();
	return (
		<Flex w="full" justifyContent="center">
			<Box p={10} w="full" shadow="md">
				<Heading size="sm" mb={8}>
					Add News
				</Heading>
				<Formik
					initialValues={{ title: '', description: '' }}
					onSubmit={async (values, { resetForm }) => {
						const response = await addNews({
							variables: values,
						});
						if (response.data?.addNewsAdmin) resetForm();
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								disabled={isSubmitting}
								type="text"
								name="title"
								label="Title"
								placeholder="Title"
							/>
							<Box mt={4}>
								<InputField
									disabled={isSubmitting}
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
								{loading && <Spinner />}
							</Flex>
						</Form>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};

export default AddNews;
