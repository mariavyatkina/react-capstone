var mongoose6 = require('mongoose');
var MovieSchema = new mongoose6.Schema({
    imdbID: {
        type: String,
        "default": "",
        required: true,
        unique: true
    },
    userId: {
        type: String,
        "default": '',
        required: true
    },
    isFavorited: {
        type: Boolean,
        "default": false
    },
    isOnWatchlist: {
        type: Boolean,
        "default": false
    }
});
module.exports = mongoose6.model('Movie', MovieSchema);
