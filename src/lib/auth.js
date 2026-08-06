import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.DB);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "placeholder-google-client-secret",
    },
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: 'attendee'
      },
      ifBlocked: {
        defaultValue: false ,
      },
    },
  },
});