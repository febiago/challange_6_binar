const { User_game } = require('../models');
const { User_game_biodata } = require('../models');
const { User_game_history } = require('../models');

module.exports = {
    user: async () => {
        await User_game.destroy({ truncate: true, restartIdentity: true });
    },

    biodata: async () => {
        await User_game_biodata.destroy({ truncate: true, restartIdentity: true });
    },

    history: async () => {
        await User_game_history.destroy({ truncate: true, restartIdentity: true });
    },
};
