interface IUserDataJson {
  username: string;
  password: string;
  nickname: string;
}

const idInput = document.querySelector(".idInput") as HTMLInputElement | null;
console.log(idInput);
const pwInput = document.querySelector(".pwInput") as HTMLInputElement | null;
const pwCheckInput = document.querySelector(
  ".pwCheckInput"
) as HTMLInputElement | null;
const nicknameInput = document.querySelector(
  ".nicknameInput"
) as HTMLInputElement | null;
const joinBtn = document.querySelector(".joinBtn") as HTMLButtonElement;
joinBtn.disabled = true;

const disableBtn = () => {
  const password = pwInput?.value;
  const password2 = pwCheckInput?.value;
  const pwValidCheck = password === password2;

  if (!pwValidCheck) {
    joinBtn.disabled = true;
    document.querySelector("span.pwValidCheck")!.innerHTML =
      "비밀번호가 일치하지 않습니다.";
  } else {
    joinBtn.disabled = false;
    document.querySelector("span.pwValidCheck")!.innerHTML =
      "비밀번호가 일치합니다.";
  }
};

pwInput?.addEventListener("input", disableBtn);
pwCheckInput?.addEventListener("input", disableBtn);

const postJoinReq = async (e: Event) => {
  const username = idInput?.value;
  const password = pwInput?.value;
  const nickname = nicknameInput?.value;
  e.preventDefault();
  if (username && password && nickname) {
    const postData: IUserDataJson = {
      username,
      password,
      nickname,
    };
    console.log(postData);
    try {
      const response = await fetch("http://localhost:8282/user/join", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Invalid JSON data posted");
  }
};
joinBtn.addEventListener("click", postJoinReq);
