import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

/*export const insertMovie = payload => api.post(`/movie`, payload)
export const getMovieById = id => api.get(`/movie/${id}`)*/
export const insertBi = payload => api.post(`/bisec`, payload)
export const getBisection =id => api.get(`/bisec/${id}`)
export const insertDiff = payload => api.post(`/diff`, payload)
export const getDiff =id => api.get(`/diff/${id}`)
export const insertIntre = payload => api.post(`/intre`, payload)
export const getIntre =id => api.get(`/intre/${id}`)

const apis = {
    /*insertMovie,
    getMovieById,*/
    insertBi,
    getBisection,
    insertDiff,
    getDiff,
    insertIntre,
    getIntre,
}

export default apis