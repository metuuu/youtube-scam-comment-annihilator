# Detecting scam messages

## Red flags

- Name has @ character
- Name has "Whatsapp" written in it
- Name has crosshair or plus symbol + ± 十 ⼗ ㈩ ㊉ ✝ ✞ ✟ ♱ ♰ ☩ ✙ ✚ ✛ ✜ ✠ ⁜ (used in phone numbers)
- Name has money symbol $ € £ ¥ ₣ ₹ 🏦 💵 💶 💷 💴 📈 💰 🪙 📉 💳 💱 🫰 💲 💸 🤑 👛 🎰
- Any uncommon symbol in name
- Has similar name than the channel owner
- Uses mathematical alphanumeric symbols in name https://www.fileformat.info/info/unicode/block/mathematical_alphanumeric_symbols/list.htm
- Has similar profile picture than the channel owner\
  https://github.com/milvus-io/milvus\
  https://github.com/milvus-io/milvus-sdk-node\
  https://milvus.io/docs/example_code_node.md

Different weights can be given for each red flags and when "red flag threshold" exceeds, we annihilate the comment.

Text comparisons would be done by
 - Converting letter counterparts to letters. For example `[Α, α, 𝐀, 𝐚, 𝔸, 𝓐, 𝖆, @, 4]` to `a`
 - Converting characters to lowercase
 - Removing special characters and symbols
 - Removing spaces between single characters. For example `This is u s e r n a m e` to `This is username`
 - Removing punctuation symbols  ```· ‑ ‒ – — ― ‗ ‘ ’ ‚ ‛ “ ” „ ‟ • ‣ ․ ‥ … ‧ ′ ″ ‴ ‵ ‶ ‷ ❛ ❜ ❝ ❞ ʹ ʺ ʻ ʼ ʽ ʾ ʿ ˀ ˁ ˂ ˃ ˄ ˅ ˆ ˇ ˈ ˉ ˊ ˋ ˌ ˍ ˎ ˏ ː ˑ ˒ ˓ ˔ ˕ ˖ ˗ ˘ ˙ ˚ ˛ ˜ ˝ ˠ ˡ ～ ¿ ﹐ ﹒ ﹔ ﹕ ！ ＃ ＄ ％ ＆ ＊ ， ． ： ； ？ ＠ 、 。 〃 〝 〞 ︰ [ ] { } < > . , : ; ' " ` ´ ? !```

Text comparisons would be probably done multiple times with different configurations.\
For example if `I` is converted to `l` in some configuration. Or if phone numbers are tried to be detected and letters special characters are converted to their number counterparts. For example `𝞗` symbol is converted to `o` and then `o` letters are converted to `0`.
