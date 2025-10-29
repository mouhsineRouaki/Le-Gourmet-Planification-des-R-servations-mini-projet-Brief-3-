const Containerdays = document.querySelector(".days");
const nextbtn = document.querySelector(".next-btn");
const prevbtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const InputDate = document.getElementById("date");
const cardAjout = document.getElementById("formAjout");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const date = new Date();

class Reservation{
    constructor({id = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` , titre, description ,heureBedut,heureFin,nbPersone,type}){
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.heureBedut = heureBedut;
        this.heureFin = heureFin;
        this.nbPersone = nbPersone;
        this.type = type;
    };
};

let restauration = [];

localStorage.setItem("restauration" ,JSON.stringify(restauration));

function refreshRestauration(restauration){
    restauration = JSON.parse(localStorage.getItem("reservations"));
}
refreshRestauration(restauration);

function addReservation(reservation) {
    restauration.push(reservation);
    localStorage.setItem("restauration" ,JSON.stringify(restauration));
};
function getReservations(idReservation){
    let listReservation  = [];
    for(let i = 0 ; i < restauration.length; i++){
        if(restauration[i].id == idReservation){
            listReservation.push(restauration[i])
        }
    }
    return listReservation;
}

function modiffierReservation(idReservation, titre, description, heureBedut, heureFin, nbPersone, type) {
    for(let i = 0 ; i < restauration.length; i++){
        if(restauration[i].id == idReservation){
            restauration.titre = titre;
            restauration.description = description;
            restauration.heureBedut = heureBedut;
            restauration.heureFin = heureFin;
            restauration.nbPersone = nbPersone;
            restauration.type = type;
        }
    }
    refreshRestauration(restauration);
}
function supprimerReservation(idReservation){
    for(let i = 0 ; i < restauration.length; i++){
        if(restauration[i].id == idReservation){
            delete restauration[i]
        }
    }
    refreshRestauration(restauration);
}

function updateMonthYear(){
    month.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
}
updateMonthYear();



function aficherCard(){
    const divCalendrier = document.querySelectorAll(".days div");
    const cardAjout = document.getElementById("formAjout");
    const cover = document.getElementById("cover");
    cover.addEventListener('click' , function(){
        this.classList.remove("formAjoutToggle");
        cardAjout.classList.remove("formAjoutToggle");
    });

    for(let i = 0 ; i < divCalendrier.length;i++){
        divCalendrier[i].addEventListener('click',function(){
            cover.classList.toggle("formAjoutToggle");
            cardAjout.classList.toggle("formAjoutToggle");
            cardAjout.addEventListener('submit' , function(event){
                event.preventDefault();

                const titre = document.getElementById("titre").value;
                const description = document.getElementById("description").value;
                const heureBedut = document.getElementById("heure-debut").value;
                const heureFin = document.getElementById("heure-fin").value;
                const nbPersone = document.getElementById("nb-personne").value;
                const type = document.getElementById("type").value;

                const nouvelleReservation = new Reservation({titre,description,heureBedut,heureFin,nbPersone,type});
                addReservation(nouvelleReservation);
                let reseravtions = getReservations(nouvelleReservation.id);
                const p = document.createElement("p");
                p.setAttribute('draggable' , 'true');
                p.textContent = titre;
                p.style.backgroundColor = "red" ;
                divCalendrier[i].append(p);

            });
        });
    }
}

function Gourmet(){
    date.setDate(1);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const derniereMonthDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();

    for(let i = firstDay; i > 0;i--){
        const dayDiv = document.createElement("div");
        dayDiv.id = `${date.getFullYear()}-${date.getMonth()-1}-${derniereMonthDay -i +1}`;
        dayDiv.textContent = derniereMonthDay -i +1;
        let resrvationDay=getReservations(dayDiv.id);
        if(resrvationDay.length !=  0){
            for(let j = 0 ; j < resrvationDay.length ;j++){
                let p = document.createElement("p");
                p.textContent = resrvationDay[j].titre;
                p.style.backgroundColor = "red"
                dayDiv.append(p);
            }
        }
        Containerdays.append(dayDiv);
    }
    for(let i = 1; i<= lastDay;i++){
        const dayDiv = document.createElement("div");
        dayDiv.textContent =  i ;
        dayDiv.id = `${date.getFullYear()}-${date.getMonth()}-${i}`;
        let resrvationDay=getReservations(dayDiv.id);
        if(resrvationDay.length !=  0){
            for(let j = 0 ; j < resrvationDay.length ;j++){
                let p = document.createElement("p");
                p.textContent = resrvationDay[j].titre;
                p.style.backgroundColor = "red"
                dayDiv.append(p);
                
            }
        }
        Containerdays.append(dayDiv);
    } 
}
Gourmet(date);


function clearCalendrier(){
    Containerdays.innerHTML = "";
}

function updateDate(nb){
    date.setMonth(date.getMonth() + nb)
    updateMonthYear();
    clearCalendrier();
    Gourmet();
    aficherCard();
};

nextbtn.addEventListener('click' ,function(){
    updateDate(1);
});

prevbtn.addEventListener('click' ,function(){
    updateDate(-1);
});


aficherCard();





  


