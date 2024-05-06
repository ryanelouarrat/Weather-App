let tempHtml = document.getElementById("temp"),
  cityHtml = document.getElementById("city"),
  humidityHtml = document.getElementById("humidity"),
  windHtml = document.getElementById("wind"),
  weatherimg = document.querySelector("#weatherIcon"),
  sunrise = document.querySelector(".sunrise"),
  input = document.querySelector("input"),
  errorMessage = document.querySelector(".err"),
  sunset = document.querySelector(".sunset");

  function handleEvent(event, element) {
    if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
        let inputValue = element.tagName.toLowerCase() === "input"
            ? element.value
            : element.previousElementSibling.value;
        
        if (!inputValue) return;

        fetchData(inputValue, element);
    }
}

function fetchData(query, inputElement) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=e41a310fb7071725f558669082fd858e`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    inputElement.classList.add("shake");
                    errorMessage.style.display = "block";
                    setTimeout(() => {
                        errorMessage.style.display = "none";
                    }, 1500);
                    setTimeout(() => {
                        inputElement.classList.remove("shake");
                    }, 200);
                }
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            setarrays(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


function toHours(date) {
  var initial = new Date(date * 1000);
  let hours = initial.getUTCHours();
  let minutes = ("0" + initial.getUTCMinutes()).slice(-2);
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  let timeString = hours + ":" + minutes + " " + period;
  return timeString;
}

function setarrays(data) {
  let temp = Math.round(data.main.temp - 273.15);
  tempHtml.innerHTML = temp + "°C";
  cityHtml.innerHTML = data.name;
  humidityHtml.innerHTML = data.main.humidity + " %";
  windHtml.innerHTML = data.wind.speed + "m/s";
  sunrise.innerHTML = toHours(data.sys.sunrise);
  sunset.innerHTML = toHours(data.sys.sunset);

  console.log(data.weather[0].main);
  switch (data.weather[0].main) {
    case "Clear":
      weatherimg.src = "media/sun.svg";
      break;
    case "Clouds":
      weatherimg.src = "media/Clouds.svg";
      break;
    case "Rain":
      weatherimg.src = "media/Rain.svg";
      break;
    case "Drizzle":
      weatherimg.src = "media/Drizzle.svg";
      break;
    case "Thunderstorm":
      weatherimg.src = "media/Thunderstorm.svg";
      break;
    case "Snow":
      weatherimg.src = "media/Snow.svg";
      break;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
      weatherimg.src = "media/Foggy.svg";
      break;
    case "Squall":
      weatherimg.src = "media/Squall.svg";
      break;
    case "Tornado":
      weatherimg.src = "media/Tornado.svg";
      break;
    default:
      weatherimg.src = "media/Default.svg";
      break;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  yourFunction();
});

function yourFunction() {
  console.log("Website is loaded!");
  fetchData("meknes", input)
}