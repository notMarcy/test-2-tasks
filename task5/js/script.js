

class Blocks{
    constructor(bckground, brderRdius, brder,bxShdow){
        this.background = bckground;
        this["border-radius"] = brderRdius;
        this.border = brder;
        this["box-shadow"] = bxShdow;
        this.left = Math.floor(Math.random()*1350) + 'px';
        this.top = Math.floor(Math.random()*700) + 'px';
    }
}



let URL = "http://localhost:3000/BLOCKS";
let send = document.querySelector('.send');
let get = document.querySelector('.get');
let bkgInp = document.querySelector('.background');
let brdrRdsInp = document.querySelector('.border-radius');
let brdrInp = document.querySelector('.border');
let bxShdwInp = document.querySelector('.box-shadow');
const wrapper = document.querySelector('.wrapper');
const getDatabase = async (url) => {
    const res = await fetch(url)
    const json = await res.json()
    return json;
}
var data;

send.addEventListener('click', async (event) => {

    const bkg = bkgInp.value;
    const borderRadius = brdrRdsInp.value;
    const border = brdrInp.value;
    const boxShadow = bxShdwInp.value;

    
    data = await getDatabase(URL);

    var user = new Blocks(bkg,borderRadius,border,boxShadow);


    let postData = async (url, obj) => { 
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        return res.json();
    }

    await postData(URL, user);
    bkgInp.value = '';
    brdrInp.value = '';
    brdrRdsInp.value = '';
    bxShdwInp.value ='';
})


get.addEventListener('click', async (event) => {
    const data = await getDatabase(URL);

    if(data.length > 0) {
        const allCont = document.querySelector('.allCont');
        allCont.style.display = 'none';
        get.style.display = 'none';
        data.forEach(elem => {
            var div = document.createElement('div');
            div.classList.add('block');
            wrapper.append(div);
            div.style.top = elem["top"];
            div.style.left = elem["left"];
            div.style.background = elem["background"];
            div.style['border-radius'] = elem["border-radius"];
            div.style.border = elem["border"];
            div.style['box-shadow'] = elem["box-shadow"];
            for(let key in elem){
                if(key !== "id"){
                    div.insertAdjacentHTML(`beforeend`,`
                    <span>${key}: ${elem[key]}</span><br>
                `)
                }
            }
        });
    }
    else alert('Блокав няма')
});


