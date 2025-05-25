import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
  // Contact model is from chatgpt
  // and is used to store user information
  Contact: a.model({
    firstName: a.string(),
    lastName: a.string(),
    phone: a.string(),
    email: a.string(),
  }).authorization((allow) => [allow.owner()]),

  // existing custom response
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  askBedrock: a
    .query()
    .arguments({ ingredients: a.string().array() })
    .returns(a.ref("BedrockResponse"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({ entry: "./bedrock.js", dataSource: "bedrockDS" })
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});