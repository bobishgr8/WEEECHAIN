// Script for index.html
if (document.getElementById('currentLocation')) {
    // Fetch current location using the browser's Geolocation API
    navigator.geolocation.getCurrentPosition(position => {
        const location = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
        document.getElementById('currentLocation').textContent = location;
    }, error => {
        document.getElementById('currentLocation').textContent = 'Unable to retrieve location.';
    });
}

// Script for points.html
document.addEventListener('DOMContentLoaded', () => {
    // Initialize points from local storage or other data source
    const tripPoints = localStorage.getItem('tripPoints') || 0;
    const cumulativePoints = localStorage.getItem('cumulativePoints') || 0;
    
    document.getElementById('tripPoints').textContent = tripPoints;
    document.getElementById('cumulativePoints').textContent = cumulativePoints;
});

// Script for scanner.html
function startScanner() {
    const video = document.getElementById('video');
    const constraints = {
        video: {
            facingMode: 'environment'
        }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(error => console.error('Error accessing camera:', error));
    
    // Simulate QR code scan after 5 seconds
    setTimeout(() => {
        handleQRCodeScan();
    }, 5000); // Simulated scan time
}

function handleQRCodeScan() {
    // In a real implementation, decode the QR code here
    alert('QR Code scanned successfully! +50 points');
    let tripPoints = Number(localStorage.getItem('tripPoints') || 0) + 50;
    localStorage.setItem('tripPoints', tripPoints);
    document.getElementById('tripPoints').textContent = tripPoints;
}

// Initialize scanner
if (document.getElementById('video')) {
    startScanner();
}

// Script for wallet.html
document.getElementById('convertPoints').addEventListener('click', () => {
    const conversionRate = 0.01; // Example conversion rate
    let cumulativePoints = Number(localStorage.getItem('cumulativePoints') || 0);
    const cryptoValue = cumulativePoints * conversionRate;
    document.getElementById('cryptoMessage').textContent = `Converted to crypto value: ${cryptoValue.toFixed(2)}`;
    localStorage.setItem('cumulativePoints', 0); // Reset points after conversion
    document.getElementById('cumulativePoints').textContent = 0;
});