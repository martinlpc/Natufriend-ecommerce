import { Row } from 'react-bootstrap';
import Item from './Item';
import 'bootstrap';

const ItemList = ({ products }) => {
    // Se mapea el listado de items segun la categoria y se renderiza
    function renderItems() {
        return products?.map((item) => <Item prod={item} key={item.code} />);
    }

    return (
        <Row xs={1} sm={2} lg={3} xl={4} xxl={5}>
            {renderItems()}
        </Row>
    );
};

export default ItemList;
