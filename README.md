# graphql-server-with-jwt

GraphQL server with JWT for secure login. Server internally connect to mongodb.



### Start server 
```
npm start
```

### Signup user using url http://localhost:4200/graphql

```
mutation{
  signup(username:"test1", password:"test1")
}
```
### Login user using url http://localhost:4200/graphql. It will return token

```
mutation{
  login(username:"test1", password:"test1")
}
```

### Set this token to Authorization header and use url http://localhost:4200/graphql . It will return loggedIn user

```
{
  me
}
```

**Note:** Please setup mongodb before use this GraphQL server. For Mac, use Graphiql App 
