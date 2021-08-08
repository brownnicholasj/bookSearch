const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (!context.user)
				throw new AuthenticationError(
					'You need to be logged in to view saved books'
				);

			return await User.findOne({ _id: context.user._id }).populate(
				'savedBooks'
			);
		},
		//remove later
		// users: async () => {
		// 	return User.find({});
		// },
		// books: async () => {
		// 	return User.find({}).populate('books');
		// },
		//remove later
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

			return { token, user };
		},

		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });

			const token = signToken(user);

			return { token, user };
		},

		saveBook: async (parent, { book }, context) => {
			if (!context.user) throw new AuthenticationError('You need to log in');

			try {
				const updateUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { savedBooks: book } },
					{ new: true }
				);

				return updateUser;
			} catch (err) {
				console.log(err);
				return err;
			}
		},

		removeBook: async (parent, { bookId }, context) => {
			if (!context.user) throw new AuthenticationError('You need to log in');

			const updateUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $pull: { savedBooks: { bookId: bookId } } },
				{ new: true }
			);

			if (!updateUser) return "Couldn't find user with this id!";

			return updateUser;
		},
	},
};

module.exports = resolvers;
