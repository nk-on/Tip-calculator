const inputForms = document.querySelectorAll('.input-form'); 
function addErrorState(inputContainer,errorMessegeContainer){
    errorMessegeContainer.style.display = 'block';
    inputContainer.style.border = '2px solid #E17457'
};
function removeErrorState(errorMessegeContainers){
    inputForms.forEach((form)=>{
        form.style.border = 'none';
    })
    errorMessegeContainers.forEach((container)=>{
        container.style.display = 'none';
    })
};
export {addErrorState,removeErrorState}