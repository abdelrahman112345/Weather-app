let form = document.getElementById('form')
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    weatherFunction();
})
let weatherFunction = async () =>{
    try{
        const location = document.getElementById('location').value
        const res = await fetch(`http://localhost:3000/weather?location=${location}`)
        const data = await res.json()
        if(data.error){
            hiddenElement()
            document.getElementById('error').innerText = data.error
            document.getElementById('temp').innerText = ""
            document.getElementById('status').innerText = ""
            document.getElementById('country').innerText = ""
        }else{
            showElement()
            document.getElementById('temp').innerHTML = `<i class="fa-solid fa-temperature-low fa-1x"></i> ${data.temp} C`
            document.getElementById('status').innerHTML = `<i class="fa-solid fa-cloud"></i> ${data.status}`
            document.getElementById('country').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.country}`
            document.getElementById('error').innerText = ""
        }
    }
    catch(e){
        console.log(e)
    }
}
let showElement = () =>{
    let result = document.getElementById('result')
    result.classList.add('active')
}
let hiddenElement = () =>{
    let result = document.getElementById('result')
    result.classList.remove('active')
}