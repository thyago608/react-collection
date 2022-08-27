import { useQuery } from "@tanstack/react-query";
import { IProduct } from "types/Product";
import { api } from "services/api";
import { handleCreateAt } from "utils/convertDate";

const LIMIT = 10;

type ResponseFetchProducts = {
  products: IProduct[];
  pages: {
    currentPage: number;
    prevPage: number;
    nextPage: number;
    totalPages: number;
  };
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
  let currentPage = page;

  let response = await api.get<IProduct[]>(
    `materials?_page=${currentPage}&_limit=${LIMIT}&_sort=id&_order=desc`
  );
  const totalProducts = Number(response.headers["x-total-count"]);
  const totalPages = totalProducts / LIMIT;

  let prevPage = currentPage === 1 ? 1 : currentPage - 1;
  let nextPage =
    totalProducts / LIMIT === currentPage ? currentPage : currentPage + 1;

  if (response.data.length === 0) {
    currentPage = totalProducts / LIMIT;
    nextPage = currentPage;
    response = await api.get(`materials?_page=${currentPage}&_limit=${LIMIT}`);
  }

  const formattedProducts = formatProducts(response.data);

  return {
    products: formattedProducts,
    pages: { currentPage, prevPage, nextPage, totalPages },
  };
}

export function useFetchProducts(
  page: number,
  dataInitial?: ResponseFetchProducts
) {
  return useQuery(["products", page], () => getProducts(page), {
    initialData: dataInitial,
  });
}
