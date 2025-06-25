export function tokenize(text: string): string[] {
    // Simple word tokenization that handles contractions and punctuation
    // Matches words, contractions, and standalone punctuation
    const tokens = text.match(/[\w']+|[^\w\s]/g) || [];
    return tokens;
}

export function isWord(token: string): boolean {
    return /^[\w']+$/.test(token);
}

export function isPunctuation(token: string): boolean {
    return /^[^\w\s]$/.test(token);
}

export function mergeContractions(text: string): string {
    // Remove apostrophes from contractions
    return text.replace(/(\w)'(\w)/g, '$1$2');
}