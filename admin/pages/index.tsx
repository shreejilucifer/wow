import { Alert, Box, Button, Flex, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import { InputField } from '../components/InputField';
import { useLoginAdminMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';

interface IIndexPageProps {}

const IndexPage: React.FunctionComponent<IIndexPageProps> = () => {
	const router = useRouter();
	const [login, { error }] = useLoginAdminMutation();
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
						initialValues={{ email: '', password: '' }}
						onSubmit={async (values, { setErrors }) => {
							const response = await login({
								variables: values,
							});
							if (response.data?.loginAdmin.errors) {
								setErrors(toErrorMap(response.data.loginAdmin.errors));
							} else if (response.data?.loginAdmin.admin) {
								if (typeof router.query.next === 'string') {
									router.push(router.query.next);
								} else {
									router.push('/statistics');
								}
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<InputField
									disabled={isSubmitting}
									name="email"
									label="Email"
									placeholder="johndoe"
									type="text"
								/>
								<Box mt={4}>
									<InputField
										disabled={isSubmitting}
										name="password"
										label="Password"
										placeholder="••••••••"
										type="password"
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
								{error && <Alert>{error.message}</Alert>}
							</Form>
						)}
					</Formik>
				</Box>
			</Flex>
		</div>
	);
};

export default withApollo({ ssr: false })(IndexPage);
