const API_KEY = 'd78b2f5078e7af720a5b296a0e0b7c5e';
const API = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;
async function getCurrencyRates() {
    const res = await fetch(API);
    const data = await res.json();
};
getCurrencyRates();