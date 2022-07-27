const url = 'http://localhost:3000/dogs'
let selectDogID = 0

document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form')
    const tableBody = document.getElementById('table-body')

    //render one dog
    const renderDog = (element) => {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        td1.textContent = element.name
        let td2 = document.createElement('td')
        td2.textContent = element.breed
        let td3 = document.createElement('td')
        td3.textContent = element.sex
        let td4 = document.createElement('td')
        let btn = document.createElement('button')
        btn.textContent = 'Edit Dog'
        btn.setAttribute('dog-id', element.id)
        btn.addEventListener('click', (e) => AddtoEditBar(e))
        td4.append(btn)
        tr.append(td1, td2, td3, td4)
        tr.setAttribute('dog-id', element.id)
        tableBody.append(tr)
    }

    //fetch dog info
    const GetFetchDog = async () => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    //function to add dogs to DOM
    const LoadDogs = async () => {
        let DogArr = await GetFetchDog()
        DogArr.forEach(element => {renderDog(element)})
    }

    //add info to the edit bar
    const AddtoEditBar = (e) => {
        selectDogID = e.target.getAttribute('dog-id')
        fetch(`${url}/${selectDogID}`)
        .then(res=>res.json())
        .then(dog => {
            dogForm.name.value = dog.name
            dogForm.breed.value = dog.breed
            dogForm.sex.value = dog.sex
        })
    }

    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        EditDog(e)})

    const EditDog = (e) => {
        let patchObj = {
            method:'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value
            })
        }
        fetch(`${url}/${selectDogID}`,patchObj)
        .then(res=>res.json())
        .then(dog => {
            let selectTR = Array.from(tableBody.children)[selectDogID-1]
            let tdArr = Array.from(selectTR.children)
            tdArr[0].textContent = dog.name
            tdArr[1].textContent = dog.breed
            tdArr[2].textContent = dog.sex
        })
    }

    LoadDogs()


})
