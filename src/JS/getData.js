import axios from 'axios';

//Get all the data of interest to the admin from the db
async function getData () {
    const trainer = [];
    const athlete = [];
    const categories = [];
    const categoryA = [];
    const withoutTrainer = [];
    const calendar = [];

    //Get All category
    await axios
        .get('http://localhost:2000/api/v1/categoryAll/list', { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then((response) => {
            categories.push(...new Set( response.data.data.reduce((acc, el) => { 
                acc.push(el.category); 
                return acc;
            }, [])));
            categoryA.push(...new Set(response.data.data.filter(el => el.username_trainer).map(elem => elem.category)))
        })
    
    //Get all categories related to trainers
    await axios
        .get('http://localhost:2000/api/v1/categories_of_trainers', { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then((response) => trainer.push(...response.data.data));

    //Get all categories related to athletes
    await axios
        .get('http://localhost:2000/api/v1/categories_of_athlete', { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then((response) => athlete.push(...response.data.data));
    
    //Get all athletes who have no associated category
    await axios
        .get('http://localhost:2000/api/v1/select', { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then((response) => {
            const allAthlete = response.data.code.filter(el => el.role === 'athlete');
            const athleteCourseUsername = athlete.map(el => el.username)

            withoutTrainer.push(...allAthlete.filter(athl => !athleteCourseUsername.includes(athl.username) ));
        });

    //Get all calendar events list
    await axios
        .get(`http://localhost:2000/api/v1/calendary/list/Admin`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then((response) => calendar.push(...response.data.data));

    return {
        status: trainer.length === 0 || athlete.length === 0 || categories.length === 0 || calendar.length === 0,
        trainers: trainer,
        athletes: athlete,
        categories: categories,
        categoryAthlete: categoryA,
        withoutTrainer: withoutTrainer,
        calendar: calendar
    }
}

//Get all the data of interest to the single trainer from the db
async function getTrainerData (trainerUsername) {
    const data = [];
    const calendar = [];

    //Get all athletes assigned to the categories of the logged in trainer
    await axios
        .get(`http://localhost:2000/api/v1/category_and_accounts/${trainerUsername}`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then((response) => data.push(...response.data.data));

    //Get all calendar events list
    await axios
        .get(`http://localhost:2000/api/v1/calendary/list/${trainerUsername}`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then((response) => calendar.push(...response.data.data));
        
    return {
        status: data.length === 0,
        data: data,
        calendar: calendar
    }
}

export default { getData, getTrainerData }