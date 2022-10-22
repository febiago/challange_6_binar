const { User_game_history } = require('../models');

module.exports = {

    read: async (req, res, next) => {
        try{
            const id = req.user.id;
            const history = await User_game_history.findOne({ where: { id_user: id } });
            if (!history) {
                return res.status(404).json({
                  status: false,
                  message: "not found!",
                });
            }
            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    id_user : history.id_user,
                    level : history.level,
                    skill : history.skill
                }
            });

        } catch (err) {
            next(err);
        }

    },
    create: async (req, res) => {
        const { id_user, level, skill } = req.body;
            const user = await User_game_history.create({
                id_user,
                level,
                skill
            });

        return res.status(201).json({
                status: true,
                message: 'success',
                data: {
                    id_user: user.id_user,
                    level: user.level,
                    skill: user.skill
                }
            });
    },
    update:async (req, res, next) => {
        try {
        const { level, skill} = req.body;
        const id = req.user.id;
        const user = await User_game_history.findOne({ where: { id_user: id } });
        if (!user) 
            return res.status(404).json({ 
                status: false, 
                message: 'History User not found!' 
            });
        const updated = await User_game_history.update({
                    level: level,
                    skill: skill
                }, {
                    where: {
                        id_user: id
                    }
                });

        return res.status(201).json({
            status: true,
            message: 'success update data!',
            data: {
                level: level,
                skill: skill
            }
        });

        } catch (err) {
            next(err);
        }

    },
    delete: async (req, res, next) => {
        try {
          const { id } = req.user;
          const history = await User_game_history.findOne({ where: { id_user: id } });
          if (!history) {
            return res.status(404).json({
              status: false,
              message: "Not found!",
            });
          }
    
          await User_game_history.destroy({ where: { id_user: id } });
          return res.status(200).json({
            status: true,
            message: "success",
          });
        } catch (err) {
            next(err);
        }
      }
}
