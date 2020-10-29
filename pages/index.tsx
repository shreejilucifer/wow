import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { InputField } from '../components/InputField';

interface IIndexPageProps {}

const IndexPage: React.FunctionComponent<IIndexPageProps> = () => {
	return (
		<div>
			<Flex
				justifyContent="center"
				align="center"
				height={20}
				backgroundColor="green.500"
				shadow="md"
			>
				<Heading color="white">Wolf of Wallstreet - Admin Panel</Heading>
			</Flex>
			<Flex height={500} justifyContent="center" alignItems="center">
				<Box p={10} width={500} shadow="md">
					<Formik
						initialValues={{ username: '', password: '' }}
						onSubmit={() => {
							console.log('Submit');
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<InputField
									name="username"
									label="Username"
									placeholder="johndoe"
								/>
								<Box mt={4}>
									<InputField
										name="password"
										label="Password"
										placeholder="••••••••"
									/>
								</Box>
								<Flex mt={4} alignItems="center" justifyContent="space-between">
									<Button
										type="submit"
										variantColor="green"
										isLoading={isSubmitting}
									>
										Login
									</Button>
								</Flex>
							</Form>
						)}
					</Formik>
				</Box>
			</Flex>
		</div>
	);
};

export default IndexPage;
