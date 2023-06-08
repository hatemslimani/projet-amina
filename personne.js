const mongoose = require("mongoose")
const personneSchema = mongoose.Schema({
    numero: String,
    nom: String,
    prenom: String,
    email: String,
    telephone: String,
    type: String

});
module.exports = mongoose.model('personne', personneSchema)
