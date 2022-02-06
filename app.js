const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const mongo = require("mongoose");
const app = express();
// connect to database
mongo.connect("mongodb://localhost:27017/gql-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongo.connection.once("open", () => {
  console.log("Hello 😁 connected to database");
});

/* app.use(
  "/graphiql",
  graphqlHTTP({
    schema: require("./schemas/schema.js"),
    graphiql: true
  })
); */
const graphqlSchema = require("./schemas/schema.js");
app.use(
  "/graphql",
  graphqlHTTP(request => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema
    };
  })
);

app.listen(8080, () => {
  console.log("Server running succefully...");
});
