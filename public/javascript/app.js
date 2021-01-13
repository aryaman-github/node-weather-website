const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

//messageOne.textContent= 'from JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messagetwo.textContent = 'Current temperature is ' + data.temperature + 
                                            '. It currently feels like ' + data.feelsLike
                // console.log(data.temperature)
                // console.log(data.location)
            }
        })
    })

})

