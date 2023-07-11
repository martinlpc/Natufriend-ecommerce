import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ prod }) => {
    const renderItemFooter = () => {
        let footerText;
        switch (true) {
            case prod.stock === 0:
                footerText = 'Producto sin stock';
                break;
            case prod.stock === 1:
                footerText = '¡Última unidad disponible!';
                break;
            case prod.stock <= 10:
                footerText = '¡Quedan pocas unidades!';
                break;
            default:
                return;
        }
        return <Card.Footer as="small">{footerText}</Card.Footer>;
    };

    return (
        <>
            {prod.status && (
                <article className="col-md-5 col-lg-3 mt-5" id={prod.code}>
                    <Card className="text-center  card-obj">
                        <Card.Img className="card-img" variant="top" src={prod.thumbnails[0]} alt={prod.title} />
                        <Card.Body>
                            <Card.Title>{prod.title}</Card.Title>
                            <Card.Subtitle style={{ paddingBottom: 10 }}>
                                <span>$ {prod.price}</span>
                            </Card.Subtitle>
                            <Link to={'/item/' + prod._id}>
                                <Button variant="outline-primary">Ver producto</Button>
                            </Link>
                        </Card.Body>
                        {renderItemFooter()}
                    </Card>
                </article>
            )}
        </>
    );
};

export default Item;
