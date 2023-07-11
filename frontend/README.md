# NatuFriend - Tienda natural de mascotas

## Proyecto final para la materia ReactJS de [CoderHouse](https://www.coderhouse.com), comisión #43620

### Alumno: Martín Pacheco

## Dependencias utilizadas:

-   [react-bootstrap](https://react-bootstrap.github.io/)
    `npm install react-bootstrap bootstrap`
-   [Firebase](https://firebase.google.com/)
    `npm install firebase`
-   [FontAwesome](https://fontawesome.com/v5/docs/web/use-with/react)
    `npm i --save @fortawesome/fontawesome-svg-core`
    `npm install --save @fortawesome/free-solid-svg-icons`
    `npm install --save @fortawesome/react-fontawesome`
-   [react-svg-spinners](https://github.com/dephraiim/react-svg-spinners) por [Dephraiim](https://github.com/dephraiim) para implementación de "Tadpole" spinner mientras se espera respuesta de funciones async
    `npm install react-svg-spinners`
-   [react-router-dom](https://reactrouter.com/en/main)
    `npm install react-router-dom`

## Brief

1.  El usuario ingresa al home, donde ve la lista de productos disponibles para la compra.
2.  Puede navegar entre las categorías o ingresar directamente a cada item para ver sus detalles y seleccionar cuantas unidades quiere sumar al carrito.
3.  Una vez que seleccionó llenó su carrito con los productos deseados, desde el widget se accede a la página de checkout. En ella, aún puede eliminar productos si lo desea, vaciar el carrito completamente o generar la orden de compra.
4.  Para generar la orden de compra, deberá completar los campos de texto solicitados. El teléfono deberá ser un número de hasta 10 dígitos que no puede comenzar con "0". Los campos de email deberán ser idénticos para poder continuar.
5.  Cuando todos los campos son completados correctamente, el usuario recibe en pantalla el feedback con la ID del orden de compra autogenerada que se guardó en la DB de Firestore.

## Aclaraciones

-   No se actualiza el stock de Firestore con cada compra.
-   No existe, por el momento, una página de seguimiento de orden.
-   El sistema no permite ingresar mas unidades de un producto que las que se encuentran en stock.
-   Algunos estilos pueden "romperse" en algunas resoluciones intermedias, pero no interfieren con el flow.
-   Si se ingresa un `item/:id` o una `category/:categoryid` inexistente, el sistema lo indicará oportunamente.
