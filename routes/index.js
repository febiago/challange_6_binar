const express = require('express');
const router = express.Router();
const c = require('../controllers');
const m = require('../helpers/middleware');

router.post('/auth/register', c.auth.register);
router.post('/auth/login', c.auth.login);
router.get('/auth/profil',m.mustLogin, c.auth.profil);
router.put('/auth/changepass',m.mustLogin, c.auth.changePassword);
router.delete('/auth/delete/:id',m.mustLogin, c.auth.delete);

router.get('/biodata',m.mustLogin, c.biodata.read);
router.post('/biodata',m.mustLogin, c.biodata.create);
router.put('/biodata/update/',m.mustLogin, c.biodata.update);
router.delete('/biodata/delete/:id',m.mustLogin, c.biodata.delete);

router.get('/history',m.mustLogin, c.history.read);
router.post('/history',m.mustLogin, c.history.create);
router.put('/history/update',m.mustLogin, c.history.update);
router.delete('/history/delete/:id',m.mustLogin, c.history.delete);

module.exports = router; 


