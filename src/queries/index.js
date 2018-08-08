import {gql} from 'apollo-boost'

export const getCategoriesQuery = gql`
{
    categories {
        name
        images {
            image
            description
            ranking
            id
            category{
                name
            }
        }        
    }
}
`

//mutations

export const deleteImageQuery = gql`
    mutation deleteImage($id: ID!) {
        deleteImage(id: $id) {
            id
        }
    }
`
export const updateImage = gql`
    mutation updateImage($id: ID!, $description: String!){
        updateImage(
            id: $id,
            description: $description
        ){
        image
        description
        }
    }
`