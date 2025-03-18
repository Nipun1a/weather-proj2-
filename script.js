document.addEventListener('DOMContentLoaded', () => {
    const cityinput = document.getElementById("city-input");
    const geteweatherbtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const citynamedisplay = document.getElementById("city-name");
    const temperaturedisplay = document.getElementById("temperature");
    const descriptiondisplay = document.getElementById("description");
    const errormessage = document.getElementById("error-message");

    // set the api key here 
    const API_KEY = "b836cad8ed9d48df97c133143251403";

    geteweatherbtn.addEventListener('click', async function()  {
        const city = cityinput.value;
        if (!city) return;

        // it may throw an error 
        // server/database is always in another continent
        // so we use try catch block
        //remember to use async await and await is always in the async function
        try{
            const weatherdata = await fetchweatherdata(city);
            displayweatherdata(weatherdata);
        }catch(error){
            showerror();

        }
        });

        async function fetchweatherdata(city){
            //gets the data 
            const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;//api url
            try{
                const response = await fetch(url);
                if (!response.ok){
                    throw new Error("city not found");

                }
                const data = await response.json();
                return data;
            }catch(error){
                console.error("error fetching weather data",error);
                throw error;
            }

        }

        function displayweatherdata(data){

            //display the data
            console.log(data); //debugging checking the data in the console
            // extract the necessary fields aur data bhe from the API response
            const {name} = data.location;
            const {temp_c, condition} = data.current;
            const {text} = condition;
            // display the data
            citynamedisplay.textContent = name;
            temperaturedisplay.textContent = `Temperature :  ${temp_c}°C`;
            descriptiondisplay.textContent = `Description : ${text}`;
            // show weather info hide error message 
            weatherInfo.classList.remove("hidden");
            errormessage.classList.add("hidden");
            
        }

        function showerror(){
            // show the error message
            weatherInfo.classList.add("hidden");
            errormessage.classList.remove("hidden");
        }



    });