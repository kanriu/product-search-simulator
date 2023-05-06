import { Request, Response } from "express";
import ProductModel from "../models/product";
import { Product, ResponseData } from "../interface/product";

export const getSearchProducts = async (req: Request, res: Response) => {
  try {
    const response: ResponseData = { found: [], suggested: [] };

    const { filter } = req.query;
    let products: Array<Product> = [];

    if (!filter) {
      products = await ProductModel.find({});
    } else {
      products = await ProductModel.find({
        name: new RegExp(`${filter}.*`, "i"),
      });
    }

    if (products.length > 0) {
      response.found = products;
      const { category } = products[0];
      const productNames = products.map((product) => product.name);

      const suggested: Array<Product> = await ProductModel.find({
        $and: [{ category }, { name: { $nin: productNames } }],
      }).limit(2);
      response.suggested = suggested;

      return res.status(200).json({
        status: "success",
        results: response.found.length,
        data: response,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "No hay ningún producto en la búsqueda",
      });
    }
  } catch (error) {
    console.log(error);
    // Error 500: Internal server error - algo malo sucedio en la parte del exterior
    res.status(500).json({
      status: "error",
      message: "Ocurrió un error: Hable con el administrador",
    });
  }
};
