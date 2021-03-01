
let tableBody = document.querySelector('tbody')
const loader = document.querySelector('.loader')
loader.style.display = 'block'
const fetchData = async() => {
    

    let url = 'https://covidnigeria.herokuapp.com/api';
    let res = await fetch(url);
    let nig = await res.json()
    console.log(nig)

    let data = nig.data

    document.querySelector('#total-sampled').innerText = `Total Sampled Cases : ${data.totalSamplesTested}`
    document.querySelector('#total-active').innerText = `Total Active Cases : ${data.totalActiveCases}`
    document.querySelector('#total-confirmed').innerText = `Total Confirmed Cases : ${data.totalConfirmedCases}`
    document.querySelector('#discharged').innerText = `Total Number Discharged : ${data.discharged}`
    document.querySelector('#death').innerText = `Total Deaths : ${data.death}`

    let stateArr = nig.data.states

    console.log(stateArr)
    const cases = stateArr.map((state, index) => {
        return `
            <tr>
                <th scope="col">${index + 1}</th>
                <th scope="col">${state.state}</th>
                <th scope="col">${state.confirmedCases}</th>
                <th scope="col">${state.casesOnAdmission}</th>
                <th scope="col">${state.discharged}</th>
                <th scope="col">${state.death}</th>
            </tr>
        `
    })
    
    tableBody.innerHTML = cases.join('')
}

// fetchData()
async function check () {
    try {
        await fetchData()
        loader.style.display = 'none';
    } catch (err) {
        console.log(err)
        alert("Please connect to the internet")
        loader.innerHTML = `<span class="m-auto">Please connect to an active internet connection and reload</span>`;
    }
}

check()