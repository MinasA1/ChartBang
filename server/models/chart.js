const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let ChartSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    labels: {
        type: Array,   
        required: true
    },
    datasets: [{
        type: Schema.Types.ObjectId
    }]
});

const  Chart = mongoose.model('Chart', ChartSchema);
module.exports = Chart;