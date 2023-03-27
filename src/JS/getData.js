import axios from 'axios';

async function getData () {
    const user = [];
    const category = [];

    await axios
        .get('http://localhost:2000/api/v1/select')
        .then((response) => user.push(...response.data.code));

    await axios
        .get('http://localhost:2000/api/v1/categoryAll/list')
        .then((response) => category.push(...response.data.data.reduce((acc, el) => { acc.push(el.category); return acc }, [])))

    return {
        status: user.length === 0 || category.length === 0,
        users: user,
        categories: category
    }
}

export default { getData }