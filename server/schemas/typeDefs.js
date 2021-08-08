const { gql } = require('apollo-server-express');

const typeDefs = gql`
	input AddBook {
		bookId: String!
		description: String!
		title: String!
		image: String
		link: String
		authors: [String]!
	}

	type User {
		_id: ID
		username: String!
		email: String!
		password: String!
		savedBooks: [Book]
	}

	type Book {
		bookId: ID!
		description: String!
		title: String!
		image: String
		link: String
		authors: [String]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveBook(book: AddBook!): User
		removeBook(bookId: ID!): User
	}
`;

module.exports = typeDefs;
