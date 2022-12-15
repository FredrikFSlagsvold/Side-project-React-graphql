const Express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const{
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require("graphql")

var app = Express();
var cors = require("cors");

app.use(cors());

mongoose
.connect("mongodb://localhost:27017/PokemonDB")
.then(() => console.log("Connected to database..."))
.catch(err => console.error(err));

const PokemonModel = mongoose.model("Pokemon", {
    name: String,    

})

const PokemonType = new GraphQLObjectType({
    name: "Pokemon",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            pokemon: {
                type: GraphQLList(PokemonType),
                resolve: (root, args, context, info) => {
                    return PokemonModel.find().exec();
                }
            }
        }
    })
})

app.use("/graphql", ExpressGraphQL({
    schema,
    graphiql: true
}))

app.listen(5001, () => {
    console.log("Server running at 5001");
})