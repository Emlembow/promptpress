import { trim, getCompressionStats, TrimOptions } from './lib/promptpress';
import { countTokens, calculateTokenSavings } from './lib/tokenCounter';

// DOM elements
const inputTextArea = document.getElementById('inputText') as HTMLTextAreaElement;
const outputTextArea = document.getElementById('outputText') as HTMLTextAreaElement;
const compressBtn = document.getElementById('compressBtn') as HTMLButtonElement;
const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;

// Stats elements
const inputCharsSpan = document.getElementById('inputChars') as HTMLSpanElement;
const inputWordsSpan = document.getElementById('inputWords') as HTMLSpanElement;
const inputTokensSpan = document.getElementById('inputTokens') as HTMLSpanElement;
const outputCharsSpan = document.getElementById('outputChars') as HTMLSpanElement;
const outputWordsSpan = document.getElementById('outputWords') as HTMLSpanElement;
const outputTokensSpan = document.getElementById('outputTokens') as HTMLSpanElement;
const compressionRatioSpan = document.getElementById('compressionRatio') as HTMLSpanElement;

// Token savings elements
const savingsSection = document.getElementById('savingsSection') as HTMLDivElement;
const originalTokenCountSpan = document.getElementById('originalTokenCount') as HTMLSpanElement;
const compressedTokenCountSpan = document.getElementById('compressedTokenCount') as HTMLSpanElement;
const tokensSavedSpan = document.getElementById('tokensSaved') as HTMLSpanElement;
const tokensSavedPercentSpan = document.getElementById('tokensSavedPercent') as HTMLSpanElement;
const costEstimatesDiv = document.getElementById('costEstimates') as HTMLDivElement;

// Options elements
const removeStopwordsCheckbox = document.getElementById('removeStopwords') as HTMLInputElement;
const removePunctuationCheckbox = document.getElementById('removePunctuation') as HTMLInputElement;
const removeSpacesCheckbox = document.getElementById('removeSpaces') as HTMLInputElement;
const useStemmingCheckbox = document.getElementById('useStemming') as HTMLInputElement;
const stemmerTypeSelect = document.getElementById('stemmerType') as HTMLSelectElement;
const languageSelect = document.getElementById('language') as HTMLSelectElement;
const stemmerOptions = document.querySelector('.stemmer-options') as HTMLDivElement;

// Initialize event listeners
function initializeApp() {
    // Text input listeners
    inputTextArea.addEventListener('input', updateInputStats);
    
    // Button listeners
    compressBtn.addEventListener('click', compressText);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Option listeners
    useStemmingCheckbox.addEventListener('change', toggleStemmerOptions);
    
    // Initialize stats
    updateInputStats();
}

// Update input statistics
function updateInputStats() {
    const text = inputTextArea.value;
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const tokens = countTokens(text);
    
    inputCharsSpan.textContent = chars.toString();
    inputWordsSpan.textContent = words.toString();
    inputTokensSpan.textContent = tokens.toString();
}

// Toggle stemmer options visibility
function toggleStemmerOptions() {
    stemmerOptions.style.display = useStemmingCheckbox.checked ? 'flex' : 'none';
}

// Compress text
function compressText() {
    const inputText = inputTextArea.value;
    
    if (!inputText.trim()) {
        alert('Please enter some text to compress');
        return;
    }
    
    // Get options
    const options: TrimOptions = {
        removeStopwords: removeStopwordsCheckbox.checked,
        removePunctuation: removePunctuationCheckbox.checked,
        removeSpaces: removeSpacesCheckbox.checked,
        useStemming: useStemmingCheckbox.checked,
        stemmer: stemmerTypeSelect.value as 'porter' | 'snowball' | 'lancaster',
        language: languageSelect.value
    };
    
    // Compress text
    const compressedText = trim(inputText, options);
    
    // Update output
    outputTextArea.value = compressedText;
    
    // Update stats
    const stats = getCompressionStats(inputText, compressedText);
    outputCharsSpan.textContent = stats.compressedChars.toString();
    outputWordsSpan.textContent = stats.compressedWords.toString();
    
    // Update token stats
    const outputTokens = countTokens(compressedText);
    outputTokensSpan.textContent = outputTokens.toString();
    
    compressionRatioSpan.textContent = `${stats.charReduction}%`;
    
    // Calculate and display token savings
    const tokenSavings = calculateTokenSavings(inputText, compressedText);
    displayTokenSavings(tokenSavings);
    
    // Enable copy button
    copyBtn.disabled = false;
    
    // Animate the compression ratio
    compressionRatioSpan.style.animation = 'none';
    setTimeout(() => {
        compressionRatioSpan.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Copy to clipboard
async function copyToClipboard() {
    const text = outputTextArea.value;
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Show success feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text to clipboard');
    }
}

// Display token savings and cost estimates
function displayTokenSavings(savings: ReturnType<typeof calculateTokenSavings>) {
    // Show the savings section
    savingsSection.style.display = 'block';
    
    // Update token counts
    originalTokenCountSpan.textContent = savings.originalTokens.toLocaleString();
    compressedTokenCountSpan.textContent = savings.compressedTokens.toLocaleString();
    tokensSavedSpan.textContent = savings.tokensSaved.toLocaleString();
    tokensSavedPercentSpan.textContent = `(${savings.percentageSaved.toFixed(1)}%)`;
    
    // Clear existing cost estimates
    costEstimatesDiv.innerHTML = '';
    
    // Sort cost savings by popularity/relevance
    const popularModels = ['gpt-4o-mini', 'gpt-4o', 'claude-haiku-3.5', 'claude-sonnet-3.5', 'o3-mini', 'gpt-4.1-mini'];
    const sortedSavings = [...savings.costSavings].sort((a, b) => {
        const aIndex = popularModels.indexOf(a.model);
        const bIndex = popularModels.indexOf(b.model);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return b.totalCost - a.totalCost;
    });
    
    // Display top models
    sortedSavings.slice(0, 12).forEach(estimate => {
        const card = document.createElement('div');
        card.className = 'cost-card';
        
        const modelName = document.createElement('div');
        modelName.className = 'model-name';
        modelName.textContent = estimate.model;
        
        const costDetails = document.createElement('div');
        costDetails.className = 'cost-details';
        
        const costLabel = document.createElement('span');
        costLabel.className = 'cost-label';
        costLabel.textContent = 'Saved per prompt:';
        
        const costValue = document.createElement('span');
        costValue.className = 'cost-value';
        
        // Format cost based on value
        if (estimate.totalCost < 0.01) {
            costValue.textContent = `$${(estimate.totalCost * 1000).toFixed(2)}/1K`;
            costValue.classList.add('small');
        } else {
            costValue.textContent = `$${estimate.totalCost.toFixed(4)}`;
        }
        
        costDetails.appendChild(costLabel);
        costDetails.appendChild(costValue);
        
        card.appendChild(modelName);
        card.appendChild(costDetails);
        
        costEstimatesDiv.appendChild(card);
    });
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}