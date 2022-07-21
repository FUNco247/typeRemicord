interface IData {
  siteName: string;
  distance: string;
  oiling: string;
  water: boolean;
  overTime: boolean;
  nightSupport: boolean;
  memo: string;
}

const drawTable = () => {
  const tableBody = document.querySelector("tbody") as HTMLElement;
  tableBody.innerHTML = "";
  if (localStorage.length > 0) {
    const localStorageKeys = Object.keys(localStorage).sort();
    for (let i = 0; i < localStorage.length; i++) {
      const tr = document.createElement("tr");
      tableBody.appendChild(tr);
      const datas: IData = JSON.parse(
        localStorage.getItem(`${localStorageKeys[i]}`)!
      );
      const siteNameTd = document.createElement("td");
      siteNameTd.innerText = datas.siteName;
      tr.appendChild(siteNameTd);
      const distanceTd = document.createElement("td");
      distanceTd.innerText = datas.distance;
      tr.appendChild(distanceTd);
      const oilingTd = document.createElement("td");
      oilingTd.innerText = datas.oiling;
      tr.appendChild(oilingTd);
      const waterTd = document.createElement("td");
      waterTd.innerText = datas.water === true ? "O" : "";
      tr.appendChild(waterTd);
      const overTimeTd = document.createElement("td");
      overTimeTd.innerText = datas.overTime === true ? "O" : "";
      tr.appendChild(overTimeTd);
      const nightSupportTd = document.createElement("td");
      nightSupportTd.innerText = datas.nightSupport === true ? "O" : "";
      tr.appendChild(nightSupportTd);
      const removeBtn = document.createElement("button");
      removeBtn.innerText = "삭제";
      removeBtn.classList.add("removeBtn");
      tr.appendChild(removeBtn);
    }
  }
  const removeBtnArr = document.querySelectorAll("button.removeBtn");
  removeBtnArr.forEach((btn) => btn.addEventListener("click", removeStorage));
};

const addStorageBtn = document.querySelector("button.addBtn") as HTMLElement;
let dataArr: IData[] = [];
const addStorage = (e: Event) => {
  e.preventDefault();
  const siteName = document.querySelector("input.siteName") as HTMLInputElement;
  const distance = document.querySelector("input.distance") as HTMLInputElement;
  const oiling = document.querySelector("input.oiling") as HTMLInputElement;
  const water = document.querySelector("input.water") as HTMLInputElement;
  const overTime = document.querySelector("input.overTime") as HTMLInputElement;
  const nightSupport = document.querySelector(
    "input.nightSupport"
  ) as HTMLInputElement;
  const memo = document.querySelector("input.memo") as HTMLInputElement;

  const saveData = {
    siteName: siteName.value,
    distance: distance.value,
    oiling: oiling.value,
    water: water.checked,
    overTime: overTime.checked,
    nightSupport: nightSupport.checked,
    memo: memo.value,
  };
  //console.log(saveData);
  localStorage.clear();

  dataArr.push(saveData);
  for (let i = 0; i < dataArr.length; i++) {
    localStorage.setItem(`${i}`, JSON.stringify(dataArr[i]));
  }
  drawTable();
};
addStorageBtn.addEventListener("click", addStorage);

const removeStorage = (e: Event) => {
  console.log("clicked");
  const targetElement = e.target as HTMLElement;
  const trCollection = targetElement.parentElement?.parentElement?.children;
  console.log(trCollection);
  const targetTrNum = Array.from(trCollection!).indexOf(
    targetElement.parentElement!
  );
  console.log(trCollection);
  const storageKeys = Object.keys(localStorage).sort();
  console.log(storageKeys);
  console.log(targetTrNum);
  localStorage.removeItem(`${storageKeys[targetTrNum]}`);
  drawTable();
};

drawTable();
