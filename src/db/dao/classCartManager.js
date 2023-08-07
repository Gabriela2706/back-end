import CartModel from "../../schemas/cartSchema.js";

export default class CartManager {
  constructor() {
    this.cart = [];
  }
  // OBTENER CARRITO DE PRODUCTOS
  getCart = async () => {
    const allCarts = await CartModel.find();
    return allCarts;
  };
  //CREAR CARRITO DE PRODUCTOS
  //
  createCart = async (cart) => {
    const carts = await CartModel.insertMany([cart]);
    return carts;
  };
  // obtener carrito por id (funciona)
  getCartById = async (idCart) => {
    const findCart = await CartModel.find((cart) => cart.id == idCart);
    if (findCart) {
      return findCart;
    } else {
      return `El carrito con id ${idCart} no se genero aun`;
    }
  };

  // agregar un producto al carrito de compras
  addProductToCart = async (cidCart, pidProduct) => {
    if (!cidCart) return "Cart  Not Found";
    if (!pidProduct) return "Product Not Found";

    let update = await CartModel.map((cart) => {
      if (cart.id === cidCart.id) {
        if (!cidCart.products.some((product) => product.id === pidProduct.id)) {
          let productInCart = cart.products.push({
            id: pidProduct.id,
            quantity: 1,
          });
          return {
            ...cart,
            ...productInCart,
          };
        }
        cart.products.map((p) => {
          if (p.id === pidProduct.id) {
            return ++p.quantity;
          }
          return p;
        });
      }
      return cart;
    });

    return update;
  };
}
