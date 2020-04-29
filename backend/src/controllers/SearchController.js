const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        //busca todos os devs num raio de 10km
        //filtrar por tecnologias
        const { latitude, longitude, techs } = request.query
        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({ //filtro de tecnologias
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: { //passando um ponto
                        type: 'Point',
                        coordinates: [longitude, latitude] //estão vindo através do request.query
                    },
                    $maxDistance: 10000
                }//encontrar objetos perto de uma localização
            }
        })

        return response.json({ devs })
    }
}