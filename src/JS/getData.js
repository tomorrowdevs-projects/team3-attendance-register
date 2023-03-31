import axios from 'axios';

async function getData () {
    const trainer = [];
    const athlete = [];
    const category = [];

    await axios
        .get('http://localhost:2000/api/v1/categoryAll/list')
        .then((response) => {console.log('data2',response.data.data2);category.push(...response.data.data)})
        
    await axios
        .get('http://localhost:2000/api/v1/categories_of_trainers')
        .then((response) => trainer.push(...response.data.data));

    await axios
        .get('http://localhost:2000/api/v1/categories_of_athlete')
        .then((response) => athlete.push(...response.data.data));
console.log(athlete,trainer,category, 'getData')

    return {
        status: trainer.length === 0 || athlete.length === 0 || category.length === 0,
        trainers: trainer,
        athletes: athlete,
        categories: category
    }
}

export default { getData }