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
  // obtener carrito por id (funciona)
  getCartById = async (idCart) => {
    const findCart = await cartModel.findById(idCart).lean();
    if (findCart) {
      return findCart;
    } else {
      return `El carrito con id ${idCart} no se genero aun`;
    }
  };

  // agregar un producto a un carrito de compras (No funciona)
  addProductToCart = async (cidCart, pidProduct) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";
    let idCart = await cartModel.findOne(cidCart); //ObjectParameterError: Parameter "filter" to findOne() must be an object, got "El carrito con id 64e510c9648b156741923a19 no se genero aun" (type string)
    let idProduct = await ProductModel.findOne(pidProduct);

    idCart.products.push({ product: idProduct });
    idCart.save();
  };

  // Eliminar un producto de un carrito de compras (no FUNCIONA, no hace nada)
  deletePidOfCid = async (cidCart, pidProduct) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";
    return await cartModel.findOneAndUpdate(
      { _id: cidCart.id },
      { $pull: { products: { _id: pidProduct._id } } },
      { new: true }
    );
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

  // muestra solo el carrito con sus respectivos productos (Funciona)
  cartDetail = async (cidCart) => {
    if (!cidCart) return "Cart  Not Found";
    let cartDetail = await cartModel.find(cidCart);
    console.log(JSON.stringify(cartDetail, null, "\t"));
  };
}
