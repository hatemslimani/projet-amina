
const express = require('express');
const router = express.Router();
const Personne = require('../personne');



router.get('/', async (req, res,) => {
    console.log("page index");
    try {
        var result = await Personne.find().exec();
        res.render('index', { result: result });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/modifier/:id', async (req, res) => {
    try {
        var ancpersonne = await Personne.findById({ _id: req.params.id }).exec();
        ancpersonne.numero = req.body.numero;
        console.log(ancpersonne.numero);
        ancpersonne.nom = req.body.nom;
        ancpersonne.prenom = req.body.prenom;
        ancpersonne.telephone = req.body.telephone;
        ancpersonne.email = req.body.email;
        ancpersonne.type = req.body.type;

        var result = await ancpersonne.save();
        res.redirect('/');
    }
    catch (error) {
        res.status(400).send("impossible de modifier la base de données");
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        var result = await Personne.findById({ _id: req.params.id }).exec();
        res.render('modifier', { result: result, id: req.params.id });
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.post('/ajout', async (req, res) => {
    try {
        var personne = new Personne({
            numero: req.body.numero,
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            telephone: req.body.telephone,
            type: req.body.type

        });
        var result = await personne.save();
        res.redirect('/');
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get('/add', async (req, res) => {
    try {
        res.render('add');
    } catch (error) {
        res.status(500).send(error);
    }
});




// Supprimer une personne
router.get('/delete/:personneId', async (req, res) => {
    try {
        var result = await Personne.deleteOne({ _id: req.params.personneId }).exec();
        // res.send(result);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;