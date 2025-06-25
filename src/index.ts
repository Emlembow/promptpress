import { trim, getCompressionStats, TrimOptions } from './lib/promptpress';

// DOM elements
const inputTextArea = document.getElementById('inputText') as HTMLTextAreaElement;
const outputTextArea = document.getElementById('outputText') as HTMLTextAreaElement;
const compressBtn = document.getElementById('compressBtn') as HTMLButtonElement;
const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;

// Stats elements
const inputCharsSpan = document.getElementById('inputChars') as HTMLSpanElement;
const inputWordsSpan = document.getElementById('inputWords') as HTMLSpanElement;
const outputCharsSpan = document.getElementById('outputChars') as HTMLSpanElement;
const outputWordsSpan = document.getElementById('outputWords') as HTMLSpanElement;
const compressionRatioSpan = document.getElementById('compressionRatio') as HTMLSpanElement;

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
    
    inputCharsSpan.textContent = chars.toString();
    inputWordsSpan.textContent = words.toString();
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
    compressionRatioSpan.textContent = `${stats.charReduction}%`;
    
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