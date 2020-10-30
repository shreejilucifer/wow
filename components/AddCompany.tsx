import { Flex, Box, Heading, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { InputField } from './InputField';

interface IAddCompanyProps {}

const AddCompany: React.FunctionComponent<IAddCompanyProps> = () => {
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
					onSubmit={() => {
						console.log('Submit');
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField name="name" label="Name" placeholder="Company Name" />
							<Box mt={4}>
								<InputField
									name="category"
									label="Category"
									placeholder="Company Category"
								/>
							</Box>
							<Box mt={4}>
								<InputField
									name="shareCount"
									label="Share Count"
									placeholder="Company Share Count"
									type="number"
								/>
							</Box>
							<Box mt={4}>
								<InputField
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
							</Flex>
						</Form>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};

export default AddCompany;
