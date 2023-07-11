const SESSION_API = 'http://localhost:8080/api/session'
const HEADERS = { 'Content-Type': 'application/json' }

export const getCurrentSession = async () => {
  try {
    const response = await fetch(`${SESSION_API}/current`, {
      method: 'GET',
      credentials: 'include',
      headers: HEADERS
    })
    if (response.ok) {
      return await response.json() // JSON with user info
    }
    if (response.status === 401) {
      return null
    }

    return undefined

  } catch (error) {
    throw new Error(error)
  }
}

export const login = async (email, password) => {
  try {
    const response = await fetch(`${SESSION_API}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: HEADERS,
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      return await response.json()
    }
    console.log('Error on login - wrong data?');
    return false
  } catch (error) {
    throw new Error(error)
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`${SESSION_API}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: HEADERS
    })
    if (response.ok) {
      /* example:
      {status: 'success', message: '$first_name logged out'}
      */
      return true
    }

    //401 = no session found or 500
    return false

  } catch (error) {
    throw new Error(error)
  }
}

export const sendRecoveryEmail = async (options) => {
  try {
    const response = await fetch(`${SESSION_API}/password/createlink`, options)
  } catch (error) {

  }
}

export const resetPassword = async () => {
  try {
    const response = await fetch(`${SESSION_API}/password/reset`) //PUT
  } catch (error) {

  }
}