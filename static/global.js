function transliterate(q, update) {
  fetch("/tl/kn/" + q)
    .then(
      function(response) {
        if (response.status !== 200) {
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          const res = data.result;
          if (!res || res.length === 0) {
            return;
          }
          // [{label, value}...]
          update(res.reduce((obj, v) => ([...obj, { label: v, value: v }]), []));
        });
      }
    ).catch(function(err) {
      console.log("error fetching:", err);
    });
}

function hasKannadaChar(str) {
  return /[\u0C80-\u0CFF]/.test(str);
}


(function() {
  var isAndroid = /android/ig.test(window.navigator.userAgent);
  // isAndroid = true;

  // Attach the transliterator to the search box.
  // document.querySelector("#q").onkeydown = function(e) {
  //   // Android doesn't send input events properly. Collate words by space
  //   // and transliterate them.
  //   if (isAndroid) {
  //     return;
  //   }

  //   transliterate(e.target.value);
  // };

  var form = document.querySelector(".search-form");
  if (!form) {
    return false;
  }


  autocomplete({
    input: document.querySelector("#q"),
    fetch: function(text, update) {
      transliterate(text.toLowerCase(), update);
    },
    onSelect: function(item) {
      this.input.value = item.label;
      search();
      return false;
    }
  });

  // Capture the form submit and send it as a canonical URL instead
  // of the ?q query param. 
  var isOn = false;
  function search() {
    // The autocomplete suggestion click doesn't fire a submit, but Enter
    // fires a submit. So to avoid double submits in autcomplete.onSelect(),
    // add a debounce.
    if (isOn) {
      return false;
    }
    isOn = true;
    window.setTimeout(function() {
      isOn = false;
    }, 50);

    var f = form.querySelector("input[name='q']");
    if (!f) {
      return false;
    }
    var q = encodeURIComponent(f.value.replace(/\s+/g, " ").trim()).replace(/%20/g, "+");
    document.location.href = form.getAttribute("action") + "/" + q;
    return false;
  }

  // Bind to form submit.
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    search();
  });
})();


(function() {
    const reMatchKannadaWord = new RegExp(/[\u0C80-\u0CFF]+/g);
    const reMatchNonKannadaBlobs = new RegExp(/[^\u0C80-\u0CFF]+/g);
  // In the results (definitions), if there are Kannada words, hyperlink
  // them to search.
  let defs = document.querySelectorAll(".defs .d");
  if (!defs || defs.length === 0) {
    return;
  }

  for (let i = 0; i < defs.length; i++) {
    // Go through each definition. Ignore the ASCII ones.
    if (!hasKannadaChar(defs[i].innerText)) {
      continue;
    }

    // Split the word and iterate through it, turning non-ASCII words into
    // hyperlinks;
    const parts = defs[i].innerText.split(" ");
    const s = document.createElement("span");

    parts.forEach((v) => {
      if (!hasKannadaChar(v)) {
        // ASCII word. Append the text as-is.
        s.appendChild(document.createTextNode(v));
      } else {
        // Non-ASCII word. Turn into a link.
        const a = document.createElement("a");

        // Some Kannada words have numbers or "." at the end of them
        // They need to be cleaned, else they'll be part of the query, and fudge results
        const kannadaWord = v.replace(reMatchNonKannadaBlobs, "");
        const nonKannadaTrailingSymbol = v.replace(reMatchKannadaWord,"");
        a.setAttribute("href", kannadaWord);
        a.appendChild(document.createTextNode(kannadaWord));
        s.appendChild(a);
        s.appendChild(document.createTextNode(nonKannadaTrailingSymbol));
      }

      // Append a space.
      s.appendChild(document.createTextNode(" "));
    });

    defs[i].innerHTML = "";
    defs[i].appendChild(s);
  }

})();
