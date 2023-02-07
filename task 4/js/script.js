let URL = "http://localhost:3000/USERS";
let send = document.querySelector('.send');
let get = document.querySelector('.get');
let idInp = document.querySelector('.id');
let nameInp = document.querySelector('.name');
let ageInp = document.querySelector('.age');
let genderInp = document.querySelector('.gender');

const getDatabase = async (url) => {
    const res = await fetch(url)
    const json = await res.json()
    return json;
}
var data;

send.addEventListener('click', async (event) => {

    const id = idInp.value;
    const name = nameInp.value;
    const age = ageInp.value;
    const gender = genderInp.value;
    data = await getDatabase(URL);

    var user = {
        "id":id,
        "name":name,
        "age":age,
        "gender":gender
    }


    let postData = async (url, obj) => { 
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        return res.json();
    }

    await postData(URL, user);



    get.addEventListener('click', (event) => {
        const getusers = document.querySelector('.getusers');
        console.log('test');
        for(let i = 0; i< data.length; i++){
            getusers.insertAdjacentHTML(`beforeend`, `
            <div class="user">
                <span class='idUser'>ID: ${data[i]["id"]}</span><br>
                <span class='nameUser'>ID: ${data[i]["name"]}</span><br>
                <span class='ageUser'>ID: ${data[i]["age"]}</span><br>
                <span class='genderUser'>ID: ${data[i]["gender"]}</span><br>
            </div>
        `)
        }
    });
})


get.addEventListener('click', async (event) => {
    const data = await getDatabase(URL);
    const getusers = document.querySelector('.getusers');
    console.log('test');
    for(let i = 0; i< data.length; i++){
        getusers.insertAdjacentHTML(`beforeend`, `
        <div class="user">
            <span class='idUser'>ID: ${data[i]["id"]}</span><br>
            <span class='nameUser'>Name: ${data[i]["name"]}</span><br>
            <span class='ageUser'>Age: ${data[i]["age"]}</span><br>
            <span class='genderUser'>Gender: ${data[i]["gender"]}</span><br>
        </div>
    `)
    }
});


