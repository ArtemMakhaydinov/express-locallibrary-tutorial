const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book: { type: Schema.Types.ObjectID, ref: 'Book', required: true }, // reference to the associated book
    imprint: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance',
    },
    due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual('url').get(function () {
    return `/catalog/bookinstance/${this._id}`;
});

// Virtual to format date
BookInstanceSchema.virtual('due_back_formatted').get(function () {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

// Virtual to format date for HTML form
BookInstanceSchema.virtual('due_back_html_form').get(function () {
    return DateTime.fromJSDate(this.due_back).toISODate();
});

// Return model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
