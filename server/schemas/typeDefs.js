const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String!
		email: String!
		password: String!
		savedBooks: [Book]
	}

	type Book {
		bookId: String!
		description: String!
		title: String!
		image: String
		link: String
		authors: [String]
	}

	type Auth {
		token: ID!
		user: [User]
	}

	type Query {
		users: [User]
		books: [Book]
		me: [User]
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveBook(
			username: String
			authors: [String]
			description: String
			bookId: String
			image: String
			link: String
			title: String
		): User
		removeBook(bookId: ID!): User
	}
`;

module.exports = typeDefs;

// type Author {
// 	_id: ID
// 	author: String
// 	books: [Book]!
// }
