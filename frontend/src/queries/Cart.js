const CART_API = 'http://localhost:8080/api/carts'
const HEADERS = { 'Content-Type': 'application/json' }

/** 
 * @description Uses the current session user id to retrieve the assigned cart 
 * @returns JSON with the populated cart content
 * */
export async function getCart() {
  try {
    const cart = await fetch(`${CART_API}`, {
      method: 'GET',
      credentials: 'include',
      headers: HEADERS
    })
    if (cart.ok) {
      return cart.json()
    }
    return null
  } catch (error) {
    throw new Error(error)
  }
}

export async function clearCart() {
  try {
    const cart = await fetch(`${CART_API}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: HEADERS
    })
    if (cart.ok) {
      return true
    }
    return false
  } catch (error) {
    throw new Error(error)
  }
}

/** 
 * @description Request to carts API endpoint to add a product to the current session cart.
 * If the product already exists, its quantity is increased by 1 unit.
 * The cart is obtained from the current session.
@param productID Product's ID to be modified
@returns true: product added or quantity increased by 1
@returns null: error 
*/
export async function addSingleProductToCart(productID) {
  try {
    const cart = await fetch(`${CART_API}/product/${productID}`, {
      method: 'POST',
      credentials: 'include',
      headers: HEADERS
    })

    if (cart.status === 201) {
      return true
    }
    return null
  } catch (error) {
    throw new Error(error)
  }
}

/** 
 * @description Overwrites the data stored in the session cart
 * @param newCartContent Object: {productId, quantity}, 
 * or
 * Array: [{productId,quantity},{productId,quantity}]
@returns Updated cart
@returns false
*/
export async function overwriteCart(newCartContent) {
  try {
    const cart = await fetch(CART_API, {
      method: 'PUT',
      credentials: 'include',
      headers: HEADERS,
      body: JSON.stringify(newCartContent)
    })
    if (cart.status === 201) {
      return cart.payload
    }
    return null
  } catch (error) {

  }
}

/** 
 * @description Request to carts API endpoint to change a product's quantity
@param productID Product's ID to be modified
@param newQty New quantity of the selected product
*/
export async function changeProductQuantity(productID, newQty) {
  try {
    const cart = await fetch(`${CART_API}/product/${productID}`, {
      method: 'POST',
      credentials: 'include',
      headers: HEADERS,
      body: JSON.stringify({ quantity: parseInt(newQty) })
    })
    if (cart.ok) {
      return cart.payload
    }
    return null
  } catch (error) {
    throw new Error(error)
  }
}

export async function removeProduct(productID) {
  try {
    const cart = await fetch(`${CART_API}/product/${productID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: HEADERS
    })
    if (cart.ok) {
      return cart.payload
    }
    return null
  } catch (error) {
    throw new Error(error)
  }
}

export async function purchaseCart() {
  try {
    const response = await fetch(`${CART_API}/purchase`, {
      method: 'POST',
      credentials: 'include',
      headers: HEADERS
    })
    if (response.status === 201) {
      return response.invoice
    }
    return null
  } catch (error) {

  }
}