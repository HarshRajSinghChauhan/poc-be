const express = require('express');
const { dbConnect, client } = require('./config/db')
const auth = require('./middlewares/auth.middleware')
const userRoutes = require('./modules/users/user.routes');
const notesRoutes = require('./modules/notes/notes.routes');
const cors = require('cors');  
const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
const startServer = async () => {
    await dbConnect();

    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    });

    app.use("/api/user", userRoutes);
    app.use("/api/notes", notesRoutes);
}

startServer();