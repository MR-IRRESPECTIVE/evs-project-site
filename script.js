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

// --- Main Modal Handling ---
const mapModal = document.getElementById('map-modal');
const calculatorModal = document.getElementById('calculator-modal');
const wasteSorterModal = document.getElementById('waste-sorter-modal'); // New modal

const openMapBtn = document.getElementById('open-map-btn');
const mobileOpenMapBtn = document.getElementById('mobile-open-map-btn');
const closeMapBtn = document.getElementById('close-map-btn');

const openCalculatorBtn = document.getElementById('open-calculator-btn');
const mobileOpenCalculatorBtn = document.getElementById('mobile-open-calculator-btn');
const closeCalculatorBtn = document.getElementById('close-calculator-btn');

const openSorterBtn = document.getElementById('open-sorter-btn'); // New button
const mobileOpenSorterBtn = document.getElementById('mobile-open-sorter-btn'); // New mobile button
const closeSorterBtn = document.getElementById('close-sorter-btn'); // New close button

openMapBtn.addEventListener('click', () => mapModal.classList.remove('hidden'));
mobileOpenMapBtn.addEventListener('click', () => mapModal.classList.remove('hidden'));
closeMapBtn.addEventListener('click', () => mapModal.classList.add('hidden'));

openCalculatorBtn.addEventListener('click', () => calculatorModal.classList.remove('hidden'));
mobileOpenCalculatorBtn.addEventListener('click', () => calculatorModal.classList.remove('hidden'));
closeCalculatorBtn.addEventListener('click', () => calculatorModal.classList.add('hidden'));

openSorterBtn.addEventListener('click', () => wasteSorterModal.classList.remove('hidden'));
mobileOpenSorterBtn.addEventListener('click', () => wasteSorterModal.classList.remove('hidden'));
closeSorterBtn.addEventListener('click', () => wasteSorterModal.classList.add('hidden'));


// --- Filter Detail Modal Handling ---
const preFilterCard = document.getElementById('pre-filter-card');
const charcoalFilterCard = document.getElementById('charcoal-filter-card');
const fineFilterCard = document.getElementById('fine-filter-card');

const preFilterModal = document.getElementById('pre-filter-modal');
const charcoalFilterModal = document.getElementById('charcoal-filter-modal');
const fineFilterModal = document.getElementById('fine-filter-modal');

const closeFilterModalBtns = document.querySelectorAll('.close-filter-modal-btn');

preFilterCard.addEventListener('click', () => preFilterModal.classList.remove('hidden'));
charcoalFilterCard.addEventListener('click', () => charcoalFilterModal.classList.remove('hidden'));
fineFilterCard.addEventListener('click', () => fineFilterModal.classList.remove('hidden'));

closeFilterModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        preFilterModal.classList.add('hidden');
        charcoalFilterModal.classList.add('hidden');
        fineFilterModal.classList.add('hidden');
    });
});

// --- Scaling Up Modal Handling ---
const industrialCard = document.getElementById('industrial-card');
const towersCard = document.getElementById('towers-card');
const hvacCard = document.getElementById('hvac-card');

const industrialModal = document.getElementById('industrial-modal');
const towersModal = document.getElementById('towers-modal');
const hvacModal = document.getElementById('hvac-modal');

const closeScalingModalBtns = document.querySelectorAll('.close-scaling-modal-btn');

industrialCard.addEventListener('click', () => industrialModal.classList.remove('hidden'));
towersCard.addEventListener('click', () => towersModal.classList.remove('hidden'));
hvacCard.addEventListener('click', () => hvacModal.classList.remove('hidden'));

closeScalingModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        industrialModal.classList.add('hidden');
        towersModal.classList.add('hidden');
        hvacModal.classList.add('hidden');
    });
});


// --- General Modal Closing Logic ---
const allModals = [mapModal, calculatorModal, wasteSorterModal, preFilterModal, charcoalFilterModal, fineFilterModal, industrialModal, towersModal, hvacModal];

// Close any modal if clicking on the background overlay
window.addEventListener('click', (event) => {
    allModals.forEach(modal => {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    });
});

