class Reservation {
    constructor(id, date, titre, description, heureBedut, heureFin, nbPersone, type) {
        this.id = id;
        this.date = date;
        this.titre = titre;
        this.description = description;
        this.heureBedut = heureBedut;
        this.heureFin = heureFin;
        this.nbPersone = nbPersone;
        this.type = type;
    }
}

const Containerdays = document.querySelector(".days");
const nextbtn = document.querySelector(".next-btn");
const prevbtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const InputDate = document.getElementById("date");
const cardAjout = document.getElementById("formAjout");
const cover = document.getElementById("cover");
const btnModifier = document.getElementById("btnModifier");
const btnSupprimer = document.getElementById("btnSupprimer");
const cardModifierSupprimer = document.getElementById("formModifSuppr");
const rechercheInput =  document.getElementById("rechercheReservation");
const filterSelect =  document.getElementById("selectReservation");
const btnToday =  document.getElementById("btnToday");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const date = new Date();


let restauration = JSON.parse(localStorage.getItem("baseDonnes")) || []; 
console.log(restauration)

function addReservation(reservation) {
    restauration.push(reservation);
    localStorage.setItem("baseDonnes", JSON.stringify(restauration));
}

function getReservationById(idReservation){
    return restauration.filter(res => res.date === idReservation);
}

function updateReservation(idReservation, nouvelleReservation) {
    for (let i = 0; i < restauration.length; i++) {
        if (restauration[i].id === idReservation) {
            restauration[i] = nouvelleReservation;
            localStorage.setItem("baseDonnes", JSON.stringify(restauration));
            break;
        }
    }
}
function reservationByTitre(titre) {
    titre = titre.trim().toLowerCase();
    return restauration.filter(r => r.titre.trim().toLowerCase().includes(titre));
}
function reservationByType(type){
    type = type.trim().toLowerCase();
    return  restauration.filter(r => r.type.trim().toLowerCase()=== type);
}

function supprimerReservation(idReservation){
    restauration = restauration.filter(r => r.id !== idReservation);
    localStorage.setItem("baseDonnes", JSON.stringify(restauration));
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
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const derniereMonthDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    // Jours du mois precedent
    for (let i = firstDay; i > 0; i--) {
        const dayDiv = document.createElement("div");
        dayDiv.id = `${date.getFullYear()}-${date.getMonth()}-${derniereMonthDay - i + 1}`;
        dayDiv.textContent = derniereMonthDay - i + 1;
        dayDiv.classList.add("col");

        const dayOfWeek = new Date(date.getFullYear(), date.getMonth() - 1, derniereMonthDay - i + 1).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayDiv.classList.add("disable-div");
        }
        dayDiv.addEventListener('dragover' , (event)=>{
            event.preventDefault();
        })
        dayDiv.addEventListener('drop' , (event)=>{
            event.preventDefault();
            if(dayDiv.classList.contains("disable-div")){
                return ;
            }
            const reservationId = event.dataTransfer.getData("reservationId");
            const reservation = restauration.find(r => r.id == reservationId)
            if(!reservation) return;
            const newDate = new Date(dayDiv.id);
            reservation.date = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${derniereMonthDay - i + 1}`;
            localStorage.setItem("baseDonnes", JSON.stringify(restauration));
            Gourmet();
            aficherCard();

        })

        appendReservations(dayDiv);
        Containerdays.append(dayDiv);
    }

    //Jours du mois courant 
    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.id = `${date.getFullYear()}-${date.getMonth() + 1}-${i}`;
        dayDiv.textContent = i;
        dayDiv.classList.add("col");
        const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), i).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayDiv.classList.add("disable-div");
        }
        let currentDate = new Date();
        if(dayDiv.id === `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${parseInt(currentDate.getDate())}`){
            dayDiv.style.border = "2px solid red";
        }
        dayDiv.addEventListener('dragover' , (event)=>{
            event.preventDefault();
        })
        dayDiv.addEventListener('drop' , (event)=>{
            event.preventDefault();
            if(dayDiv.classList.contains("disable-div")){
                return ;
            }
            const reservationId = event.dataTransfer.getData("reservationId");
            const reservation = restauration.find(r => r.id == reservationId)
            if(!reservation) return;
            const newDate = new Date(dayDiv.id);
            reservation.date = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${i}`;
            localStorage.setItem("baseDonnes", JSON.stringify(restauration));
            Gourmet();
            aficherCard();
        });


        appendReservations(dayDiv);
        Containerdays.append(dayDiv);
    }
}

