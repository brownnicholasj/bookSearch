# Book Search and Saver

![License: MIT](https://img.shields.io/badge/License-MIT-green)

## Description

Link to App: https://brownnicholasj-booksearch.herokuapp.com/

- This Book Search App was refactored from a RESTful API to a GraphQL backend.
  It will allow a user to signup and login, then search for books with a search
  bar. When logged in, a user can save a book and store them, when viewing the
  stored books, they can remove them from storage.
- The technology used for this application are: node, javascript, express (npm),
  apollo-server-express (npm), mongoose (npm), graphql (npm), bcrypt (npm),
  dotenv (npm), jsonwebtoken (npm), jwt-decode (npm), reactjs, bootstrap,
  MongoDB, Heroku
- The biggest challenge with this project working through the context
  authentication. I had to troubleshoot from error messages that lead me down a
  couple of different paths. Appeared to be missing a dependency, then after
  finding the dependency - had to refactor back through error messages.

## Table of Contents

- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Behind The Code](#behind-the-code)
- [Questions](#questions)

## Usage

A user will go to the page at https://brownnicholasj-booksearch.herokuapp.com/
and see the landing page with the option to search for books or login/signup
![usage001](./screenshots/usage001.jpg)

If the user chooses Login/Sign Up a modal will be available for the user to
create/put in their credentials ![usage002](./screenshots/usage002.jpg)

The user can search for a book, if logged in, they have the option to Save this
Book! ![usage003](./screenshots/usage003.jpg)

The user can select a link called 'See Your Books' and they can view all saved
books for their logged in user ![usage004](./screenshots/usage004.jpg)

## License

This project is licensed under the MIT license.

## Contributing

A thanks to the following contributors to this project:

- 2021 Trilogy Education Services, LLC
- Nicholas Brown (brownnicholasj.dev@gmail.com)

### Behind the Code

As the front end of the code was 'provided' by Trilogy Education Services, this
review will be focused on the back end code that was refactored to use GraphQL
and ApolloServer.

- The schemas were pretty simple to setup as they followed the already setup
  Models. The unique things I had to figure out is utilizing an input type and
  integrating that into the mutation ![btc001](./screenshots/btc001.jpg)

- The resolvers had to be setup to accept the queries and mutations. The most
  unique resolver was the saveBook resolver, which had to take in the context,
  of which had to save the user info into. Then checked for authentication and
  ultimately added to the users saved books. ![btc002](./screenshots/btc002.jpg)

- The client side pages had to be slightly adjusted to point towards the new
  graphql backend schema, this was done in the SearchBook.js, SavedBook.js,
  LoginForm.js, and SignupForm.js ![btc003](./screenshots/btc003.jpg)

- The queries.js and mutations.js are updated to store the graphql language to
  execute the query from the client side.

- Dependencies were updated in multiple areas to accept the required back end
  features, such as: setContext, ApolloClient, gql, useQuery, and useMutation...
  among others. ![btc004](./screenshots/btc004.jpg)

## Questions

If you have any questions about the repo, open an issue or contact me directly
at brownnicholasj.dev@gmail.com.You can find more of my work at
[brownnicholasj](https://github.com/brownnicholasj/).
