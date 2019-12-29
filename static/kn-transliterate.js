// Script from: https://kn.wikipedia.org/wiki/%E0%B2%AE%E0%B3%80%E0%B2%A1%E0%B2%BF%E0%B2%AF%E0%B2%B5%E0%B2%BF%E0%B2%95%E0%B2%BF:KnTranslit.js
/*This script is a modified version of Alex benenson's cyrillic translitarator - character translation by [[User:ಶುಶ್ರುತ]] under direction of [[User:ರವಿ]] from Telugu wikipedia*/

var KNTranslit = new function() {
    var amhaHash = '{"k":"ಕ್","ಕ್a":"ಕ","ಕ್A":"ಕಾ","ಕa":"ಕಾ","ಕ್i":"ಕಿ","ಕ್I":"ಕೀ","ಕ್u":"ಕು","ಕ್U":"ಕೂ","ಕ್e":"ಕೆ","ಕ್E":"ಕೇ","ಕi":"ಕೈ","ಕ್o":"ಕೊ","ಕ್O":"ಕೋ","ಕu":"ಕೌ","ಕM":"ಕಂ","ಕH":"ಕಃ","ಕ್R":"ಕೃ","ಕೃu":"ಕೃ","ಕ್h":"ಖ್","K":"ಖ್","ಖ್a":"ಖ","ಖ್A":"ಖಾ","ಖa":"ಖಾ","ಖ್i":"ಖಿ","ಖ್I":"ಖೀ","ಖ್u":"ಖು","ಖ್U":"ಖೂ","ಖ್e":"ಖೆ","ಖ್E":"ಖೇ","ಖೆi":"ಖೈ","ಖ್o":"ಖೊ","ಖ್O":"ಖೋ","ಖu":"ಖೌ","ಖM":"ಖಂ","ಖH":"ಖಃ","ಖ್R":"ಖೃ","ಖೃu":"ಖೃ","g":"ಗ್","ಗ್a":"ಗ","ಗ್A":"ಗಾ","ಗa":"ಗಾ","ಗ್i":"ಗಿ","ಗ್I":"ಗೀ","ಗ್u":"ಗು","ಗ್U":"ಗೂ","ಗ್e":"ಗೆ","ಗ್E":"ಗೇ","ಗi":"ಗೈ","ಗ್o":"ಗೊ","ಗ್O":"ಗೋ","ಗu":"ಗೌ","ಗM":"ಗಂ","ಗH":"ಗಃ","ಗ್R":"ಗೃ","ಗೃu":"ಗೃ","ಗ್h":"ಘ್","G":"ಘ್","ಘ್a":"ಘ","ಘ್A":"ಘಾ","ಘa":"ಘಾ","ಘ್i":"ಘಿ","ಘ್I":"ಘೀ","ಘ್u":"ಘು","ಘ್U":"ಘೂ","ಘ್e":"ಘೆ","ಘ್E":"ಘೇ","ಘi":"ಘೈ","ಘ್o":"ಘೊ","ಘ್O":"ಘೋ","ಘu":"ಘೌ","ಘM":"ಘಂ","ಘH":"ಘಃ","ಘ್R":"ಘೃ","ಘೃu":"ಘೃ","z":"ಙ್","ಙ್a":"ಙ","ಙ್A":"ಙಾ","ಙa":"ಙಾ","ಙ್i":"ಙಿ","ಙ್I":"ಙೀ","ಙ್u":"ಙು","ಙ್U":"ಙೂ","ಙ್e":"ಙೆ","ಙ್E":"ಙೇ","ಙi":"ಙೈ","ಙ್o":"ಙೊ","ಙ್O":"ಙೋ","ಙu":"ಙೌ","ಙM":"ಙಂ","ಙH":"ಙಃ","ಙ್R":"ಙೃ","ಙೃu":"ಙೃ",'; amhaHash += '"c":"ಚ್","ಚ್a":"ಚ","ಚa":"ಚಾ","ಚ್A":"ಚಾ","ಚ್i":"ಚಿ","ಚ್I":"ಚೀ","ಚ್u":"ಚು","ಚ್U":"ಚೂ","ಚ್e":"ಚೆ","ಚ್E":"ಚೇ","ಚi":"ಚೈ","ಚ್o":"ಚೊ","ಚ್O":"ಚೋ","ಚu":"ಚೌ","ಚM":"ಚಂ","ಚH":"ಚಃ","ಚ್R":"ಚೃ","ಚೃu":"ಚೃ","C":"ಛ್","ಚ್h":"ಛ್","ಛ್a":"ಛ","ಛa":"ಛಾ","ಛ್A":"ಛಾ","ಛ್i":"ಛಿ","ಛ್I":"ಛೀ","ಛ್u":"ಛು","ಛ್U":"ಛೂ","ಛ್e":"ಛೆ","ಛ್E":"ಛೇ","ಛi":"ಛೈ","ಛ್o":"ಛೊ","ಛ್O":"ಛೋ","ಛu":"ಛೌ","ಛM":"ಛಂ","ಛH":"ಛಃ","ಛ್R":"ಛೃ","ಛೃu":"ಛೃ","j":"ಜ್","ಜ್a":"ಜ","ಜa":"ಜಾ","ಜ್A":"ಜಾ","ಜ್i":"ಜಿ","ಜ್I":"ಜೀ","ಜ್u":"ಜು","ಜ್U":"ಜೂ","ಜ್e":"ಜೆ","ಜ್E":"ಜೇ","ಜi":"ಜೈ","ಜ್o":"ಜೊ","ಜ್O":"ಜೋ","ಜu":"ಜೌ","ಜM":"ಜಂ","ಜH":"ಜಃ","ಜ್R":"ಜೃ","ಜೃu":"ಜೃ","J":"ಝ್","ಜ್h":"ಝ್","ಝ್a":"ಝ","ಝa":"ಝಾ","ಝ್A":"ಝಾ","ಝ್i":"ಝಿ","ಝ್I":"ಝೀ","ಝ್u":"ಝು","ಝ್U":"ಝೂ","ಝ್e":"ಝೆ","ಝ್E":"ಝೇ","ಝi":"ಝೈ","ಝ್o":"ಝೊ","ಝ್O":"ಝೋ","ಝu":"ಝೌ","ಝM":"ಝಂ","ಝH":"ಝಃ","ಝ್R":"ಝೃ","ಝೃu":"ಝೃ","x":"ಞ್","ಞ್a":"ಞ","ಞ್A":"ಞಾ","ಞa":"ಞಾ","ಞ್i":"ಞಿ","ಞ್I":"ಞೀ","ಞ್u":"ಞು","ಞ್U":"ಞೂ","ಞ್e":"ಞೆ","ಞ್E":"ಞೇ","ಞi":"ಞೈ","ಞ್o":"ಞೊ","ಞ್O":"ಞೋ","ಞu":"ಞೌ","ಞM":"ಞಂ","ಞH":"ಞಃ","ಞ್R":"ಞೃ","ಞೃu":"ಞೃ",'; amhaHash += '"T":"ಟ್","ಟ್a":"ಟ","ಟa":"ಟಾ","ಟ್A":"ಟಾ","ಟ್i":"ಟಿ","ಟ್I":"ಟೀ","ಟ್u":"ಟು","ಟ್U":"ಟೂ","ಟ್e":"ಟೆ","ಟ್E":"ಟೇ","ಟi":"ಟೈ","ಟ್o":"ಟೊ","ಟ್O":"ಟೋ","ಟu":"ಟೌ","ಟM":"ಟಂ","ಟH":"ಟಃ","ಟ್R":"ಟೃ","ಟೃu":"ಟೃ","ಟ್h":"ಠ್","ಠ್a":"ಠ","ಠa":"ಠಾ","ಠ್A":"ಠಾ","ಠ್i":"ಠಿ","ಠ್I":"ಠೀ","ಠ್u":"ಠು","ಠ್U":"ಠೂ","ಠ್e":"ಠೆ","ಠ್E":"ಠೇ","ಠi":"ಠೈ","ಠ್o":"ಠೊ","ಠ್O":"ಠೋ","ಠu":"ಠೌ","ಠM":"ಠಂ","ಠH":"ಠಃ","ಠ್R":"ಠೃ","ಠೃu":"ಠೃ","D":"ಡ್","ಡ್a":"ಡ","ಡa":"ಡಾ","ಡ್A":"ಡಾ","ಡ್i":"ಡಿ","ಡ್I":"ಡೀ","ಡ್u":"ಡು","ಡ್U":"ಡೂ","ಡ್e":"ಡೆ","ಡ್E":"ಡೇ","ಡi":"ಡೈ","ಡ್o":"ಡೊ","ಡ್O":"ಡೋ","ಡu":"ಡೌ","ಡM":"ಡಂ","ಡH":"ಡಃ","ಡ್R":"ಡೃ","ಡೃu":"ಡೃ","ಡ್h":"ಢ್","ಢ್a":"ಢ","ಢa":"ಢಾ","ಢ್A":"ಢಾ","ಢ್i":"ಢಿ","ಢ್I":"ಢೀ","ಢ್u":"ಢು","ಢ್U":"ಢೂ","ಢ್e":"ಢೆ","ಢ್E":"ಢೇ","ಢi":"ಢೈ","ಢ್o":"ಢೊ","ಢ್O":"ಢೋ","ಢu":"ಢೌ","ಢM":"ಢಂ","ಢH":"ಢಃ","ಢ್R":"ಢೃ","ಢೃu":"ಢೃ","N":"ಣ್","ಣ್a":"ಣ","ಣ್A":"ಣಾ","ಣa":"ಣಾ","ಣ್i":"ಣಿ","ಣ್I":"ಣೀ","ಣ್u":"ಣು","ಣ್U":"ಣೂ","ಣ್e":"ಣೆ","ಣ್E":"ಣೇ","ಣi":"ಣೈ","ಣ್o":"ಣೊ","ಣ್O":"ಣೋ","ಣu":"ಣೌ","ಣM":"ಣಂ","ಣH":"ಣಃ","ಣ್R":"ಣೃ","ಣೃu":"ಣೃ",'; amhaHash += '"t":"ತ್","ತ್a":"ತ","ತ್A":"ತಾ","ತa":"ತಾ","ತ್i":"ತಿ","ತ್I":"ತೀ","ತ್u":"ತು","ತ್U":"ತೂ","ತ್e":"ತೆ","ತ್E":"ತೇ","ತi":"ತೈ","ತ್o":"ತೊ","ತ್O":"ತೋ","ತu":"ತೌ","ತM":"ತಂ","ತH":"ತಃ","ತ್R":"ತೃ","ತೃu":"ತೃ","ತ್h":"ಥ್","ಥ್a":"ಥ","ಥ್A":"ಥಾ","ಥa":"ಥಾ","ಥ್i":"ಥಿ","ಥ್I":"ಥೀ","ಥ್u":"ಥು","ಥ್U":"ಥೂ","ಥ್e":"ಥೆ","ಥ್E":"ಥೇ","ಥi":"ಥೈ","ಥ್o":"ಥೊ","ಥ್O":"ಥೋ","ಥu":"ಥೌ","ಥM":"ಥಂ","ಥH":"ಥಃ","ಥ್R":"ಥೃ","ಥೃu":"ಥೃ","d":"ದ್","ದ್a":"ದ","ದa":"ದಾ","ದ್A":"ದಾ","ದ್i":"ದಿ","ದ್I":"ದೀ","ದ್u":"ದು","ದ್U":"ದೂ","ದ್e":"ದೆ","ದ್E":"ದೇ","ದi":"ದೈ","ದ್o":"ದೊ","ದ್O":"ದೋ","ದu":"ದೌ","ದM":"ದಂ","ದH":"ದಃ","ದ್R":"ದೃ","ದೃu":"ದೃ","ದ್h":"ಧ್","ಧ್a":"ಧ","ಧa":"ಧಾ","ಧ್A":"ಧಾ","ಧ್i":"ಧಿ","ಧ್I":"ಧೀ","ಧ್u":"ಧು","ಧ್U":"ಧೂ","ಧ್e":"ಧೆ","ಧ್E":"ಧೇ","ಧi":"ಧೈ","ಧ್o":"ಧೊ","ಧ್O":"ಧೋ","ಧu":"ಧೌ","ಧM":"ಧಂ","ಧH":"ಧಃ","ಧ್R":"ಧೃ","ಧೃu":"ಧೃ","n":"ನ್","ನ್a":"ನ","ನa":"ನಾ","ನ್A":"ನಾ","ನ್i":"ನಿ","ನ್I":"ನೀ","ನ್u":"ನು","ನ್U":"ನೂ","ನ್e":"ನೆ","ನ್E":"ನೇ","ನi":"ನೈ","ನ್o":"ನೊ","ನ್O":"ನೋ","ನu":"ನೌ","ನM":"ನಂ","ನH":"ನಃ","ನ್R":"ನೃ","ನೃu":"ನೃ",'; amhaHash += '"p":"ಪ್","ಪ್a":"ಪ","ಪa":"ಪಾ","ಪ್A":"ಪಾ","ಪ್i":"ಪಿ","ಪ್I":"ಪೀ","ಪ್u":"ಪು","ಪ್U":"ಪೂ","ಪ್e":"ಪೆ","ಪ್E":"ಪೇ","ಪi":"ಪೈ","ಪ್o":"ಪೊ","ಪ್O":"ಪೋ","ಪu":"ಪೌ","ಪM":"ಪಂ","ಪH":"ಪಃ","ಪ್R":"ಪೃ","ಪೃu":"ಪೃ","ಪೃU":"ಪೄ","P":"ಫ್","ಪ್h":"ಫ್","ಫ್a":"ಫ","ಫa":"ಫಾ","ಫ್A":"ಫಾ","ಫ್i":"ಫಿ","ಫ್I":"ಫೀ","ಫ್u":"ಫು","ಫ್U":"ಫೂ","ಫ್e":"ಫೆ","ಫ್E":"ಫೇ","ಫi":"ಫೈ","ಫ್o":"ಫೊ","ಫ್O":"ಫೋ","ಫu":"ಫೌ","ಫM":"ಫಂ","ಫH":"ಫಃ","ಫ್R":"ಫೃ","ಫೃu":"ಫೃ","f":"ಫ್","F":"ಫ್","b":"ಬ್","ಬ್a":"ಬ","ಬ್A":"ಬಾ","ಬa":"ಬಾ","ಬ್i":"ಬಿ","ಬ್I":"ಬೀ","ಬ್u":"ಬು","ಬ್U":"ಬೂ","ಬ್e":"ಬೆ","ಬ್E":"ಬೇ","ಬi":"ಬೈ","ಬ್o":"ಬೊ","ಬ್O":"ಬೋ","ಬu":"ಬೌ","ಬM":"ಬಂ","ಬH":"ಬಃ","ಬ್R":"ಬೃ","ಬೃu":"ಬೃ","B":"ಭ್","ಬ್h":"ಭ್","ಭ್a":"ಭ","ಭ್A":"ಭಾ","ಭa":"ಭಾ","ಭ್i":"ಭಿ","ಭ್I":"ಭೀ","ಭ್u":"ಭು","ಭ್U":"ಭೂ","ಭ್e":"ಭೆ","ಭ್E":"ಭೇ","ಭi":"ಭೈ","ಭ್o":"ಭೊ","ಭ್O":"ಭೋ","ಭu":"ಭೌ","ಭM":"ಭಂ","ಭH":"ಭಃ","ಭ್R":"ಭೃ","ಭೃu":"ಭೃ","m":"ಮ್","ಮ್a":"ಮ","ಮ್A":"ಮಾ","ಮa":"ಮಾ","ಮ್i":"ಮಿ","ಮ್I":"ಮೀ","ಮ್u":"ಮು","ಮ್U":"ಮೂ","ಮ್e":"ಮೆ","ಮ್E":"ಮೇ","ಮi":"ಮೈ","ಮ್o":"ಮೊ","ಮ್O":"ಮೋ","ಮu":"ಮೌ","ಮM":"ಮಂ","ಮH":"ಮಃ","ಮ್R":"ಮೃ","ಮೃu":"ಮೃ",'; amhaHash += '"y":"ಯ್","ಯ್a":"ಯ","ಯ್A":"ಯಾ","ಯa":"ಯಾ","ಯ್i":"ಯಿ","ಯ್I":"ಯೀ","ಯ್u":"ಯು","ಯ್U":"ಯೂ","ಯ್e":"ಯೆ","ಯ್E":"ಯೇ","ಯi":"ಯೈ","ಯ್o":"ಯೊ","ಯ್O":"ಯೋ","ಯu":"ಯೌ","ಯM":"ಯಂ","ಯH":"ಯಃ","ಯ್R":"ಯೃ","ಯೃu":"ಯೃ","r":"ರ್","ರ್a":"ರ","ರ್A":"ರಾ","ರa":"ರಾ","ರ್i":"ರಿ","ರ್I":"ರೀ","ರ್u":"ರು","ರ್U":"ರೂ","ರ್e":"ರೆ","ರ್E":"ರೇ","ರi":"ರೈ","ರ್o":"ರೊ","ರ್O":"ರೋ","ರu":"ರೌ","ರM":"ರಂ","ರH":"ರಃ","ರ್R":"ರೃ","ರೃu":"ರೃ","l":"ಲ್","ಲ್a":"ಲ","ಲ್A":"ಲಾ","ಲa":"ಲಾ","ಲ್i":"ಲಿ","ಲ್I":"ಲೀ","ಲ್u":"ಲು","ಲ್U":"ಲೂ","ಲ್e":"ಲೆ","ಲ್E":"ಲೇ","ಲi":"ಲೈ","ಲ್o":"ಲೊ","ಲ್O":"ಲೋ","ಲu":"ಲೌ","ಲM":"ಲಂ","ಲH":"ಲಃ","ಲ್R":"ಲೃ","ಲೃu":"ಲೃ","v":"ವ್","ವ್a":"ವ","ವa":"ವಾ","ವ್A":"ವಾ","ವ್i":"ವಿ","ವ್I":"ವೀ","ವ್u":"ವು","ವ್U":"ವೂ","ವ್e":"ವೆ","ವ್E":"ವೇ","ವi":"ವೈ","ವ್o":"ವೊ","ವ್O":"ವೋ","ವu":"ವೌ","ವM":"ವಂ","ವ್H":"ವಃ","ವ್R":"ವೃ","ವೃu":"ವೃ","V":"ವ್","w":"ವ್","W":"ವ್","S":"ಶ್","ಶ್a":"ಶ","ಶ್A":"ಶಾ","ಶa":"ಶಾ","ಶ್i":"ಶಿ","ಶ್I":"ಶೀ","ಶ್u":"ಶು","ಶ್U":"ಶೂ","ಶ್e":"ಶೆ","ಶ್E":"ಶೇ","ಶi":"ಶೈ","ಶ್o":"ಶೊ","ಶ್O":"ಶೋ","ಶu":"ಶೌ","ಶM":"ಶಂ","ಶH":"ಶಃ","ಶ್R":"ಶೃ","ಶೃu":"ಶೃ","ಸ್h":"ಶ್",'; amhaHash += '"ಶ್h":"ಷ್","ಷ್a":"ಷ","ಷ್A":"ಷಾ","ಷa":"ಷಾ","ಷ್i":"ಷಿ","ಷ್I":"ಷೀ","ಷ್u":"ಷು","ಷ್U":"ಷೂ","ಷ್e":"ಷೆ","ಷ್E":"ಷೇ","ಷi":"ಷೈ","ಷ್o":"ಷೊ","ಷ್O":"ಷೋ","ಷu":"ಷೌ","ಷM":"ಷಂ","ಷH":"ಷಃ","ಷ್R":"ಷೃ","ಷೃu":"ಷೃ","s":"ಸ್","ಸ್a":"ಸ","ಸ್A":"ಸಾ","ಸa":"ಸಾ","ಸ್i":"ಸಿ","ಸ್I":"ಸೀ","ಸ್u":"ಸು","ಸ್U":"ಸೂ","ಸ್e":"ಸೆ","ಸ್E":"ಸೇ","ಸi":"ಸೈ","ಸ್o":"ಸೊ","ಸ್O":"ಸೋ","ಸu":"ಸೌ","ಸM":"ಸಂ","ಸH":"ಸಃ","ಸ್R":"ಸೃ","ಸೃu":"ಸೃ","h":"ಹ್","ಹ್a":"ಹ","ಹ್A":"ಹಾ","ಹa":"ಹಾ","ಹ್i":"ಹಿ","ಹ್I":"ಹೀ","ಹ್u":"ಹು","ಹ್U":"ಹೂ","ಹ್e":"ಹೆ","ಹ್E":"ಹೇ","ಹi":"ಹೈ","ಹ್o":"ಹೊ","ಹ್O":"ಹೋ","ಹu":"ಹೌ","ಹM":"ಹಂ","ಹH":"ಹಃ","ಹ್R":"ಹೃ","ಹೃu":"ಹೃ","L":"ಳ್","ಳ್a":"ಳ","ಳ್A":"ಳಾ","ಳa":"ಳಾ","ಳ್i":"ಳಿ","ಳ್I":"ಳೀ","ಳ್u":"ಳು","ಳ್U":"ಳೂ","ಳ್e":"ಳೆ","ಳ್E":"ಳೇ","ಳi":"ಳೈ","ಳ್o":"ಳೊ","ಳ್O":"ಳೋ","ಳu":"ಳೌ","ಳM":"ಳಂ","ಳH":"ಳಃ","ಳ್R":"ಳೃ","ಳೃu":"ಳೃ",'; amhaHash += '"a":"ಅ","ಅa":"ಆ","A":"ಆ","i":"ಇ","I":"ಈ","u":"ಉ","U":"ಊ","R":"ಋ","ಋu":"ಋ","e":"ಎ","E":"ಏ","ಅi":"ಐ","o":"ಒ","O":"ಓ","ಅu":"ಔ","ಒu":"ಔ","M":"ಂ","H":"ಃ","1":"೧","2":"೨","3":"೩","4":"೪","5":"೫","6":"೬","7":"೭","8":"೮","9":"೯","0":"೦","\u0CCD^":"\u0CCD\u200C","\u200C^":"\u200C","&":"\u200D","़c":"\u0C58","़j":"\u0C59","@":"॰","॰M":"ఁ","^":"‍","॰n":"్","q":"","Q":""}';

    var conversionHash = undefined;
    var maxcyrlength = 0;

    function getConversionHash() {
        if (conversionHash == undefined) {
            conversionHash = eval("(" + amhaHash + ")");
            maxcyrlength = 6;
        }

        return conversionHash;
    }

    function to_cyrillic(src, output, chunks) {
        if (src == undefined || src == "" || src == null)
            return src;
        if (output == undefined)
            output = new String();

        var hash = getConversionHash();

        var location = 0;

        while (location < src.length) {
            var len = Math.min(maxcyrlength, src.length - location);
            var arr = undefined;
            var sub;
            while (len > 0) {
                sub = src.substr(location, len);
                arr = hash[sub];
                if (arr != undefined)
                    break;
                else
                    len--;
            }

            // need this for translit on the fly
            if (chunks != undefined)
                chunks[chunks.length] = sub;

            if (arr == undefined) {
                output += sub;
                location++;
            }
            else {

                // case analysis
                var newChar = arr;

                if (sub.toLowerCase() == sub.toUpperCase() && arr.length > 1 && arr[1] && (newChar.toUpperCase() != newChar.toLowerCase())) {

                    // need translit hash to determine if previous character (and possibly the one before it) 
                    // were converted and are in upper case

                    // set prevDud to true previous is not a translated character or simply a blank
                    // set prevCap to true if previous was translated and was upper case

                    var prevCh = output.length == 0 ? null : output.substr(output.length - 1, 1);
                    var prevDud = !prevCh || !getTranslitString(prevCh);
                    var prevCap = (!prevDud && prevCh == prevCh.toUpperCase());

                    // sub is caseless but result isn't. case will depend on lookbehind and lookahead
                    if (prevDud || !prevCap) {
                        output += newChar.toLowerCase();
                        prevCap = false;
                    }
                    else {
                        var next = " ";
                        if (location + len < src.length)
                            next = src.substr(location + len, 1);

                        if (next != next.toUpperCase() && next == next.toLowerCase()) {
                            //next is lowercase (and not caseless)
                            output += newChar.toLowerCase();
                        }
                        else if (next == next.toUpperCase() && next != next.toLowerCase()) {
                            // next is uppercase (and not caseless)
                            output += newChar.toUpperCase();
                        }
                        else {
                            // next is caseless. output case determined by the case of output[length - 2]
                            var pprevCh = output.length == 1 ? null : output.substr(output.length - 2, 1);
                            var pprevDud = !pprevCh || !getTranslitString(pprevCh);
                            if (!pprevDud && (pprevCh == pprevCh.toUpperCase())) {
                                //pre-prev is in upper case. output is also uppercase
                                output += newChar.toUpperCase();
                            }
                            else {
                                output += newChar.toLowerCase();
                            }

                        }
                    }

                }
                else if ((sub.toLowerCase() == sub.toUpperCase()) && (arr.length < 2 || !arr[1])) {

                    // literal treatment of newChar
                    output += newChar;

                }
                else if (sub != sub.toLowerCase()) {

                    // sub not all-lowercase
                    output += newChar.toUpperCase();
                }
                else {



                    // sub is lowercase
                    output += newChar.toLowerCase();
                }
                location += len;
            }
        }

        return output;
    }


    function convertIt(src, converter) {
        var resultbuffer = "";
        for (var i = 0; i < src.length; i++) {
            resultbuffer = converter(resultbuffer + src[i]);
        }
        return converter(resultbuffer);

    }

    var translitHash = undefined;

    function initTranslit() {
        if (translitHash == undefined) {
            translitHash = new Array();

            for (var i = 0; i < conversionHash.length; i++) {
                var ch = conversionHash[i][1];
                // if the translit string is not caseless, convert cyr string to upper case
                // otherwise maintain its case
                if (conversionHash[i][0].toUpperCase() != conversionHash[i][0].toLowerCase())
                    ch = ch.toUpperCase();

                if (translitHash[ch] == undefined)
                    translitHash[ch] = conversionHash[i][0];
            }
        }
    }


    //-- translit on-the-fly -- 

    function replaceValue(node, value, stepback) {
        if (stepback == undefined)
            stepback = 0;

        if (isExplorer()) {
            var range = document.selection.createRange();
            range.moveStart("character", -stepback);
            range.text = value;
            range.collapse(false);
            range.select();
        }
        else {
            var scrollTop = node.scrollTop;
            var cursorLoc = node.selectionStart;
            node.value = node.value.substring(0, node.selectionStart - stepback) + value +
                node.value.substring(node.selectionEnd, node.value.length);
            node.scrollTop = scrollTop;
            node.selectionStart = cursorLoc + value.length - stepback;
            node.selectionEnd = cursorLoc + value.length - stepback;
        }
    }


    // compare positions
    function positionIsEqual(other) {
        if (isExplorer())
            return this.position.isEqual(other.position);
        else
            return this.position == other.position;

    }

    function Position(node) {
        if (node.selectionStart != undefined)
            this.position = node.selectionStart;
        else if (document.selection && document.selection.createRange())
            this.position = document.selection.createRange();

        this.isEqual = positionIsEqual;
    }

    function resetState() {
        this.position = new Position(this.node);
        this.transBuffer = "";
        this.cyrBuffer = "";
    }

    function StateObject(node) {
        this.node = node;
        this.reset = resetState;
        this.cyrBuffer = "";
        this.transBuffer = "";
        this.position = new Position(node);
    }


    var stateHash = new Array();

    function isExplorer() {
        return (document.selection != undefined && document.selection.createRange().isEqual != undefined);
    }

    function pressedKey(event) {
        if (isExplorer())
            return event.keyCode;
        else
            return event.which;
    }

    function translitonkey(event) {
        if (event == undefined)
            event = window.event;

        var node = null;
        if (event.target)
            node = event.target;
        else if (event.srcElement)
            node = event.srcElement;



        // initialize state
        var state = stateHash[node];
        if (state == null) {
            state = new StateObject(node);
            stateHash[node] = state;
        }
        if ((pressedKey(event) > 20) && !event.ctrlKey && !event.altKey && !event.metaKey) {

            var c = String.fromCharCode(pressedKey(event));

            // process input
            var result = process_translit(state, c);
            // finish up
            if (c != result.out || result.replace != 0) {
                if (isExplorer())
                    event.returnValue = false;
                else
                    event.preventDefault();

                replaceValue(node, result.out, result.replace);

                state.position = new Position(node);

            }
        }

    }

    function translitResult() {
        this.out = "";
        this.replace = 0;
    }

    function process_translit(state, c) {
        // reset state if position changed
        if (!state.position.isEqual(new Position(state.node)))
            state.reset();

        var result = new translitResult();

        // initial backbuffer. Add to it as characters are converted
        var backbuffer = getBackBuffer(state.node, state.cyrBuffer.length, 2);
        var chunks = new Array();

        state.transBuffer = state.transBuffer + c

        var str = to_cyrillic(state.cyrBuffer + c, backbuffer, chunks);

        // remove backbuffer from output
        str = str.substr(backbuffer.length);
        result.out = str;
        /* str is now left alone - it has the output matching contents of chunks and 
        will be used to reinitialize backbuffers, along with chunks and state.transBuffer
        */

        // get the difference between state.cyrBuffer and output
        for (var i = 0; i < Math.min(state.cyrBuffer.length, result.out.length); i++) {
            if (state.cyrBuffer.substr(i, 1) != result.out.substr(i, 1)) {
                result.replace = state.cyrBuffer.length - i;
                result.out = result.out.substr(i);
                break;
            }
        }
        if (result.replace == 0) {
            if (result.out.length < state.cyrBuffer.length)
                result.replace = state.cyrBuffer.length - result.out.length;
            result.out = result.out.substr(Math.min(state.cyrBuffer.length, result.out.length));

            //    result.out+="\u0008"

        }

        // update state: backbuffer, bufferArray
        if (chunks.length > 0 && chunks[chunks.length - 1] == result.out.substr(result.out.length - 1)) {
            // no convertion took place, reset state
            state.reset();
        }
        else {
            while (state.transBuffer.length > maxcyrlength) {
                state.transBuffer = state.transBuffer.substr(chunks[0].length);
                chunks.shift();
                str = str.substr(1);
            }
            state.cyrBuffer = str;
        }
        return result;
    }

    function getBackBuffer(node, offset, count) {
        if (isExplorer()) { //.tagName.toUpperCase() == "EDITOR") {

            var range = document.selection.createRange();
            range.moveStart("character", -offset);
            var result = range.text.substr(-count);
            if (!result)
                result = "";

            return result;

        } else {
            return node.value.substring(0, node.selectionStart - offset).substr(-count);
        }
    }

    this.Transliterate = translitonkey;
}();
