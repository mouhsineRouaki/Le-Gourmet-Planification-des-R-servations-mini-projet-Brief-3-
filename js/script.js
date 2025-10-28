const Containerdays = document.querySelector(".days");
const nextbtn = document.querySelector(".next-btn");
const prevbtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const InputDate = document.getElementById("date");
const cardAjout = document.getElementById("formAjout");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const date = new Date();

function updateMonthYear(){
    month.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
}
updateMonthYear();

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  const element = document.getElementById(id);
  ev.target.appendChild(element);
}

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
                console.log(nouvelleReservation.titre)
                addReservation(nouvelleReservation);
                const p = document.createElement("p");
                p.setAttribute('draggable' , 'true');
                p.setAttribute('ondragstart' , 'dragstartHandler(event)');
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
        dayDiv.setAttribute('ondrop' , 'drop(event)');
        dayDiv.setAttribute('ondragover' , 'allowDrop(event)');
        dayDiv.textContent = derniereMonthDay -i +1;
        Containerdays.append(dayDiv);
    }
    for(let i = 1; i<= lastDay;i++){
        const dayDiv = document.createElement("div");
        dayDiv.textContent =  i ;
        dayDiv.id = `${date.getFullYear()}-${date.getMonth()}-${i}`;
        dayDiv.setAttribute('ondrop' , 'drop(event)');
        dayDiv.setAttribute('ondragover' , 'allowDrop(event)');
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
function addReservation(reservation) {
    restauration.push(reservation)    
}
function ModiffierReservation(reservation, titre, description, heureBedut, heureFin, nbPersone, type) {
  reservation.titre = titre;
  reservation.description = description;
  reservation.heureBedut = heureBedut;
  reservation.heureFin = heureFin;
  reservation.nbPersone = nbPersone;
  reservation.type = type;
}

  


