import PostMessage from '../models/PostMessage.js';
import mongoose from 'mongoose';

export const getPosts = async(req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
};

export const createPost = async(req, res) => {
    const bodyPost = req.body;
    const post = new PostMessage({ ...bodyPost, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await post.save();
        res.status(201).json(post);
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
};

export const updatePost = async(req, res) => {

    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id.');
    
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.json(updatedPost);
    } catch (e) {
        console.log(e.message);
    }
};

export const deletePost = async(req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id.');

    try {
        await PostMessage.findByIdAndRemove(id);
        res.json({ message: "Post deleted successfully." });
    } catch (e) {
        console.log(e.message);
    }
};

export const likePost = async(req, res) => {

    if (!req.userId) return res.json({ message: 'Unauthenticated.' });

    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id.');
    
    try {
        const post = await PostMessage.findById(_id);
        const index = post.likes.findIndex(id => id === String(req.userId));
        
        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        res.json(updatedPost);

    } catch (e) {
        console.log(e.message);
    }
};