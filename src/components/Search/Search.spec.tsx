import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductProvider } from "contexts/ProductsContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "contexts/ModalContext";
import { client } from "services/queryClient";
import { Search } from ".";

describe("Component Search", () => {
    it("should render the component", () => {
        render(
            <QueryClientProvider client={client}>
                <ProductProvider>
                    <ModalProvider>
                        <Search />
                    </ModalProvider>
                </ProductProvider>
            </QueryClientProvider>
        );

        const form = screen.getByRole("searchbox");
        const searchInput = screen.getByRole("search");
        const searchButton = screen.getByRole("button");

        expect(form).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it("should search box must be empty", () => {
        render(
            <QueryClientProvider client={client}>
                <ProductProvider>
                    <ModalProvider>
                        <Search />
                    </ModalProvider>
                </ProductProvider>
            </QueryClientProvider>
        );

        const form = screen.getByRole("searchbox");
        expect(form).toHaveFormValues({ search: '' });
    })
})