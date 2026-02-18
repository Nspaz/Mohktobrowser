// Mokh types that can be collected
const mokhTypes = ['🍪', '🥠', '🍩', '🧁', '🍰', '🎂', '🥧', '🍫', '🍬', '🍭'];

// State management
let mokhCount = 0;
let mokhCollection = [];
let currentMokhIndex = 0;

// DOM elements
const currentMokhEl = document.getElementById('currentMokh');
const mokhCountEl = document.getElementById('mokhCount');
const takeMokhBtn = document.getElementById('takeMokhBtn');
const browseMokhsBtn = document.getElementById('browseMokhsBtn');
const mokhCollectionEl = document.getElementById('mokhCollection');
const collectionGridEl = document.getElementById('collectionGrid');

// Load saved state from localStorage
function loadState() {
    const savedCount = localStorage.getItem('mokhCount');
    const savedCollection = localStorage.getItem('mokhCollection');
    
    if (savedCount) {
        mokhCount = parseInt(savedCount, 10);
        mokhCountEl.textContent = mokhCount;
    }
    
    if (savedCollection) {
        mokhCollection = JSON.parse(savedCollection);
        updateCollectionDisplay();
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('mokhCount', mokhCount);
    localStorage.setItem('mokhCollection', JSON.stringify(mokhCollection));
}

// Show next mokh
function showNextMokh() {
    currentMokhIndex = (currentMokhIndex + 1) % mokhTypes.length;
    currentMokhEl.textContent = mokhTypes[currentMokhIndex];
}

// Take a mokh
function takeMokh() {
    const mokh = currentMokhEl.textContent;
    
    // Add animation
    currentMokhEl.classList.add('taken');
    
    // Update state
    mokhCount++;
    mokhCollection.push(mokh);
    
    // Update display
    mokhCountEl.textContent = mokhCount;
    
    // Save state
    saveState();
    
    // Update collection if visible
    if (!mokhCollectionEl.classList.contains('hidden')) {
        updateCollectionDisplay();
    }
    
    // Reset animation and show new mokh
    setTimeout(() => {
        currentMokhEl.classList.remove('taken');
        showNextMokh();
    }, 500);
}

// Toggle mokh collection display
function toggleCollection() {
    mokhCollectionEl.classList.toggle('hidden');
    
    if (!mokhCollectionEl.classList.contains('hidden')) {
        updateCollectionDisplay();
        browseMokhsBtn.textContent = 'Hide Collection';
    } else {
        browseMokhsBtn.textContent = 'Browse Mokhs';
    }
}

// Update collection display
function updateCollectionDisplay() {
    collectionGridEl.innerHTML = '';
    
    if (mokhCollection.length === 0) {
        collectionGridEl.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No mokhs yet. Take some mokhs to start your collection!</p>';
        return;
    }
    
    mokhCollection.forEach((mokh, index) => {
        const mokhEl = document.createElement('div');
        mokhEl.className = 'collection-item';
        mokhEl.textContent = mokh;
        mokhEl.title = `Mokh #${index + 1}`;
        collectionGridEl.appendChild(mokhEl);
    });
}

// Event listeners
takeMokhBtn.addEventListener('click', takeMokh);
browseMokhsBtn.addEventListener('click', toggleCollection);
currentMokhEl.addEventListener('click', takeMokh);

// Initialize
loadState();
showNextMokh();
