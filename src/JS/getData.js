import axios from 'axios';

async function getData () {
    const trainer = [];
    const athlete = [];
    const categories = [];
    const categoryA = [];
    const withoutTrainer = [];

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
    
    await axios
        .get('http://localhost:2000/api/v1/select')
        .then((response) => {
            const allAthlete = response.data.code.filter(el => el.role === 'athlete');
            const athleteCourseUsername = athlete.map(el => el.username)

            withoutTrainer.push(...allAthlete.filter(athl => !athleteCourseUsername.includes(athl.username) ));
        });

    return {
        status: trainer.length === 0 || athlete.length === 0 || categories.length === 0,
        trainers: trainer,
        athletes: athlete,
        categories: categories,
        categoryAthlete: categoryA,
        withoutTrainer: withoutTrainer
    }
}

async function getTrainerData (trainerUsername) {
    const data = [];
    const calendar = [];

    await axios
        .get(`http://localhost:2000/api/v1/category_and_accounts/${trainerUsername}`)
        .then((response) => data.push(...response.data.data));

    await axios
        .get(`http://localhost:2000/api/v1/calendary/list/${trainerUsername}`)
        .then((response) => calendar.push(...response.data.data));
        
    return {
        status: data.length === 0,
        data: data,
        calendar: calendar
    }
}

export default { getData, getTrainerData }