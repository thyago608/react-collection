import { useMutation, useQuery } from "@tanstack/react-query";
import { Product } from "types/Product";
import { api } from "services/api";
import { client } from "services/queryClient";

type CreateProductFormData = Omit<Product, "id">;

type UpdateProductFormData = Omit<Product, "url_thumbnail" | "status">;

async function getProducts() {
  const response = await api.get<Product[]>("materials");
  return response.data;
}

async function createProduct(product: CreateProductFormData) {
  await api.post("materials", product);
}

async function removeProduct(productID: number) {
  await api.delete(`materials/${productID}`);
}

async function updateProduct(product: UpdateProductFormData) {
  await api.put(`materials/${product.id}`, product);
}

export function useProducts() {
  return {
    users: useQuery(["products"], getProducts),
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
