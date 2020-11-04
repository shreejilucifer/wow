import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  meAdmin?: Maybe<Admin>;
  companies: Array<Company>;
  company: Company;
  companiesAdmin: Array<Company>;
  currentholding: Array<CurrentHolding>;
  dashboard: Dashboard;
  hello: Scalars['String'];
  news: Array<News>;
  newsAdmin: Array<News>;
  transactions: Array<Transaction>;
  me?: Maybe<User>;
  watchlist?: Maybe<Array<Watchlist>>;
};


export type QueryCompanyArgs = {
  companyId: Scalars['Float'];
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Int'];
  email: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['Int'];
  name: Scalars['String'];
  category: Scalars['String'];
  shareCount: Scalars['Int'];
  shareValue: Scalars['Int'];
  previousValues: Array<PreviousValue>;
};

export type PreviousValue = {
  __typename?: 'PreviousValue';
  id: Scalars['Int'];
  shareValue: Scalars['Int'];
  time: Scalars['String'];
  company: Company;
};

export type CurrentHolding = {
  __typename?: 'CurrentHolding';
  id: Scalars['Int'];
  sharePrice: Scalars['Int'];
  shareCount: Scalars['Int'];
  company: Company;
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  mobile: Scalars['String'];
  walletAmount: Scalars['Int'];
};

export type Dashboard = {
  __typename?: 'Dashboard';
  grossingCompany: Scalars['String'];
  leaderboardTopper: Scalars['Int'];
  sharesOwn: Scalars['Int'];
  balance: Scalars['Int'];
};

export type News = {
  __typename?: 'News';
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  time: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['Int'];
  type: Scalars['String'];
  noOfShares: Scalars['Float'];
  shareAmount: Scalars['Float'];
  time: Scalars['String'];
  user: User;
  company: Company;
};

export type Watchlist = {
  __typename?: 'Watchlist';
  id: Scalars['Int'];
  user: User;
  company: Company;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAdmin: AdminResponse;
  loginAdmin: AdminResponse;
  logoutAdmin: Scalars['Boolean'];
  addCompany?: Maybe<Company>;
  changeShareValueAdmin: Company;
  addNewsAdmin: News;
  buy: TransactionResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addWatchlist?: Maybe<Watchlist>;
  removeWatchlist?: Maybe<Scalars['Boolean']>;
};


export type MutationRegisterAdminArgs = {
  options: AdminRegisterInput;
  secret: Scalars['String'];
};


export type MutationLoginAdminArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddCompanyArgs = {
  options: CompanyAddInput;
};


export type MutationChangeShareValueAdminArgs = {
  shareValue: Scalars['Float'];
  companyId: Scalars['Float'];
};


export type MutationAddNewsAdminArgs = {
  description: Scalars['String'];
  title: Scalars['String'];
};


export type MutationBuyArgs = {
  options: TransactionInput;
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  mobile: Scalars['String'];
};


export type MutationAddWatchlistArgs = {
  companyId: Scalars['Float'];
};


