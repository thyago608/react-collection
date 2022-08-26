import { IProduct } from "types/Product";
import { api } from "services/api";
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";

const LIMIT = 10;

type ResponseFetchProducts = {
  products: IProduct[];
  currentPage: number;
  prevPage: number;
  nextPage: number;
};

function sortProducts(products: IProduct[]) {
  return products.sort(function (a, b) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }

    return 0;
  });
}

function formatProducts(products: IProduct[]) {
  return products.map((product) => {
    return {
      ...product,
      created_at: new Intl.DateTimeFormat("pt-BR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(product.created_at)),
    };
  });
}

export async function getProducts(
  page: number
): Promise<ResponseFetchProducts> {
  let currentPage = page;

  let response = await api.get<IProduct[]>(
    `materials?_page=${currentPage}&_limit=${LIMIT}`
  );
  const totalProducts = Number(response.headers["x-total-count"]);

  let prevPage = currentPage === 1 ? 1 : currentPage - 1;
  let nextPage =
    totalProducts / LIMIT === currentPage ? currentPage : currentPage + 1;

  if (response.data.length === 0) {
    currentPage = totalProducts / LIMIT;
    nextPage = currentPage;
    response = await api.get(`materials?_page=${currentPage}&_limit=${LIMIT}`);
  }

  const formattedProducts = formatProducts(response.data);

  const orderedProducts = sortProducts(formattedProducts);

  return { products: orderedProducts, currentPage, prevPage, nextPage };
}

export function useFetchProducts(page: number, options: UseQueryOptions) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    ...options,
  }) as UseQueryResult<ResponseFetchProducts>;
}
