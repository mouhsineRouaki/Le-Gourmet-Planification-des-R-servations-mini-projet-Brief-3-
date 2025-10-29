const Containerdays = document.querySelector(".days");
const nextbtn = document.querySelector(".next-btn");
const prevbtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const InputDate = document.getElementById("date");
const cardAjout = document.getElementById("formAjout");
const cardModifierSupprimer = document.getElementById("formModifSuppr");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const date = new Date();

class Reservation{
    constructor(id , titre, description ,heureBedut,heureFin,nbPersone,type ){
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.heureBedut = heureBedut;
        this.heureFin = heureFin;
        this.nbPersone = nbPersone;
        this.type = type;
    };
};

let restauration = JSON.parse(localStorage.getItem("restauration")) || []; 

function addReservation(reservation) {
    restauration.push(reservation);
    localStorage.setItem("restauration" ,JSON.stringify(restauration));
}

function getReservationById(idReservation){
    return restauration.filter(r => r.id === idReservation);
}

function supprimerReservation(idReservation){
    restauration = restauration.filter(r => r.id !== idReservation);
    localStorage.setItem("restauration" ,JSON.stringify(restauration));
}

function updateMonthYear(){
    month.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function clearCalendrier(){
    Containerdays.innerHTML = "";
}

function Gourmet(){
    clearCalendrier();
    date.setDate(1);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const derniereMonthDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();

    // Jours du mois précédent
    for(let i = firstDay; i > 0;i--){
        const dayDiv = document.createElement("div");
        dayDiv.id = `${date.getFullYear()}-${date.getMonth()-1}-${derniereMonthDay -i +1}`;
        dayDiv.textContent = derniereMonthDay -i +1;
        appendReservations(dayDiv);
        Containerdays.append(dayDiv);
    }

    // Jours du mois courant
    for(let i = 1; i <= lastDay; i++){
        const dayDiv = document.createElement("div");
        dayDiv.id = `${date.getFullYear()}-${date.getMonth()}-${i}`;
        dayDiv.textContent = i;
        appendReservations(dayDiv);
        Containerdays.append(dayDiv);
    }
}

function appendReservations(dayDiv) {
    let reservationsJour = getReservationById(dayDiv.id);
    reservationsJour.forEach(res => {
        let p = document.createElement("p");
        p.textContent = res.titre;
        
        if(res.type === 'VIP'){
            p.style.backgroundColor = "red";
        } else if(res.type === 'Standard'){
            p.style.backgroundColor = "green";
        } else {
            p.style.backgroundColor = "blue";
        }
        dayDiv.append(p);
    });
}

function updateDate(nb){
    date.setMonth(date.getMonth() + nb);
    updateMonthYear();
    Gourmet();
}

// Navigation mois
nextbtn.addEventListener('click' ,() => updateDate(1));
prevbtn.addEventListener('click' ,() => updateDate(-1));

let selectedDayId = null;

function aficherCard(){
    const divCalendrier = document.querySelectorAll(".days div");
    const cover = document.getElementById("cover");

    // Fermer le formulaire quand on clique sur le cover
    cover.addEventListener('click' , function(){
        this.classList.remove("formAjoutToggle");
        cardAjout.classList.remove("formAjoutToggle");
        cardModifierSupprimer.classList.remove("formModifSuppr");
    });

    // Quand on clique sur un jour → ouvrir formulaire et sauvegarder l’ID
    divCalendrier.forEach(div => {
        div.addEventListener('click', function(){
            selectedDayId = this.id;
            cover.classList.add("formAjoutToggle");
            cardAjout.classList.add("formAjoutToggle");
        });
    });
}

// Un seul listener de soumission
cardAjout.addEventListener('submit', function(event){
    event.preventDefault();

    if (!selectedDayId) return;

    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const heureBedut = document.getElementById("heure-debut").value;
    const heureFin = document.getElementById("heure-fin").value;
    const nbPersone = document.getElementById("nb-personne").value;
    const type = document.getElementById("type").value;

    const nouvelleReservation = new Reservation(selectedDayId, titre, description, heureBedut, heureFin, nbPersone, type);
    addReservation(nouvelleReservation);

    Gourmet(); // 🔄 on recharge le calendrier (pas aficherCard)
    aficherCard();

    document.getElementById("cover").classList.remove("formAjoutToggle");
    cardAjout.classList.remove("formAjoutToggle");
});

// Initialisation
updateMonthYear();
Gourmet();
aficherCard();
