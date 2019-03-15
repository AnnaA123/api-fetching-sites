'use strict';
const timeTable = document.querySelector('#timeTable');
const stopsList = document.querySelector('#stops');
const departureList = document.querySelector('#departure');
const headSignList = document.querySelector('#headSign');
const shortNameList = document.querySelector('#shortName');

const renderData = (info) =>
{
    console.log(info.data.stopsByRadius.edges[0].node.stop);
    let buses = [];
    for (let i = 0; i < 10; i++){
        console.log('aaaaaaaaaaaaaaaaaaa');
        let busInformation = [];

        //id
        let stopId = info.data.stopsByRadius.edges[i].node.stop.gtfsId;
        busInformation[0] = stopId;

        //pysäkit
        let stopName = info.data.stopsByRadius.edges[i].node.stop.name;
        busInformation[1] = stopName;

        //ajat
        let departureTime = info.data.stopsByRadius.edges[i].node.stop.stoptimesWithoutPatterns[0].realtimeDeparture;

        //muuttaa sekunnit muotoon H:M:S
        let h = Math.floor(departureTime / 3600);
        let m = Math.floor(departureTime % 3600 / 60);
        //let s = Math.floor(departureTime % 3600 % 60);

        let time =  h + ':' + m;
        busInformation[2] = time;

        //suunta
        let headSign = info.data.stopsByRadius.edges[i].node.stop.stoptimesWithoutPatterns[0].trip.tripHeadsign;
        busInformation[3] = headSign;

        //bussinro
        let busNum = info.data.stopsByRadius.edges[i].node.stop.stoptimesWithoutPatterns[0].trip.routeShortName;
        busInformation[4] = busNum;

        //listaus
        buses[i] = busInformation;

        //valitaan businformationista mitä näytetään
        //stop nimi
        let stopNameLi = document.createElement('li');
        stopNameLi.innerHTML = '<br>' + busInformation[1] + '<br>';
        stopsList.appendChild(stopNameLi);
        //lähtöaika
        let departureTimeLi = document.createElement('li');
        departureTimeLi.innerHTML = '<br>' + busInformation[2] + '<br>';
        departureList.appendChild(departureTimeLi);
        //suunta
        let headSignLi = document.createElement('li');
        headSignLi.innerHTML = '<br>' + busInformation[3] + '<br>';
        headSignList.appendChild(headSignLi);
        //bussinro
        let shortNameLi = document.createElement('li');
        shortNameLi.innerHTML = '<br>' + busInformation[4] + '<br>';
        shortNameList.appendChild(shortNameLi);
    }
};

const querydata = `
{
    stopsByRadius(lat: /*LATITUDE*/, lon: /*LONGITUDE*/, radius: 1000, first: 10) {
    edges {
        node {
            stop {
                gtfsId
                name
                lat
                lon
                stoptimesWithoutPatterns {
                    scheduledArrival
                    realtimeArrival
                    arrivalDelay
                    scheduledDeparture
                    realtimeDeparture
                    departureDelay
                    realtime
                    realtimeState
                    serviceDay
                    headsign
                    trip {
                        tripHeadsign
                        routeShortName
                    }
                }
            }
            distance
        }
        cursor
    }
    pageInfo {
        hasNextPage
        endCursor
    }
}
}
`;
let req = {
    url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    method: 'POST',
    headers: { "Content-Type": "application/graphql" },
    body: querydata
};

document.addEventListener('DOMContentLoaded', (evt) => {
    fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', req)
        .then(answer => answer.json())
        .then((json) => {console.log(json); renderData(json)})
        .catch(error => console.log(error));
});

request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body, null, 4));
    }
});


