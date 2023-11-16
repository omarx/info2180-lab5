// {
//     "code": "ESP",
//     "name": "Spain",
//     "continent": "Europe",
//     "region": "Southern Europe",
//     "surface_area": 505992,
//     "independence_year": 1492,
//     "population": 39441700,
//     "life_expectancy": 78.8,
//     "gnp": 553233,
//     "gnp_old": 532031,
//     "local_name": "España",
//     "government_form": "Constitutional Monarchy",
//     "head_of_state": "Juan Carlos I",
//     "capital": 653,
//     "code2": "ES"
// }

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('country');
    const searchBtn = document.getElementById('lookup');
    const result = document.getElementById('result');
    const searchCitiesBtn=document.getElementById('lookup-cities');
    function createCitiesRow(data){
        return`<tr>
                <td>${escapeHTML(data.name)}</td>
                <td>${escapeHTML(data.district)}</td>
                <td>${escapeHTML(data.population)}</td>
             
        </tr>`
    }
    function createRow(data) {
        return `<tr>
            <td>${escapeHTML(data.name)}</td>
            <td>${escapeHTML(data.continent)}</td>
            <td>${escapeHTML(data.independence_year)}</td>
            <td>${escapeHTML(data.head_of_state)}</td>
        </tr>`;
    }

    function escapeHTML(str) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function searchCountries() {
        let searchVal = encodeURIComponent(searchInput.value);
        fetch(`/world.php?country=${searchVal}`)
            .then(response => response.json())
            .then(resp => {
                console.log(resp)
                let tableHTML = '<table><thead><tr><th>Country Name</th><th>Continent</th><th>Independence</th><th>Head of State</th></tr></thead><tbody>';
                resp.forEach(data => {
                    tableHTML += `<tr>
                    <td>${data.name}</td>
                    <td>${data.continent}</td>
                    <td>${data.independence_year}</td>
                    <td>${data.head_of_state}</td>
                </tr>`;
                });
                tableHTML += '</tbody></table>';
                result.innerHTML = tableHTML;
            })
            .catch(err => console.error(`Error from the server: ${err}`));
    }
    function searchCities(){
        let searchVal = encodeURIComponent(searchInput.value);
        fetch(`/world.php?country=${searchVal}&lookup=cities`)
            .then(response=>response.json())
            .then(resp=>{
                let tableHTML = '<table><thead><tr><th> Name</th><th>District</th><th>Population</th></tr></thead><tbody>';
                resp.forEach(data => {
                    tableHTML += `<tr>
                    <td>${data.name}</td>
                    <td>${data.district}</td>
                    <td>${data.population}</td>
                </tr>`;
                });
                tableHTML += '</tbody></table>';
                result.innerHTML = tableHTML;
            })
            .catch(err => console.error(`Error from the server: ${err}`));
    }
    searchBtn.addEventListener('click', searchCountries);
    searchCitiesBtn.addEventListener('click',searchCities);
});
