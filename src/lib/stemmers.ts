// Simplified Porter Stemmer implementation
export class PorterStemmer {
    private readonly vowels = /[aeiou]/;
    private readonly consonant = /[^aeiou]/;
    
    stem(word: string): string {
        if (word.length < 3) return word;
        
        const originalCase = this.getCase(word);
        let w = word.toLowerCase();
        
        // Step 1a
        w = this.step1a(w);
        // Step 1b
        w = this.step1b(w);
        // Step 1c
        w = this.step1c(w);
        // Step 2
        w = this.step2(w);
        // Step 3
        w = this.step3(w);
        // Step 4
        w = this.step4(w);
        // Step 5
        w = this.step5(w);
        
        return this.restoreCase(w, originalCase);
    }
    
    private getCase(word: string): string {
        return word.split('').map(c => c === c.toUpperCase() ? 'U' : 'L').join('');
    }
    
    private restoreCase(word: string, casePattern: string): string {
        return word.split('').map((c, i) => 
            i < casePattern.length && casePattern[i] === 'U' ? c.toUpperCase() : c
        ).join('');
    }
    
    private step1a(w: string): string {
        if (w.endsWith('sses')) return w.slice(0, -2);
        if (w.endsWith('ies')) return w.slice(0, -2);
        if (w.endsWith('ss')) return w;
        if (w.endsWith('s')) return w.slice(0, -1);
        return w;
    }
    
    private step1b(w: string): string {
        if (w.endsWith('eed')) {
            if (this.measure(w.slice(0, -3)) > 0) {
                return w.slice(0, -1);
            }
            return w;
        }
        
        if (w.endsWith('ed')) {
            const stem = w.slice(0, -2);
            if (this.hasVowel(stem)) {
                return this.step1bHelper(stem);
            }
        }
        
        if (w.endsWith('ing')) {
            const stem = w.slice(0, -3);
            if (this.hasVowel(stem)) {
                return this.step1bHelper(stem);
            }
        }
        
        return w;
    }
    
    private step1bHelper(w: string): string {
        if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) {
            return w + 'e';
        }
        if (this.endsWithDoubleConsonant(w) && !w.endsWith('l') && !w.endsWith('s') && !w.endsWith('z')) {
            return w.slice(0, -1);
        }
        if (this.measure(w) === 1 && this.endsWithCVC(w)) {
            return w + 'e';
        }
        return w;
    }
    
    private step1c(w: string): string {
        if (w.endsWith('y') && this.hasVowel(w.slice(0, -1))) {
            return w.slice(0, -1) + 'i';
        }
        return w;
    }
    
    private step2(w: string): string {
        const suffixes: Record<string, string> = {
            'ational': 'ate',
            'tional': 'tion',
            'enci': 'ence',
            'anci': 'ance',
            'izer': 'ize',
            'abli': 'able',
            'alli': 'al',
            'entli': 'ent',
            'eli': 'e',
            'ousli': 'ous',
            'ization': 'ize',
            'ation': 'ate',
            'ator': 'ate',
            'alism': 'al',
            'iveness': 'ive',
            'fulness': 'ful',
            'ousness': 'ous',
            'aliti': 'al',
            'iviti': 'ive',
            'biliti': 'ble'
        };
        
        for (const [suffix, replacement] of Object.entries(suffixes)) {
            if (w.endsWith(suffix)) {
                const stem = w.slice(0, -suffix.length);
                if (this.measure(stem) > 0) {
                    return stem + replacement;
                }
            }
        }
        
        return w;
    }
    
    private step3(w: string): string {
        const suffixes: Record<string, string> = {
            'icate': 'ic',
            'ative': '',
            'alize': 'al',
            'iciti': 'ic',
            'ical': 'ic',
            'ful': '',
            'ness': ''
        };
        
        for (const [suffix, replacement] of Object.entries(suffixes)) {
            if (w.endsWith(suffix)) {
                const stem = w.slice(0, -suffix.length);
                if (this.measure(stem) > 0) {
                    return stem + replacement;
                }
            }
        }
        
        return w;
    }
    
    private step4(w: string): string {
        const suffixes = ['al', 'ance', 'ence', 'er', 'ic', 'able', 'ible', 'ant',
                         'ement', 'ment', 'ent', 'ion', 'ou', 'ism', 'ate', 'iti',
                         'ous', 'ive', 'ize'];
        
        for (const suffix of suffixes) {
            if (w.endsWith(suffix)) {
                const stem = w.slice(0, -suffix.length);
                if (suffix === 'ion' && (stem.endsWith('s') || stem.endsWith('t'))) {
                    if (this.measure(stem) > 1) {
                        return stem;
                    }
                } else if (this.measure(stem) > 1) {
                    return stem;
                }
            }
        }
        
        return w;
    }
    
    private step5(w: string): string {
        // Step 5a
        if (w.endsWith('e')) {
            const stem = w.slice(0, -1);
            const m = this.measure(stem);
            if (m > 1 || (m === 1 && !this.endsWithCVC(stem))) {
                return stem;
            }
        }
        
        // Step 5b
        if (w.endsWith('ll') && this.measure(w) > 1) {
            return w.slice(0, -1);
        }
        
        return w;
    }
    
    private hasVowel(w: string): boolean {
        return this.vowels.test(w);
    }
    
    private measure(w: string): number {
        // Count VC sequences
        let count = 0;
        let previousWasVowel = false;
        
        for (const char of w) {
            const isVowel = this.vowels.test(char);
            if (!isVowel && previousWasVowel) {
                count++;
            }
            previousWasVowel = isVowel;
        }
        
        return count;
    }
    
    private endsWithDoubleConsonant(w: string): boolean {
        return w.length >= 2 && 
               w[w.length - 1] === w[w.length - 2] && 
               this.consonant.test(w[w.length - 1]);
    }
    
    private endsWithCVC(w: string): boolean {
        if (w.length < 3) return false;
        
        const lastThree = w.slice(-3);
        return this.consonant.test(lastThree[0]) &&
               this.vowels.test(lastThree[1]) &&
               this.consonant.test(lastThree[2]) &&
               !['w', 'x', 'y'].includes(lastThree[2]);
    }
}

