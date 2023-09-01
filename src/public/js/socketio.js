// * conexion socket(FRONT)

const socketCliente = io();
//funciona para agregar productos desde el front
function formProducts() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const code = document.getElementById("code").value;

  const infoProducts = {
    title,
    description,
    stock,
    price,
    code,
  };

  socketCliente.emit("subirProductos", infoProducts);
}

//funcion para guardar el chat
function chat() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  chatHistory = {
    name,
    message,
  };

  socketCliente.emit("guardarChat", chatHistory);
}

//funcion guardar datos del registro
function registerUsers() {
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const infoUsers = {
    name,
    lastname,
    email,
    password,
  };

  socketCliente.emit("registrarusuario", infoUsers);
}
