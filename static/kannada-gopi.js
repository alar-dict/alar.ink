/*  Gopi's Unicode Converters Version 3.2
    Copyright (C) 2011 Gopalakrishnan (Gopi) http://www.higopi.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Further to the terms mentioned you should leave this copyright notice
    intact, stating me as the original author.
*/
var isIE = document.all ? true : false;
var myimg = new Image();
var sPos = 0;
var kbmode = "roman";
var pkbmode = "roman";
var SplKeys = {"ZR": 0, "BS": 8, "CR": 13};


function getStyleObject(objectId) {
	// cross-browser function to get an object's style object given its
	if (document.getElementById && document.getElementById(objectId)) {
		// W3C DOM
		return document.getElementById(objectId).style;
	} else if (document.all && document.all(objectId)) {
		// MSIE 4 DOM
		return document.all(objectId).style;
	} else if (document.layers && document.layers[objectId]) {
		// NN 4 DOM.. note: this won't find nested layers
		return document.layers[objectId];
	} else {
		return false;
	}
} // getStyleObject


function showMap(obj) {
	savepref = eval('document.' + obj.form.name + '.savepref');
	if (savepref != null) {
		savepref.disabled = false;
		savepref.onclick = savePref;
	}

	if (!obj.checked) { hideMap(); return; }

	if (document.getElementById('KeyMapDiv') == null) {
		mapdiv = document.createElement('div');
		mapdiv.setAttribute('id', 'KeyMapDiv');
		mapdiv.setAttribute('align', 'left');
		mapdiv.onmousedown = downMap;
		mapdiv.onmouseup = upMap;
		bdy = document.getElementsByTagName('BODY')[0];
		bdy.appendChild(mapdiv);

		mapstyle = getStyleObject('KeyMapDiv');
		mapstyle.width = '140px';
		mapstyle.backgroundColor = '#FFFFFF';
		mapstyle.position = 'absolute';
		mapstyle.cursor = 'move';
	}
	else {
		mapdiv = document.getElementById('KeyMapDiv');
		mapstyle = getStyleObject('KeyMapDiv');
	}
	mapdiv.innerHTML = '<table border="0" cellpadding="0" cellspacing="0" style="border:3px solid #0e88af;background-color:#ffffff;width:100%;"><tr>'
		+ '<td style="background-color:#0e88af;color:#ffffff;" nowrap="nowrap"><b>&nbsp;Keypad Map - '
		+ lang.substring(0, 1).toUpperCase() + lang.substring(1) + '</b></td><td bgcolor="#0e88af" nowrap="nowrap" width="20" align="right">'
		+ '<div align="right" onclick="hideMap()" style="padding:2px;width:20px;text-align:right;background-color:#0e88af;color:#ffffff;cursor:default">'
		+ '<b> &nbsp; X &nbsp; </b></div></td></tr><tr><td colspan="2" align="center"><img name="KeyMap" src=' + myimg.src
		+ ' style="display:block"></td></tr></table>';
	mapstyle.left = '100px';
	if (isIE) { mapstyle.pixelTop = document.body.scrollTop + 100; }
	else { mapstyle.top = window.pageYOffset + 100 + "px"; }
	mapstyle.display = 'inline';
}

function moveMap(e) {
	mapdiv = document.getElementById('KeyMapDiv');
	mapstyle = getStyleObject('KeyMapDiv');

	if (!e) e = window.event;
	if (dragok) {
		if (isIE) { mapstyle.left = dx + e.clientX - tempX + "px"; mapstyle.top = dy + e.clientY - tempY + "px"; }
		else { mapstyle.left = dx + e.pageX - tempX + "px"; mapstyle.top = dy + e.pageY - tempY + "px"; }
		return false;
	}
}

var dx, dy, tempX, tempY;
var dragok = false;
var n = 500;

function downMap(e) {
	mapdiv = document.getElementById('KeyMapDiv');
	mapstyle = getStyleObject('KeyMapDiv');
	dragok = true;
	mapstyle.zIndex = n++;
	dx = parseInt(mapstyle.left + 0);
	dy = parseInt(mapstyle.top + 0);
	if (!e) e = window.event;
	if (isIE) { tempX = e.clientX; tempY = e.clientY; }
	else { tempX = e.pageX; tempY = e.pageY; }

	document.onmousemove = moveMap;

	return false;
}

