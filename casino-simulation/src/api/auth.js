const API_URL = "http://localhost:5000/api/auth/";

//Login

export async function login(email, password) {
  try {
   const response = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Server Error" };
  }
}


//Register
export async function register(username, email, password) {
  try {
    const response = await fetch(`${API_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    return { message: "Server Error" };
  }
}