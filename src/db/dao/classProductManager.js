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
  addProducts = async (codeProducts) => {
    const { code } = codeProducts;
    try {
      // validacion: busca si el producto nuevo tiene un code ya existente
      const validation = await ProductModel.findOne({ code: code });
      if (validation) {
        console.log(`Producto con codigo ya existente ${code}`);
        return;
      }

      const newProduct = await ProductModel.insertMany([codeProducts]);
      return newProduct;
    } catch (e) {
      console.log(e);
    }
  };
  //OBTENCION DE PRODUCTO POR ID (FUNCIONA)

  getProductById = async (id) => {
    const findProduct = await ProductModel.findById(id);
    if (findProduct) {
      return findProduct;
    } else {
      return `El producto con id ${id} no se encuentra en nuestra lista`;
    }
  };
  //CAMBIO DE ALGUN ELEMENTO EN EL PRODUCTO(FUNCIONA)

  updateProducts = async (idUpdate, product) => {
    //Validacion para saber si el el producto con cierto ID esta en nuestra base
    let productFound = await ProductModel.findOne({ _id: idUpdate });

    if (!productFound) {
      return `El producto con id ${idUpdate} no se encontro.`;
    }
    await ProductModel.findByIdAndUpdate({ _id: productFound._id }, product);
    return console.log("producto modificado");
  };

  //ELIMINAR UN PRODUCTO DE LA LISTA (FUNCIONA)

  deleteProduct = async (id) => {
    const newListOfProducts = await ProductModel.findByIdAndDelete({ _id: id });
    return console.log("Producto eliminado");
  };
}
