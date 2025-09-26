document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // --- User Greeting ---
    const userGreeting = document.getElementById('user-greeting');
    if (tg.initDataUnsafe?.user?.first_name) {
        userGreeting.innerText = `Hi, ${tg.initDataUnsafe.user.first_name}!`;
    }

    const fruitGrid = document.getElementById('fruit-grid');
    let cart = {}; // { fruitId: quantity }

    // --- Fetch and Display Fruits ---
    fetch('/api/fruits')
        .then(response => response.json())
        .then(fruits => {
            fruits.forEach(fruit => {
                const card = document.createElement('div');
                card.className = 'fruit-card';
                card.innerHTML = `
                    <div class="fruit-emoji">${fruit.emoji}</div>
                    <div class="fruit-name">${fruit.name}</div>
                    <div class="fruit-price">\$${fruit.price.toFixed(2)}</div>
                    <button class="add-btn" data-fruit-id="${fruit.id}">Add to Cart</button>
                `;
                fruitGrid.appendChild(card);
            });
        });

    // --- Cart Logic ---
    fruitGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-btn')) {
            const fruitId = event.target.dataset.fruitId;
            cart[fruitId] = (cart[fruitId] || 0) + 1;
            updateMainButton();
            tg.HapticFeedback.impactOccurred('light');
        }
    });

    // --- Telegram Main Button Logic ---
    function updateMainButton() {
        const itemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
        
        if (itemCount > 0) {
            tg.MainButton.setText(`🛒 View Cart (${itemCount})`);
            if (!tg.MainButton.isVisible) {
                tg.MainButton.show();
            }
        } else {
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            }
        }
    }
    
    tg.MainButton.onClick(() => {
        if (Object.keys(cart).length > 0) {
            // In a real app, you would navigate to a checkout page.
            // For now, we'll just show an alert with the cart contents.
            let orderSummary = "Your Order:\n";
            for (const [fruitId, quantity] of Object.entries(cart)) {
                orderSummary += `- Fruit ID ${fruitId}: ${quantity}x\n`;
            }
            tg.showAlert(orderSummary);
            
            // Here you would send the 'cart' and 'tg.initData' to your backend
            // for secure processing and payment invoice generation.
        }
    });
});