export type MutationRemoveWatchlistArgs = {
  watchlistId: Scalars['Float'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<FieldError>>;
  admin?: Maybe<Admin>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AdminRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CompanyAddInput = {
  name: Scalars['String'];
  category: Scalars['String'];
  shareCount: Scalars['Int'];
  shareValue: Scalars['Int'];
};

export type TransactionResponse = {
  __typename?: 'TransactionResponse';
  errors?: Maybe<Array<FieldError>>;
  transaction?: Maybe<Transaction>;
};

export type TransactionInput = {
  type: Scalars['String'];
  noOfShares: Scalars['Int'];
  companyId: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserRegisterInput = {
  email: Scalars['String'];
  mobile: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type RegularAdminFragment = (
  { __typename?: 'Admin' }
  & Pick<Admin, 'email'>
);

export type RegularAdminResponseFragment = (
  { __typename?: 'AdminResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, admin?: Maybe<(
    { __typename?: 'Admin' }
    & RegularAdminFragment
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type LoginAdminMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginAdminMutation = (
  { __typename?: 'Mutation' }
  & { loginAdmin: (
    { __typename?: 'AdminResponse' }
    & RegularAdminResponseFragment
  ) }
);

export type LogoutAdminMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutAdmin'>
);

export type MeAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type MeAdminQuery = (
  { __typename?: 'Query' }
  & { meAdmin?: Maybe<(
    { __typename?: 'Admin' }
    & RegularAdminFragment
  )> }
);

export type NewsAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsAdminQuery = (
  { __typename?: 'Query' }
  & { newsAdmin: Array<(
    { __typename?: 'News' }
    & Pick<News, 'id' | 'title' | 'description' | 'time'>
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularAdminFragmentDoc = gql`
    fragment RegularAdmin on Admin {
  email
}
    `;
export const RegularAdminResponseFragmentDoc = gql`
    fragment RegularAdminResponse on AdminResponse {
  errors {
    ...RegularError
  }
  admin {
    ...RegularAdmin
  }
}
    ${RegularErrorFragmentDoc}
${RegularAdminFragmentDoc}`;
export const LoginAdminDocument = gql`
    mutation LoginAdmin($email: String!, $password: String!) {
  loginAdmin(email: $email, password: $password) {
    ...RegularAdminResponse
  }
}
    ${RegularAdminResponseFragmentDoc}`;
export type LoginAdminMutationFn = Apollo.MutationFunction<LoginAdminMutation, LoginAdminMutationVariables>;

/**
 * __useLoginAdminMutation__
 *
 * To run a mutation, you first call `useLoginAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAdminMutation, { data, loading, error }] = useLoginAdminMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginAdminMutation(baseOptions?: Apollo.MutationHookOptions<LoginAdminMutation, LoginAdminMutationVariables>) {
        return Apollo.useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LoginAdminDocument, baseOptions);
      }
export type LoginAdminMutationHookResult = ReturnType<typeof useLoginAdminMutation>;
export type LoginAdminMutationResult = Apollo.MutationResult<LoginAdminMutation>;
export type LoginAdminMutationOptions = Apollo.BaseMutationOptions<LoginAdminMutation, LoginAdminMutationVariables>;
export const LogoutAdminDocument = gql`
    mutation LogoutAdmin {
  logoutAdmin
}
    `;
export type LogoutAdminMutationFn = Apollo.MutationFunction<LogoutAdminMutation, LogoutAdminMutationVariables>;

/**
 * __useLogoutAdminMutation__
 *
 * To run a mutation, you first call `useLogoutAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutAdminMutation, { data, loading, error }] = useLogoutAdminMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutAdminMutation(baseOptions?: Apollo.MutationHookOptions<LogoutAdminMutation, LogoutAdminMutationVariables>) {
        return Apollo.useMutation<LogoutAdminMutation, LogoutAdminMutationVariables>(LogoutAdminDocument, baseOptions);
      }
export type LogoutAdminMutationHookResult = ReturnType<typeof useLogoutAdminMutation>;
export type LogoutAdminMutationResult = Apollo.MutationResult<LogoutAdminMutation>;
export type LogoutAdminMutationOptions = Apollo.BaseMutationOptions<LogoutAdminMutation, LogoutAdminMutationVariables>;
export const MeAdminDocument = gql`
    query MeAdmin {
  meAdmin {
    ...RegularAdmin
  }
}
    ${RegularAdminFragmentDoc}`;

/**
 * __useMeAdminQuery__
 *
 * To run a query within a React component, call `useMeAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeAdminQuery(baseOptions?: Apollo.QueryHookOptions<MeAdminQuery, MeAdminQueryVariables>) {
        return Apollo.useQuery<MeAdminQuery, MeAdminQueryVariables>(MeAdminDocument, baseOptions);
      }
export function useMeAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeAdminQuery, MeAdminQueryVariables>) {
          return Apollo.useLazyQuery<MeAdminQuery, MeAdminQueryVariables>(MeAdminDocument, baseOptions);
        }
export type MeAdminQueryHookResult = ReturnType<typeof useMeAdminQuery>;
export type MeAdminLazyQueryHookResult = ReturnType<typeof useMeAdminLazyQuery>;
export type MeAdminQueryResult = Apollo.QueryResult<MeAdminQuery, MeAdminQueryVariables>;
export const NewsAdminDocument = gql`
    query NewsAdmin {
  newsAdmin {
    id
    title
    description
    time
  }
}
    `;

/**
 * __useNewsAdminQuery__
 *
 * To run a query within a React component, call `useNewsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsAdminQuery(baseOptions?: Apollo.QueryHookOptions<NewsAdminQuery, NewsAdminQueryVariables>) {
        return Apollo.useQuery<NewsAdminQuery, NewsAdminQueryVariables>(NewsAdminDocument, baseOptions);
      }
export function useNewsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsAdminQuery, NewsAdminQueryVariables>) {
          return Apollo.useLazyQuery<NewsAdminQuery, NewsAdminQueryVariables>(NewsAdminDocument, baseOptions);
        }
export type NewsAdminQueryHookResult = ReturnType<typeof useNewsAdminQuery>;
export type NewsAdminLazyQueryHookResult = ReturnType<typeof useNewsAdminLazyQuery>;
export type NewsAdminQueryResult = Apollo.QueryResult<NewsAdminQuery, NewsAdminQueryVariables>;