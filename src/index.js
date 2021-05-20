import axios from "axios";
let api = "https://app.ticketmaster.com///discovery/v2/attractions.json?page=0&size=200&apikey=LnkWneubYxHczQn2Zxg6hfb5XBc43ZHa";
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const cases = document.querySelector(".cases");
const recovered = document.querySelector(".recovered");
const deaths = document.querySelector(".deaths");
const results = document.querySelector(".result-container");
const body = document.querySelector("body");
results.style.display = "none";
loading.style.display = "none";
errors.textContent = "";
// grab the form
const form = document.querySelector(".form-data");
// grab the country name
const country = document.querySelector(".country-name");

// declare a method to search by country name
const searchForCountry = async (countryName, num = 0) => {
  loading.style.display = "block";
  errors.textContent = "";
  try {
    // const response = await axios.get(`${api}/${countryName}`);
    const response = await axios.get(`https://app.ticketmaster.com///discovery/v2/attractions.json?page=${num}&size=200&apikey=LnkWneubYxHczQn2Zxg6hfb5XBc43ZHa`);
    
    let attractionIndex = -1;
    let found = false;

    for(let i = 0; i < response.data._embedded.attractions.length; i++){
      // let inputLowercase = countryName.toLowerCase();
      // let dataLowercase = response.data._embedded.attractions[i].name.toLowerCase();
      console.log(response.data._embedded.attractions[i].name);
      if(response.data._embedded.attractions[i].aliases){
        if(response.data._embedded.attractions[i].name.toLowerCase() == countryName.toLowerCase() || response.data._embedded.attractions[i].aliases.includes(countryName.toLowerCase()) || response.data._embedded.attractions[i].aliases.includes(countryName)){
          attractionIndex = i;
          found = true;
          break;
        }
      }else if(response.data._embedded.attractions[i].name.toLowerCase() == countryName.toLowerCase()){
        if(response.data._embedded.attractions[i].name.toLowerCase() == countryName.toLowerCase()){
          attractionIndex = i;
          found = true;
          break;
        }
      }
      // if(response.data._embedded.attractions[i].aliases){
      //   if(response.data._embedded.attractions[i].name == countryName || response.data._embedded.attractions[i].aliases.includes(countryName)){
      //     attractionIndex = i;
      //     break;
      //   }
      // }else {
      //   if(response.data._embedded.attractions[i].name == countryName){
      //     attractionIndex = i;
      //     break;
      //   }
      // }
    }

    if(!found && num < 5){
      api = `https://app.ticketmaster.com///discovery/v2/attractions.json?page=${num}&size=200&apikey=LnkWneubYxHczQn2Zxg6hfb5XBc43ZHa`

      num += 1;
      searchForCountry(countryName, num);
    }

    loading.style.display = "none";
    // cases.textContent = response.data.confirmed.value;
    cases.textContent = response.data._embedded.attractions[attractionIndex].name;
    // recovered.textContent = response.data._embedded.attractions[attractionIndex].images[0].url;
    // deaths.textContent = response.data._embedded.attractions[attractionIndex].url;
    deaths.innerHTML = `<a href = "${response.data._embedded.attractions[attractionIndex].url}">Get tickets</a>`
    results.style.display = "block";

    console.log(body.childNodes);
    if(body.childNodes[7]){
      body.removeChild(body.childNodes[7]);
    };
    let attractionImg = document.createElement("img");
        attractionImg.src=response.data._embedded.attractions[attractionIndex].images[0].url;
        body.append(attractionImg)
  } catch (error) {
    if(!found){
      loading.style.display = "none";
      results.style.display = "none";
      errors.textContent = "Sorry, we were unable to find what you were looking for.";
    } else{
      loading.style.display = "none";
      results.style.display = "none";
      errors.textContent = "Sorry, we were unable to find what you were looking for.";
    }
    // loading.style.display = "none";
    // results.style.display = "none";
    // errors.textContent = "Sorry, we were unable to find what you were looking for.";

  }
};

// declare a function to handle form submission
const handleSubmit = async e => {
  e.preventDefault();
  searchForCountry(country.value);
  console.log(country.value);
};

form.addEventListener("submit", e => handleSubmit(e));


// "default_icon": {
  // "16": "ticketmasterLogo.png",
  // "32": "ticketmasterLogo.png",
  // "128": "ticketmasterLogo.png"
  // },