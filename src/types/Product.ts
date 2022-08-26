export interface IProduct {
  id: number;
  description: string;
  url_thumbnail: string;
  line: string;
  status: number;
  created_at: string;
}

export type CreateProductFormData = Omit<IProduct, "id">;

export type UpdateProductFormData = Omit<IProduct, "url_thumbnail" | "status">;
