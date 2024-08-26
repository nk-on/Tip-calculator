import { billInput, customInput, displayResults,initialTipAmount,initialTotalAmount } from "./script.js";
const API_KEY = 'd78b2f5078e7af720a5b296a0e0b7c5e';
const API = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;
const currencyOptions = document.querySelector('#currency-selector');;
//App should be able to convert exsisting tip Amount and total amount to different currency
//if there is no default currency app should be just able to add differenct currency signs
function changeSign(currency) {
  const currencySymbols = new Map([
    ['USD', '$'], // United States Dollar
    ['EUR', '€'], // Euro
    ['GBP', '£'], // British Pound Sterling
    ['CHF', 'Fr.'], // Swiss Franc
    ['GEL', '₾'], // Georgian Lari
  ]);
  const currencySign = currencySymbols.get(currency);
  localStorage.setItem("currencySign",currencySign);
  displayResults(initialTipAmount,initialTotalAmount,currencySign);
  billInput.placeholder = customInput.placeholder = currencySign;
}
async function getCurrencyRates() {
  const res = await fetch(API);
  const data = await res.json();
  console.log(data);
}
currencyOptions.addEventListener('change', (e) => {
  changeSign(e.target.value);
});
getCurrencyRates();
