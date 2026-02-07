const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// MIDDLEWARE: This allows the server to read the "JSON boxes" sent by React
app.use(express.json());

// ROUTE 1: GET all signatures (Retrieve)
app.get('/api/signatures', async (req, res) => {
    // Mechanism: Prisma translates this to: SELECT * FROM GuestbookEntry;
    const entries = await prisma.guestbookEntry.findMany({
        orderBy: { createdAt: 'desc' } // Newest messages first
    });
    res.json(entries);
});

// ROUTE 2: POST a new signature (Create)
app.post('/api/sign', async (req, res) => {
    const { name, message } = req.body; // Unpack the JSON

    // Mechanism: Prisma translates this to: INSERT INTO GuestbookEntry...
    const newEntry = await prisma.guestbookEntry.create({
        data: { name, message }
    });

    res.json(newEntry); // Send back the saved entry as confirmation
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend is listening on http://localhost:${PORT}`);
});