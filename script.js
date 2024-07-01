document.addEventListener("DOMContentLoaded", function() {
    var text1 = "Welcome to My Currency Exchange site ";
    var text2 = "Find the best exchange rates and convert currencies with ease.";
    var firstPara = document.getElementById('firstPara');
    var secondPara = document.getElementById('secondPara');
    var delay = 70; // Delay between each character in milliseconds

    function typeWriter(text, targetElement, i) {
        if (i < text.length) {
            if (text.substring(i, i + 4) === '<br>') {
                targetElement.innerHTML += "<br>";
                i += 4;
            } else {
                targetElement.textContent += text.charAt(i);
                i++;
            }
            setTimeout(function() {
                typeWriter(text, targetElement, i);
            }, delay);
        }
    }

    // Typing out the first paragraph
    typeWriter(text1, firstPara, 0);

    // Delay before typing out the second paragraph
    setTimeout(function() {
        typeWriter(text2, secondPara, 0);
    }, text1.length * delay);
});

document.addEventListener("DOMContentLoaded", function() {
    var menuIcon = document.querySelector('.menu-icon');
    var navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});


const apiKey = '5f070577d9bb4b51a377992b380e8c5b';
const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`;
const flagApiUrl = 'https://flagcdn.com/16x12/';

const currencySelect1 = document.getElementById('currencySelect1');
const currencySelect2 = document.getElementById('currencySelect2');
const compareButton = document.getElementById('compareButton');
const comparisonResultDiv = document.getElementById('comparisonResult');
const allCountryRatesDiv = document.getElementById('allCountryRates');
const searchInput = document.getElementById('searchInput');

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const conversionResultDiv = document.getElementById('conversionResult');

let rates;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        rates = data.rates;
        populateCurrencySelects(rates);
        displayAllCountryRates(rates);
        populateConversionSelects(rates);
    })
    .catch(error => console.error('Error fetching exchange rates:', error));

function populateCurrencySelects(rates) {
    for (const currency in rates) {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        option2.value = currency;
        option2.textContent = currency;
        currencySelect1.appendChild(option1);
        currencySelect2.appendChild(option2);
    }
}

compareButton.addEventListener('click', () => {
    const currency1 = currencySelect1.value;
    const currency2 = currencySelect2.value;
    const rate1 = parseFloat(rates[currency1]);
    const rate2 = parseFloat(rates[currency2]);

    if (!isNaN(rate1) && !isNaN(rate2)) {
        const result = rate1 / rate2;
        comparisonResultDiv.textContent = `1 ${currency1} = ${result.toFixed(4)} ${currency2}`;
    } else {
        comparisonResultDiv.textContent = 'Invalid currencies selected';
    }
});

const switchButton = document.getElementById('switchButton');
switchButton.addEventListener('click', () => {
    const tempCurrency = currencySelect1.value;
    currencySelect1.value = currencySelect2.value;
    currencySelect2.value = tempCurrency;
});

function populateConversionSelects(rates) {
    for (const currency in rates) {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        optionTo.value = currency;
        optionTo.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);
        toCurrencySelect.appendChild(optionTo);
    }
}

convertButton.addEventListener('click', () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount)) {
        const fromRate = parseFloat(rates[fromCurrency]);
        const toRate = parseFloat(rates[toCurrency]);

        if (!isNaN(fromRate) && !isNaN(toRate)) {
            const result = (amount / fromRate) * toRate;
            conversionResultDiv.textContent = `${amount.toFixed(2)} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        } else {
            conversionResultDiv.textContent = 'Invalid currencies selected';
        }
    } else {
        conversionResultDiv.textContent = 'Invalid amount';
    }
});

function displayAllCountryRates(rates) {
    allCountryRatesDiv.innerHTML = '';
    for (const currency in rates) {
        const countryCode = getCountryCode(currency);
        if (countryCode !== 'unknown') {
            const countryRateDiv = document.createElement('div');
            countryRateDiv.classList.add('country-rate');
            countryRateDiv.innerHTML = `<img src="${flagApiUrl}${countryCode}.png"> <span>${currency}: ${rates[currency]}</span>`;
            allCountryRatesDiv.appendChild(countryRateDiv);
        }
    }
}

