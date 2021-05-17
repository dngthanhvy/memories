import dotenv from 'dotenv';
dotenv.config();

import Database from './connections/database.js';
import Server from './connections/server.js';

const DB_URL = process.env.DB_URL;

Database.connect(DB_URL);
Server.connect(4001);