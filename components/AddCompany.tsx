import { Flex, Box, Heading, Button, Spinner } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { useAddCompanyMutation } from '../generated/graphql';
import { InputField } from './InputField';

interface IAddCompanyProps {}

const AddCompany: React.FunctionComponent<IAddCompanyProps> = () => {
	const [addCompany, { loading }] = useAddCompanyMutation();

	return (
		<Flex w="full" justifyContent="center">
			<Box p={10} w="full" shadow="md">
				<Heading size="sm" mb={8}>
					Add Company
				</Heading>
				<Formik
					initialValues={{
						name: '',
						category: '',
						shareCount: '',
						shareValue: '',
					}}
					onSubmit={async (values, { resetForm }) => {
						const response = await addCompany({
							variables: {
								category: values.category,
								name: values.name,
								shareCount: parseInt(values.shareCount),
								shareValue: parseInt(values.shareValue),
							},
							refetchQueries: ['CompaniesAdmin'],
						});
						if (response.data?.addCompany) resetForm();
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField name="name" label="Name" placeholder="Company Name" />
							<Box mt={4}>
								<InputField
									disabled={isSubmitting}
									name="category"
									label="Category"
									placeholder="Company Category"
								/>
							</Box>
							<Box mt={4}>
								<InputField
									disabled={isSubmitting}
									name="shareCount"
									label="Share Count"
									placeholder="Company Share Count"
									type="number"
								/>
							</Box>
							<Box mt={4}>
								<InputField
									disabled={isSubmitting}
									name="shareValue"
									label="Share Value"
									placeholder="Company Share Value"
									type="number"
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

export default AddCompany;
