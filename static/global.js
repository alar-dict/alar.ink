(function() {
    // Attach the transliterator to the search box.
    document.querySelector("#q").onkeypress = KNTranslit.Transliterate;

    var form = document.querySelector(".search-form");
    if(!form) {
        return false;
    }

    // Capture the form submit and send it as a canonical URL instead
    // of the ?q query param. 
    form.onsubmit = function() {
        var f = form.querySelector("input[name='q']");
        if(!f) {
            return false;
        }
        var q = encodeURIComponent(f.value.replace(/\s+/g, " ").trim()).replace(/%20/g, "+");
        document.location.href = form.getAttribute("action") + "/" + q;
        return false;
    };
})();
