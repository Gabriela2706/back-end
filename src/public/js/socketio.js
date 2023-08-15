// * conexion socket(FRONT)

const socketCliente = io();

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
function chat() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  chatHistory = {
    name,
    message,
  };

  socketCliente.emit("guardarChat", chatHistory);
}
