const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '728b0ee6df5687559812bd3169ad77b7';
    const ville = document.querySelector('.search-box input').value;

    if (ville === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidite = document.querySelector('.weather-details .humidite span');
            const vent = document.querySelector('.weather-details .vent span');

            switch (json.weather[0].main) {
                case 'Clair':
                    image.src = 'images/clair.png';
                    break;

                case 'Pluie':
                    image.src = 'images/pluie.png';
                    break;

                case 'Neige':
                    image.src = 'images/neige.png';
                    break;

                case 'Nuageux':
                    image.src = 'images/nuage.png';
                    break;

                case 'Brouillard':
                    image.src = 'images/brouillard.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidite.innerHTML = `${json.main.humidity}%`;
            vent.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});