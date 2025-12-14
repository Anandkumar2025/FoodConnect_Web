const mongoose = require('mongoose');

const DoanteDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    food: String,
    quantity: String,
    time: String,
    expiry:String,
    claimed: { type: Boolean, default: false },
  }, { timestamps: true });
const DonateFormModel = mongoose.model('donate_form', DoanteDataSchema);

module.exports = DonateFormModel;