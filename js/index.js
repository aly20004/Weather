const currentDay = document.getElementById("currentDay")
const currentMonth = document.getElementById("currentMonth")
const currentLocation = document.getElementById("currentLocation")
const currentTemp = document.getElementById("currentTemp")
const currentImg = document.getElementById("currentImg")
const currentHum = document.getElementById("currentHum")
const currentWind = document.getElementById("currentWind")
const currentDir = document.getElementById("currentDir")
const search = document.getElementById("search");
const currentSun = document.getElementById("sun")
const apiKey = "5a86a8bda390483c8b0123355240507";
let allData;
async function getData() {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5a86a8bda390483c8b0123355240507&q=${search.value ? search.value : "alex"}&days=3`);
    var data = await response.json();
    allData = data;
    console.log(allData);
    displayWeatherToday();
    nextDays()
}

function displayWeatherToday() {
    const date = new Date(allData.location.localtime);
    // const locaCurrent = allData.current
    currentDay.innerHTML = date.toLocaleString('default', { weekday: 'long' });
    currentMonth.innerHTML = date.toLocaleString('default', { day: '2-digit', month: 'long' });
    currentLocation.innerHTML = allData.location.name;
    currentTemp.innerHTML = allData.current.temp_c + "C";
    currentImg.setAttribute("src", "https:" + allData.current.condition.icon);
    currentHum.innerHTML = allData.current.humidity + "%";
    currentWind.innerHTML = allData.current.wind_kph + "km/h";
    currentSun.innerHTML = allData.current.condition.text;

    search.addEventListener("input", () => {
        getData();
    })
}
let x = document.querySelectorAll(".currentTemp")
let y = document.querySelectorAll(".currentDay")
let z = document.querySelectorAll(".currentMonth")
let w = document.querySelectorAll(".currentImg")
let b = document.querySelectorAll(".textt")
function nextDays() {
    let nextArr = allData.forecast.forecastday;

    for (let i = 0; i < 2; i++) {
        const date2 = new Date(nextArr[i + 1].date);
        y[i].innerHTML = date2.toLocaleString('default', { weekday: 'long' });
        z[i].innerHTML = date2.toLocaleString('default', { day: '2-digit', month: 'long' });
        x[i].innerHTML = nextArr[i + 1].day.maxtemp_c + "C";
        w[i].setAttribute("src", "https:" + nextArr[i + 1].day.condition.icon);
        b[i].innerHTML = nextArr[i + 1].day.condition.text;
    }
}

getData();