import ProductModel from "../../schemas/productSchema.js";

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  //OBTENER TODOS LOS PRODUCTOS
  getProducts = async () => {
    const allProducts = await ProductModel.find();
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
  //OBTENCION DE PRODUCTO POR ID (NO FUNCIONA, SIEMPRE TIRA EL MISMO ERROR: EL ID NO SE ENCUENTRA)

  getProductById = async (id) => {
    const findProduct = await ProductModel.findOne({ id: "_id" });
    if (findProduct) {
      console.log(`Producto Encontrado!!`);
      return findProduct;
    } else {
      return `El producto con id ${id} no se encuentra en nuestra lista`;
    }
  };
  //CAMBIO DE ALGUN ELEMENTO EN EL PRODUCTO( NO FUNCIONA, INTENTE USAR EL UPDATEONE Y EL PUT SE GENERA BIEN, PERO NO HACE EL CAMBIO)

  updateProducts = async (idUpdateProducts) => {
    //Validacion para saber si el el producto con cierto ID esta en nuestra base
    let productFound = ProductModel.findOne(idUpdateProducts);
    if (!productFound) {
      return `El producto con id ${idUpdateProducts} no se encontro.`;
    }
    let updateProducts = ProductModel.updateOne({ idUpdateProducts });
    //uso updateone para cambiar algo del id recibido en el parametro. recibo el id y retorno el producto encontrado + el cambio del id.
    return {
      ...productFound,
      ...updateProducts,
    };
  };

  //ELIMINAR UN PRODUCTO DE LA LISTA

  deleteProduct = async (idProductDelete) => {
    const newListOfProducts = ProductModel.findOneAndRemove({
      idProductDelete,
    });
    return newListOfProducts;
  };
}
