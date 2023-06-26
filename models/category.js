const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    toObject: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('Category', categoriesSchema);
