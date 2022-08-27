import { useQuery } from "@tanstack/react-query";
import { IProduct } from "types/Product";
import { api } from "services/api";
import { handleCreateAt } from "utils/convertDate";

const LIMIT = 10;

type ResponseFetchProducts = {
  products: IProduct[];
  totalPages: number;
};

export function formatProducts(products: IProduct[]) {
  return products.map((product) => {
    return {
      ...product,
      created_at: handleCreateAt(product.created_at),
    };
  });
}

export async function getProducts(
  page: number
): Promise<ResponseFetchProducts> {
  let response = await api.get<IProduct[]>(
    `materials?_page=${page}&_limit=${LIMIT}&_sort=id&_order=desc`
  );
  const totalProducts = Number(response.headers["x-total-count"]);
  const totalPages = Math.ceil(totalProducts / LIMIT);

  const formattedProducts = formatProducts(response.data);

  return {
    products: formattedProducts,
    totalPages,
  };
}

export function useFetchProducts(page: number) {
  return useQuery(["products", page], async () => await getProducts(page), {
    staleTime: 1000 * 60 * 5,
  });
}
