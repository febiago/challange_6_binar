const history = require('../controllers/history.js');
const { User_game_history } = require('../models');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

describe('history.create function', () => {
    test('res.json register success', async() => {
        
        const req = mockRequest({
            id_user: 1,
            level : 21,
            skill : "Water Canon",
            });
            
        const res = mockResponse();
        await history.create(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: {
                    id_user: req.body.id_user,
                    level: req.body.level,
                    skill: req.body.skill
                }
            });
});
});