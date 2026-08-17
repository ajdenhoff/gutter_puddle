(function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var pathTitle = document.getElementById("entry-path-title");
  var page = document.getElementById("entry-page");
  var meta = document.getElementById("entry-meta");
  var body = document.getElementById("entry-body");
  var external = document.getElementById("entry-external");
  var externalLink = document.getElementById("entry-external-link");
  var error = document.getElementById("entry-error");

  if (!slug) {
    error.hidden = false;
    pathTitle.textContent = "entry";
    return;
  }

  fetch("bookshelf.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load bookshelf.json");
      }
      return response.json();
    })
    .then(function (data) {
      var entry = (data.entries || []).find(function (item) {
        return item.slug === slug;
      });

      if (!entry) {
        error.hidden = false;
        pathTitle.textContent = "entry";
        return;
      }

      document.title = "gutter puddle \\ bookshelf \\ " + entry.title;
      pathTitle.textContent = entry.title;
      meta.textContent = [entry.author, entry.date].filter(Boolean).join(" · ");

      var paragraphs = entry.body || [];
      if (typeof paragraphs === "string") {
        paragraphs = [paragraphs];
      }

      paragraphs.forEach(function (text) {
        var paragraph = document.createElement("p");
        paragraph.textContent = text;
        body.appendChild(paragraph);
      });

      if (entry.url) {
        external.hidden = false;
        externalLink.href = entry.url;
      }

      page.hidden = false;
    })
    .catch(function () {
      error.hidden = false;
      error.textContent = "Could not load this entry.";
    });
})();
