import { define, random, sequence } from "cooky-cutter";

interface Authorizer {
  stringKey: string;
  claims: any
}

interface RequestContext {
  authorizer: Authorizer
}

export interface Event {
  requestContext: RequestContext;
  body: string;
  queryStringParameters: Record<any, any>,
  pathParameters: Record<any, any>,
}

export const authorizer = define<Authorizer>({
  stringKey: () => JSON.stringify({ 
    superadmin: true,
    permissions: {}
  }),
  claims: () => ({ superadmin: true })
});

export const requestContext = define<RequestContext>({
  authorizer
});

export const event = define<Event>({
  requestContext,
  body: () => '',
  queryStringParameters: () => ({
    page: 1,
    size: 10
  }),
  pathParameters: () => ({
    _id: '123'
  })
});
