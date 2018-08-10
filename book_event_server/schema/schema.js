const graphql = require('graphql')
const Image = require('../models/image')
const Category = require('../models/category')

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList } = graphql



const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        images: { 
            type: new GraphQLList(ImageType),
            resolve(parent, args){
                //return imageData.filter(image => image.categoryId === parent.id)
                return Image.find({categoryId: parent.id})
            }

        }
    })
})

const ImageType = new GraphQLObjectType({
    name: 'image',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        image: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        ranking: {type: new GraphQLNonNull(GraphQLInt)},
        category: {
            type: CategoryType,
            resolve(parent, args){
                return Category.findById(parent.categoryId)
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Image: {
            type: ImageType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // conde to get data from db
                //return imageData.find(image => image.id === args.id)
               return Image.findById(args.id)
            }
        },
        category: {
            type: CategoryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return categoryData.find(category => category.id === args.id)
                return Category.findById(args.id)
            }
        },
        images: {
            type: new GraphQLList(ImageType),
            resolve(parent, args){
                //return imageData
                return Image.find({})
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args){
                //return categoryData
                return Category.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCategory: {
            type: CategoryType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                let category = new Category({
                    name: args.name
                })
                return category.save()
            }
        },
        addImage: {
            type: ImageType,
            args: {
                image: { type: GraphQLString },
                description: { type: GraphQLString },
                ranking: { type: GraphQLInt},
                categoryId: { type: GraphQLID }
            },
            resolve(parent, args){
                let image = new Image({
                    image: args.image,
                    description: args.description,
                    ranking: args.ranking,
                    categoryId: args.categoryId
                });
                return image.save();
            }
        },
        deleteImage: {
            type: ImageType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let deletedImage = Image.findByIdAndRemove(args.id).exec();
                if (!deletedImage) {
                    throw new Error('Error')
                  }
                  return deletedImage;
            }
        }
    }
})


module.exports =  new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
