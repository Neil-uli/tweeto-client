import {API_HOST} from "../utils/constant"
import { getTokenApi } from "./auth"

export function checkFollowApi(idUser) {
    const url = `${API_HOST}/consult-relation?id=${idUser}`
    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {return err})
}

export function followUserApi(idUser) {
    const url = `${API_HOST}/up-relation?id=${idUser}`
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {return err})
}

export function unFollowUserApi(idUser) {
    const url = `${API_HOST}/down-relation?id=${idUser}`
    const params = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {return err})
}

export function getFollowsApi(paramsUrl) {
    const url = `${API_HOST}/list-users?${paramsUrl}`

    const params = {
        headers: {
        Authorization: `Bearer ${getTokenApi()}`,
    }
}
return fetch(url, params).then(response => {
    return response
}).then(result => {
    return result;
}).catch((err) => {
    return err
})
}