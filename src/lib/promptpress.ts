import { stopwords, negationWords } from '../data/stopwords';
import { tokenize, isWord, isPunctuation, mergeContractions } from './tokenizer';
import { getStemmer } from './stemmers';

export interface TrimOptions {
    removeStopwords?: boolean;
    removePunctuation?: boolean;
    removeSpaces?: boolean;
    useStemming?: boolean;
    stemmer?: 'porter' | 'snowball' | 'lancaster';
    language?: string;
}

export function trim(text: string, options: TrimOptions = {}): string {
    const {
        removeStopwords = true,
        removePunctuation = false,
        removeSpaces = true,
        useStemming = false,
        stemmer = 'porter',
        language = 'english'
    } = options;
    
    // Step 1: Merge contractions
    text = mergeContractions(text);
    
    // Step 2: Tokenize
    const tokens = tokenize(text);
    
    // Step 3: Get stopwords for the language
    const langStopwords = stopwords[language] || stopwords.english;
    const stopwordSet = new Set(langStopwords.map(w => w.toLowerCase()));
    
    // Step 4: Process tokens
    let processedTokens: string[] = [];
    const stemmerInstance = useStemming ? getStemmer(stemmer) : null;
    
    for (const token of tokens) {
        if (isPunctuation(token)) {
            if (!removePunctuation) {
                processedTokens.push(token);
            }
            continue;
        }
        
        if (isWord(token)) {
            const lowerToken = token.toLowerCase();
            
            // Keep negation words even if removing stopwords
            if (removeStopwords && stopwordSet.has(lowerToken) && !negationWords.has(lowerToken)) {
                continue;
            }
            
            let processedToken = token;
            
            // Apply stemming if enabled
            if (stemmerInstance) {
                processedToken = stemmerInstance.stem(processedToken);
            }
            
            processedTokens.push(processedToken);
        }
    }
    
    // Step 5: Join tokens
    let result: string;
    
    if (removeSpaces) {
        // Join without spaces
        result = processedTokens.join('');
    } else {
        // Join with spaces, but handle punctuation properly
        result = '';
        for (let i = 0; i < processedTokens.length; i++) {
            const token = processedTokens[i];
            
            if (i === 0) {
                result += token;
            } else if (isPunctuation(token)) {
                // No space before punctuation
                result += token;
            } else if (i > 0 && isPunctuation(processedTokens[i - 1])) {
                // Space after punctuation
                result += ' ' + token;
            } else {
                result += ' ' + token;
            }
        }
    }
    
    return result;
}

export function getCompressionStats(original: string, compressed: string) {
    const originalChars = original.length;
    const compressedChars = compressed.length;
    const originalWords = original.split(/\s+/).filter(w => w.length > 0).length;
    const compressedWords = compressed.split(/\s+/).filter(w => w.length > 0).length;
    
    const charReduction = originalChars > 0 
        ? Math.round(((originalChars - compressedChars) / originalChars) * 100)
        : 0;
    
    return {
        originalChars,
        compressedChars,
        originalWords,
        compressedWords,
        charReduction
    };
}