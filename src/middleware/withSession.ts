import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { KoaCustomReq } from "server/types/koa-types";
import { User } from "../../server/gql/entity/User";

export const getConnectedUser = (
  context: GetServerSidePropsContext
): User | null => {
  const request = (context.req as unknown) as KoaCustomReq;
  const session = request.session;
  return session?.user || null;
};

export const withSession = <
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(
  cb?: (
    context: GetServerSidePropsContext<Q>,
    user: User
  ) => Promise<GetServerSidePropsResult<P>>
) => {
  return async (context: GetServerSidePropsContext<Q>) => {
    const user = getConnectedUser(context);
    if (!user) return redirectPath();
    if (!cb) return { props: {} };
    return cb(context, user);
  };
};

const redirectPath = (): {
  redirect: { destination: string; permanent: boolean };
} => {
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
};
