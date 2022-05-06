import { getToken } from "./authManager";
const baseUrl = "/api/skill";

export const getAllBasicSkills = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/Basic`, {
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
                throw new Error("An unkown error occurred while trying to get skills.");
            }
        });
    });
};