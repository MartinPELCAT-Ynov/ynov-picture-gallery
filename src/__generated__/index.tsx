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
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: "Query";
  album: Album;
  me: User;
  myTravels: Array<Travel>;
  getTravel: Travel;
  users: Array<User>;
};

export type QueryAlbumArgs = {
  id: Scalars["String"];
};

export type QueryGetTravelArgs = {
  id: Scalars["String"];
};

export type Album = {
  __typename?: "Album";
  uuid: Scalars["String"];
  isPublic: Scalars["Boolean"];
  name: Scalars["String"];
  travel: Array<Travel>;
  comments: Array<Comment>;
  liked: Scalars["Boolean"];
  likes: Scalars["Int"];
  photos: Array<Photo>;
  photoCount: Scalars["Int"];
  owner: User;
};

export type Travel = {
  __typename?: "Travel";
  uuid: Scalars["String"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  albums: Array<Album>;
  comments: Array<Comment>;
  liked: Scalars["Boolean"];
  likes: Scalars["Int"];
  albumsCount: Scalars["Int"];
  destinations: Array<Destination>;
  likeCounts: Scalars["Int"];
};

export type Comment = {
  __typename?: "Comment";
  uuid: Scalars["String"];
  content: Scalars["String"];
  createdAt: Scalars["String"];
  user?: Maybe<User>;
};

export type User = {
  __typename?: "User";
  uuid: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  travels: Array<Travel>;
};

export type Destination = {
  __typename?: "Destination";
  uuid: Scalars["String"];
  name: Scalars["String"];
  arrivalDate: Scalars["DateTime"];
  departureDate: Scalars["DateTime"];
  geohash: Scalars["String"];
  travel: Travel;
  illu: Array<Photo>;
  comments: Array<Comment>;
  liked: Scalars["Boolean"];
  likes: Scalars["Int"];
};

export type Photo = {
  __typename?: "Photo";
  uuid: Scalars["String"];
  name: Scalars["String"];
  url: Scalars["String"];
  comments: Array<Comment>;
  liked: Scalars["Boolean"];
  likes: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAlbum: Album;
  addPhotosToAlbum: Album;
  changePublic: SucessObject;
  login: User;
  register: SucessObject;
  logout: SucessObject;
  validateEmail: SucessObject;
  deletePhotos: SucessObject;
  addComment: Comment;
  removeComment: SucessObject;
  toggleLike: SucessObject;
  createTravel?: Maybe<Travel>;
  createDestination: Destination;
};

export type MutationCreateAlbumArgs = {
  input: CreateAlbumInput;
};

export type MutationAddPhotosToAlbumArgs = {
  files: Array<Scalars["Upload"]>;
  albumUuid: Scalars["String"];
};

export type MutationChangePublicArgs = {
  albumUuid: Scalars["String"];
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

export type MutationDeletePhotosArgs = {
  photoIds: Array<Scalars["String"]>;
};

export type MutationAddCommentArgs = {
  entityId: Scalars["String"];
  content: Scalars["String"];
};

export type MutationRemoveCommentArgs = {
  commentUuid: Scalars["String"];
};

export type MutationToggleLikeArgs = {
  entityUuid: Scalars["String"];
};

export type MutationCreateTravelArgs = {
  input: CreateTravelInput;
};

export type MutationCreateDestinationArgs = {
  dest: CreateDestinationInput;
  travelId: Scalars["String"];
};

export type CreateAlbumInput = {
  travelId: Scalars["String"];
  name: Scalars["String"];
};

export type SucessObject = {
  __typename?: "SucessObject";
  success: Scalars["Boolean"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
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

export type CreateDestinationInput = {
  arrivalDate: Scalars["DateTime"];
  departureDate: Scalars["DateTime"];
  geohash: Scalars["String"];
  name: Scalars["String"];
};

export type CreateAlbumMutationVariables = Exact<{
  travelId: Scalars["String"];
  name: Scalars["String"];
}>;

export type CreateAlbumMutation = { __typename?: "Mutation" } & {
  createAlbum: { __typename?: "Album" } & PreviewAlbumFragment;
};

export type GetAlbumQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetAlbumQuery = { __typename?: "Query" } & {
  album: { __typename?: "Album" } & Pick<
    Album,
    "photoCount" | "uuid" | "name" | "isPublic" | "likes" | "liked"
  > & {
      photos: Array<
        { __typename?: "Photo" } & Pick<Photo, "url" | "uuid" | "name">
      >;
      owner: { __typename?: "User" } & Pick<User, "firstName" | "lastName">;
      comments: Array<{ __typename?: "Comment" } & CommentFragmentFragment>;
    };
};

export type UploadPhotoAlbumMutationVariables = Exact<{
  albumUuid: Scalars["String"];
  files: Array<Scalars["Upload"]> | Scalars["Upload"];
}>;

export type UploadPhotoAlbumMutation = { __typename?: "Mutation" } & {
  addPhotosToAlbum: { __typename?: "Album" } & {
    photos: Array<
      { __typename?: "Photo" } & Pick<Photo, "uuid" | "name" | "url">
    >;
  } & PreviewAlbumFragment;
};

export type PreviewAlbumFragment = { __typename?: "Album" } & Pick<
  Album,
  "name" | "uuid" | "isPublic" | "photoCount"
>;

export type ChangePublicAccesMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type ChangePublicAccesMutation = { __typename?: "Mutation" } & {
  changePublic: { __typename?: "SucessObject" } & Pick<SucessObject, "success">;
};

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
  "uuid" | "firstName" | "lastName"
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

export type CreateDestinationMutationVariables = Exact<{
  travelId: Scalars["String"];
  arrivalDate: Scalars["DateTime"];
  departureDate: Scalars["DateTime"];
  geohash: Scalars["String"];
  name: Scalars["String"];
}>;

export type CreateDestinationMutation = { __typename?: "Mutation" } & {
  createDestination: { __typename?: "Destination" } & Pick<
    Destination,
    "uuid" | "geohash" | "arrivalDate" | "departureDate" | "name"
  >;
};

export type DestinationFragment = { __typename?: "Destination" } & Pick<
  Destination,
  "uuid" | "geohash" | "arrivalDate" | "departureDate" | "name"
>;

export type DeleteImagesMutationVariables = Exact<{
  ids: Array<Scalars["String"]> | Scalars["String"];
}>;

export type DeleteImagesMutation = { __typename?: "Mutation" } & {
  deletePhotos: { __typename?: "SucessObject" } & Pick<SucessObject, "success">;
};

export type AddCommentMutationVariables = Exact<{
  id: Scalars["String"];
  content: Scalars["String"];
}>;

export type AddCommentMutation = { __typename?: "Mutation" } & {
  addComment: { __typename?: "Comment" } & Pick<Comment, "uuid" | "content">;
};

export type RemoveCommentMutationVariables = Exact<{
  commentUuid: Scalars["String"];
}>;

export type RemoveCommentMutation = { __typename?: "Mutation" } & {
  removeComment: { __typename?: "SucessObject" } & Pick<
    SucessObject,
    "success"
  >;
};

export type ToggleLikeMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type ToggleLikeMutation = { __typename?: "Mutation" } & {
  toggleLike: { __typename?: "SucessObject" } & Pick<SucessObject, "success">;
};

export type CommentFragmentFragment = { __typename?: "Comment" } & Pick<
  Comment,
  "uuid" | "content" | "createdAt"
> & { user?: Maybe<{ __typename?: "User" } & Pick<User, "firstName">> };

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
    "uuid" | "name" | "description" | "likes" | "liked"
  > & {
      albums: Array<{ __typename?: "Album" } & PreviewAlbumFragment>;
      comments: Array<{ __typename?: "Comment" } & CommentFragmentFragment>;
      destinations: Array<{ __typename?: "Destination" } & DestinationFragment>;
    };
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
  }
`;
export const DestinationFragmentDoc = gql`
  fragment destination on Destination {
    uuid
    geohash
    arrivalDate
    departureDate
    name
  }
`;
export const CommentFragmentFragmentDoc = gql`
  fragment commentFragment on Comment {
    uuid
    content
    createdAt
    user {
      firstName
    }
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(
    CreateAlbumDocument,
    options
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
export const GetAlbumDocument = gql`
  query getAlbum($id: String!) {
    album(id: $id) {
      photoCount
      uuid
      name
      isPublic
      photos {
        url
        uuid
        name
      }
      owner {
        firstName
        lastName
      }
      comments {
        ...commentFragment
      }
      likes
      liked
    }
  }
  ${CommentFragmentFragmentDoc}
`;

/**
 * __useGetAlbumQuery__
 *
 * To run a query within a React component, call `useGetAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumQuery(
  baseOptions: Apollo.QueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAlbumQuery, GetAlbumQueryVariables>(
    GetAlbumDocument,
    options
  );
}
export function useGetAlbumLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAlbumQuery,
    GetAlbumQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAlbumQuery, GetAlbumQueryVariables>(
    GetAlbumDocument,
    options
  );
}
export type GetAlbumQueryHookResult = ReturnType<typeof useGetAlbumQuery>;
export type GetAlbumLazyQueryHookResult = ReturnType<
  typeof useGetAlbumLazyQuery
>;
export type GetAlbumQueryResult = Apollo.QueryResult<
  GetAlbumQuery,
  GetAlbumQueryVariables
>;
export const UploadPhotoAlbumDocument = gql`
  mutation uploadPhotoAlbum($albumUuid: String!, $files: [Upload!]!) {
    addPhotosToAlbum(albumUuid: $albumUuid, files: $files) {
      ...previewAlbum
      photos {
        uuid
        name
        url
      }
    }
  }
  ${PreviewAlbumFragmentDoc}
`;
export type UploadPhotoAlbumMutationFn = Apollo.MutationFunction<
  UploadPhotoAlbumMutation,
  UploadPhotoAlbumMutationVariables
>;

/**
 * __useUploadPhotoAlbumMutation__
 *
 * To run a mutation, you first call `useUploadPhotoAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPhotoAlbumMutation, { data, loading, error }] = useUploadPhotoAlbumMutation({
 *   variables: {
 *      albumUuid: // value for 'albumUuid'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useUploadPhotoAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadPhotoAlbumMutation,
    UploadPhotoAlbumMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadPhotoAlbumMutation,
    UploadPhotoAlbumMutationVariables
  >(UploadPhotoAlbumDocument, options);
}
export type UploadPhotoAlbumMutationHookResult = ReturnType<
  typeof useUploadPhotoAlbumMutation
>;
export type UploadPhotoAlbumMutationResult = Apollo.MutationResult<UploadPhotoAlbumMutation>;
export type UploadPhotoAlbumMutationOptions = Apollo.BaseMutationOptions<
  UploadPhotoAlbumMutation,
  UploadPhotoAlbumMutationVariables
>;
export const ChangePublicAccesDocument = gql`
  mutation ChangePublicAcces($id: String!) {
    changePublic(albumUuid: $id) {
      success
    }
  }
`;
export type ChangePublicAccesMutationFn = Apollo.MutationFunction<
  ChangePublicAccesMutation,
  ChangePublicAccesMutationVariables
>;

/**
 * __useChangePublicAccesMutation__
 *
 * To run a mutation, you first call `useChangePublicAccesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePublicAccesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePublicAccesMutation, { data, loading, error }] = useChangePublicAccesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChangePublicAccesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePublicAccesMutation,
    ChangePublicAccesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePublicAccesMutation,
    ChangePublicAccesMutationVariables
  >(ChangePublicAccesDocument, options);
}
export type ChangePublicAccesMutationHookResult = ReturnType<
  typeof useChangePublicAccesMutation
>;
export type ChangePublicAccesMutationResult = Apollo.MutationResult<ChangePublicAccesMutation>;
export type ChangePublicAccesMutationOptions = Apollo.BaseMutationOptions<
  ChangePublicAccesMutation,
  ChangePublicAccesMutationVariables
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ValidateEmailMutation,
    ValidateEmailMutationVariables
  >(ValidateEmailDocument, options);
}
export type ValidateEmailMutationHookResult = ReturnType<
  typeof useValidateEmailMutation
>;
export type ValidateEmailMutationResult = Apollo.MutationResult<ValidateEmailMutation>;
export type ValidateEmailMutationOptions = Apollo.BaseMutationOptions<
  ValidateEmailMutation,
  ValidateEmailMutationVariables
>;
export const CreateDestinationDocument = gql`
  mutation createDestination(
    $travelId: String!
    $arrivalDate: DateTime!
    $departureDate: DateTime!
    $geohash: String!
    $name: String!
  ) {
    createDestination(
      travelId: $travelId
      dest: {
        arrivalDate: $arrivalDate
        departureDate: $departureDate
        geohash: $geohash
        name: $name
      }
    ) {
      uuid
      geohash
      arrivalDate
      departureDate
      name
    }
  }
`;
export type CreateDestinationMutationFn = Apollo.MutationFunction<
  CreateDestinationMutation,
  CreateDestinationMutationVariables
>;

/**
 * __useCreateDestinationMutation__
 *
 * To run a mutation, you first call `useCreateDestinationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDestinationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDestinationMutation, { data, loading, error }] = useCreateDestinationMutation({
 *   variables: {
 *      travelId: // value for 'travelId'
 *      arrivalDate: // value for 'arrivalDate'
 *      departureDate: // value for 'departureDate'
 *      geohash: // value for 'geohash'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateDestinationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDestinationMutation,
    CreateDestinationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDestinationMutation,
    CreateDestinationMutationVariables
  >(CreateDestinationDocument, options);
}
export type CreateDestinationMutationHookResult = ReturnType<
  typeof useCreateDestinationMutation
>;
export type CreateDestinationMutationResult = Apollo.MutationResult<CreateDestinationMutation>;
export type CreateDestinationMutationOptions = Apollo.BaseMutationOptions<
  CreateDestinationMutation,
  CreateDestinationMutationVariables
>;
export const DeleteImagesDocument = gql`
  mutation deleteImages($ids: [String!]!) {
    deletePhotos(photoIds: $ids) {
      success
    }
  }
`;
export type DeleteImagesMutationFn = Apollo.MutationFunction<
  DeleteImagesMutation,
  DeleteImagesMutationVariables
>;

/**
 * __useDeleteImagesMutation__
 *
 * To run a mutation, you first call `useDeleteImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImagesMutation, { data, loading, error }] = useDeleteImagesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteImagesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteImagesMutation,
    DeleteImagesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteImagesMutation,
    DeleteImagesMutationVariables
  >(DeleteImagesDocument, options);
}
export type DeleteImagesMutationHookResult = ReturnType<
  typeof useDeleteImagesMutation
>;
export type DeleteImagesMutationResult = Apollo.MutationResult<DeleteImagesMutation>;
export type DeleteImagesMutationOptions = Apollo.BaseMutationOptions<
  DeleteImagesMutation,
  DeleteImagesMutationVariables
>;
export const AddCommentDocument = gql`
  mutation AddComment($id: String!, $content: String!) {
    addComment(entityId: $id, content: $content) {
      uuid
      content
    }
  }
`;
export type AddCommentMutationFn = Apollo.MutationFunction<
  AddCommentMutation,
  AddCommentMutationVariables
>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCommentMutation,
    AddCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(
    AddCommentDocument,
    options
  );
}
export type AddCommentMutationHookResult = ReturnType<
  typeof useAddCommentMutation
>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<
  AddCommentMutation,
  AddCommentMutationVariables
>;
export const RemoveCommentDocument = gql`
  mutation RemoveComment($commentUuid: String!) {
    removeComment(commentUuid: $commentUuid) {
      success
    }
  }
`;
export type RemoveCommentMutationFn = Apollo.MutationFunction<
  RemoveCommentMutation,
  RemoveCommentMutationVariables
>;

/**
 * __useRemoveCommentMutation__
 *
 * To run a mutation, you first call `useRemoveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommentMutation, { data, loading, error }] = useRemoveCommentMutation({
 *   variables: {
 *      commentUuid: // value for 'commentUuid'
 *   },
 * });
 */
export function useRemoveCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCommentMutation,
    RemoveCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveCommentMutation,
    RemoveCommentMutationVariables
  >(RemoveCommentDocument, options);
}
export type RemoveCommentMutationHookResult = ReturnType<
  typeof useRemoveCommentMutation
>;
export type RemoveCommentMutationResult = Apollo.MutationResult<RemoveCommentMutation>;
export type RemoveCommentMutationOptions = Apollo.BaseMutationOptions<
  RemoveCommentMutation,
  RemoveCommentMutationVariables
>;
export const ToggleLikeDocument = gql`
  mutation ToggleLike($id: String!) {
    toggleLike(entityUuid: $id) {
      success
    }
  }
`;
export type ToggleLikeMutationFn = Apollo.MutationFunction<
  ToggleLikeMutation,
  ToggleLikeMutationVariables
>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleLikeMutation,
    ToggleLikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(
    ToggleLikeDocument,
    options
  );
}
export type ToggleLikeMutationHookResult = ReturnType<
  typeof useToggleLikeMutation
>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<
  ToggleLikeMutation,
  ToggleLikeMutationVariables
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyTravelsQuery, MyTravelsQueryVariables>(
    MyTravelsDocument,
    options
  );
}
export function useMyTravelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyTravelsQuery,
    MyTravelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyTravelsQuery, MyTravelsQueryVariables>(
    MyTravelsDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTravelMutation,
    CreateTravelMutationVariables
  >(CreateTravelDocument, options);
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
      comments {
        ...commentFragment
      }
      destinations {
        ...destination
      }
      likes
      liked
    }
  }
  ${PreviewAlbumFragmentDoc}
  ${CommentFragmentFragmentDoc}
  ${DestinationFragmentDoc}
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTravelQuery, GetTravelQueryVariables>(
    GetTravelDocument,
    options
  );
}
export function useGetTravelLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTravelQuery,
    GetTravelQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTravelQuery, GetTravelQueryVariables>(
    GetTravelDocument,
    options
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
