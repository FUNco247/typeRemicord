const clock = document.querySelector("h1.clock") as HTMLElement;
const calendar = document.querySelector("b.calendar") as HTMLElement;
const daysArr = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

function getClock() {
  const date: Date = new Date();
  const years: string = String(date.getFullYear());
  let months: string = String(date.getMonth() + 1);
  let dates: string = String(date.getDate());
  const days: string = daysArr[date.getDay()];
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const seconds: string = String(date.getSeconds()).padStart(2, "0");
  months = parseInt(months) < 10 ? "0" + months : months;
  dates = parseInt(dates) < 10 ? "0" + dates : dates;

  clock.innerText = `${hours}:${minutes}:${seconds}`;
  calendar.innerText = `Today : ${years}년 ${months}월 ${dates}일 ${days}`;
}
getClock();
setInterval(getClock, 1000);
