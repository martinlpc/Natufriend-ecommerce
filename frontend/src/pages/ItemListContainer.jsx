import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../components/Item/ItemList';
import ItemPlaceholder from '../components/Item/ItemPlaceholder';
import { Row } from 'react-bootstrap';
import { getProducts } from '../queries/Product';
import queryString from 'query-string';

// TODO: fix-> en ItemDetail, al clickear una categoria de NavBar, se muestran todos los productos sin filtrar

const ItemListContainer = () => {
    // State para placeholders/spinners
    const [isLoading, setLoading] = useState(true);
    // Productos a mostrar
    const [prods, setProds] = useState([]); // * prods filtrados
    const [params, setParams] = useState({});

    const location = useLocation();

    async function queryProducts() {
        const { limit, page, category, stock, sort } = params;
        const response = await getProducts(limit, page, category, stock, sort);
        if (response.status === 'success') {
            // * Timeout to simulate delay on rendering
            setTimeout(() => {
                setLoading(false);
                setProds(response.payload);
            }, 1000);
        }
    }

    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        setParams(queryParams);
    }, [location.search]);

    useEffect(() => {
        setLoading(true);
        queryProducts();
    }, [params]);

    return (
        <main className="ItemListContainer">
            <div className="Title-itemListContainer mt-2">
                {params.category === undefined ? (
                    <h1>Estos son todos nuestros productos</h1>
                ) : (
                    <h1>
                        Viendo la categoría <b>{params.category}</b>
                    </h1>
                )}
            </div>
            <div className="Body-itemListContainer container-fluid mx-1">
                {isLoading && (
                    <Row xs={1} sm={2} lg={3} xl={4} xxl={5}>
                        <ItemPlaceholder />
                        <ItemPlaceholder />
                        <ItemPlaceholder />
                        <ItemPlaceholder />
                        <ItemPlaceholder />
                    </Row>
                )}
                {!isLoading &&
                    (prods?.length === 0 ? (
                        <p className="text-center">Por el momento no tenemos productos en esta categoria 😔</p>
                    ) : (
                        <ItemList products={prods} />
                    ))}
            </div>
        </main>
    );
};

export default ItemListContainer;
