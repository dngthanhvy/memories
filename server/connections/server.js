import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

import postRoutes from '../routes/posts.js';
app.use('/posts', postRoutes);

const connect = (PORT) => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}.`)
    });
}

export default {
    connect
}