const formRegister = document.getElementById("formRegister");

formRegister.addEventListener("submit", async (event) => {
  event.preventDefault();
  const info = new FormData(formRegister);
  const data = {};

  info.forEach((valor, llave) => (data[llave] = valor));
  console.log(data);

  const res = await fetch("http://localhost:8082/api/user/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resInfo = await res.json();
  console.log(resInfo);
  if (resInfo.error) {
  }
  localStorage.setItem("accessToken", resInfo.accessToken);
});
