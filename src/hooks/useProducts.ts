import { useMutation } from "@tanstack/react-query";
import { CreateProductFormData, UpdateProductFormData } from "types/Product";
import { api } from "services/api";
import { client } from "services/queryClient";

async function createProduct(product: CreateProductFormData) {
  try {
    await api.post("materials", product);
  } catch (e) {
    console.log(
      "Desculpe, não foi possível estabelecer conexão com o servidor"
    );
  }
}

async function removeProduct(productID: number) {
  try {
    await api.delete(`materials/${productID}`);
  } catch (e) {
    console.log(
      "Desculpe, não foi possível estabelecer conexão com o servidor"
    );
  }
}

async function updateProduct(product: UpdateProductFormData) {
  try {
    await api.put(`materials/${product.id}`, product);
  } catch (e) {
    console.log(
      "Desculpe, não foi possível estabelecer conexão com o servidor"
    );
  }
}

export function useProducts() {
  return {
    createNewProduct: useMutation(createProduct, {
      onSuccess: () => client.invalidateQueries(["products"]),
    }),
    removeProduct: useMutation(removeProduct, {
      onSuccess: () => client.invalidateQueries(["products"]),
    }),
    updateProduct: useMutation(updateProduct, {
      onSuccess: () => client.invalidateQueries(["products"]),
    }),
  };
}
