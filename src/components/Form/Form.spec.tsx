import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "contexts/ProductsContext";
import { ModalProvider } from "contexts/ModalContext";
import { client } from "services/queryClient";
import { Form } from ".";

describe("Component Form", () => {
    it("should render the form", () => {
        render(
            <QueryClientProvider client={client}>
                <ProductProvider>
                    <ModalProvider>
                        <Form />
                    </ModalProvider>
                </ProductProvider>
            </QueryClientProvider>
        );

        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
    });
});