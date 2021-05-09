const { ApolloServer } = require('apollo-server');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// 1
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, { id }) => links.find((link) => link.id === id),
  },
  Mutation: {
    // 2
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      let newLink;

      links = link.map(link => {
        if (link.id === args.id) {
          newLink = { ...link, ...args };
          return newLink;
        }
        return link;
      });
      return newLink
    },
    deleteLink: (root, args) => {
      const removeIndex = links.findIndex(item => item.id === args.id);
      const removedLink = links[removeIndex];
      links.splice(removeIndex, 1);

      return removedLink;
    }
  },
}

// 3
const fs = require('fs');
const path = require('path');

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );