const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PlanetSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  clima: {
    type: String,
    required: true
  },
  terreno: {
    type: String,
    required: true
  },
  qtdFilmes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

PlanetSchema.plugin(mongoosePaginate);

mongoose.model("Planet", PlanetSchema);