function upMap() {
	dragok = false;
	document.onmousemove = null;
}

function hideMap() {
	mapstyle = getStyleObject('KeyMapDiv');
	mapstyle.display = 'none';
	if (document.post != null && document.post.showmap != null) {
		document.post.showmap.checked = false;
		if (document.post.savepref != null) {
			document.post.savepref.disabled = false;
			document.post.savepref.onclick = savePref;
		}
	}
}

function isEnglish(elem) {
	var alphaExp = /[a-zA-Z]+/;
	if (elem.match(alphaExp))
		return true;
	else
		return false;
}


function convertThis(e, numchar) {
	if (!isIE)
		Key = e.which;
	else
		Key = e.keyCode;
	Char = String.fromCharCode(Key);
	if (typeof numchar == "undefined")
		numchar = 4;
	if (isIE) {
		//IE9 processs the event faster. so cancel the bubble first and then process the key
		e.cancelBubble = true;
		e.returnValue = false;
		myField = e.srcElement;
		myField.caretPos = document.selection.createRange().duplicate();
		prevChar = myField.caretPos.text;
		diff = 0;
		cpos = getCursorPosition(myField);
		if (prevChar.length != 0)
			document.selection.clear();
		if (myField.value.length != 0 && cpos != "1,1") {
			myField.caretPos.moveStart('character', -1);
			prevChar = myField.caretPos.text;
			diff++;
		}
		if (prevChar == chnbin) {
			myField.caretPos.moveStart('character', -1);
			prevChar = myField.caretPos.text;
			diff++;
		}

		if (cpos[1] > numchar) {
			prevPrevChar = prevChar;
			myField.caretPos.moveStart('character', diff - numchar);
			prevChar = myField.caretPos.text;
			if (isEnglish(prevChar)) {
				prevChar = prevPrevChar;
				myField.caretPos.moveStart('character', numchar - diff);
			}
		}
		if (prevChar == "" && cpos != "1,1")
			prevChar = "\u000A";
		if (Key == 13)
			Char = "\u000A";

		myField.caretPos.text = getLang(prevChar, Char, 0)
	}
	else {
		myField = e.target;
		if (myField.selectionStart >= 0) {
			if (isSplKey(Key) || e.ctrlKey)
				return true;
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			txtTop = myField.scrollTop;
			if (myField.value.length == 0) {
				prevChar = "";
				myField.value = getLang(prevChar, Char, startPos)
			}
			else {
				prevChar = myField.value.substring(startPos - 1, startPos);
				prevStr = myField.value.substring(0, startPos - 1);

				// here.
				if (prevChar == chnbin) {
					prevChar = myField.value.substring(startPos - 2, startPos);
					prevStr = myField.value.substring(0, startPos - 2);
				}
				cpos = getCursorPosition(myField);
				if (cpos[1] >= numchar) {
					prevChar = myField.value.substring(startPos - numchar, startPos);
					prevStr = myField.value.substring(0, startPos - numchar);
					if (isEnglish(prevChar)) {
						prevChar = myField.value.substring(startPos - 1, startPos);
						prevStr = myField.value.substring(0, startPos - 1);
						if (prevChar == chnbin) {
							prevChar = myField.value.substring(startPos - 2, startPos);
							prevStr = myField.value.substring(0, startPos - 2);
						}
					}
				}
				myField.value = prevStr + getLang(prevChar, Char, myField.selectionStart)
					+ myField.value.substring(endPos, myField.value.length);
			}
			myField.selectionStart = sPos;
			myField.selectionEnd = sPos;
			if ((myField.scrollHeight + 4) + "px" != myField.style.height)
				myField.scrollTop = txtTop;
			e.stopPropagation();
			e.preventDefault();
		}
	}
	// showCombi(e)
}

