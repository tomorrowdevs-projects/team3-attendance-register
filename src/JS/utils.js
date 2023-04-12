//capitalizes the first letter
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

//converts time units from 30 minutes to hh:mm
function convertToTime(num) {
    var hours = Math.floor(num / 2);
    var minutes = (num % 2) * 30;
    return hours.toString() + ':' + minutes.toString().padStart(2, '0');
}

//Function which is called as a callback for the athletes' sorts
function compare(a, b) {
    if (a.surname < b.surname) return -1;
    if (a.surname > b.surname) return 1;
    return 0;
};

export default { capitalizeFirstLetter, convertToTime, compare }
