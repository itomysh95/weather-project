
console.log('Client side javascript file is loaded!')





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const weatherMessage = document.querySelector('#weather-message')
const summaryMessage = document.querySelector('#summary-message')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    errorMessage.textContent = "Loading..."
    weatherMessage.textContent = " "
    summaryMessage.textContent = " "

    if(location){
        fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                errorMessage.textContent = data.error
            }
            else{
                errorMessage.textContent = data.location
                weatherMessage.textContent = "the tempeprature is "+data.temperature+" the precip is "+data.precip
                summaryMessage.textContent = data.summary
            }
            })
    }   )

    }else{
        errorMessage.textContent = "Error please provide an address"
    }
})