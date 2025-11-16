export const useFetch = async (url: string, credentials: object | undefined) => {
    url = url.trim()
    credentials = credentials === undefined ? {
        method: "GET",
    } : credentials
     try {
        const res = await fetch(url, credentials)

        if (res.ok) {
            new Error(`HTTP error! status: ${res.status}`)
        }
        const data = res.json()

        return {error: null, data}
     } catch (error) {
        return {error, data: null} 
     }
}