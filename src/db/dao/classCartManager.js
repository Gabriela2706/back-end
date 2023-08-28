import cartModel from "../../schemas/cartSchema.js";
import ProductModel from "../../schemas/productSchema.js";

export default class CartManager {
  constructor() {
    this.cart = [];
  }

  // OBTENER CARRITO DE PRODUCTOS (funciona y el populate tambien)
  getCart = async () => {
    const allCarts = await cartModel.find();
    console.log(JSON.stringify(allCarts, null, "\t"));
    return allCarts;
  };
  //CREAR CARRITO DE PRODUCTOS (funciona)
  createCart = async (cart) => {
    const carts = await cartModel.create(cart);
    return carts;
  };

  // muestra solo el carrito con sus respectivos productos (Funciona)
  cartDetail = async (cidCart) => {
    if (!cidCart) return "Cart  Not Found";
    let cartDetail = await cartModel.findOne({ _id: cidCart });

    console.log(JSON.stringify(cartDetail, null, "\t"));
  };

  // agregar un producto a un carrito de compras (funciona)
  addProductToCart = async (cidCart, pidProduct) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";
    let idCart = await cartModel.findById(cidCart);
    let idProduct = await ProductModel.findById(pidProduct);

    idCart.products.push({ product: idProduct });
    idCart.save();
  };

  // Eliminar un producto de un carrito de compras (funciona)
  deletePidOfCid = async (cidCart, pidProduct) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";
    return await cartModel.findOneAndUpdate(
      { _id: cidCart },
      { $pull: { products: { product: pidProduct } } },
      { new: true }
    );
  };

  //Eliminar todos los productos del carrito (Funciona)
  deleteCart = async (cidCart) => {
    if (!cidCart) return "Cart  Not Found"; //Valido si existe el carrito
    // busco por Id y elimino lo que contiene el carrito, es decir, lo dejo en 0
    let idCartDelete = await cartModel.findById(cidCart);
    idCartDelete.products = [];
    await idCartDelete.save();
    return console.log("Carrito vaciado");
  };

  //Actualizar cantidad del producto dentro de un carrito (NO FUNCIONA)
  updateProdQuantity = async (cidCart, pidProduct, quantity) => {
    if (!cidCart) return "Cart  Not Found";
    const product = await ProductModel.findOne({ _id: pidProduct });
    // Si existe el id del producto en ese carrito, le pusheo cantidad pasada por el req.body
    if (!product) return `El producto no existe`;
    cartModel.findOneAndUpdate(
      { _id: cidCart },
      { $push: { products: { quantity: quantity } } },
      { new: true }
    );

    return console.log("cambio realizado");
  };
}
