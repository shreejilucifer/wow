import { Box, Button, Flex, Link, Stack } from '@chakra-ui/core';
import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useLogoutAdminMutation } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';

interface ILayoutProps {}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
	const router = useRouter();
	const apolloClient = useApolloClient();
	const [logout] = useLogoutAdminMutation();
	return (
		<Stack>
			<Flex
				backgroundColor="teal.500"
				h={20}
				px={30}
				w="full"
				justifyContent="space-between"
				alignItems="center"
			>
				<Flex>
					<Box px={4}>
						<NextLink href="/statistics">
							<Link color="white">Statistics</Link>
						</NextLink>
					</Box>
					<Box px={4}>
						<NextLink href="/company">
							<Link color="white">Company</Link>
						</NextLink>
					</Box>
					<Box px={4}>
						<NextLink href="/news">
							<Link color="white">News</Link>
						</NextLink>
					</Box>
					<Box px={4}>
						<NextLink href="/broker">
							<Link color="white">Broker</Link>
						</NextLink>
					</Box>
				</Flex>
				<Box px={4}>
					<Button
						onClick={async () => {
							await logout();
							await router.push('/');
							await apolloClient.resetStore();
						}}
						variant="link"
						color="white"
					>
						Logout
					</Button>
				</Box>
			</Flex>
			<Flex px={50} flexDirection="column">
				{children}
			</Flex>
		</Stack>
	);
};

export default Layout;