function getCountryCode(currency) {
    const currencyToCountry = {
        EGP: 'eg',  // Egypt
        PSE: 'ps',  // Palestine
        USD: 'us',  // United States
        EUR: 'eu',  // Euro Area
        GBP: 'gb',  // United Kingdom
        JPY: 'jp',  // Japan
        CAD: 'ca',  // Canada
        AUD: 'au',  // Australia
        CNY: 'cn',  // China
        INR: 'in',  // India
        AED: 'ae',  // United Arab Emirates
        ZAR: 'za',  // South Africa
        CHF: 'ch',  // Switzerland
        AFN: 'af',  // Afghanistan
        ALL: 'al',  // Albania
        DZD: 'dz',  // Algeria
        AOA: 'ao',  // Angola
        ARS: 'ar',  // Argentina
        AMD: 'am',  // Armenia
        AWG: 'aw',  // Aruba
        AZN: 'az',  // Azerbaijan
        BSD: 'bs',  // Bahamas
        BHD: 'bh',  // Bahrain
        BDT: 'bd',  // Bangladesh
        BBD: 'bb',  // Barbados
        BYN: 'by',  // Belarus
        BZD: 'bz',  // Belize
        BMD: 'bm',  // Bermuda
        BTN: 'bt',  // Bhutan
        BOB: 'bo',  // Bolivia
        BAM: 'ba',  // Bosnia and Herzegovina
        BWP: 'bw',  // Botswana
        BRL: 'br',  // Brazil
        BND: 'bn',  // Brunei Darussalam
        BGN: 'bg',  // Bulgaria
        BIF: 'bi',  // Burundi
        CVE: 'cv',  // Cabo Verde
        KHR: 'kh',  // Cambodia
        XAF: 'cm',  // Cameroon
        KYD: 'ky',  // Cayman Islands
        CLP: 'cl',  // Chile
        COP: 'co',  // Colombia
        KMF: 'km',  // Comoros
        CRC: 'cr',  // Costa Rica
        HRK: 'hr',  // Croatia
        CUP: 'cu',  // Cuba
        CZK: 'cz',  // Czech Republic
        DKK: 'dk',  // Denmark
        DJF: 'dj',  // Djibouti
        DOP: 'do',  // Dominican Republic
        ERN: 'er',  // Eritrea
        ETB: 'et',  // Ethiopia
        FJD: 'fj',  // Fiji
        GMD: 'gm',  // Gambia
        GEL: 'ge',  // Georgia
        GHS: 'gh',  // Ghana
        GTQ: 'gt',  // Guatemala
        GNF: 'gn',  // Guinea
        HTG: 'ht',  // Haiti
        HNL: 'hn',  // Honduras
        HKD: 'hk',  // Hong Kong
        HUF: 'hu',  // Hungary
        ISK: 'is',  // Iceland
        IDR: 'id',  // Indonesia
        IRR: 'ir',  // Iran
        IQD: 'iq',  // Iraq
        JMD: 'jm',  // Jamaica
        JOD: 'jo',  // Jordan
        KZT: 'kz',  // Kazakhstan
        KES: 'ke',  // Kenya
        KWD: 'kw',  // Kuwait
        KGS: 'kg',  // Kyrgyzstan
        LAK: 'la',  // Lao People's Democratic Republic
        LBP: 'lb',  // Lebanon
        LSL: 'ls',  // Lesotho
        LRD: 'lr',  // Liberia
        LYD: 'ly',  // Libya
        MOP: 'mo',  // Macao
        MKD: 'mk',  // North Macedonia
        MGA: 'mg',  // Madagascar
        MWK: 'mw',  // Malawi
        MYR: 'my',  // Malaysia
        MVR: 'mv',  // Maldives
        MRO: 'mr',  // Mauritania
        MUR: 'mu',  // Mauritius
        MXN: 'mx',  // Mexico
        MDL: 'md',  // Moldova
        MNT: 'mn',  // Mongolia
        MAD: 'ma',  // Morocco
        MMK: 'mm',  // Myanmar
        NAD: 'na',  // Namibia
        NPR: 'np',  // Nepal
        ANG: 'an',  // Netherlands Antilles
        NZD: 'nz',  // New Zealand
        NIO: 'ni',  // Nicaragua
        NGN: 'ng',  // Nigeria
        NOK: 'no',  // Norway
        OMR: 'om',  // Oman
        PKR: 'pk',  // Pakistan
        PAB: 'pa',  // Panama
        PGK: 'pg',  // Papua New Guinea
        PYG: 'py',  // Paraguay
        PEN: 'pe',  // Peru
        PHP: 'ph',  // Philippines
        PLN: 'pl',  // Poland
        QAR: 'qa',  // Qatar
        RON: 'ro',  // Romania
        RUB: 'ru',  // Russia
        RWF: 'rw',  // Rwanda
        WST: 'ws',  // Samoa
        SAR: 'sa',  // Saudi Arabia
        RSD: 'rs',  // Serbia
        SCR: 'sc',  // Seychelles
        SLL: 'sl',  // Sierra Leone
        SGD: 'sg',  // Singapore
        SBD: 'sb',  // Solomon Islands
        SOS: 'so',  // Somalia
        LKR: 'lk',  // Sri Lanka
        SDG: 'sd',  // Sudan
        SRD: 'sr',  // Suriname
        SZL: 'sz',  // Eswatini
        SEK: 'se',  // Sweden
        SYP: 'sy',  // Syrian Arab Republic
        TWD: 'tw',  // Taiwan
        TJS: 'tj',  // Tajikistan
        TZS: 'tz',  // Tanzania
        THB: 'th',  // Thailand
        TOP: 'to',  // Tonga
        TTD: 'tt',  // Trinidad and Tobago
        TND: 'tn',  // Tunisia
        TRY: 'tr',  // Turkey
        TMT: 'tm',  // Turkmenistan
        UGX: 'ug',  // Uganda
        UAH: 'ua',  // Ukraine
        UYU: 'uy',  // Uruguay
        UZS: 'uz',  // Uzbekistan
        VUV: 'vu',  // Vanuatu
        VES: 've',  // Venezuela
        VND: 'vn',  // Vietnam
        YER: 'ye',  // Yemen
        ZMW: 'zm',  // Zambia
        ZWL: 'zw',  // Zimbabwe
    };
    return currencyToCountry[currency] || 'unknown';
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const countryRates = allCountryRatesDiv.getElementsByClassName('country-rate');

    Array.from(countryRates).forEach(countryRate => {
        const countryName = countryRate.textContent.toLowerCase();
        if (countryName.includes(searchTerm)) {
            countryRate.style.display = 'block';
        } else {
            countryRate.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1); 
            const targetElement = document.getElementById(targetId); 

            if (targetElement) {
                
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
                
               
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' 
                });
            }
        });
    });
});

