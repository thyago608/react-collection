import { FiSearch, FiX } from "react-icons/fi";

export function Input() {
    return (
        <div>
            <input
                type="text"
                placeholder="Você pode pesquisar descrição e linha"
            />
            <button type="button">
                <FiSearch />
            </button>
        </div>
    );
}