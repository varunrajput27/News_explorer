import { BASE_URL } from "./constants";

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error just occurred: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._processResponse);
  }


getCurrentUser(token) {
  return this._request("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


  getArticles(token) {
    return this._request(`${this.baseUrl}/articles`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  saveArticle(data, keyword, token) {
  const {
    title,
    description,
    text,
    publishedAt,
    date,
    source,
    url,
    link,
    urlToImage,
    image,
  } = data;

  const payload = {
    keyword: keyword || "General",
    title: title || "No Title",
    description: description || text || "No Description",
    publishedAt: publishedAt || date || new Date().toISOString(),
    source: typeof source === "object" ? source.name : source || "Unknown",
    url: url || link || `https://fallback.com/${Date.now()}`, // REQUIRED
    urlToImage: urlToImage || image || "https://via.placeholder.com/150",
  };

  return this._request(`${this.baseUrl}/articles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}






  removeArticle(id, token) {
    return this._request(`${this.baseUrl}/articles/${id}`, { // ✅ fixed here
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

const mainApi = new Api({ baseUrl: BASE_URL });

export default mainApi;
