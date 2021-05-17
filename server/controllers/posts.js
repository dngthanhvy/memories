import PostMessage from '../models/PostMessage.js';

export const getPosts = async(req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (e) {
        res.status(404).json({ message: error.message })
    }
};

export const createPost = async(req, res) => {
    const post = new PostMessage(req.body);
    try {
        await post.save();
        res.status(201).json(post);
    } catch (e) {
        res.status(409).json({ message: error.message });
    }
};