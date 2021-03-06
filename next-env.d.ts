/// <reference types="next" />
/// <reference types="next/types/global" />

import session from "koa-session";

declare module "http" {
  export interface IncomingMessage {
    session: session.Session | null;
  }
}
