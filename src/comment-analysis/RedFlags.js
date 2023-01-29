const RedFlags = {
  hasSimilarProfileImage: { weight: 5 },
  nameHasMoneySymbols: { weight: 2 },
  nameHasSpecialCharacters: { weight: 1, allowedCharacters: [/'/, /"/, /\-/] },
  hasPhoneNumberInName: { weight: 4 },
  // TODO: Blacklisted words
}

export default RedFlags
