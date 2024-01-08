let temp = document.querySelector(".temp");
let name = document.querySelector(".name");
let days = document.querySelector(".days");
let monthDay = document.querySelector(".monthDay");
let month = document.querySelector(".month");
let icon = document.querySelector(".icon");
let condition = document.querySelector(".condition");

let searchInput = document.querySelector(".search");
let btn = document.querySelector('.submit')
let city = document.querySelector('.city')
let cloud = document.querySelector(".cloud");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

/* select element nextDay */
let dayTomo = document.querySelector('.day')
let hamadaIcon = document.querySelector('.hamadaIcon')
let degree = document.querySelector('.degree')
let smallDegree = document.querySelector('.smallDegree')
let sunny = document.querySelector('.custom')

/* select element nextDayAfter */
let dayAfterTomorrow = document.querySelector('.dayAfterTomorrow')
let iconAfterTomorrow = document.querySelector('.iconAfterTomorrow')
let degreeAfterTomorrow = document.querySelector('.degreeAfterTomorrow')
let smallDegreeAfterTomorrow = document.querySelector('.smallDegreeAfterTomorrow')
let customAfter = document.querySelector('.customAfter')



//--the days of week start from sunday in javascript and the value of sunday == 1
//--the months of year start from January  and the value of January == index [0] 
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let Days = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


let history = new Date()
// console.log(history);
let historyMonth = history.getMonth()

let historyDay = history.getDay()
// console.log(historyDay);

let today = history.getDate()
// console.log(today);

let printDay =  Days[historyDay] 
// console.log(printDay);

let printMonth = months[historyMonth]
// console.log(printMonth);

//-----------------------------------------

btn.addEventListener('click', ()=> {
    let inputValue = searchInput.value
    getApi(inputValue)
    clearFun()
})
searchInput.addEventListener('change', ()=> {
    let inputValue = searchInput.value
    getApi(inputValue)
    clearFun()
})

getApi('Paris') // Default city whin the page loads
async function getApi(meal) {
let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=229caeb0d21c4fe392b183516240601&q=${meal}&days=3`)
let data = await api.json()
// console.log(data);
    displayData(data)
    nextDay(data)
    nextDayAfter(data)
}



function displayData(show) {
temp.innerHTML = `${show.current.temp_c}&#176c`
name.innerHTML = show.location.name
days.innerHTML = printDay
monthDay.innerHTML = today
month.innerHTML =  printMonth
icon.setAttribute('src', `${show.current.condition.icon}`)
condition.innerHTML = show.current.condition.text
cloud.innerHTML = `${show.current.cloud}%`
humidity.innerHTML = `${show.current.humidity}%`
wind.innerHTML = `${show.current.wind_kph}km/h`
}

function nextDay(dayTomorrow) {

dayTomo.innerHTML = dayTomorrow.forecast.forecastday[1].date
hamadaIcon.setAttribute('src', `${dayTomorrow.forecast.forecastday[1].day.condition.icon}`)
degree.innerHTML = `${dayTomorrow.forecast.forecastday[1].day.maxtemp_c}&#176;C`
smallDegree.innerHTML = `${dayTomorrow.forecast.forecastday[1].day.mintemp_c}&#176;C`
sunny.innerHTML = dayTomorrow.forecast.forecastday[1].day.condition.text
}


function nextDayAfter(afterTomorrow) { 

    // let nextDay = afterTomorrow.forecast.forecastday[2].date
    //     let changeDay = new Date(nextDay)
    //     let showDays = Days[changeDay.getDay()]
        // console.log(showDays);

dayAfterTomorrow.innerHTML = afterTomorrow.forecast.forecastday[2].date
iconAfterTomorrow.setAttribute('src', `${afterTomorrow.forecast.forecastday[2].day.condition.icon}`)
degreeAfterTomorrow.innerHTML = `${afterTomorrow.forecast.forecastday[2].day.maxtemp_c}&#176;C`
smallDegreeAfterTomorrow.innerHTML = `${afterTomorrow.forecast.forecastday[2].day.mintemp_c}&#176;C`
customAfter.innerHTML = afterTomorrow.forecast.forecastday[2].day.condition.text
}

function clearFun() { // clear data in input
    searchInput.value = "";
}

// Ge Location
let btnLocation = document.querySelector('.btnLocation')
btnLocation.addEventListener('click', ()=> {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } 
})

function showPosition(position) {

let lat = position.coords.latitude
let lon = position.coords.longitude

let location = `${lat},${lon}`
getApi(location)
}
