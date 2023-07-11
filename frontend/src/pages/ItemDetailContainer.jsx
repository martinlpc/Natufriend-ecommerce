import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../queries/Product';
import ItemDetail from '../components/Item/ItemDetail';
import { Tadpole } from 'react-svg-spinners';

const ItemDetailContainer = () => {
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();
    const [prod, setProd] = useState();
    const fetchProduct = async (id) => {
        try {
            const response = await getProductById(id);
            console.log(response);
            if (response) {
                setLoading(false);
                setProd(response);
                return;
            }
            setProd('');
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchProduct(id);
    }, [id]);

    return (
        <main className="ItemDetailContainer container-fluid">
            {isLoading && <Tadpole color="#808080" width="100" height="100" />}
            {!isLoading &&
                (!prod ? (
                    <div className="row">
                        <h1 className="col-12">No se encontró el producto solicitado 🔍🤨</h1>
                        <Link className="col-12" to={'/'}>
                            Volver al home
                        </Link>
                    </div>
                ) : (
                    <ItemDetail item={prod} />
                ))}
        </main>
    );
};

export default ItemDetailContainer;
