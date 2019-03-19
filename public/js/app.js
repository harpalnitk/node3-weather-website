console.log('Client side javascript file is loaded!!');
const weatherForm = document.getElementById('weatherForm');
const search = document.getElementById('address');
 resultAddress = document.getElementById('result-address');
 resultLocation = document.getElementById('result-location');
 resultForecast = document.getElementById('result-forecast');
console.log(search.value);

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    resultAddress.innerHTML = 'Loading...';
    resultLocation.innerHTML = '';
    resultForecast.innerHTML = '';
    const location = search.value;
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                resultAddress.innerHTML = data.error;
            } else {
                resultAddress.innerHTML = location;
                resultLocation.innerHTML = data.location;
                resultForecast.innerHTML = data.forecast;
            }
        });
    })
});