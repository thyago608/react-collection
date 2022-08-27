import { useMutation } from "@tanstack/react-query";
import { CreateProductFormData, UpdateProductFormData } from "types/Product";
import { client } from "services/queryClient";
import { api } from "services/api";

async function createProduct(product: CreateProductFormData) {
  try {
    await api.post("materials", product);
  } catch (e) {
    console.log("Ops, houve uma falha na comunicação com o servidor");
  }
}

async function removeProduct(productID: number) {
  try {
    await api.delete(`materials/${productID}`);
  } catch (e) {
    console.log("Ops, houve uma falha na comunicação com o servidor");
  }
}

async function updateProduct(product: UpdateProductFormData) {
  try {
    await api.put(`materials/${product.id}`, product);
  } catch (e) {
    console.log("Ops, houve uma falha na comunicação com o servidor");
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
