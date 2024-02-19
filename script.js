let list = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(json => json.json())
        .then(countries => {
            let coutriesHtml = "";
            let row = document.querySelector('#row');
            let button = document.getElementById("buttonSeach");
            let search = document.getElementById("search");
            let searchLower = search.value.toLowerCase()

            button.addEventListener("click", (e) => {
                console.log(searchLower);
                list();
            })

            for (let index = 0; index < countries.length; index++) {
                let country = countries[index];
                let countryName = country.translations.por.common.toLowerCase()
                let countrylanguage = country.languages

                function getLanguages(country) {
                    if (countrylanguage && typeof countrylanguage === 'object') {
                        let languageCodes = Object.keys(countrylanguage);
                        let languageNames = languageCodes.map(code => countrylanguage[code]);
                        return languageNames;
                    } else {
                        return [];
                    }
                }

                let countryLanguages = getLanguages();

                if (countryName.includes(searchLower)) {

                    coutriesHtml += `

                    <div class="col-sm-4 mt-3">

                    <div class="card" style="width: 18rem;">
                
                        <button type="button" class="btn btn-primary border border-0 p-0 " data-bs-toggle="modal"
                            data-bs-target="#country${[index]}">
                            <img src="${country.flags.png}" class="card-img-top" alt="${country.flags.alt}">
                        </button>
                
                        <div class="modal fade" id="country${[index]}" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog  modal-dialog-centered">
                                <div class="modal-content">
                
                                    <div class="modal-header">
                                        <h1 class="modal-title centered fs-5" id="exampleModalLabel">${country.translations.por.common}
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                
                                    <div class="modal-body">
                                        <p>Nome oficial: ${country.translations.por.official}</p>
                                        <p>Capital: ${country.capital}</p>
                                        <p>População: ${String(country.population).replace(/(.)(?=(\d{3})+$)/g,'$1.')} habitantes</p>
                                        <p>Área: ${String(country.area).replace(/(.)(?=(\d{3})+$)/g,'$1.')} km²</p>
                                        <p>Idioma(s): ${countryLanguages}</p>
                                        <a href="${country.maps.googleMaps}" target="_blank">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Google Maps</button>
                                        </a>
                
                                    </div>
                
                                </div>
                            </div>
                        </div>
                
                        <div class="card-body">
                            <h5 class="card-title">${country.translations.por.common}</h5>
                            <p class="card-text">${country.region}</p>
                        </div>
                
                    </div>
                
                </div>`

                } else if (search.value == "") {

                    coutriesHtml += `

                    <div class="col-sm-4 mt-3">

                    <div class="card" style="width: 18rem;">
                
                        <button type="button" class="btn btn-primary border border-0 p-0 " data-bs-toggle="modal"
                            data-bs-target="#country${[index]}">
                            <img src="${country.flags.png}" class="card-img-top" alt="${country.flags.alt}">
                        </button>
                
                        <div class="modal fade" id="country${[index]}" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog  modal-dialog-centered">
                                <div class="modal-content">
                
                                    <div class="modal-header">
                                        <h1 class="modal-title centered fs-5" id="exampleModalLabel">${country.translations.por.common}
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                
                                    <div class="modal-body">
                                        <p>Nome oficial: ${country.translations.por.official}</p>
                                        <p>Capital: ${country.capital}</p>
                                        <p>População: ${String(country.population).replace(/(.)(?=(\d{3})+$)/g,'$1.')} habitantes</p>
                                        <p>Área: ${String(country.area).replace(/(.)(?=(\d{3})+$)/g,'$1.')} km²</p>
                                        <p>Idioma(s): ${countryLanguages}</p>
                                        <a href="${country.maps.googleMaps}" target="_blank">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Google Maps</button>
                                        </a>                
                                    </div>
                
                                </div>
                            </div>
                        </div>
                
                        <div class="card-body">
                            <h5 class="card-title">${country.translations.por.common}</h5>
                            <p class="card-text">${country.region}</p>
                        </div>
                
                    </div>
                
                </div>`

                }
            }
            row.innerHTML = coutriesHtml;
        })
}

list();