// Close any open modal with the "Escape" key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        allModals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
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

    resultContainer.scrollIntoView({ behavior: 'smooth' });
});


// --- AI-POWERED WASTE SORTER ---
const wasteSearchInput = document.getElementById('waste-search-input');
const wasteResultContainer = document.getElementById('waste-result-container');
const quickSearchButtons = document.querySelectorAll('.waste-quick-search');

const API_KEY = ""; // Keep this empty.

const getWasteSortingInfo = async (searchTerm) => {
    // Show loading indicator
    wasteResultContainer.innerHTML = `
        <div class="p-4 rounded-lg border-l-4 bg-gray-100 border-gray-500 text-gray-800">
            <h3 class="font-bold text-lg">AI is thinking...</h3>
            <p class="mt-2">Analyzing "${searchTerm}" based on KMC guidelines.</p>
        </div>
    `;

    const systemPrompt = "You are an expert on waste management and segregation for the Kolkata Municipal Corporation (KMC). Your role is to analyze a waste item provided by a user and give a clear, concise, and structured JSON response about how to dispose of it. Your response MUST follow the provided JSON schema. Classify the item into one of three bins: 'green' for biodegradable, 'blue' for non-biodegradable/recyclable, or 'hazardous' for e-waste, medical waste, or chemicals. Provide a brief, helpful one-sentence instruction for disposal.";

    const payload = {
        contents: [{
            parts: [{ text: `Analyze this waste item: "${searchTerm}"` }]
        }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "bin": { "type": "STRING", "description": "The correct bin: 'green', 'blue', or 'hazardous'." },
                    "type": { "type": "STRING", "description": "The category of waste, e.g., 'Biodegradable Waste'." },
                    "instruction": { "type": "STRING", "description": "A single, clear sentence on how to dispose of the item." }
                },
                required: ["bin", "type", "instruction"]
            }
        }
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            const jsonResponse = JSON.parse(candidate.content.parts[0].text);
            displayAIWasteResult(searchTerm, jsonResponse);
        } else {
            throw new Error("Invalid response structure from AI.");
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        wasteResultContainer.innerHTML = `
            <div class="p-4 rounded-lg border-l-4 bg-red-100 border-red-500 text-red-800">
                <h3 class="font-bold text-lg">Oops! Something went wrong.</h3>
                <p class="mt-2">Could not get a response from the AI. Please try again in a moment.</p>
            </div>
        `;
    }
};

const displayAIWasteResult = (searchTerm, result) => {
    let binColorClass = 'bg-gray-100 border-gray-500 text-gray-800'; // Default
    if (result.bin === 'green') binColorClass = 'bg-green-100 border-green-500 text-green-800';
    else if (result.bin === 'blue') binColorClass = 'bg-blue-100 border-blue-500 text-blue-800';
    else if (result.bin === 'hazardous') binColorClass = 'bg-red-100 border-red-500 text-red-800';

    wasteResultContainer.innerHTML = `
        <div class="p-4 rounded-lg border-l-4 ${binColorClass}">
            <h3 class="font-bold text-lg">${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)}</h3>
            <p class="font-semibold mt-1">${result.type}</p>
            <p class="mt-2">${result.instruction}</p>
        </div>
    `;
};

const handleSearch = (term) => {
    const searchTerm = term.trim();
    if (searchTerm) {
        getWasteSortingInfo(searchTerm);
    }
};

wasteSearchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleSearch(event.target.value);
    }
});

quickSearchButtons.forEach(button => {
    button.addEventListener('click', () => {
        const searchTerm = button.textContent;
        wasteSearchInput.value = searchTerm;
        handleSearch(searchTerm);
    });
});

// --- Scroll Animation Logic ---
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('is-visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // Trigger on load

// --- Back to Top Button Logic ---
const backToTopBtn = document.getElementById('back-to-top-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'translateY(0)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(10px)';
        setTimeout(() => {
            if (window.scrollY <= 300) {
                 backToTopBtn.classList.add('hidden');
            }
        }, 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

 