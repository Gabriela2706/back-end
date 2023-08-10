import ProductModel from "../../schemas/productSchema.js";

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  //OBTENER TODOS LOS PRODUCTOS
  getProducts = async () => {
    const allProducts = await ProductModel.find().lean();
    return allProducts;
  };
  //AGREGAR PRODUCTOS NUEVOS

  addProducts = async (code) => {
    try {
      // validacion: busca si el producto nuevo tiene un code ya existente
      const validation = ProductModel.findOne({ code });
      if (validation) {
        console.log("Producto con codigo ya existente");
        return;
      }

      const newProduct = await ProductModel.insertMany([prod]);
      return newProduct;
    } catch (e) {
      console.log(e);
    }
  };
  //OBTENCION DE PRODUCTO POR ID

  getProductById = async (id) => {
    const findProduct = await ProductModel.findById(id);
    if (findProduct) {
      console.log(`Producto Encontrado!!`);
      return findProduct;
    } else {
      return `El producto con id ${id} no se encuentra en nuestra lista`;
    }
  };
  //CAMBIO DE ALGUN ELEMENTO EN EL PRODUCTO(NO FUNCIONA)

  updateProducts = async (idUpdate) => {
    //Validacion para saber si el el producto con cierto ID esta en nuestra base
    let productFound = ProductModel.findOne(idUpdate);

    if (!productFound) {
      return `El producto con id ${idUpdate} no se encontro.`;
    }
    await ProductModel.findByIdAndUpdate(
      { idUpdate: productFound._id },
      productFound
    );
    return console.log("producto modificado");
  };

  //ELIMINAR UN PRODUCTO DE LA LISTA ( NO FUNCIONA)

  deleteProduct = async (id) => {
    const newListOfProducts = await ProductModel.findByIdAndDelete({ id });
    newListOfProducts.save();
    return console.log("Producto eliminado");
  };
}
