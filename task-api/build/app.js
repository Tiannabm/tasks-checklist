"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const models_1 = require("./models");
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const app = (0, express_1.default)();
const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:8100', 'http://localhost:3000'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
// TODO: Add routing middleware here
app.use('/api/tasks', taskRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
});
models_1.db.sync({ alter: true }).then(() => {
    console.info("Connected to the database!");
});
app.listen(3000);
