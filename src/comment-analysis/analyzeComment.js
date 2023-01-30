import loadImage from '../loadImage.js'
import areImagesSimilar from './areImagesSimilar.js'
import Counterparts, { NumberCounterparts, PlusSymbolCounterparts } from './Counterparts.js'
import getSpecialCharacterRegExp from './getSpecialCharacterRegExp.js'
import RedFlags from './RedFlags.js'
import { NumberCounterparts, PlusSymbolCounterparts } from './Counterparts.js'

/**
 * @param {object} props
 * @param {import('@googleapis/youtube').youtube_v3.Schema$Channel} props.channel
 * @param {*} props.channelProfileImage
 * @param {import('@googleapis/youtube').youtube_v3.Schema$Comment} props.comment
 */
export default async function analyzeComment({ channel, channelProfileImage, comment }) {

  // Ignore channel author comments
  if (comment.snippet.authorChannelId.value === channel.id) return { comment, redFlags: [], numOfRedFlags: 0, totalRedFlagWeight: 0 }

  let redFlags = []
  let numOfRedFlags = 0
  let totalRedFlagWeight = 0

  const commentAuthor = {
    channelId: comment.snippet.authorChannelId,
    channelUrl: comment.snippet.authorChannelUrl,
    displayName: comment.snippet.authorDisplayName,
    displayNameWithoutAccentsAndDiacritics: removeAccentsAndDiacritics(comment.snippet.authorDisplayName),
    profileImage: await loadImage(comment.authorProfileImageUrl),
  }

  // Comment author profile picture similarity to channel profile picture
  const hasSimilarProfileImage = await areImagesSimilar(channelProfileImage, commentAuthor.profileImage)
  if (hasSimilarProfileImage) {
    numOfRedFlags += 1
    totalRedFlagWeight += RedFlags.hasSimilarProfileImage.weight
    redFlags.push('has-similar-profile-image-to-channel-owner')
  }

  // Money symbols in comment author display name
  const moneySymbols = ['$', '€', '£', '¥', '₣', '₹', '₿', '🏦', '💵', '💶', '💷', '💴', '📈', '💰', '🪙', '📉', '💳', '💱', '🫰', '💲', '💸', '🤑', '👛', '🎰']
  for (const symbol of moneySymbols) {
    if (commentAuthor.displayNameWithoutAccentsAndDiacritics.includes(symbol)) {
      numOfRedFlags += 1
      totalRedFlagWeight += RedFlags.nameHasMoneySymbols.weight
      redFlags.push('has-money-symbol-in-name')
      break
    }
  }

  // Special characters in channel name
  const allowedSpecialCharactersInDisplayName = (RedFlags.nameHasSpecialCharacters?.allowedCharacters || [])
  const hasSpecialCharactersInName = commentAuthor.displayNameWithoutAccentsAndDiacritics.match(getSpecialCharacterRegExp({ allowedCharacters: allowedSpecialCharactersInDisplayName, flags: '' }))
  if (hasSpecialCharactersInName) {
    numOfRedFlags += 1
    totalRedFlagWeight += RedFlags.nameHasSpecialCharacters.weight
    redFlags.push('has-special-characters-in-name')
  }

  // Has phone number in name
  const hasPhoneNumberInName = commentAuthor.displayNameWithoutAccentsAndDiacritics
    .replace(new RegExp(`[${PlusSymbolCounterparts}]`, 'g'), '+') // Replace special character plus signs with regular numbers (It doesn't matter what numbers there are so we just replace all special numbers with 0)
    .replace(new RegExp(`[${Object.keys(NumberCounterparts)}]`, 'g'), '0') // Replace special character numbers with regular numbers (It doesn't matter what numbers there are so we just replace all special numbers with 0)
    .replace(getSpecialCharacterRegExp({ allowedCharacters: [/\+/] }), '') // Remove special characters
    .match(/\+\d{7}/) // Text is considered as phone number when there is 7 numbers after plus sign

  if (hasPhoneNumberInName) {
    numOfRedFlags += 1
    totalRedFlagWeight += RedFlags.nameHasPhoneNumberInName.weight
    redFlags.push('has-phone-number-in-name')
    console.log('Phone number detected - ', commentAuthor.displayNameWithoutAccentsAndDiacritics)
  }


  // Has blacklisted words in name
  const displayNameWithoutSpecialSymbols = [...commentAuthor.displayNameWithoutAccentsAndDiacritics] // Split method can break special characters into multiple values from single special character so spread operation is used instead
    .map((char) => String(Counterparts[char]?.counterpart ?? char).toLowerCase()) // Convert all kind of special characters to their normal letter counterpart
    .join('')
    .replace(getSpecialCharacterRegExp(), '') // Remove special characters

  for (const blacklistedWord of RedFlags.nameHasBlacklistedWords.words) {
    const hasBlacklistedWord = displayNameWithoutSpecialSymbols.includes(blacklistedWord)
    if (hasBlacklistedWord) {
      numOfRedFlags += 1
      totalRedFlagWeight += RedFlags.nameHasBlacklistedWords.weight
      redFlags.push('has-blacklisted-words-in-name')
      console.log(`Blacklisted word detected - ${blacklistedWord} - ${commentAuthor.displayNameWithoutAccentsAndDiacritics}`)
    }
  }


  return {
    comment,
    redFlags,
    numOfRedFlags,
    totalRedFlagWeight,
  }
}
