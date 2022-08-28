import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "contexts/ProductsContext";
import { ModalProvider } from "contexts/ModalContext";
import { client } from "services/queryClient";
import { Input } from ".";

describe("Component Input", () => {
    it("should render an empty input", () => {
        render(
            <QueryClientProvider client={client}>
                <ProductProvider>
                    <ModalProvider>
                        <Input label="anything" name="anything" />
                    </ModalProvider>
                </ProductProvider>
            </QueryClientProvider>
        );

        const input = screen.getByTestId("anything");

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
    });
});
