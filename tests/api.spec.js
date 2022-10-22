const request = require("supertest");
const app = require("../app");
const { use } = require("../routes");
var tokenLogin = "";
const user = {
    name : "Febi Ago",
    username : 'febiago',
    password : 'password'
}

const truncate = require('../helpers/truncate');
truncate.user();

describe('auth/register', () => {
    // case success
    test('Register Success', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    name :user.name,
                    username : user.username,
                    password : user.password
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual({ 
                name : user.name,
                username : user.username
            });
    });
});

// Register Gagal username telah digunakan
describe('auth/register', () => {
    test('Register Failed', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send(user);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('username already used!');
            expect(res.body.data).toBe();
    });
});

describe('auth/login', () => {
    test('Login Failed', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    username : user.username,
                    password : `${user.password}4`
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('user or password doesn\'t match!');
            expect(res.body.data).toBe();
    });
});

describe('auth/login', () => {
    // case success
    test('Login Success', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    username : user.username,
                    password : user.password
                });
            tokenLogin = res.body.data.token;

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual({ token : tokenLogin});
    });
});

describe('auth/profil', () => {
    test('Cek Profil Success', async () => {
            const res = await request(app)
                .get('/auth/profil')
                .set("Authorization", tokenLogin)

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual({
                iat : res.body.data.iat,
                id : res.body.data.id,
                name : res.body.data.name,
                username : res.body.data.username
            });
    });
});

describe('/auth/changepass', () => {
    test('Change Password Failed', async () => {
            const res = await request(app)
                .put('/auth/changepass')
                .set("Authorization", tokenLogin)
                .send({
                    oldPassword : user.password,
                    newPassword : "PassBaru",
                    confirmNewPassword : "PassBeda"
                })

            expect(res.statusCode).toBe(422);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('new password and confirm new password doesnt match!');
            expect(res.body.data).toStrictEqual();
    });
});

describe('/auth/changepass', () => {
    test('Change Password Success', async () => {
            const res = await request(app)
                .put('/auth/changepass')
                .set("Authorization", tokenLogin)
                .send({
                    oldPassword : user.password,
                    newPassword : "PassBaru",
                    confirmNewPassword : "PassBaru"
                })

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual([1]);
    });
});

truncate.biodata();

describe('/biodata create', () => {
    // case success
    test('Create Success', async () => {
            const res = await request(app)
                .post('/biodata')
                .set("Authorization", tokenLogin)
                .send({
                    id_user : 1,
                    email : "febiago@mail.com",
                    addres : "Pacitan, Jawa Timur"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual({ 
                id_user : res.body.data.id_user,
                email : res.body.data.email,
                addres : res.body.data.addres
            });
    });
});

describe('/biodata read', () => {
    test('Read biodata Success', async () => {
            const res = await request(app)
                .get('/biodata')
                .set("Authorization", tokenLogin)

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual({
                id_user : res.body.data.id_user,
                email : res.body.data.email,
                addres : res.body.data.addres
            });
    });
});

describe('/biodata/update/', () => {
    test('Update Biodata Success', async () => {
            const res = await request(app)
                .put('/biodata/update')
                .set("Authorization", tokenLogin)
                .send({
                    id_user : 1,
                    email : "febia@mail.com",
                    addres : "Pacitan, Jawa Timur, Indo"
                })

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success update data!');
            expect(res.body.data).toStrictEqual({
                email : res.body.data.email,
                addres : res.body.data.addres
            });
    });
});

truncate.history();

describe('/history create', () => {
    // case success
    test('Create Success', async () => {
            const res = await request(app)
                .post('/history')
                .set("Authorization", tokenLogin)
                .send({
                    id_user : 1,
                    level : 8,
                    skill : "Water Canon"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual({ 
                id_user : res.body.data.id_user,
                level : res.body.data.level,
                skill : res.body.data.skill
            });
    });
});

describe('/history read', () => {
    test('Read history Success', async () => {
            const res = await request(app)
                .get('/history')
                .set("Authorization", tokenLogin)

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual({
                id_user : res.body.data.id_user,
                level : res.body.data.level,
                skill : res.body.data.skill
            });
    });
});

describe('/history/update/', () => {
    test('Update history Success', async () => {
            const res = await request(app)
                .put('/history/update')
                .set("Authorization", tokenLogin)
                .send({
                    id_user : 1,
                    level : 20,
                    skill : "Water Shuriken"
                })

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success update data!');
            expect(res.body.data).toStrictEqual({
                level : res.body.data.level,
                skill : res.body.data.skill
            });
    });
});

describe('/auth/delete/:id', () => {
    test('Delete User Success', async () => {
            const res = await request(app)
                .delete('/auth/delete/1')
                .set("Authorization", tokenLogin)

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('Delete data success');
            expect(res.body.data).toStrictEqual(1);
    });
});

describe('/biodata/delete/:id', () => {
    test('Delete Biodata Success', async () => {
            const res = await request(app)
                .delete('/biodata/delete/1')
                .set("Authorization", tokenLogin)

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual();
    });
});

describe('/history/delete/:id', () => {
    test('Delete History Success', async () => {
            const res = await request(app)
                .delete('/history/delete/1')
                .set("Authorization", tokenLogin)

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success');
            expect(res.body.data).toStrictEqual();
    });
});