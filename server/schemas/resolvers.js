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
      console.log("hello")
      const users = await User.find();
      console.log(users)
      const usersWithScores = await appendHighscoreFieldToUsers(users);
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
      const orderedScores =  orderScores(scores)
      return orderedScores;
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('team');

        const userWithScore = await appendHighscoreFieldToUser(user);
        return userWithScore;
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
    setUserTeam: async (parent, {userId, team}) => {
      const user = await User.findByIdAndUpdate({_id: userId}, {
        team
      }, {new: true});

      return user;
    }
  },
};

module.exports = resolvers;
