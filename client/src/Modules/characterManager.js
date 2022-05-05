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
                throw new Error("An unknown error occurred while trying to get character.");
            }
        })
    })
}

export const saveCharacterChanges = (id, character) => {
    return getToken().then(token => {
        fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(character)
        }).then(res => {
            if (res.ok) {
                return res.status;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An uknown error occurred whil trying to get character.");
            }
        })
    })
}

export const getSpecialtiesByRole = (id) => {
    return getToken().then(token => {
        fetch(`${baseUrl}/RoleSpecialties/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res  => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An uknown error occurred while trying to get specialties.");
            }
        })
    })
}