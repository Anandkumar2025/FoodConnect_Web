const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name : String,
    email: String,
    address:String,
    organization:String,
    password: String,

})

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