// Simplified Snowball Stemmer (Porter2)
export class SnowballStemmer extends PorterStemmer {
    // Inherits from Porter for now, could be extended with Porter2 rules
}

// Simplified Lancaster Stemmer (more aggressive)
export class LancasterStemmer {
    stem(word: string): string {
        if (word.length < 3) return word;
        
        const originalCase = this.getCase(word);
        let w = word.toLowerCase();
        
        // More aggressive stemming rules
        const rules = [
            { suffix: 'ational', replacement: 'e' },
            { suffix: 'iveness', replacement: 'e' },
            { suffix: 'fulness', replacement: 'e' },
            { suffix: 'ousness', replacement: 'e' },
            { suffix: 'ization', replacement: 'e' },
            { suffix: 'tional', replacement: 'e' },
            { suffix: 'biliti', replacement: 'le' },
            { suffix: 'icate', replacement: '' },
            { suffix: 'ative', replacement: '' },
            { suffix: 'alize', replacement: '' },
            { suffix: 'iciti', replacement: '' },
            { suffix: 'ical', replacement: '' },
            { suffix: 'ness', replacement: '' },
            { suffix: 'ance', replacement: '' },
            { suffix: 'ence', replacement: '' },
            { suffix: 'able', replacement: '' },
            { suffix: 'ible', replacement: '' },
            { suffix: 'ment', replacement: '' },
            { suffix: 'sion', replacement: 't' },
            { suffix: 'tion', replacement: 't' },
            { suffix: 'ator', replacement: 'e' },
            { suffix: 'izer', replacement: '' },
            { suffix: 'ing', replacement: '' },
            { suffix: 'ed', replacement: '' },
            { suffix: 'er', replacement: '' },
            { suffix: 'ly', replacement: '' },
            { suffix: 'y', replacement: 'i' },
            { suffix: 'es', replacement: '' },
            { suffix: 's', replacement: '' }
        ];
        
        for (const rule of rules) {
            if (w.endsWith(rule.suffix) && w.length - rule.suffix.length >= 2) {
                w = w.slice(0, -rule.suffix.length) + rule.replacement;
                break;
            }
        }
        
        return this.restoreCase(w, originalCase);
    }
    
    private getCase(word: string): string {
        return word.split('').map(c => c === c.toUpperCase() ? 'U' : 'L').join('');
    }
    
    private restoreCase(word: string, casePattern: string): string {
        return word.split('').map((c, i) => 
            i < casePattern.length && casePattern[i] === 'U' ? c.toUpperCase() : c
        ).join('');
    }
}

export function getStemmer(type: 'porter' | 'snowball' | 'lancaster'): { stem: (word: string) => string } {
    switch (type) {
        case 'porter':
            return new PorterStemmer();
        case 'snowball':
            return new SnowballStemmer();
        case 'lancaster':
            return new LancasterStemmer();
        default:
            return new PorterStemmer();
    }
}