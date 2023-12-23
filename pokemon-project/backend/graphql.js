const Express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const{
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
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
    next_evolution: [
        {
            num: String,
            name: String,
        }
    ],
})

const NextEvolutionType = new GraphQLObjectType({
    name: "next_evolution",
    fields: {
        num: { type: GraphQLString },
        name: { type: GraphQLString },
    }
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
        next_evolution: { type: GraphQLList(NextEvolutionType)}
    },
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            pokemon: {
                type: GraphQLList(PokemonType),
                args: {
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt },
                },
                resolve: (root, args, context, info) => {
                    return PokemonModel
                    .find()
                    .skip(args.offset)
                    .limit(args.limit)
                    .exec();
                }
            },
            //filter bestemmer om man skal filtrere på navn, type etc.
            pokemonBySearch: {
                type: GraphQLList(PokemonType),
                args: {
                    text: { type: GraphQLString },
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt },
                    filter: { type: GraphQLString },
                    sortType: { type: GraphQLString },
                    sort: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    return PokemonModel
                    .find({[args.filter]: {"$regex": args.text, "$options": "i"} })
                    .skip(args.offset)
                    .limit(args.limit)
                    .sort({[args.sortType]: args.sort})
                    .exec()
                }
            },
            pokemonByTypeSearch: {
                type: GraphQLList(PokemonType),
                args: {
                    type: { type: GraphQLString },
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt },
                },
                resolve: (root, args, context, info) => {
                    return PokemonModel
                    .find( {type: {"$regex": args.type, "$options": "i"} } )
                    .skip(args.offset)
                    .limit(args.limit)
                    .exec()
                }
            },
            singlePokemonByName: {
                type: PokemonType,
                args: {
                    name: { type: GraphQLString }
                },
                resolve: (root, args) => {
                    return PokemonModel.findOne({ name: args.name }).exec();
                }
            }

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