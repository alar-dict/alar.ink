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

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    search();
  });
})();
