const Containerdays = document.querySelector(".days");
const nextbtn = document.querySelector(".next-btn");
const prevbtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const InputDate = document.getElementById("date");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const date = new Date();

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
            InputDate.ariaValueText = date.getDate();
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
        dayDiv.textContent = derniereMonthDay -i +1;
        Containerdays.append(dayDiv);
    }
    for(let i = 1; i<= lastDay;i++){
        const dayDiv = document.createElement("div");
        dayDiv.textContent =  i ;
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

    
  


