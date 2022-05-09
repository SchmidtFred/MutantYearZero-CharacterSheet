import { getToken } from "./authManager";
const baseUrl = "/api/talent";

export const getAllBasicTalents = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/BasicTalents`, {
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
                throw new Error("An unkown error occurred while trying to get talents.");
            }
        });
    });
};

export const getAllTalentsByRole = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/RoleTalents/${id}`, {
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
                throw new Error("An unkown error occurred while trying to get role talents.");
            }
        });
    });
};