interface IInput extends HTMLElement {
  value: string;
}
interface IUserDataJson {
  username: string;
  password: string;
  nickname: string;
}

const idInput: IInput = document.querySelector(".idInput")!;
const pwInput: IInput = document.querySelector(".pwInput")!;
const pwCheckInput: IInput = document.querySelector(".pwCheckInput")!;
const nicknameInput: IInput = document.querySelector(".nicknameInput")!;
const joinBtn: HTMLElement = document.querySelector(".joinBtn")!;

const postJoinReq = async (e: Event) => {
  e.preventDefault();
  const pwValidCheck = pwInput.value === pwCheckInput.value;
  if (!pwValidCheck) {
    return location.reload();
  } else {
    const postData: IUserDataJson = {
      username: idInput.value,
      password: pwInput.value,
      nickname: nicknameInput.value,
    };
    console.log(postData);
    try {
      const respone = await fetch("http://localhost:8282/user/join", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await respone.json();
      console.log(json);
    } catch (error) {
      console.log("에러다!!!");
      console.log(error);
    }
  }
};
joinBtn.addEventListener("click", postJoinReq);
