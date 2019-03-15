'use strict';
const foodNameFiList = document.querySelector('#foodNameFi');
//const foodNameEnList = document.querySelector('#foodNameEn');
const foodPropertiesList = document.querySelector('#foodProperties');
const foodPriceList = document.querySelector('#foodPrice');

const renderData = (info) =>
{
    let foods = [];
    for (let i = 0; i < 10; i++){
        console.log(info.courses[i].title_fi);
        let foodInformation = [];

        //suomenkielinen nimi
        let foodNameFi = info.courses[i].title_fi;
        foodInformation[0] = foodNameFi;

        let foodNameFiLi = document.createElement('li');
        foodNameFiLi.innerHTML = foodInformation[0];
        foodNameFiList.appendChild(foodNameFiLi);

        //allergiat sun muut
        let foodProperties = info.courses[i].properties;
        foodInformation[1] = foodProperties;

        let foodPropertiesLi = document.createElement('li');
        foodPropertiesLi.innerHTML = foodInformation[1];
        foodPropertiesList.appendChild(foodPropertiesLi);

        //hinnat
        let foodPrices = info.courses[i].price;
        foodInformation[2] = foodPrices;

        let foodPricesLi = document.createElement('li');
        foodPricesLi.innerHTML = foodInformation[2] + ' €';
        foodPriceList.appendChild(foodPricesLi);
    }
};

const querydata = `
{
    meta {
        generated_timestamp
        requested_timestamp
        ref_url
        ref_title
        }
    courses {
        title_fi
        title_en
        price
        properties
        desc_fi
        desc_en
        desc_se
}
`;

let toDate = new Date();

let req = {
    url: 'https://cors-anywhere.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/' + /* ADD LOCATION CODE HERE */ + '/' + toDate.getFullYear() + '/' + (toDate.getMonth() + 1) + '/' + toDate.getDate() + '/fi',
    method: 'POST',
    headers: { "Content-Type": "application/graphql" },
    body: querydata
};

document.addEventListener('DOMContentLoaded', (evt) => {
    fetch('https://cors-anywhere.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/' + /* ADD LOCATION CODE HERE */ + '/' + toDate.getFullYear() + '/' + (toDate.getMonth() + 1) + '/' + toDate.getDate() + '/fi', req)
        .then(answer => answer.json())
        .then((json) => {console.log(json); renderData(json)})
        .catch(error => console.log(error));
});

request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body, null, 4));
    }
});
