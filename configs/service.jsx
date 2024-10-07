const { default: axios } = require("axios")

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

const getVideos = async (searchTerm) => {
    const params = {
        part: 'snippet',
        q: searchTerm,
        typeof: 'video',
        maxResults: 2,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }

    const resp = await axios.get(YOUTUBE_BASE_URL, { params })

    return resp.data.items
}

export default{
    getVideos
}