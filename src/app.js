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

    celciusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round (celciusTemperature);
    cityElement.innerHTML = response.data.main.name;
    desctriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src" , `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt" , response.data.weather[0].description);
}

function search(city) {
    let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    console.log(cityInputElement.value);
}

function displayFarenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelciusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.add("active");
    farenheitLink.classList.remove("active");
    let celciusTemperature = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("selector-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("New York");