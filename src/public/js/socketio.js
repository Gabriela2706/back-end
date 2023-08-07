// * conexion socket(FRONT)
console.log("hola front");
const socketCliente = io();

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
