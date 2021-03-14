import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  me: User;
  myTravels: Array<Travel>;
  getTravel: Travel;
  users?: Maybe<Array<User>>;
};

export type QueryGetTravelArgs = {
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  uuid: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  travels: Array<Travel>;
};

export type Travel = {
  __typename?: "Travel";
  uuid: Scalars["String"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  likeCounts: Scalars["Int"];
  albums: Array<Album>;
  albumsCount: Scalars["Int"];
};

export type Album = {
  __typename?: "Album";
  uuid: Scalars["String"];
  isPublic: Scalars["Boolean"];
  name: Scalars["String"];
  photos: Array<Photo>;
  photoCount: Scalars["Int"];
};

export type Photo = {
  __typename?: "Photo";
  url: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAlbum: Album;
  login: User;
  register: SucessObject;
  logout: SucessObject;
  validateEmail: SucessObject;
  createTravel?: Maybe<Travel>;
};

export type MutationCreateAlbumArgs = {
  input: CreateAlbumInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationValidateEmailArgs = {
  key: Scalars["String"];
};

export type MutationCreateTravelArgs = {
  input: CreateTravelInput;
};

export type CreateAlbumInput = {
  travelId: Scalars["String"];
  name: Scalars["String"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SucessObject = {
  __typename?: "SucessObject";
  success: Scalars["Boolean"];
};

export type RegisterInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type CreateTravelInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type CreateAlbumMutationVariables = Exact<{
  travelId: Scalars["String"];
  name: Scalars["String"];
}>;

export type CreateAlbumMutation = { __typename?: "Mutation" } & {
  createAlbum: { __typename?: "Album" } & PreviewAlbumFragment;
};

export type PreviewAlbumFragment = { __typename?: "Album" } & Pick<
  Album,
  "name" | "uuid" | "isPublic" | "photoCount"
>;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "User" } & UserFieldsFragment;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & UserFieldsFragment;
};

export type RegisterMutationVariables = Exact<{
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "SucessObject" } & Pick<SucessObject, "success">;
};

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "uuid" | "firstName" | "lastName" | "email"
>;

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & {
  logout: { __typename?: "SucessObject" } & Pick<SucessObject, "success">;
};

export type ValidateEmailMutationVariables = Exact<{
  key: Scalars["String"];
}>;

export type ValidateEmailMutation = { __typename?: "Mutation" } & {
  validateEmail: { __typename?: "SucessObject" } & Pick<
    SucessObject,
    "success"
  >;
};

export type MyTravelsQueryVariables = Exact<{ [key: string]: never }>;

export type MyTravelsQuery = { __typename?: "Query" } & {
  myTravels: Array<{ __typename?: "Travel" } & PreviewTravelFragment>;
};

export type CreateTravelMutationVariables = Exact<{
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
}>;

export type CreateTravelMutation = { __typename?: "Mutation" } & {
  createTravel?: Maybe<{ __typename?: "Travel" } & PreviewTravelFragment>;
};

export type PreviewTravelFragment = { __typename?: "Travel" } & Pick<
  Travel,
  "uuid" | "name" | "description" | "albumsCount"
>;

export type GetTravelQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetTravelQuery = { __typename?: "Query" } & {
  getTravel: { __typename?: "Travel" } & Pick<
    Travel,
    "uuid" | "name" | "description"
  > & { albums: Array<{ __typename?: "Album" } & PreviewAlbumFragment> };
};

export const PreviewAlbumFragmentDoc = gql`
  fragment previewAlbum on Album {
    name
    uuid
    isPublic
    photoCount
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment userFields on User {
    uuid
    firstName
    lastName
    email
  }
`;
export const PreviewTravelFragmentDoc = gql`
  fragment previewTravel on Travel {
    uuid
    name
    description
    albumsCount
  }
`;
export const CreateAlbumDocument = gql`
  mutation createAlbum($travelId: String!, $name: String!) {
    createAlbum(input: { travelId: $travelId, name: $name }) {
      ...previewAlbum
    }
  }
  ${PreviewAlbumFragmentDoc}
`;
export type CreateAlbumMutationFn = Apollo.MutationFunction<
  CreateAlbumMutation,
  CreateAlbumMutationVariables
>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      travelId: // value for 'travelId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAlbumMutation,
    CreateAlbumMutationVariables
  >
) {
  return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(
    CreateAlbumDocument,
    baseOptions
  );
}
export type CreateAlbumMutationHookResult = ReturnType<
  typeof useCreateAlbumMutation
