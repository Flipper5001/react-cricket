const { AuthenticationError } = require("apollo-server-express");
const { User, Score, Team } = require("../models");
const { signToken } = require("../utils/auth");
const { appendHighscoreFieldToUsers, appendHighscoreFieldToUser, orderScores } = require("../utils/model-helper");

const resolvers = {
  Query: {
    // teams
    //  get all teams
    teams: async () => {
      return Team.find();
    },
    team: async (parent, { teamId }) => {
      return Team.findOne({ _id: teamId });
    },
    users: async () => {
      const users = await User.find().sort({Score});
      const usersWithScores = await appendHighscoreFieldToUsers(users);
      // console.log({usersWithScores})
      return usersWithScores;
    },
    user: async (parent, { userId }) => {
      const user = await User.findOne({ _id: userId }).populate("team");
      const userWithScore = await appendHighscoreFieldToUser(user);
      return userWithScore

    },

    userByName: async (parent, {username}) => {
      const user = await User.findOne({ username: username }).populate("team");
      const userWithScore = await appendHighscoreFieldToUser(user);
      return userWithScore
    },
    scores: async () => {
      return Score.find().populate("team").populate("user");
    },
    topFiveScores: async () => {
      const scores = await Score.find().populate("team").populate("user");
      console.log(scores)
      const orderedScores =  orderScores(scores)
      return orderedScores;
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },

  Mutation: {
    addNewScore: async (parent, { user, team, score }) => {
      const newScore = await Score.create({ user, team, score });
      return newScore;
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log(email, password)

      const user = await User.findOne({ email });

      if (!user) {
        console.log('hello!')
        throw new AuthenticationError("No user found with this email lfhdjbdl address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addNewTeam: async (parent, { teamName, players }) => {
      const team = await Team.create({ teamName, players });
      return team;
    },
    changeTeam: async (parent, { teamId, players }) => {
      const team = await Team.findByIdAndUpdate({ _id: teamId }, {
        players, 
      }, {new: true});
      return team;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

// const resolvers = {
// Query: {
//   users: async () => {
//     return User.find().populate('thoughts');
//   },
//   user: async (parent, { username }) => {
//     return User.findOne({ username }).populate('thoughts');
//   },
//   thoughts: async (parent, { username }) => {
//     const params = username ? { username } : {};
//     return Thought.find(params).sort({ createdAt: -1 });
//   },
//   thought: async (parent, { thoughtId }) => {
//     return Thought.findOne({ _id: thoughtId });
//   },
//   me: async (parent, context) => {
//     if (context.user) {
//       return User.findOne({ _id: context.user._id }).populate('thoughts');
//     }
//     throw new AuthenticationError('You need to be logged in!');
//   },
// },

// Mutation: {
// addUser: async (parent, { username, email, password }) => {
//   const user = await User.create({ username, email, password });
//   const token = signToken(user);
//   return { token, user };
// },
// login: async (parent, { email, password }) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new AuthenticationError('No user found with this email address');
//   }

//   const correctPw = await user.isCorrectPassword(password);

//   if (!correctPw) {
//     throw new AuthenticationError('Incorrect credentials');
//   }

//   const token = signToken(user);

//   return { token, user };
// },
// TODO addNewScore
// TODO when game is finished add score into database
// addThought: async (parent, { thoughtText }, context) => {
//   if (context.user) {
//     const thought = await Thought.create({
//       thoughtText,
//       thoughtAuthor: context.user.username,
//     });

//     await User.findOneAndUpdate(
//       { _id: context.user._id },
//       { $addToSet: { thoughts: thought._id } }
//     );

//     return thought;
//   }
//   throw new AuthenticationError('You need to be logged in!');
// },
// addComment: async (parent, { thoughtId, commentText }, context) => {
//   if (context.user) {
//     return Thought.findOneAndUpdate(
//       { _id: thoughtId },
//       {
//         $addToSet: {
//           comments: { commentText, commentAuthor: context.user.username },
//         },
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//   }
//   throw new AuthenticationError('You need to be logged in!');
// },
// removeThought: async (parent, { thoughtId }, context) => {
//   if (context.user) {
//     const thought = await Thought.findOneAndDelete({
//       _id: thoughtId,
//       thoughtAuthor: context.user.username,
//     });

//     await User.findOneAndUpdate(
//       { _id: context.user._id },
//       { $pull: { thoughts: thought._id } }
//     );

//     return thought;
//   }
//   throw new AuthenticationError('You need to be logged in!');
// },
// removeComment: async (parent, { thoughtId, commentId }, context) => {
//   if (context.user) {
//     return Thought.findOneAndUpdate(
//       { _id: thoughtId },
//       {
//         $pull: {
//           comments: {
//             _id: commentId,
//             commentAuthor: context.user.username,
//           },
//         },
//       },
//       { new: true }
//     );
//   }
//   throw new AuthenticationError('You need to be logged in!');
// },
// },
// };

module.exports = resolvers;
