//API KEY: CgYfu5YdZQGXsLIcf8d4OGagKn3xn115kOh7LYSv
let apiMars = 'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=5000&api_key=CgYfu5YdZQGXsLIcf8d4OGagKn3xn115kOh7LYSv';
let cardsRef = document.querySelector('.cards');
let nameInputRef = document.querySelector('#name');
let btnRef = document.querySelector('.btn');
let h3Ref = document.querySelector('h3');
let switchBtn = document.querySelector('#switchBtn');
let bodyRef = document.querySelector('body');
let lightSwitch = 'light';

//Hämtar marsbilder med fetch
fetch(apiMars)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let myArrayLength = data.photos.length;
        if(myArrayLength === 0){
            console.log('Det finns ingen data.');
            alert("Det finns tyvärr inga bilder från Mars som kan laddas in just nu.");
        }else{
            console.log('Det finns data.');
            for (let i = 0; i < 4; i++) {
                //Vad ska hända för varje varv?
                cardsRef.innerHTML += 
                `<article class="card">
                <p>${data.photos[i].rover.name}</p>
                <img src="${data.photos[i].img_src}" alt="">
                <p>${data.photos[i].earth_date}</p>
                </article>`;
            }
        }
    })
    .catch(error => console.log(`Detta är fel: ${error}`));

//Lyssnare, lyssnar när user släpper upp tangent
nameInputRef.addEventListener('keyup', function(){
    //Sparar antalet tecken i en variabel
    let getValueLength = nameInputRef.value.length;
    if(getValueLength > 2){
        //Ifall det finns fler än 3 tecken kan user klicka på btn
        btnRef.disabled = false;
    }else{
        //Ifall det inte finns fler än 3 tecken kan user inte klicka på btn
        btnRef.disabled = true;
    }

});
//Lyssnare, lyssnar efter focus
nameInputRef.addEventListener('focus', function(){
    //När man står i input aktiveras .focusBorder
    nameInputRef.classList.toggle('focusBorder');
});
//Lyssnare, lyssnar efter blur
nameInputRef.addEventListener('blur', function(){
    //När man står utanför input slås .focusBorder av
    nameInputRef.classList.toggle('focusBorder');
});
//Lyssnare på btn
btnRef.addEventListener('click', function(event){
    //När man klickar på btn:
    //Knappens default beteende att skicka form avbryts
    event.preventDefault();
    //En variabel för värdet som skrivs in skapas
    let getSpaceName = nameInputRef.value;
    console.log(getSpaceName);
    //Value skrivs ut i h3
    h3Ref.innerHTML = `<h3>Welcome ${getSpaceName}!</h3>`;
    //Input rensas och btn blir disabled igen
    nameInputRef.value = '';
    if(nameInputRef.value === ''){
        btnRef.disabled = true;
    }
})
//Kollar om localStorage är tomt
if(!localStorage.getItem(lightSwitch)){
    console.log('Det finns inget i localStorage');
    //Kontrollerar om light localStorage är satt
    checkIfLight();
}else{
    console.log('Det finns något i localStorage');
    checkIfLight();
}

//Lyssnare för toggle
switchBtn.addEventListener('click',function(){
    //Kollar om classen light är aktiverad på body
    if(bodyRef.classList.value === 'light'){
        console.log('Classen light finns på body.');
        bodyRef.classList.remove('light');
        removeLocal();
    }else{
        console.log('Classen light finns inte på body.');
        bodyRef.classList.add('light');
        setLocal();
    }
});

//Funktion för att set localStorage
function setLocal(){
    console.log('setLocal körs');
    localStorage.setItem(lightSwitch,true);
}

//Funktion för att remove localStorage
function removeLocal(){
    console.log('removeLocal körs');
    localStorage.removeItem(lightSwitch);
}

//Kontrollera om light finns i localStorage
function checkIfLight(){
    if(localStorage.getItem(lightSwitch)){
        console.log('Det finns .light i localStorage');
        switchBtn.checked = true;
        bodyRef.classList.add('light');
    }else{
        console.log('Det finns inte .light i localStorage');
    }
}


//[X] Inputfält kontrollerar att det finns minst 3 tecken
//[X] Om inte så är knappen disabled
//[X] Focus på Input
//[X] Blur på Input
//[] Fetch används på rätt sätt
//[X] Kontroll om det finns bilder
//[X] Cards plockas fram genom API i js, loop i fetch
//[X] Bildernas datum skrivs ut, API
//[X] Input rensas när användare klickar på send
//[X] Input value sparas ner och skrivs ut
//[X] Felmeddelande visas om bilderna inte kommer fram, genom alert eller på webbsidan.
//[X] Växla mellan dark mode och light mode
//[X] Local storage dark mode