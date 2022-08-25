import { useQuery } from "@tanstack/react-query";
import { Product } from "types/Product";
import { api } from "services/api";

async function getProducts() {
  const response = await api.get<Product[]>("materials");

  return response.data;
}

export function useProducts() {
  return useQuery(["products"], getProducts, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
