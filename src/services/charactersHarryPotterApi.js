import { v4 as uuid } from 'uuid';
const getDataApi = () => {
    return fetch("http://hp-api.herokuapp.com/api/characters")
        .then(response => response.json())
        .then((data) => {
            const dataClean = data.map((character) => {
                return {
                    id: uuid(),
                    image: character.image,
                    name: character.name,
                    species: character.species,
                    house: character.house,
                    alive: character.alive,
                    gender: character.gender,
                    alternate_names: character.alternate_names,
                    ancestry: character.ancestry,
                    hogwartsStudent: character.hogwartsStudent
                    
                }
            });
            return dataClean;
        });
}

export default getDataApi;