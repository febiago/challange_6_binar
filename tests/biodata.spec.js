const biodata = require('../controllers/biodata.js');
const { User_game_biodata } = require('../models');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

// endpoint GET /
describe('biodata.read function', () => {
    test('res.json called with { status: true, message: succes }', async() => {
        const req = mockRequest();
        const res = mockResponse();
        const id = 1;

        biodata.read(req, res);
        const bio = await User_game_biodata.findOne({ where: { id_user: id } });

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: bio
        });
        done();
    });
});