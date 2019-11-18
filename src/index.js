const { GraphQLServer } = require('graphql-yoga');


// Dummy data. stored in-memory at runtime
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
},
{
  id: 'link-1',
  url: 'www.howtographql.com/hmma',
  description: 'Fullstack 1337 tutorial for GraphQL',
}];

let linkCount = links.length;


// Resolver functions definition/implementation
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (_, { id }) => {
      links.find((link) => link.id === id)
    },
  },

  Mutation: {
    createLink: (parent, args) => {
      const link = {
        id: `link-${linkCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      let updatedLink;

      links.forEach((link) => {
        if (link.id === args.id) {
          if (args.description) link.description = args.description;
          if (args.url) link.url = args.url;

          updatedLink = link;
        }
      });

      return updatedLink;
    },
    deleteLink: (_, { id }) => {
      let removedLink;
      const removeIndex = links.findIndex((item) => item.id === id);

      if (removeIndex >= 0) {
        removedLink = links[removeIndex];
        links.splice(removeIndex, 1);
      }

      return removedLink;
    },
  },
};

const server = new GraphQLServer({
  // Schema - function declaration --> the GraphQL API
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log('Server is running on http://localhost:4000'));


// GraphQL API
// Every GraphQL schema has three special root types, these are called Query, Mutation and Subscription.
// The root types correspond to the three operation types offered by GraphQL: queries, mutations and subscriptions.
// The fields on these root types are called root field and define the available API operations.


// Trivial resolver implementation --> auto generated
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // }
