import axios from "axios"
import { authSliceAction } from "../store/auth-slice";
import config from "../config"

const URL = config.api.url //ip of ...

//API of auth
export const login =  async(user, dispatch) => {
    try {
        const res = await axios.post(`${URL}/auth/login`, user)
        dispatch(authSliceAction.login(res.data.token))
        return res.data
    } catch(err) {
        throw new Error(err || 'Could not login.')
    }
}

export const signup = async(user) => {
    try {
        const res = await axios.post(`${URL}/auth/signup`, user)
        return res.data
    }
    catch(err) {
        throw new Error(err || 'Could not create user.')
    }
} 


//API of feed
export async function getPosts(page, token) {
    try {
        const res = await axios.get(`${URL}/feed/posts?page=${page}`, {headers: {Authorization: 'Bearer ' + token}})
        return res.data
    } catch(err) {
        throw new Error(err || 'Could not get pots')
    }
}

export const getPost = async(postId, token) => {
    try {
        const res = await axios.get(`${URL}/feed/posts/${postId}`, {headers: {Authorization: 'Bearer ' + token}})
        console.log(res.data)
        return res.data
    } catch(err) {
        throw new Error(err || 'Could not get post')
    }
}

export const createPost = async(postData, token) => {
    const formData = new FormData();
    formData.append('title', postData.title)
    formData.append('content', postData.content)
    formData.append('image', postData.image)
    try {
        const res = await axios.post(`${URL}/feed/post`, formData, {headers: {Authorization: 'Bearer ' + token}})
        return res.data
    } catch(err) {
        throw new Error(err || 'Could not create post')
    } 
}

export const eidtPost = async(postData, token) => {
    const formData = new FormData();
    formData.append('title', postData.title)
    formData.append('content', postData.content)
    formData.append('image', postData.image)
    try {
        const res = await axios.put(`${URL}/feed/posts/${postData.id}`, formData, {headers: {Authorization: 'Bearer ' + token}})
        return res.data
    } catch(err) {
        throw new Error(err || 'Could not edit post')
    } 
}

export const deletePost = async(postId, token) => {
    try {
        const res = await axios.delete(`${URL}/feed/posts/${postId}`, {headers: {Authorization: 'Bearer ' + token}})
        return res.data

    } catch(err) {
        throw new Error(err || 'Could not delete post')
    } 
}