>;
export type CreateAlbumMutationResult = Apollo.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<
  CreateAlbumMutation,
  CreateAlbumMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...userFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

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
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ...userFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      success
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const ValidateEmailDocument = gql`
  mutation ValidateEmail($key: String!) {
    validateEmail(key: $key) {
      success
    }
  }
`;
export type ValidateEmailMutationFn = Apollo.MutationFunction<
  ValidateEmailMutation,
  ValidateEmailMutationVariables
>;

/**
 * __useValidateEmailMutation__
 *
 * To run a mutation, you first call `useValidateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateEmailMutation, { data, loading, error }] = useValidateEmailMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useValidateEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ValidateEmailMutation,
    ValidateEmailMutationVariables
  >
) {
  return Apollo.useMutation<
    ValidateEmailMutation,
    ValidateEmailMutationVariables
  >(ValidateEmailDocument, baseOptions);
}
export type ValidateEmailMutationHookResult = ReturnType<
  typeof useValidateEmailMutation
>;
export type ValidateEmailMutationResult = Apollo.MutationResult<ValidateEmailMutation>;
export type ValidateEmailMutationOptions = Apollo.BaseMutationOptions<
  ValidateEmailMutation,
  ValidateEmailMutationVariables
>;
export const MyTravelsDocument = gql`
  query myTravels {
    myTravels {
      ...previewTravel
    }
  }
  ${PreviewTravelFragmentDoc}
`;

/**
 * __useMyTravelsQuery__
 *
 * To run a query within a React component, call `useMyTravelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTravelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTravelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTravelsQuery(
  baseOptions?: Apollo.QueryHookOptions<MyTravelsQuery, MyTravelsQueryVariables>
) {
  return Apollo.useQuery<MyTravelsQuery, MyTravelsQueryVariables>(
    MyTravelsDocument,
    baseOptions
  );
}
export function useMyTravelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyTravelsQuery,
    MyTravelsQueryVariables
  >
) {
  return Apollo.useLazyQuery<MyTravelsQuery, MyTravelsQueryVariables>(
    MyTravelsDocument,
    baseOptions
  );
}
export type MyTravelsQueryHookResult = ReturnType<typeof useMyTravelsQuery>;
export type MyTravelsLazyQueryHookResult = ReturnType<
  typeof useMyTravelsLazyQuery
>;
export type MyTravelsQueryResult = Apollo.QueryResult<
  MyTravelsQuery,
  MyTravelsQueryVariables
>;
export const CreateTravelDocument = gql`
  mutation createTravel($name: String!, $description: String) {
    createTravel(input: { name: $name, description: $description }) {
      ...previewTravel
    }
  }
  ${PreviewTravelFragmentDoc}
`;
export type CreateTravelMutationFn = Apollo.MutationFunction<
  CreateTravelMutation,
  CreateTravelMutationVariables
>;

/**
 * __useCreateTravelMutation__
 *
 * To run a mutation, you first call `useCreateTravelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTravelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTravelMutation, { data, loading, error }] = useCreateTravelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateTravelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTravelMutation,
    CreateTravelMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateTravelMutation,
    CreateTravelMutationVariables
  >(CreateTravelDocument, baseOptions);
}
export type CreateTravelMutationHookResult = ReturnType<
  typeof useCreateTravelMutation
>;
export type CreateTravelMutationResult = Apollo.MutationResult<CreateTravelMutation>;
export type CreateTravelMutationOptions = Apollo.BaseMutationOptions<
  CreateTravelMutation,
  CreateTravelMutationVariables
>;
export const GetTravelDocument = gql`
  query getTravel($id: String!) {
    getTravel(id: $id) {
      uuid
      name
      description
      albums {
        ...previewAlbum
      }
    }
  }
  ${PreviewAlbumFragmentDoc}
`;

/**
 * __useGetTravelQuery__
 *
 * To run a query within a React component, call `useGetTravelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTravelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTravelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTravelQuery(
  baseOptions: Apollo.QueryHookOptions<GetTravelQuery, GetTravelQueryVariables>
) {
  return Apollo.useQuery<GetTravelQuery, GetTravelQueryVariables>(
    GetTravelDocument,
    baseOptions
  );
}
export function useGetTravelLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTravelQuery,
    GetTravelQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetTravelQuery, GetTravelQueryVariables>(
    GetTravelDocument,
    baseOptions
  );
}
export type GetTravelQueryHookResult = ReturnType<typeof useGetTravelQuery>;
export type GetTravelLazyQueryHookResult = ReturnType<
  typeof useGetTravelLazyQuery
>;
export type GetTravelQueryResult = Apollo.QueryResult<
  GetTravelQuery,
  GetTravelQueryVariables
>;
