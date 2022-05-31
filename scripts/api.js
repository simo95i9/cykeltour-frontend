import {SERVER_URL} from "./config.js";

export const teams = {
    getAll: async (pageNumber = 0, pageSize = 20) => {
        const response = await fetch(`${SERVER_URL}/teams?size=${pageSize}&page=${pageNumber}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    getById: async (id) => {
        const response = await fetch(`${SERVER_URL}/teams/${id}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    create: async (teamRequest) => {
        const response = await fetch(
            `${SERVER_URL}/teams`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teamRequest)
            }
        )

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    }
}

export const riders = {
    getAll: async (pageNumber = 0, pageSize = 20) => {
        const response = await fetch(`${SERVER_URL}/riders?size=${pageSize}&page=${pageNumber}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    getById: async (id) => {
        const response = await fetch(`${SERVER_URL}/riders/${id}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    // create: async (teamRequest) => {
    //     const response = await fetch(
    //         `${SERVER_URL}/teams`,
    //         {
    //             method: "post",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(teamRequest)
    //         }
    //     )
    //
    //     if (!response.ok)
    //         throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)
    //
    //     return await response.json()
    // }
}


export const stages = {
    getAll: async (pageNumber = 0, pageSize = 20) => {
        const response = await fetch(`${SERVER_URL}/stages?size=${pageSize}&page=${pageNumber}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    getById: async (id) => {
        const response = await fetch(`${SERVER_URL}/stages/${id}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    }
}

export const results = {
    getAll: async (pageNumber = 0, pageSize = 20) => {
        const response = await fetch(`${SERVER_URL}/results?size=${pageSize}&page=${pageNumber}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    getById: async (id) => {
        const response = await fetch(`${SERVER_URL}/results/${id}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    getByStageId: async (id) => {
        const response = await fetch(`${SERVER_URL}/results?stageId=${id}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    },

    getByRiderId: async (id) => {
        const response = await fetch(`${SERVER_URL}/results?riderId=${id}`)

        if (!response.ok)
            throw new Error(`Could not fetch ${response.url} with HTTP status ${response.status}`)

        return await response.json()
    }
}