function isSplKey(keynum) {
	retVal = false;
	for (i in SplKeys) {
		if (keynum == SplKeys[i])
			retVal = true;
	}
	return retVal;
}

function getLang(prv, txt, sP) {
	sPos = sP;
	prvPrv = prv;
	if (kbmode == "english") {
		retTxt = prv + txt;
		sPos++;
	}
	else {
		if (pkbmode == "english") {
			retTxt = prv + mapLang(txt);
			pkbmode = "roman";
		}
		else {
			if (isEnglish(prvPrv))
				prv = "";
			retTxt = mapLang(prv + txt);
			if (isEnglish(prvPrv))
				retTxt = prvPrv + retTxt;
		}
	}
	return retTxt;
}


function mapLang(txt, sP, mod) {
	if (sP != null)
	sPos = sP;
	prvlen = txt.length;
	txtarr = ka;

	retTxt = "";
	for (itm in txtarr) {
		rexp = new RegExp(itm, "g");
		txt = txt.replace(rexp, txtarr[itm]);
	}
	sPos += (txt.length - prvlen + 1);
	return txt;
}

function getCursorPosition(textarea) {
	var txt = textarea.value;
	var len = txt.length;
	var erg = txt.split("\n");
	var pos = -1;
	if (typeof document.selection != "undefined") { // FOR MSIE
		range_sel = document.selection.createRange();
		range_obj = textarea.createTextRange();
		range_obj.moveToBookmark(range_sel.getBookmark());
		range_obj.moveEnd('character', textarea.value.length);
		pos = len - range_obj.text.length;
	}
	else if (typeof textarea.selectionStart != "undefined") { // FOR MOZILLA
		pos = textarea.selectionStart;
	}
	if (pos != -1) {
		for (ind = 0; ind < erg.length; ind++) {
			len = erg[ind].length + 1;
			if (pos < len)
				break;
			pos -= len;
		}
		ind++; pos++;
		return [ind, pos]; // ind = LINE, pos = COLUMN
	}
}

