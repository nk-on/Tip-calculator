import { billInput, customInput, displayResults,initialTipAmount,initialTotalAmount } from "./script.js";
const host = 'api.frankfurter.app';
const API = `https://${host}/latest?from=USD`;
const currencyOptions = document.querySelector('#currency-selector');
//App should be able to convert exsisting tip Amount and total amount to different currency
//if there is no default currency app should be just able to add differenct currency signs
function changeSign(currency) {
  const currencySymbols = new Map([
    ['USD', '$'], // United States Dollar
    ['EUR', '€'], // Euro
    ['GBP', '£'], // British Pound Sterling
    ['CHF', 'Fr.'], // Swiss Franc
  ]);
  const currencySign = currencySymbols.get(currency);
  localStorage.setItem("currencySign",currencySign);
  displayResults(initialTipAmount,initialTotalAmount,currencySign);
  billInput.placeholder = customInput.placeholder = currencySign;
};
function currencyConversion(data){
  console.log(data);
};
async function getCurrencyRates() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}
currencyOptions.addEventListener('change', (e) => {
  changeSign(e.target.value);
  currencyConversion(getCurrencyRates());
});