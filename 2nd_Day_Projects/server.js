const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Importing Controllers
const NotesController = require('./controllers/NotesController');
const LoadBalancerController = require('./controllers/LoadBalancerController');

// Create two Notes servers
const server_1 = new NotesController('user1');
const server_2 = new NotesController('user2');

// Initialize Load Balancer
const loadBalancer = new LoadBalancerController();
loadBalancer.servers.push(server_1);
loadBalancer.servers.push(server_2);

// Home Route
app.get('/', (req, res) => {
    res.send('🎯 Welcome to Load-Balanced Notes API');
});

// ✅ Route: Add Note
app.post('/add-note', (req, res) => {
    const { user, note } = req.body;

    if (!user || !note) {
        return res.status(400).json({ error: "User and note are required" });
    }

    const server = loadBalancer.routeServer();
    server.user = user; // Assign user to the server
    const result = server.addNote(note);

    res.json({
        handledBy: server.constructor.name,
        serverUser: server.user,
        message: result
    });
});

// ✅ Route: View Notes
app.get('/get-notes/:user', (req, res) => {
    const { user } = req.params;

    let notes = "No notes found.";
    let servedBy = "";

    for (const server of loadBalancer.servers) {
        server.user = user;
        const result = server.getNotes();
        if (Array.isArray(result) && result.length > 0) {
            notes = result;
            servedBy = server.constructor.name;
            break;
        }
    }

    res.json({
        servedBy,
        user,
        notes
    });
});

// ✅ Route: Delete Note
app.delete('/delete-note', (req, res) => {
    const { user, noteIndex } = req.body;

    let deleted = false;
    let servedBy = "";
    let message = "Note not found.";

    for (const server of loadBalancer.servers) {
        server.user = user;
        const result = server.deleteNotes(noteIndex);
        if (!result.includes("Invalid")) {
            deleted = true;
            servedBy = server.constructor.name;
            message = result;
            break;
        }
    }

    res.json({
        deleted,
        servedBy,
        message
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
