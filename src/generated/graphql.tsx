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
  hello: Scalars['String'];
  me?: Maybe<User>;
  companies: Array<Company>;
  company: Company;
  watchlist?: Maybe<Array<Watchlist>>;
  transactions: Array<Transaction>;
  dashboard: Dashboard;
  news: Array<News>;
  currentholding: Array<CurrentHolding>;
};


export type QueryCompanyArgs = {
  companyId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  mobile: Scalars['String'];
  walletAmount: Scalars['Int'];
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

export type Watchlist = {
  __typename?: 'Watchlist';
  id: Scalars['Int'];
  user: User;
  company: Company;
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

export type CurrentHolding = {
  __typename?: 'CurrentHolding';
  id: Scalars['Int'];
  sharePrice: Scalars['Int'];
  shareCount: Scalars['Int'];
  company: Company;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addCompany?: Maybe<Company>;
  addWatchlist?: Maybe<Watchlist>;
  removeWatchlist?: Maybe<Scalars['Boolean']>;
  buy: TransactionResponse;
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  mobile: Scalars['String'];
};


export type MutationAddCompanyArgs = {
  options: CompanyAddInput;
};


export type MutationAddWatchlistArgs = {
  companyId: Scalars['Float'];
};


export type MutationRemoveWatchlistArgs = {
  watchlistId: Scalars['Float'];
};


export type MutationBuyArgs = {
  options: TransactionInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  mobile: Scalars['String'];
  name: Scalars['String'];
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

export type RegularCompanyFragment = (
  { __typename?: 'Company' }
  & Pick<Company, 'id' | 'name' | 'category' | 'shareCount' | 'shareValue'>
  & { previousValues: Array<(
    { __typename?: 'PreviousValue' }
    & Pick<PreviousValue, 'id' | 'shareValue' | 'time'>
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'name'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type AddToWatchlistMutationVariables = Exact<{
  companyId: Scalars['Float'];
}>;


export type AddToWatchlistMutation = (
  { __typename?: 'Mutation' }
  & { addWatchlist?: Maybe<(
    { __typename?: 'Watchlist' }
    & { company: (
      { __typename?: 'Company' }
      & RegularCompanyFragment
    ) }
  )> }
);

export type BuyMutationVariables = Exact<{
  companyId: Scalars['Int'];
  type: Scalars['String'];
  noOfShares: Scalars['Int'];
}>;


export type BuyMutation = (
  { __typename?: 'Mutation' }
  & { buy: (
    { __typename?: 'TransactionResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, transaction?: Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'type' | 'noOfShares' | 'shareAmount'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  mobile: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RemoveFromWatchlistMutationVariables = Exact<{
  watchlistId: Scalars['Float'];
}>;


export type RemoveFromWatchlistMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeWatchlist'>
);

export type SignupMutationVariables = Exact<{
  mobile: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = (
  { __typename?: 'Query' }
  & { companies: Array<(
    { __typename?: 'Company' }
    & RegularCompanyFragment
  )> }
);

export type DashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardQuery = (
  { __typename?: 'Query' }
  & { dashboard: (
    { __typename?: 'Dashboard' }
    & Pick<Dashboard, 'grossingCompany' | 'leaderboardTopper' | 'sharesOwn' | 'balance'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type TransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'type' | 'noOfShares' | 'shareAmount' | 'time'>
    & { company: (
      { __typename?: 'Company' }
      & Pick<Company, 'name' | 'category'>
    ) }
  )> }
);

export type WatchlistQueryVariables = Exact<{ [key: string]: never; }>;


export type WatchlistQuery = (
  { __typename?: 'Query' }
  & { watchlist?: Maybe<Array<(
    { __typename?: 'Watchlist' }
    & Pick<Watchlist, 'id'>
    & { company: (
      { __typename?: 'Company' }
      & RegularCompanyFragment
    ) }
  )>> }
);

export const RegularCompanyFragmentDoc = gql`
    fragment RegularCompany on Company {
  id
  name
  category
  shareCount
  shareValue
  previousValues {
    id
    shareValue
    time
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  name
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AddToWatchlistDocument = gql`
    mutation AddToWatchlist($companyId: Float!) {
  addWatchlist(companyId: $companyId) {
    company {
      ...RegularCompany
    }
  }
}
    ${RegularCompanyFragmentDoc}`;
export type AddToWatchlistMutationFn = Apollo.MutationFunction<AddToWatchlistMutation, AddToWatchlistMutationVariables>;

/**
 * __useAddToWatchlistMutation__
 *
 * To run a mutation, you first call `useAddToWatchlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWatchlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWatchlistMutation, { data, loading, error }] = useAddToWatchlistMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useAddToWatchlistMutation(baseOptions?: Apollo.MutationHookOptions<AddToWatchlistMutation, AddToWatchlistMutationVariables>) {
        return Apollo.useMutation<AddToWatchlistMutation, AddToWatchlistMutationVariables>(AddToWatchlistDocument, baseOptions);
      }
export type AddToWatchlistMutationHookResult = ReturnType<typeof useAddToWatchlistMutation>;
export type AddToWatchlistMutationResult = Apollo.MutationResult<AddToWatchlistMutation>;
export type AddToWatchlistMutationOptions = Apollo.BaseMutationOptions<AddToWatchlistMutation, AddToWatchlistMutationVariables>;
export const BuyDocument = gql`
    mutation Buy($companyId: Int!, $type: String!, $noOfShares: Int!) {
  buy(options: {type: $type, noOfShares: $noOfShares, companyId: $companyId}) {
    errors {
      field
      message
    }
    transaction {
      id
      type
      noOfShares
      shareAmount
    }
  }
}
    `;
export type BuyMutationFn = Apollo.MutationFunction<BuyMutation, BuyMutationVariables>;

/**
 * __useBuyMutation__
 *
 * To run a mutation, you first call `useBuyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyMutation, { data, loading, error }] = useBuyMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      type: // value for 'type'
 *      noOfShares: // value for 'noOfShares'
 *   },
 * });
 */
export function useBuyMutation(baseOptions?: Apollo.MutationHookOptions<BuyMutation, BuyMutationVariables>) {
        return Apollo.useMutation<BuyMutation, BuyMutationVariables>(BuyDocument, baseOptions);
      }
export type BuyMutationHookResult = ReturnType<typeof useBuyMutation>;
export type BuyMutationResult = Apollo.MutationResult<BuyMutation>;
export type BuyMutationOptions = Apollo.BaseMutationOptions<BuyMutation, BuyMutationVariables>;
export const LoginDocument = gql`
    mutation Login($mobile: String!, $password: String!) {
  login(mobile: $mobile, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      mobile: // value for 'mobile'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RemoveFromWatchlistDocument = gql`
    mutation RemoveFromWatchlist($watchlistId: Float!) {
  removeWatchlist(watchlistId: $watchlistId)
}
    `;
export type RemoveFromWatchlistMutationFn = Apollo.MutationFunction<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>;

/**
 * __useRemoveFromWatchlistMutation__
 *
 * To run a mutation, you first call `useRemoveFromWatchlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromWatchlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromWatchlistMutation, { data, loading, error }] = useRemoveFromWatchlistMutation({
 *   variables: {
 *      watchlistId: // value for 'watchlistId'
 *   },
 * });
 */
export function useRemoveFromWatchlistMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>) {
        return Apollo.useMutation<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>(RemoveFromWatchlistDocument, baseOptions);
      }
export type RemoveFromWatchlistMutationHookResult = ReturnType<typeof useRemoveFromWatchlistMutation>;
export type RemoveFromWatchlistMutationResult = Apollo.MutationResult<RemoveFromWatchlistMutation>;
export type RemoveFromWatchlistMutationOptions = Apollo.BaseMutationOptions<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($mobile: String!, $password: String!, $email: String!, $name: String!) {
  register(options: {email: $email, mobile: $mobile, name: $name, password: $password}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      mobile: // value for 'mobile'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const CompaniesDocument = gql`
    query Companies {
  companies {
    ...RegularCompany
  }
}
    ${RegularCompanyFragmentDoc}`;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
      }
export function useCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
export const DashboardDocument = gql`
    query Dashboard {
  dashboard {
    grossingCompany
    leaderboardTopper
    sharesOwn
    balance
  }
}
    `;

/**
 * __useDashboardQuery__
 *
 * To run a query within a React component, call `useDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardQuery(baseOptions?: Apollo.QueryHookOptions<DashboardQuery, DashboardQueryVariables>) {
        return Apollo.useQuery<DashboardQuery, DashboardQueryVariables>(DashboardDocument, baseOptions);
      }
export function useDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardQuery, DashboardQueryVariables>) {
          return Apollo.useLazyQuery<DashboardQuery, DashboardQueryVariables>(DashboardDocument, baseOptions);
        }
export type DashboardQueryHookResult = ReturnType<typeof useDashboardQuery>;
export type DashboardLazyQueryHookResult = ReturnType<typeof useDashboardLazyQuery>;
export type DashboardQueryResult = Apollo.QueryResult<DashboardQuery, DashboardQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TransactionsDocument = gql`
    query Transactions {
  transactions {
    id
    type
    noOfShares
    shareAmount
    time
    company {
      name
      category
    }
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;
export const WatchlistDocument = gql`
    query Watchlist {
  watchlist {
    id
    company {
      ...RegularCompany
    }
  }
}
    ${RegularCompanyFragmentDoc}`;

/**
 * __useWatchlistQuery__
 *
 * To run a query within a React component, call `useWatchlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchlistQuery({
 *   variables: {
 *   },
 * });
 */
export function useWatchlistQuery(baseOptions?: Apollo.QueryHookOptions<WatchlistQuery, WatchlistQueryVariables>) {
        return Apollo.useQuery<WatchlistQuery, WatchlistQueryVariables>(WatchlistDocument, baseOptions);
      }
export function useWatchlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WatchlistQuery, WatchlistQueryVariables>) {
          return Apollo.useLazyQuery<WatchlistQuery, WatchlistQueryVariables>(WatchlistDocument, baseOptions);
        }
export type WatchlistQueryHookResult = ReturnType<typeof useWatchlistQuery>;
export type WatchlistLazyQueryHookResult = ReturnType<typeof useWatchlistLazyQuery>;
export type WatchlistQueryResult = Apollo.QueryResult<WatchlistQuery, WatchlistQueryVariables>;