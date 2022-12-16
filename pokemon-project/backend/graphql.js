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
    GraphQLInt,
    GraphQLObjectType
} = require("graphql")

var app = Express();
var cors = require("cors");

app.use(cors());

mongoose
.connect("mongodb://localhost:27017/PokemonDB")
.then(() => console.log("Connected to database..."))
.catch(err => console.error(err));

const PokemonModel = mongoose.model("pokemon", {
    id: Number,
    num: String,
    name: String,
    img: String,
    type: [String],
    weaknesses: [String],
})

const PokemonType = new GraphQLObjectType({
    name: "Pokemon",
    fields: {
        id: { type: GraphQLID },
        num: { type: GraphQLInt },
        name: { type: GraphQLString },
        img: { type: GraphQLString },
        type: { type: GraphQLList(GraphQLString) },
        weaknesses: { type: GraphQLList(GraphQLString) },
    },
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
            },
            pokemonByName: {
                type: GraphQLList(PokemonType),
                args: {
                    name: { type: GraphQLString },
                },
                resolve: (root, args, context, info) => {
                    return PokemonModel.find( {name: {"$regex": args.name, "$options": "i"} } ).exec();
                }
            },

        }
    })
})

app.use("/pokemon", ExpressGraphQL({
    schema,
    graphiql: true
}))

app.listen(5001, () => {
    console.log("Server running at 5001");
})