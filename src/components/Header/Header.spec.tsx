import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductProvider } from "contexts/ProductsContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "contexts/ModalContext";
import { client } from "services/queryClient";
import { Header } from ".";

describe("Component Header", () => {
    it("should have a button to add new product and clickable", () => {
        render(
            <QueryClientProvider client={client}>
                <ProductProvider>
                    <ModalProvider>
                        <Header />
                    </ModalProvider>
                </ProductProvider>
            </QueryClientProvider>
        );

        const buttonAddNewProduct = screen.getByText("Novo material")

        expect(buttonAddNewProduct).toBeInTheDocument();
        expect(buttonAddNewProduct).toBeEnabled();
    });
})