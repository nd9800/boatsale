const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

console.log(date)
  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,  
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const firstDayIndex = date.getDay();
  console.log(firstDayIndex)
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  console.log(lastDayIndex)
  
  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  // SEPTEMBER

  document.querySelector(".date p").innerHTML = new Date().toDateString();
  // Sun Sep 13 2020

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date disabledbutton">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="active">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date disabledbutton" >${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
  renderactive()
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  renderactive()
});

renderCalendar();


function renderactive() {
  const bg = document.querySelectorAll('.days div');
  const calendar = document.getElementById('calendar');

for (let index = 0; index < bg.length; index++) {
  const element = bg[index];
  element.addEventListener('click',function () {
    for (let index = 0; index < bg.length; index++) {
      const element = bg[index];
      element.classList.remove("active");
    }
      element.classList.add("active");
      let day = element.textContent
    let ca=  calendar.value =  `${day}\\${date.getMonth()}\\${date.getFullYear()} `
    console.log(ca)
    
  })
}

}
renderactive()