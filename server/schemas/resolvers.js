const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		me: async () => {
			return User.find({});
		},
		users: async () => {
			return User.find({});
		},
		books: async () => {
			return User.find({}).populate('books');
		},
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token };
		},

		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });

			const token = signToken(user);

			return { token };
		},

		saveBook: async (
			parent,
			{ authors, description, bookId, image, link, title },
			context
		) => {
			// if (context.user) {
			// const book = await Book.create({
			// 	authors,
			// 	description,
			// 	bookId,
			// 	image,
			// 	link,
			// 	title,
			// });

			await User.findOneAndUpdate(
				{ id: context.user._id },
				{
					$addToSet: {
						savedBooks: {
							$authors: [authors],
							$description: description,
							$bookId: bookId,
							$image: image,
							$link: link,
							$title: title,
						},
					},
				}
			);

			return book;
			// }
			// throw new AuthenticationError('You need to be logged in!');
		},

		removeBook: async (parent, bookId, context) => {
			if (context.user) {
				const book = await Book.findOneAndDelete({
					_id: bookId,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedBooks: book._id } }
				);

				return book;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
	},
};

module.exports = resolvers;