function appendReservations(dayDiv) {
    let reservationsJour = getReservationById(dayDiv.id);
    reservationsJour.sort((a, b) =>a.heureBedut.localeCompare(b.heureBedut));
    const titre = document.getElementById("titreModifSuppr");
    const description = document.getElementById("descriptionModifSuppr");
    const heureDebut = document.getElementById("heure-debutModifSuppr");
    const heureFin = document.getElementById("heure-finModifSuppr");
    const nbPersone = document.getElementById("nb-personneModifSuppr");
    const type = document.getElementById("typeModifSuppr");
    const date = document.getElementById("dateModifSuppr");


    reservationsJour.forEach(res => {
        let card = document.createElement("div");
        card.className = "card mb-1 text-start"; 
        card.style.cursor = "pointer";
        if (res.type === 'VIP') {
            card.style.backgroundColor = "red";
        } else if (res.type === 'Standard') {
            card.style.backgroundColor = "green";
        } else {
            card.style.backgroundColor = "blue";
        }

        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex p-1";

        let cardTitle = document.createElement("h6");
        cardTitle.className = "card-title mb-0";
        cardTitle.textContent = res.titre;

        let cardText = document.createElement("p");
        cardText.className = "card-text mb-0 small";
        cardText.textContent = ` |${res.heureBedut} - ${res.heureFin} \n personne(${res.nbPersone})`;
        cardBody.append(cardTitle);
        cardBody.append(cardText);
        card.append(cardBody);

        card.draggable = true;
        card.addEventListener('dragstart', e => {
            e.dataTransfer.setData("reservationId", res.id);
        });

        // click pour modifier/supprimer
        card.addEventListener('click', function() {
            cardModifierSupprimer.classList.add("formModifSupprToggle");
            cover.classList.add("formAjoutToggle");

            titre.value = res.titre;
            description.value = res.description;
            heureDebut.value = res.heureBedut;
            heureFin.value = res.heureFin;
            nbPersone.value = res.nbPersone;
            type.value = res.type;
            const dataTransfer = new Date(dayDiv.id);
            date.value = `${dataTransfer.getFullYear()}-${String(dataTransfer.getMonth() + 1).padStart(2,'0')}-${String(dataTransfer.getDate()).padStart(2,'0')}`;

            const newBtnModifier = document.getElementById("btnModifier");
            const newBtnSupprimer = document.getElementById("btnSupprimer");

            newBtnModifier.onclick = function(event) {
                event.preventDefault();
                if(titre.value ==="" || description.value === "" || heureDebut.value === "" || heureFin.value === ""|| nbPersone.value === "" || type.value ===""){
                    validation(titre,"titre de reservation" , "ce champs est obligatoire");
                    validation(description,"description de reservation" , "ce champs est obligatoire");
                    validation(heureDebut,"" , "ce champs est obligatoire");
                    validation(heureFin,"" , "ce champs est obligatoire");
                    validation(nbPersone,"nombre persone de reservation" , "ce champs est obligatoire");
                    validation(type,"type de reservation" , "ce champs est obligatoire");
                    validation(date,"" , "ce champs est obligatoire");
                    return;
                }
                if(heureDebut.value.localeCompare(heureFin.value)  != -1){
                    window.alert("date fin doit etre plus de date de debut ")
                    return;
                }
                let newDate = new Date(date.value)
                let valeurDate = `${newDate.getFullYear()}-${String(newDate.getMonth()+1)}-${parseInt(newDate.getDate())}`;
                const nouvelleReservation = new Reservation(
                    res.id, valeurDate, titre.value, description.value,
                    heureDebut.value, heureFin.value, nbPersone.value, type.value
                );
                updateReservation(res.id, nouvelleReservation);
                Gourmet();
                aficherCard();
                cover.classList.remove("formAjoutToggle");
                cardModifierSupprimer.classList.remove("formModifSupprToggle");
                cardAjout.classList.remove("formAjoutToggle");
            }

            newBtnSupprimer.onclick = function(event) {
                event.preventDefault();
                supprimerReservation(res.id);
                Gourmet();
                aficherCard();
                cover.classList.remove("formAjoutToggle");
                cardModifierSupprimer.classList.remove("formModifSupprToggle");
                cardAjout.classList.remove("formAjoutToggle");
            }
        });

        // Ajouter la card au jour
        dayDiv.append(card);
    });
}


function updateDate(nb){
    date.setMonth(date.getMonth() + nb);
    updateMonthYear();
    Gourmet();
    aficherCard();
}

// navigation mois
nextbtn.addEventListener('click', () => updateDate(1));
prevbtn.addEventListener('click', () => updateDate(-1));

function aficherCard(){
    const divCalendrier = document.querySelectorAll(".days div");
    const cover = document.getElementById("cover");

    // Fermer le formulaire quand on clique sur le cover
    cover.addEventListener('click', function() {
        this.classList.remove("formAjoutToggle");
        cardAjout.classList.remove("formAjoutToggle");
        cardModifierSupprimer.classList.remove("formModifSupprToggle");
    });

    // Ouvrir formulaire ajout si pas désactivé
    divCalendrier.forEach(div => {
        div.addEventListener('click', function() {
            if (div.classList.contains("disable-div")) return;

            cover.classList.add("formAjoutToggle");
            cardAjout.classList.add("formAjoutToggle");
            let TransferDate = new Date(div.id);
            InputDate.value = `${TransferDate.getFullYear()}-${String(TransferDate.getMonth() + 1).padStart(2, '0')}-${String(TransferDate.getDate()).padStart(2, '0')}`;
        });
    });
}


