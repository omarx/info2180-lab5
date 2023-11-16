document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('country');
    const searchBtn = document.getElementById('lookup');
    const result = document.getElementById('result');

    function searchCountries() {
        //This part prevents html injection
        let searchVal = encodeURIComponent(searchInput.value);
        fetch(`/world.php?country=${searchVal}`)
            .then(response => response.json())
            .then(resp => {
                result.innerHTML = '';
                resp.forEach(data => {
                    const countryElement = document.createElement('h1');
                    countryElement.textContent = data.name;
                    result.appendChild(countryElement);
                });
            })
            .catch(err => console.error(`This is response from the server: ${err}`));
    }

    searchBtn.addEventListener('click', searchCountries);
});
