const RedFlags = {
  hasSimilarProfileImage: { weight: 5 },
  hasSimilarProfileName: { weight: 5, minSimilarity: 0.8 },
  nameHasMoneySymbols: { weight: 2 },
  nameHasSpecialCharacters: { weight: 1, allowedCharacters: [/'/, /"/, /\-/] },
  nameHasPhoneNumberInName: { weight: 4 },
  nameHasBlacklistedWords: {
    weight: 2,
    words: ['whatsap', 'signal', 'telegram', 'pinned']
  },
}

export default RedFlags