// submit form ajout 
cardAjout.addEventListener('submit', function(event){
    event.preventDefault();
    const titreInput = document.getElementById("titre");
    const descriptionInput =document.getElementById("description");
    const heureBedutInput = document.getElementById("heure-debut");
    const heureFinInput = document.getElementById("heure-fin");
    const nbPersoneInput = document.getElementById("nb-personne");
    const typeInput = document.getElementById("type");
    const dateInput = document.getElementById("date");

    const titre = titreInput.value;
    const description = descriptionInput.value;
    const heureBedut = heureBedutInput.value;
    const heureFin = heureFinInput.value;
    const nbPersone = nbPersoneInput.value;
    const type = typeInput.value;
    const date = dateInput.value;
    let newDate = new Date(date)
    let valeurDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1)}-${String(parseInt(newDate.getDate()))}`




    if(titre ==="" || description === "" || heureBedut === "" || heureFin === ""|| nbPersone === "" || type ===""){
        validation(titreInput,"titre de reservation" , "ce champs est obligatoire");
        validation(descriptionInput,"description de reservation" , "ce champs est obligatoire");
        validation(heureBedutInput,"" , "ce champs est obligatoire");
        validation(heureFinInput,"" , "ce champs est obligatoire");
        validation(nbPersoneInput,"nombre persone de reservation" , "ce champs est obligatoire");
        validation(typeInput),"type de reservation" , "ce champs est obligatoire";
        validation(dateInput),"" , "ce champs est obligatoire";
        return;
    }
    if(heureBedut.localeCompare(heureFin) != -1){
        window.alert("date fin doit etre plus de date de debut ")
        return;
    }

    const nouvelleReservation = new Reservation(Date.now(), valeurDate, titre, description, heureBedut, heureFin, nbPersone, type);
    addReservation(nouvelleReservation);

    Gourmet();
    aficherCard();

    document.getElementById("cover").classList.remove("formAjoutToggle");
    cardAjout.classList.remove("formAjoutToggle");
    cardAjout.reset();
});
rechercheInput.addEventListener("focus" ,()=>{
    filterSelect.value = "tous" ; 
    restauration = JSON.parse(localStorage.getItem("baseDonnes")) || [];
    Gourmet();
    aficherCard();
})
rechercheInput.addEventListener("input" ,()=>{
    let titreRecherche = rechercheInput.value;
    let listeFiltre;

    if (titreRecherche.length > 0) {
        listeFiltre = reservationByTitre(titreRecherche);
    } else {
        listeFiltre = JSON.parse(localStorage.getItem("baseDonnes")) || [];
    }
    restauration = listeFiltre;
    Gourmet();
    aficherCard();
    
});
let baseDonnees = JSON.parse(localStorage.getItem("baseDonnes")) || [];

filterSelect.addEventListener('change', () => {
    let value = filterSelect.value.trim().toLowerCase();
    let listeFiltre;

    switch(value){
        case "tous":
            listeFiltre = baseDonnees;
            break;
        case "groupe":
            listeFiltre = baseDonnees.filter(r => r.type.toLowerCase() === "groupe");
            break;
        case "vip":
            listeFiltre = baseDonnees.filter(r => r.type.toLowerCase() === "vip");
            break;
        case "standard":
            listeFiltre = baseDonnees.filter(r => r.type.toLowerCase() === "standard");
            break;
        default:
            listeFiltre =baseDonnees;
    }

    console.log(listeFiltre);
    restauration = listeFiltre;

    Gourmet();
    aficherCard();
});
btnToday.addEventListener("click" , ()=>{
    let dateNow = new Date();
    date.setDate(dateNow.getDate())
    date.setFullYear(dateNow.getFullYear())
    date.setMonth(dateNow.getMonth())
    updateDate(0);
    Gourmet();
    aficherCard();
});
function validation(input,textPlaceHolder,textError){
    if(input.value === ""){
        input.style.border = "2px solid red"
        input.style.color = "red"
        input.setAttribute("placeholder",textError)
    }else{
        input.style.border = "2px solid green"
        input.style.color = "green"
        input.setAttribute("placeholder",textPlaceHolder)
    }
    input.addEventListener('input' , ()=>{
            let value = input.value;
            if(value.length > 0 ){
                input.style.border = "2px solid green"
                input.style.color = "green"
            }
    });
}

updateMonthYear();
Gourmet();
aficherCard();
