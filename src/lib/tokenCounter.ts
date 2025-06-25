import { encode } from 'gpt-tokenizer';

// Token pricing per 1M tokens (prices are per million tokens)
// Note: OpenAI pricing is now per million tokens, not per thousand
export const MODEL_PRICING = {
  // GPT-4.1 series
  'gpt-4.1': { input: 2.00, output: 8.00, cached: 0.50 },
  'gpt-4.1-mini': { input: 0.40, output: 1.60, cached: 0.10 },
  'gpt-4.1-nano': { input: 0.10, output: 0.40, cached: 0.025 },
  
  // GPT-4.5 series
  'gpt-4.5-preview': { input: 75.00, output: 150.00, cached: 37.50 },
  
  // GPT-4o series
  'gpt-4o': { input: 2.50, output: 10.00, cached: 1.25 },
  'gpt-4o-mini': { input: 0.15, output: 0.60, cached: 0.075 },
  
  // O1 series
  'o1': { input: 15.00, output: 60.00, cached: 7.50 },
  'o1-pro': { input: 150.00, output: 600.00, cached: null },
  'o1-mini': { input: 1.10, output: 4.40, cached: 0.55 },
  
  // O3 series
  'o3-pro': { input: 20.00, output: 80.00, cached: null },
  'o3': { input: 2.00, output: 8.00, cached: 0.50 },
  'o3-mini': { input: 1.10, output: 4.40, cached: 0.55 },
  
  // Claude models (Anthropic)
  'claude-opus-4': { input: 15.00, output: 75.00, cached: 1.50 },
  'claude-sonnet-4': { input: 3.00, output: 15.00, cached: 0.30 },
  'claude-sonnet-3.7': { input: 3.00, output: 15.00, cached: 0.30 },
  'claude-sonnet-3.5': { input: 3.00, output: 15.00, cached: 0.30 },
  'claude-haiku-3.5': { input: 0.80, output: 4.00, cached: 0.08 },
  'claude-opus-3': { input: 15.00, output: 75.00, cached: 1.50 },
  'claude-haiku-3': { input: 0.25, output: 1.25, cached: 0.03 }
} as const;

export type ModelName = keyof typeof MODEL_PRICING;

export interface TokenStats {
  tokenCount: number;
  characterCount: number;
  tokensPerChar: number;
}

export interface CostEstimate {
  model: ModelName;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

/**
 * Count tokens in a text using GPT tokenizer
 */
export function countTokens(text: string): number {
  if (!text) return 0;
  try {
    const tokens = encode(text);
    return tokens.length;
  } catch (error) {
    console.error('Error counting tokens:', error);
    return 0;
  }
}

/**
 * Get detailed token statistics
 */
export function getTokenStats(text: string): TokenStats {
  const tokenCount = countTokens(text);
  const characterCount = text.length;
  const tokensPerChar = characterCount > 0 ? tokenCount / characterCount : 0;
  
  return {
    tokenCount,
    characterCount,
    tokensPerChar
  };
}

/**
 * Calculate cost for a specific model
 */
export function calculateCost(
  tokenCount: number,
  model: ModelName,
  isOutput: boolean = false,
  useCached: boolean = false
): number {
  const pricing = MODEL_PRICING[model];
  let costPerMillion: number;
  
  if (isOutput) {
    costPerMillion = pricing.output;
  } else if (useCached && pricing.cached !== null) {
    costPerMillion = pricing.cached;
  } else {
    costPerMillion = pricing.input;
  }
  
  return (tokenCount / 1_000_000) * costPerMillion;
}

/**
 * Get cost estimates for all models
 */
export function getCostEstimates(
  inputTokens: number,
  outputTokens: number = 0
): CostEstimate[] {
  return Object.entries(MODEL_PRICING).map(([model, pricing]) => {
    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    
    return {
      model: model as ModelName,
      inputCost,
      outputCost,
      totalCost: inputCost + outputCost
    };
  });
}

/**
 * Calculate savings between original and compressed text
 */
export interface TokenSavings {
  originalTokens: number;
  compressedTokens: number;
  tokensSaved: number;
  percentageSaved: number;
  costSavings: CostEstimate[];
}

export function calculateTokenSavings(
  originalText: string,
  compressedText: string
): TokenSavings {
  const originalTokens = countTokens(originalText);
  const compressedTokens = countTokens(compressedText);
  const tokensSaved = originalTokens - compressedTokens;
  const percentageSaved = originalTokens > 0 
    ? (tokensSaved / originalTokens) * 100 
    : 0;
  
  // Calculate cost savings for each model
  const costSavings = Object.entries(MODEL_PRICING).map(([model, pricing]) => {
    const originalInputCost = (originalTokens / 1_000_000) * pricing.input;
    const compressedInputCost = (compressedTokens / 1_000_000) * pricing.input;
    const savedCost = originalInputCost - compressedInputCost;
    
    return {
      model: model as ModelName,
      inputCost: savedCost,
      outputCost: 0, // Output costs remain the same
      totalCost: savedCost
    };
  });
  
  return {
    originalTokens,
    compressedTokens,
    tokensSaved,
    percentageSaved,
    costSavings
  };
}