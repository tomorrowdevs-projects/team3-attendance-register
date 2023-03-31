import axios from 'axios';

async function getData () {
    const trainer = [];
    const athlete = [];
    const categories = [];
    const categoryA = [];

    await axios
        .get('http://localhost:2000/api/v1/categoryAll/list')
        .then((response) => {
            categories.push(...new Set( response.data.data.reduce((acc, el) => { 
                acc.push(el.category); 
                return acc;
            }, [])));
            categoryA.push(...new Set(response.data.data.filter(el => el.username_trainer).map(elem => elem.category)))
        })
        
    await axios
        .get('http://localhost:2000/api/v1/categories_of_trainers')
        .then((response) => trainer.push(...response.data.data));

    await axios
        .get('http://localhost:2000/api/v1/categories_of_athlete')
        .then((response) => athlete.push(...response.data.data));
          console.log(categories)
    return {
        status: trainer.length === 0 || athlete.length === 0 || categories.length === 0,
        trainers: trainer,
        athletes: athlete,
        categories: categories,
        categoryAthlete: categoryA
    }
}

export default { getData }