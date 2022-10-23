import { connect } from "./db/index";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDef/index";
import { resolvers } from "./graphql/resolvers";

dotenv.config();
connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`[SERVER] listening on port ${port}`));
