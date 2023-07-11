const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./util/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { elevenLabsAPI } = require('../client/src/utils/elevenLabs');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.post('/elevenLabs', (req, res) => {
    console.log(req);
    console.log("check1");

    elevenLabsAPI(req.body);
    res.send(200);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



// new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    // server.applyMiddleware({ app, path: '/graphql' });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

// start the server
startApolloServer(typeDefs, resolvers);