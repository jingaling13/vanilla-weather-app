function formatDate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours <10) {
        hours =   `=${minutes}`;
    }
    let minutes = date.getMinutes();
    if (minutes <10) {
        minutes =   `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let desctriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("icon");

    temperatureElement.innerHTML = Math.round (response.data.main.temp);
    cityElement.innerHTML = response.data.main.name;
    desctriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src" , `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );
    iconElement.setAttribute("alt" , response.data.weather[0].description);
}

let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
let city = "Melbourne";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);