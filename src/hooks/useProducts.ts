import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  IProduct,
  CreateProductFormData,
  UpdateProductFormData,
} from "types/Product";
import { api } from "services/api";
import { client } from "services/queryClient";

export async function getProducts() {
  const response = await api.get<IProduct[]>(
    `materials?_page=${1}&_limit=${10}`
  );
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

export function useProducts(options?: UseQueryOptions) {
  return {
    users: useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
      ...options,
    }) as UseQueryResult<IProduct[]>,
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
