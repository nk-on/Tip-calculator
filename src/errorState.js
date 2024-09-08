import { billInput,amountOfPeopleInput } from "./script.js";
function addErrorState(inputContainer,errorMessege){
    errorMessege.style.display = 'block';
    inputContainer.style.border = '2px solid #E17457'
};
function removeErrorState(inputContainer){
    errorMessege.style.display = 'none';
    amountOfPeopleInput.style.border = 'none';
    billInput.style.border = 'none;'
};
export {addErrorState,removeErrorState}