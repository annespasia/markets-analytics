import ApolloClient from 'apollo-boost'

const apolloClient=new ApolloClient({
  url:'/graphql'
})

export default apolloClient