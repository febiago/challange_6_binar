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
        const req = mockRequest({
             id: 1,
        });
        const res = mockResponse();

        biodata.read(req, res);
        const bio = await User_game_biodata.findOne({ where: { id_user: req.body.id } });

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: bio
        });
        done();
    });
});

describe('biodata.create function', () => {
    test('res.json register success', async() => {
        
        const req = mockRequest({
            id_user: 1,
            email : "febi@mail.com",
            addres : "Pacitan",
            });
            
        const res = mockResponse();
        await biodata.create(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: {
                    id_user: req.body.id_user,
                    email: req.body.email,
                    addres: req.body.addres
                }
            });
});
});