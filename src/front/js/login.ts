const loginForm = document.querySelector("form");

const postLogin = (e: Event) => {
  e.preventDefault();
  const usernameInput = document.querySelector(
    "input#username"
  ) as HTMLInputElement | null;
  const username = usernameInput?.value;
  const passwordInput = document.querySelector(
    "input#password"
  ) as HTMLInputElement | null;
  const password = passwordInput?.value;
  const postData = {
    username,
    password,
  };
};

if (loginForm) {
  loginForm.addEventListener("submit", postLogin);
} else {
  console.log("can't find login form");
}
