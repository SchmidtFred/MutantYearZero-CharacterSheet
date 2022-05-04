import { getToken } from "./authManager";
const baseUrl = "/api/character";

export const getAllCharactersFromCurrentUser = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/MyCharacters`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unkown error occurred while trying to get characters.");
            }
        });
    });
};

export const getCharacterById = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred whiled trying to get character.");
            }
        })
    })
}