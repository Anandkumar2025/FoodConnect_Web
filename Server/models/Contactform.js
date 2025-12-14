const mongoose = require('mongoose');

const ContactForm = new mongoose.Schema({
    name : String,
    email: String,
    message:String
})

const ConatctFormModel = mongoose.model('contact_form', ContactForm);

module.exports = ConatctFormModel;
