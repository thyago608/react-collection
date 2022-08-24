import Head from "next/head";
import { Product } from "components/Product";
import styles from "./home.module.scss";

export default function Home() {
    return (
        <>
            <Head>
                <title>React Collection | Home</title>
            </Head>
            <main className={styles.container}>
                <Product
                    product={{
                        id: 14548,
                        description: "Nelio - RUR12178",
                        url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_NelioRUR12178_62x121_Rus_Stack_thumb.jpg",
                        line: "Coleção Urbanos",
                        created_at: "24/08/22"
                    }}
                />
                <Product
                    product={{
                        id: 14548,
                        description: "Nelio - RUR12178",
                        url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_NelioRUR12178_62x121_Rus_Stack_thumb.jpg",
                        line: "Coleção Urbanos",
                        created_at: "24/08/22"
                    }}
                />

                <Product
                    product={{
                        id: 14548,
                        description: "Nelio - RUR12178",
                        url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_NelioRUR12178_62x121_Rus_Stack_thumb.jpg",
                        line: "Coleção Urbanos",
                        created_at: "24/08/22"
                    }}
                />
                <Product
                    product={{
                        id: 14548,
                        description: "Nelio - RUR12178",
                        url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_NelioRUR12178_62x121_Rus_Stack_thumb.jpg",
                        line: "Coleção Urbanos",
                        created_at: "24/08/22"
                    }}
                />
                <Product
                    product={{
                        id: 14548,
                        description: "Nelio - RUR12178",
                        url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_NelioRUR12178_62x121_Rus_Stack_thumb.jpg",
                        line: "Coleção Urbanos",
                        created_at: "24/08/22"
                    }}
                />
                <Product
                    product={{
                        id: 14548,
                        description: "Nelio - RUR12178",
                        url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_NelioRUR12178_62x121_Rus_Stack_thumb.jpg",
                        line: "Coleção Urbanos",
                        created_at: "24/08/22"
                    }}
                />
            </main>
        </>
    );
}
