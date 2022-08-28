import { useMutation } from "@tanstack/react-query";
import { CreateProductFormData, UpdateProductFormData } from "types/Product";
import { client } from "services/queryClient";
import { api } from "services/api";
import {
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
} from "utils/toasts";

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
    createNewProduct: useMutation(createProduct, {
      onSuccess: () => {
        client.invalidateQueries(["products"]);
        toastSuccess("Produto criado com sucesso!");
      },
      onError: () =>
        toastError("Ops, houve uma falha na comunicação com o servidor"),
    }),
    removeProduct: useMutation(removeProduct, {
      onSuccess: () => {
        client.invalidateQueries(["products"]);
        toastWarning("Produto removido com sucesso!");
      },
      onError: () =>
        toastError("Ops, houve uma falha na comunicação com o servidor"),
    }),
    updateProduct: useMutation(updateProduct, {
      onSuccess: () => {
        client.invalidateQueries(["products"]);
        toastInfo("Produto atualizado com sucesso!");
      },
      onError: () =>
        toastError("Ops, houve uma falha na comunicação com o servidor"),
    }),
  };
}
