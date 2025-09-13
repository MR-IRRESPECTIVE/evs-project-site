// --- Mobile Menu ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
const mobileMenuLinks = mobileMenu.querySelectorAll('a, button');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Modal Handling ---
const mapModal = document.getElementById('map-modal');
const calculatorModal = document.getElementById('calculator-modal');

const openMapBtn = document.getElementById('open-map-btn');
const mobileOpenMapBtn = document.getElementById('mobile-open-map-btn');
const closeMapBtn = document.getElementById('close-map-btn');

const openCalculatorBtn = document.getElementById('open-calculator-btn');
const mobileOpenCalculatorBtn = document.getElementById('mobile-open-calculator-btn');
const closeCalculatorBtn = document.getElementById('close-calculator-btn');

openMapBtn.addEventListener('click', () => mapModal.classList.remove('hidden'));
mobileOpenMapBtn.addEventListener('click', () => mapModal.classList.remove('hidden'));
closeMapBtn.addEventListener('click', () => mapModal.classList.add('hidden'));

openCalculatorBtn.addEventListener('click', () => calculatorModal.classList.remove('hidden'));
mobileOpenCalculatorBtn.addEventListener('click', () => calculatorModal.classList.remove('hidden'));
closeCalculatorBtn.addEventListener('click', () => calculatorModal.classList.add('hidden'));

// Close modal if clicking on the background overlay
window.addEventListener('click', (event) => {
    if (event.target == mapModal) {
        mapModal.classList.add('hidden');
    }
    if (event.target == calculatorModal) {
        calculatorModal.classList.add('hidden');
    }
});


// --- Pollution Footprint Calculator ---
const calculateBtn = document.getElementById('calculate-btn');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultScore = document.getElementById('result-score');
const resultTips = document.getElementById('result-tips');
const calculatorError = document.getElementById('calculator-error');

calculateBtn.addEventListener('click', () => {
    const travelAnswer = document.querySelector('input[name="travel"]:checked');
    const acAnswer = document.querySelector('input[name="ac"]:checked');
    const plasticAnswer = document.querySelector('input[name="plastic"]:checked');

    if (!travelAnswer || !acAnswer || !plasticAnswer) {
        calculatorError.classList.remove('hidden');
        return;
    }
    calculatorError.classList.add('hidden');

    let totalScore = 0;
    totalScore += parseInt(travelAnswer.dataset.score);
    totalScore += parseInt(acAnswer.dataset.score);
    totalScore += parseInt(plasticAnswer.dataset.score);
    
    let resultCategory = '';
    let resultColorClass = '';
    let personalizedTips = `
        <p class="font-bold text-lg mb-2">Here are your personalized tips:</p>
        <div class="border-l-4 p-4 rounded-r-lg bg-gray-50">
            <p><strong class="text-gray-700">For your travel habits:</strong> ${travelAnswer.dataset.tip}</p>
        </div>
        <div class="border-l-4 p-4 rounded-r-lg bg-gray-50">
            <p><strong class="text-gray-700">For your AC usage:</strong> ${acAnswer.dataset.tip}</p>
        </div>
        <div class="border-l-4 p-4 rounded-r-lg bg-gray-50">
            <p><strong class="text-gray-700">For your packaging choices:</strong> ${plasticAnswer.dataset.tip}</p>
        </div>
    `;


    if (totalScore <= 10) {
        resultCategory = 'Low Footprint';
        resultColorClass = 'bg-green-100 border-green-500';
    } else if (totalScore <= 20) {
        resultCategory = 'Medium Footprint';
        resultColorClass = 'bg-yellow-100 border-yellow-500';
    } else {
        resultCategory = 'High Footprint';
        resultColorClass = 'bg-red-100 border-red-500';
    }
    
    resultContainer.className = 'mt-8 p-6 rounded-lg text-center border-t-4 ' + resultColorClass;
    resultTitle.textContent = 'Your Result: ' + resultCategory;
    resultScore.textContent = `Your total score is ${totalScore}. The lower the score, the better!`;
    resultTips.innerHTML = personalizedTips;
    resultContainer.classList.remove('hidden');

    // Scroll to the result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
});
