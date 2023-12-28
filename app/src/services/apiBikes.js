import API_URL from "./api.config";

export async function getBikes() {
  const query = `${API_URL}/bikes`;
  try {
    const res = await fetch(query, { method: "GET", credentials: "include" });

    if (!res.ok) {
      throw new Error(`ERROR: ${data.message}`);
    }

    const data = await res.json();
    if (data.status !== "success") {
      throw new Error(`ERROR: ${data.message}`);
    }

    return data?.data;
  } catch (error) {
    throw new Error(`Error while connecting to server. Try again later.`);
  }
}

export async function getBike(id) {
  const query = `${API_URL}/bikes/${id}`;
  try {
    const res = await fetch(query, { method: "GET", credentials: "include" });
    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(`ERROR: ${data.message}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Error while connecting to server. Try again later.`);
    // Handle or throw error as needed
  }
}

export async function getBikesStats() {
  try {
    const res = await fetch(`${API_URL}/bikes/stats`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(`ERROR: ${data.message}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Error while connecting to server. Try again later.`);
  }
}

export async function createBike(data) {
  try {
    const query = `${API_URL}/bikes`;
    const res = await fetch(query, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (resData.status !== "success") {
      console.log(resData);
      throw new Error(`ERROR: ${resData.message}`);
    }

    return resData.doc;
  } catch (error) {
    throw new Error(`Error while connecting to server. Try again later.`);
  }
}

export async function updateBike(data, id) {
  try {
    const query = `${API_URL}/bikes/${id}`;
    const res = await fetch(query, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (resData.status !== "success") {
      throw new Error(`ERROR: ${resData.message}`);
    }

    return resData.data;
  } catch (error) {
    throw new Error(`Error while connecting to server. Try again later.`);
  }
}

export async function deleteBike(id) {
  const query = `${API_URL}/bikes/${id}`;
  const res = await fetch(query, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`ERROR: ${res.statusText}`);
  }

  return null;
}
