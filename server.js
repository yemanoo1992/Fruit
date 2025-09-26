const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Our delicious fruit data
const fruits = [
    { id: 'f1', name: 'Apple', price: 0.50, emoji: '🍎' },
    { id: 'f2', name: 'Banana', price: 0.30, emoji: '🍌' },
    { id: 'f3', name: 'Orange', price: 0.60, emoji: '🍊' },
    { id: 'f4', name: 'Grapes', price: 2.50, emoji: '🍇' },
    { id: 'f5', name: 'Strawberry', price: 3.00, emoji: '🍓' },
    { id: 'f6', name: 'Watermelon', price: 4.00, emoji: '🍉' },
];

// API endpoint to get the list of fruits
app.get('/api/fruits', (req, res) => {
    res.json(fruits);
});

// A placeholder for handling the checkout process
// In a real app, this endpoint would receive the cart data and user initData,
// validate it, and generate a payment link.
app.post('/api/checkout', (req, res) => {
    // SECURITY: Here you MUST validate the initData from the request body
    // to ensure the request is authentic.
    console.log('Checkout request received:', req.body);
    res.json({ success: true, message: 'Order placed!' });
});

// Serve the static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to serving index.html for any other request (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🍓 Fruit Shop server running on http://localhost:${PORT}`);
});
