import cartModel from "../../schemas/cartSchema.js";
import ProductModel from "../../schemas/productSchema.js";

export default class CartManager {
  constructor() {
    this.cart = [];
  }

  // OBTENER CARRITO DE PRODUCTOS
  getCart = async () => {
    const allCarts = await cartModel.find();
    console.log(JSON.stringify(allCarts, null, "\t"));
    return allCarts;
  };
  //CREAR CARRITO DE PRODUCTOS
  createCart = async (cart) => {
    const carts = await cartModel.create(cart);
    return carts;
  };
  // obtener carrito por id (funciona)
  getCartById = async (idCart) => {
    const findCart = await cartModel.findById(idCart);
    if (findCart) {
      return findCart;
    } else {
      return `El carrito con id ${idCart} no se genero aun`;
    }
  };

  // agregar un producto a un carrito de compras (funciona)
  addProductToCart = async (cidCart, pidProduct) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";
    let idCart = await cartModel.findOne(cidCart);
    let idProduct = await ProductModel.findOne(pidProduct);

    idCart.products.push({ product: idProduct });
    idCart.save();
  };

  // Eliminar un producto de un carrito de compras (No funciona, elimina todo el carrito)
  deletePidOfCid = async (cidCart, pidProduct) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";
    let idCart = await cartModel.findOne(cidCart);
    let idProduct = await ProductModel.findOne(pidProduct);

    idCart.products.splice({ product: idProduct }); // no estoy segura de que opcion va, probe varias
    idCart.save();
  };

  //Eliminar todos los productos del carrito (No funciona, Me tira una infinidad de errores por consola)
  deleteCart = async (cidCart) => {
    if (!cidCart) return "Cart  Not Found"; //Valido si existe el carrito

    // busco por Id y elimino, le paso por parametro la indicacion de que el _id sea : al cidCart
    let idCartDelete = await cartModel.findByIdAndDelete({ _id: cidCart });

    idCartDelete.save(); //Guardo los cambios
  };

  //Actualizar cantidad del producto dentro de un carrito (no funciona)
  updateProdQuantity = async (cidCart, pidProduct, quantity) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";
    let idCart = await cartModel.findOne(cidCart);
    let idProduct = await ProductModel.findOne(pidProduct);

    // Si existe el id del producto en ese carrito, le pusheo cantidad pasada por el req.body
    if (idProduct) return idCart.products.push({ quantity });
    //Guardo este cambio. Tengo la sospecha que deberia referenciar el id de product, pero no se como hacerlo

    await cartModel.findByIdAndUpdate({ _id: idCart.id }, idCart);
  };

  // muestra solo el carrito con sus respectivos productos (Funciona, pero el populate no)
  cartDetail = async (cidCart) => {
    if (!cidCart) return "Cart  Not Found";
    let cartDetail = await cartModel
      .findOne(cidCart)
      .populate("products.product"); //puse el populate aca y no funciona
    console.log(JSON.stringify(cartDetail, null, "\t")); // aca ni siquiera me muestra la informacion
  };
}
