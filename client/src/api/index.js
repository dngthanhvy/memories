import axios from 'axios';

const url = "http://localhost:4001/posts";

export const fetchPosts = () => axios.get(url);