function showCombi(e) {
	if (document.getElementById('HelpDiv') == null) {
		helpdiv = document.createElement('div');
		helpdiv.setAttribute('id', 'HelpDiv');
		helpdiv.setAttribute('align', 'left');
		if (isIE) {
			bdy = e.srcElement.parentNode;
			bdy.insertBefore(helpdiv, e.srcElement);
		}
		else {
			bdy = e.target.parentNode;
			bdy.insertBefore(helpdiv, e.target);
		}

	}
	else {
		helpdiv = document.getElementById('HelpDiv');
	}
	helpstyle = getStyleObject('HelpDiv');

	prevWord = getLang(prevChar, Char, 0)
	if (isLangOtru(prevWord.substring(prevWord.length - 1)))
		prevWord = prevWord.substring(prevWord.length - 2)
	else
		prevWord = prevWord.substring(prevWord.length - 1)

	helptxt = "";
	prevLet = getLang(prevWord, Char, 0); prevLet = prevLet.substring(prevLet.length - 1);
	if (prevWord != "" && !isLangOtru(prevWord) && prevLet != getLang('', Char, 0)) {
		if (Char == 'a' || Char == 'i' || Char == 'u' || Char == 'e' || Char == 'o') {
			helptxt = '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + ' + Char + ' = <b>' + getLang(prevWord, Char, 0) + "</b></td>";
			if (Char == 'a')
				helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + i = <b>' + getLang(prevWord, 'i', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
					+ prevWord + ' + u = <b>' + getLang(prevWord, 'u', 0) + "</b></td>";
		}
		else if (Char != getLang('', Char, 0)) {
			helptxt = '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + a = <b>' + getLang(prevWord, 'a', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + A = <b>' + getLang(prevWord, 'A', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + i = <b>' + getLang(prevWord, 'i', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + I = <b>' + getLang(prevWord, 'I', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + u = <b>' + getLang(prevWord, 'u', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + U = <b>' + getLang(prevWord, 'U', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + e = <b>' + getLang(prevWord, 'e', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + E = <b>' + getLang(prevWord, 'E', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + a + i = <b>' + getLang(getLang(prevWord, 'a', 0), 'i', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + o = <b>' + getLang(prevWord, 'o', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + o = <b>' + getLang(prevWord, 'O', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + a + u = <b>' + getLang(getLang(prevWord, 'a', 0), 'u', 0) + "</b></td>"
			if (lang == 'tamil') {
				if (getLang('', 't', 0) == prevWord)
					helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + h = <b>' + getLang(prevWord, 'h', 0) + "</b></td>";
				if (getLang('', 's', 0) == prevWord)
					helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + h = <b>' + getLang(prevWord, 'h', 0) + "</b></td>";
				if (getLang('', 'S', 0) == prevWord)
					helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + r + I = <b>' + getLang(getLang(prevWord, 'r', 0), 'I', 0) + "</b></td>";
				if (getLang('k', 'n', 0).indexOf(prevWord) > 0)
					helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + t + h = <b>' + getLang(getLang(prevWord, 't', 0), 'h', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
						+ prevWord + ' + g = <b>' + getLang(prevWord, 'g', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
						+ prevWord + ' + j = <b>' + getLang(prevWord, 'j', 0) + "</b></td>";
			}
		}
		helpdiv.innerHTML = '<table cellpadding="2" cellspacing="0" border="0" style="border:1px solid #0DE8E9;background-color:#BDE8E9"><tr>' + helptxt + '</tr></table>';
		helpstyle.display = 'block';

	}
	else
		helpstyle.display = 'none';
}

function isLangOtru(letter) {
	isOtru = false;
	otruArr = new Array('\u200C',
		"\u0BCD", "\u0BBE", "\u0BBF", "\u0BC0", "\u0BC1", "\u0BC2", "\u0BC6", "\u0BC7", "\u0BC8", "\u0BCA", "\u0BCB", "\u0BCC", // Tamil
		"\u0C4D", "\u0C3E", "\u0C3F", "\u0C40", "\u0C41", "\u0C42", "\u0C46", "\u0C47", "\u0C48", "\u0C4A", "\u0C4B", "\u0C4C", "\u0C43", "\u0C44", "\u0C01", "\u0C02", "\u0C03",  //Telugu
		"\u094D", "\u093E", "\u093F", "\u0940", "\u0941", "\u0942", "\u0946", "\u0947", "\u0948", "\u094A", "\u094B", "\u094C", "\u0901", "\u0902", "\u0903",// Hindi
		"\u0D3E", "\u0D3F", "\u0D40", "\u0D41", "\u0D42", "\u0D43", "\u0D47", "\u0D46", "\u0D48", "\u0D4A", "\u0D4B", "\u0D4C", "\u0D4D", "\u0D02", "\u0D03",  //Malayalam
		"\u0CBE", "\u0CBF", "\u0CC0", "\u0CC1", "\u0CC2", "\u0CC3", "\u0CC4", "\u0CC6", "\u0CC7", "\u0CC8", "\u0CCA", "\u0CCB", "\u0CCD", "\u0CCC", "\u0C82", "\u0C83",//Kannada
		"\u0ABE", "\u0ABF", "\u0AC0", "\u0AC1", "\u0AC2", "\u0AC5", "\u0AC7", "\u0AC8", "\u0AC9", "\u0ACB", "\u0ACC", "\u0ACD", "\u0A81", "\u0A82", "\u0A83",//Gujarathi
		"\u0B3E", "\u0B3F", "\u0B40", "\u0B41", "\u0B42", "\u0B46", "\u0B47", "\u0B48", "\u0B4A", "\u0B4B", "\u0B4C", "\u0B4D", "\u0B01", "\u0B02", "\u0B03",//Oriya
		"\u09BE", "\u09BF", "\u09C0", "\u09C1", "\u09C2", "\u09C6", "\u09C7", "\u09C8", "\u09CA", "\u09CB", "\u09CC", "\u09CD", "\u0981", "\u0982", "\u0983",//Bengali
		"\u0A3E", "\u0A3F", "\u0A40", "\u0A41", "\u0A42", "\u0A46", "\u0A47", "\u0A48", "\u0A4A", "\u0A4B", "\u0A4C", "\u0A4D", "\u0A50", "\u0A03"//Punjabi
	);
	for (i = 0; i < otruArr.length; i++)
		if (otruArr[i] == letter)
			isOtru = true;
	return isOtru;
}

/*  Gopi's Unicode Converters Version 3.1
    Copyright (C) 2007  Gopalakrishnan (Gopi) http://www.higopi.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Further to the terms mentioned you should leave this copyright notice
    intact, stating me as the original author.
*/
var lang = "kannada";
var chnbin = "\u0CCD";
var ugar = "\u0CC1";
var uugar = "\u0CC2";

var ka = {
    "B": "b",
    "C": "c",
    "F": "ph",
    "f": "ph",
    "G": "g",
    "J": "j",
    "K": "k",
    "M": "m",
    "P": "p",
    "Q": "q",
    "V": "v",
    "W": "v",
    "w": "v",
    "X": "x",
    "Y": "y",
    "Z": "j",
    "z": "j",
    "k": "ಕ್",
    "c": "ಚ್",
    "T": "ಟ್",
    "D": "ಡ್",
    "N": "ಣ್",
    "t": "ತ್",
    "d": "ದ್",
    "n": "ನ್",
    "p": "ಪ್",
    "b": "ಬ್",
    "y": "ಯ್",
    "R": "ಱ್",
    "L": "ಳ್",
    "v": "ವ್",
    "s": "ಸ್",
    "S": "ಶ್",
    "H": "ಹ್",
    "x": "ಕ್ಶ್",
    "‍m": "ಂ",
    ":h": "ಃ",
    "m": "ಮ್",
    "ಕ್h": "ಖ್",
    "ಗ್h": "ಘ್",
    "ನ್g": "ಙ್",
    "ಚ್h": "ಛ್",
    "ಜ್h": "ಝ್",
    "ನ್j": "ಞ್",
    "ಟ್h": "ಠ್",
    "ಡ್h": "ಢ್",
    "ತ್h": "ಥ್",
    "ದ್h": "ಧ್",
    "ಪ್h": "ಫ್",
    "ಬ್h": "ಭ್",
    "ಸ್h": "ಷ್",
    "ಱ್r": "ಋ",
    "ಳ್l": "ಌ",
    "್ಋ": "ೃ",
    "h": "ಹ್",
    "j": "ಜ್",
    "g": "ಗ್",
    "r": "ರ್",
    "l": "ಲ್",
    "್a": "‌",
    "್i": "ಿ",
    "್u": "ು",
    "ಋu": "ೃ",
    "್e": "ೆ",
    "್o": "ೊ",
    "‌i": "ೈ",
    "‌u": "ೌ",
    "‌-": "‍",
    "‌:": ":",
    "-": "‍",
    "‌a": "ಾ",
    "ಿi": "ೀ",
    "ುu": "ೂ",
    "ೃu": "ೄ",
    "ೆe": "ೇ",
    "ೊo": "ೋ",
    "್A": "ಾ",
    "್I": "ೀ",
    "್U": "ೂ",
    "ಋU": "ೄ",
    "್E": "ೇ",
    "್O": "ೋ",
    "ಅi": "ಐ",
    "ಅu": "ಔ",
    "ಅa": "ಆ",
    "ಇi": "ಈ",
    "ಉu": "ಊ",
    "ಎe": "ಏ",
    "ಒo": "ಓ",
    "a": "ಅ",
    "A": "ಆ",
    "i": "ಇ",
    "I": "ಈ",
    "u": "ಉ",
    "U": "ಊ",
    "e": "ಎ",
    "E": "ಏ",
    "o": "ಒ",
    "O": "ಓ",
    "q": "ಕ್",
    "‍1": "೧",
    "‍2": "೨",
    "‍3": "೩",
    "‍4": "೪",
    "‍5": "೫",
    "‍6": "೬",
    "‍7": "೭",
    "‍8": "೮",
    "‍9": "೯",
    "‍0": "೦",
    "(.+)‌(.+)": "$1$2"
};
