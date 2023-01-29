import loadImage from '../loadImage.js'
import areImagesSimilar from './areImagesSimilar.js'
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
  if (comment.snippet.authorChannelId.value === channel.id) return { comment, numOfRedFlags: 0, totalRedFlagWeight: 0 }

  let numOfRedFlags = 0
  let totalRedFlagWeight = 0

  const commentAuthor = {
    channelId: comment.snippet.authorChannelId,
    channelUrl: comment.snippet.authorChannelUrl,
    displayName: comment.snippet.authorDisplayName,
    profileImage: await loadImage(comment.authorProfileImageUrl),
  }

  // Comment author profile picture similarity to channel profile picture
  const hasSimilarProfileImage = await areImagesSimilar(channelProfileImage, commentAuthor.profileImage)
  if (hasSimilarProfileImage) {
    numOfRedFlags += 1
    totalRedFlagWeight += RedFlags.hasSimilarProfileImage.weight
  }

  // Money symbols in comment author display name
  const moneySymbols = ['$', '€', '£', '¥', '₣', '₹', '₿', '🏦', '💵', '💶', '💷', '💴', '📈', '💰', '🪙', '📉', '💳', '💱', '🫰', '💲', '💸', '🤑', '👛', '🎰']
  for (const symbol of moneySymbols) {
    if (comment.snippet.authorDisplayName.includes(symbol)) {
      numOfRedFlags += 1
      totalRedFlagWeight += RedFlags.nameHasMoneySymbols.weight
      break
    }
  }

  // Special characters in channel name
  const allowedSpecialCharactersInDisplayName = (RedFlags.nameHasSpecialCharacters?.allowedCharacters || [])
  const hasSpecialCharactersInName = comment.snippet.authorDisplayName.match(getSpecialCharacterRegExp({ allowedCharacters: allowedSpecialCharactersInDisplayName }))
  if (hasSpecialCharactersInName) {
    numOfRedFlags += 1
    totalRedFlagWeight += RedFlags.nameHasSpecialCharacters.weight
  }

  // Has phone number in name
  const phoneNumberRegExp = new RegExp(`\\+[0-9]\\d{6}`) // Text is considered as phone number when there is 7 numbers after plus sign
  const hasPhoneNumberInName = comment.snippet.authorDisplayName
    .replace(new RegExp(`[${PlusSymbolCounterparts}]`, 'g'), '+') // Replace special character plus signs with regular numbers (It doesn't matter what numbers there are so we just replace all special numbers with 0)
    .replace(new RegExp(`[${Object.keys(NumberCounterparts)}]`, 'g'), '0') // Replace special character numbers with regular numbers (It doesn't matter what numbers there are so we just replace all special numbers with 0)
    .match(phoneNumberRegExp)

  if (hasPhoneNumberInName) {
    numOfRedFlags += 1
    totalRedFlagWeight += RedFlags.hasPhoneNumberInName.weight
  }


  // Has blacklisted words in name
  // TODO: blacklisted words


  return {
    comment,
    numOfRedFlags,
    totalRedFlagWeight,
  }
}
