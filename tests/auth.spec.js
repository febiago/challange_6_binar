const auth = require('../controllers/auth.js');
const { User_game } = require('../models');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

const jwt = require('jsonwebtoken');
const {
    JWT_SIGNATURE_KEY
} = process.env;

// endpoint GET /
describe('auth.profil function', () => {
    test('res.json called with { status: true, message: succes }', done => {
        const req = mockRequest();
        const res = mockResponse();

        auth.profil(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success'
        });
        done();
    });
});


// endpoint POST
describe('auth.register function', () => {
    test('res.json register success', async() => {
        
            const req = mockRequest({
            name: "Febi Ago",
            username: "user3s21",
            password: "password"
            });
            
        const res = mockResponse();
        await auth.register(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: {
                    name : req.body.name,
                    username : req.body.username
                }
            });
});
});

describe('auth.login function', () => {
    test('res.json login success', async() => {
        
            const req = mockRequest({
            username: "user",
            password: "password"
            });
            
        const res = mockResponse();
        const user = await User_game.findOne({ where: { username: req.body.username } });

        payload = {
                id: user.id,
                name: user.name,
                username: user.username,
            };
        const token = jwt.sign(payload, JWT_SIGNATURE_KEY);

        await auth.login(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: {
                    token: token
                }
            });
});
});

describe('auth.changePassword function', () => {
    test('res.json changePassword success', async() => {
        try {
            const req = mockRequest({ 
                oldPassword: "password", 
                newPassword: "pass123", 
                confirmNewPassword: "pass123" 
            });
            const res = mockResponse();

            await auth.changePassword(req,res)

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
            });
        } catch(err){

        }
   });
});

