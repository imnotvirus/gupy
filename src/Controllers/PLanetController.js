const mongoose = require('mongoose');
const swapi = require('swapi-node');
const Planet = mongoose.model('Planet');


function buscaFilme(nome) {
  swapi.get(`https://swapi.co/api/planets/?format=json&search=${nome}`)
    .then((result) => {
      let count = 0
      count = result.results.map(data => {
        console.log("count:  " + count + data.films.length)
        return count + data.films.length;
      })
    }).catch((e) => {
      console.log("erro catch: " + e);
      return 0;
    })
  return;
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const planets = await Planet.paginate({},
      {
        page,
        limit: 10
      });

    return res.json(planets);
  },
  async showById(req, res) {
    const planet = await Planet.findById(req.params.id);

    return res.json(planet);
  },
  async showByName(req, res) {
    const planet = await Planet.find({nome: req.params.nome});

    return res.json(planet);
  },
  async store(req, res) {
    const planet = await Planet.create(req.body);
    const nome = planet.get('nome');
    planet.set({qtdFilmes: buscaFilme(nome)})
       
    return res.json(planet);
  },
  async update(req, res) {
    const planet = await Planet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    return res.json(planet);
  },
  async destroy(req, res) {
    await Planet.findByIdAndDelete(req.params.id);

    return res.send();
  }
}
