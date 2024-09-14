import { NormalizeOptions } from "./normalizeString"

export type ContainsWithOptions =
    | { value: string | RegExp, weight?: number }
    | {
      value: (string | RegExp)[],
      /** If not set, defaults to all. */
      minNumberOfOccurrences?: number,
      weight?: number
    }
    | {
      specialCharacters: true,
      allowedCharacters?: RegExp[],
      weight?: number,
    }
    | {
      /** Percentage of at least how similar the "toCheck" and "value" should be (0 - 1). */
      similarity: number,
      value: string,
      weight?: number,
    }

export type RedFlag = {
  name: string,
  // TODO: Add min/max length comment filters
  toCheck?: ('commenterName' | 'commenterComment')[]
  contains:
  | string
  | RegExp
  | ContainsWithOptions
  | ContainsWithOptions[]

  /**
   * If the input should be processed before comparison.
   * @default true
   */
  preprocessing?:
    | boolean
    | NormalizeOptions
    | {
      commenterName?: boolean | NormalizeOptions,
      commenterComment?: boolean | NormalizeOptions,
    }

  /** Added weight if any of the contains matches. */
  weight?: number
  /** If not set, defaults to 1 */
  minNumberOfOccurrences?: number
  /** Maximum amount of weight this red flag can cumulate (when "contains" is an array with multiple values and weights). */
  maxWeight?: number,
}


const RedFlagTemplates = {
// const RedFlagTemplates: Record<string, RedFlag> = {
  containsBlacklistedWords: {
    name: 'Contains blacklisted words',
    maxWeight: 5,
    contains: [
      { value: 'whatsap', weight: 2 },
      { value: 'whatsapp', weight: 2 },
      { value: 'signal', weight: 1 },
      { value: 'telegram', weight: 2 },
      { value: 'pinned', weight: 2 },
      {
        value: ['reach', 'me', 'out'],
        minNumberOfOccurrences: 2,
        weight: 3,
      },
    ],
  },
  containsMoneySymbols: {
    name: 'Contains money symbols',
    weight: 2,
    contains: {
      value: ['$', '€', '£', '¥', '₣', '₹', '₿', '🏦', '💵', '💶', '💷', '💴', '📈', '💰', '🪙', '📉', '💳', '💱', '🫰', '💲', '💸', '🤑', '👛', '🎰'],
      minNumberOfOccurrences: 1,
    },
    preprocessing: false
  },
  containsPhoneNumber: {
    name: 'Contains phone number',
    weight: 3,
    contains: /\+\d{7}/,
    preprocessing: { whitelistedSpecialCharacters: [/\+/] }
  },
  containsSpecialCharacters: {
    name: 'Contains special characters',
    weight: 1,
    contains: {
      specialCharacters: true as const,
      allowedCharacters: [/'/, /"/, /\-/],
    },
    preprocessing: false,
  },
  similarProfileName: {
    name: 'Has similar profile name',
    weight: 5,
    toCheck: ['commenterName'],
    contains: {
      similarity: 0.8,
      value: '{{channelName}}',
    }
  },
  makeshiftCryptocurrencyName: {
    name: 'Makeshift crypto currency name',
    weight: 4,
    toCheck: ['commenterComment'],
    preprocessing: { makeLowercase: false, removeWhitespace: false },
    contains: /[A-Z]{3}[0-9]{2}[A-Z$£€]/
  },
}

// const _typescriptRedFlagTemplatesCheck: Record<keyof typeof RedFlagTemplates, RedFlag> = RedFlagTemplates

export default RedFlagTemplates
