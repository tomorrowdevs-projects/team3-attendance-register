import axios from 'axios';

const baseUrl = 'http://localhost:2000/api/v1/';

//Get all the data of interest to the admin from the db
async function getData () {

    //Get All category
    const categories = axios
        .get(`${baseUrl}categoryAll/list`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
    
    //Get all categories related to trainers
    const trainers = axios
        .get(`${baseUrl}categories_of_trainers`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })

    //Get all categories related to athletes
    const athletes = axios
        .get(`${baseUrl}categories_of_athlete`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
    
    //Get all athletes who have no associated category
    const withoutTrainer = axios
        .get(`${baseUrl}select`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })

    //Get all calendar events list
    const calendar = axios
        .get(`${baseUrl}calendary/list/Admin`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
    
    return Promise.all([categories, trainers, athletes, withoutTrainer, calendar]).then(result => {
        const categories = [...new Set( result[0].data.data.reduce((acc, el) => { 
            acc.push(el.category); 
            return acc;
        }, []))];

        const categoryA = [...new Set(result[0].data.data.filter(el => el.username_trainer).map(elem => elem.category))];

        const trainers = result[1].data.data;

        const athletes = result[2].data.data;

        const allAthlete = result[3].data.code.filter(el => el.role === 'athlete');
        const athleteCourseUsername = athletes.map(el => el.username)
        const withoutTrainer = allAthlete.filter(athl => !athleteCourseUsername.includes(athl.username) );

        const calendar = result[4].data.data

        return {
            status: trainers.length === 0 || athletes.length === 0 || categories.length === 0,
            trainers: trainers,
            athletes: athletes,
            categories: categories,
            categoryAthlete: categoryA,
            withoutTrainer: withoutTrainer,
            calendar: calendar
        }
    })
};


//Get all the data of interest to the single trainer from the db
async function getTrainerData (trainerUsername) {

    //Get all athletes assigned to the categories of the logged in trainer
    const data = axios
        .get(`${baseUrl}category_and_accounts/${trainerUsername}`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })

    //Get all calendar events list
    const calendar = axios
        .get(`${baseUrl}calendary/list/${trainerUsername}`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
    
    //Get data for personal profile
    const userData = axios
        .get(`http://localhost:2000/api/v1/select`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })

    return Promise.all([data, calendar, userData]).then(result => {
        const data = result[0].data.data;
        const calendar = result[1].data.data;
        const userData = result[2].data.code.filter(el => el.username === trainerUsername);

        return {
            status: data.length === 0 || userData.length === 0,
            data: data,
            calendar: calendar,
            user: userData
        }
    })
    
}

export default { getData, getTrainerData }