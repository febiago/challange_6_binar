const { User_game_biodata } = require('../models');

module.exports = {

    read: async (req, res, next) => {
        try{
            const id = req.user.id;
            const biodata = await User_game_biodata.findOne({ where: { id_user: id } });
            if (!biodata) {
                return res.status(404).json({
                  status: false,
                  message: "not found!",
                });
            }
            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    id_user : biodata.id_user,
                    email : biodata.email,
                    addres : biodata.addres
                }
            });

        } catch (err) {
           // next(err);
        }

    },
    create: async (req, res) => {
        const { id_user, email, addres } = req.body;
            const user = await User_game_biodata.create({
                id_user,
                email,
                addres
            });

        return res.status(201).json({
                status: true,
                message: 'success',
                data: {
                    id_user: user.id_user,
                    email: user.email,
                    addres: user.addres
                }
            });
    },
    update:async (req, res, next) => {
        try {
        const { email, addres} = req.body;
        const id = req.user.id;

        const user = await User_game_biodata.findOne({ where: { id_user: id } });
        if (!user) 
            return res.status(404).json({ 
                success: false, 
                message: 'User Biodata not found!' 
            });
        const updated = await User_game_biodata.update({
                    email: email,
                    addres: addres
                }, {
                    where: {
                        id_user: id
                    }
                });

        return res.status(201).json({
            status: true,
            message: 'success update data!',
            data: {
                email: email,
                addres: addres
            }
        });

        } catch (err) {
            next(err);
        }

    },
    delete: async (req, res, next) => {
        try {
          const { id } = req.params;
          const biodata = await User_game_biodata.findOne({ where: { id: id } });
          if (!biodata) {
            return res.status(404).json({
              status: false,
              message: "Not found!",
            });
          }
    
          await User_game_biodata.destroy({ where: { id: id } });
          return res.status(200).json({
            status: true,
            message: "success",
          });
        } catch (err) {
            next(err);
        }
      }
}
