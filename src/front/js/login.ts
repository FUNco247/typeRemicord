const loginForm = document.querySelector("form");

const postLogin = async (e: Event) => {
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
  try {
    const response = await fetch("http://localhost:8282/user/login", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      location.href = "record";
    } else {
      const messageSpan = document.querySelector(
        "span.errorMessage"
      ) as HTMLElement;
      messageSpan.innerHTML = json.message;
    }
  } catch (error) {
    console.log(error);
  }
};

loginForm?.addEventListener("submit", postLogin);
