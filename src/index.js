const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')



// 1
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
  },
  Mutation: {
    post: (parent, args, context) => {
       const newLink = context.prisma.link.create({
         data: {
          description: args.description,
          url: args.url,  
         },
       })
       return newLink
      },
    },
  }

// 3
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
})
server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );