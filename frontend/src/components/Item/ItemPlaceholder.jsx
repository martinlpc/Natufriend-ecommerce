import { Card, Placeholder, Row } from 'react-bootstrap';
import { Tadpole } from 'react-svg-spinners';

const ItemPlaceholder = () => {
    return (
        <article className="col-md-5 col-lg-3 mt-5">
            <Card className="text-center  vw-30">
                <Tadpole className="img" color="#808080" width="100" height="100" />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow"></Placeholder>
                    <Placeholder as={Card.Subtitle} animation="glow"></Placeholder>
                    <Placeholder.Button variant="primary" />
                </Card.Body>
            </Card>
        </article>
    );
};

export default ItemPlaceholder;
