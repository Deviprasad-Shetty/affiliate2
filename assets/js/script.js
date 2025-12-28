// Function to generate a unique transaction ID
function generateTransactionId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp.substring(0, 5)}-${randomPart}`.toUpperCase();
}

// Function to display order details
function displayOrderDetails() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('orderDate').textContent = now.toLocaleDateString('en-US', options);

    const transactionId = generateTransactionId();
    document.getElementById('orderNumber').textContent = transactionId;

    return transactionId;
}

// Function to push data to GTM
function pushToGTM(transactionId) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'purchase',
        'ecommerce': {
            'transaction_id': '12345',
            'affiliation': 'LuxeCarry Online Store',
            'value': 149.99,
            'tax': 0.00,
            'shipping': 0.00,
            'currency': 'USD',
            'items': JSON.stringify([
                {
                    'item_id': 'prod001',
                    'item_name': 'Designer Leather Handbag',
                    'item_category': 'Handbags',
                    'price': 99.99,
                    'quantity': 1
                }
            ])
        }
    });
}

// Initialize thank you page
function initThankYouPage() {
    if (document.getElementById('orderNumber')) {
        const transactionId = displayOrderDetails();
        pushToGTM(transactionId);
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initThankYouPage);
