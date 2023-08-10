// * conexion socket(FRONT)

const socketCliente = io();

function formProductos() {
  let subirInfo = document.getElementById("subirInfo");
  subirInfo.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const code = document.getElementById("code").value;

    infoProducts = {
      title,
      description,
      stock,
      price,
      code,
    };

    socketCliente.emit("subirProductos", infoProducts);
  });
}
function chat() {
  let enviarMensaje = document.getElementById("enviarMensaje");

  enviarMensaje.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    chatHistory = {
      name,
      message,
    };

    socketCliente.emit("guardarChat", chatHistory);
  });
}
