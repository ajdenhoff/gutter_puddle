(function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var boardSlug = params.get("board") || "bookshelf";

  var pathTitle = document.getElementById("entry-path-title");
  var page = document.getElementById("entry-page");
  var meta = document.getElementById("entry-meta");
  var body = document.getElementById("entry-body");
  var external = document.getElementById("entry-external");
  var externalLink = document.getElementById("entry-external-link");
  var error = document.getElementById("entry-error");

  if (!slug) {
    error.hidden = false;
    return;
  }

  var query =
    '*[_type == "boardEntry" && slug.current == $slug && board->slug.current == $board][0]' +
    "{ title, author, publishedAt, url, body }";

  window
    .sanityQuery(query, { slug: slug, board: boardSlug })
    .then(function (entry) {
      if (!entry) {
        error.hidden = false;
        return;
      }

      document.title = "gutter puddle \\ " + boardSlug + " \\ " + entry.title;
      pathTitle.textContent = entry.title;

      var date = entry.publishedAt
        ? new Date(entry.publishedAt).toLocaleDateString()
        : "";
      meta.textContent = [entry.author, date].filter(Boolean).join(" · ");

      body.innerHTML = window.renderPortableText(entry.body);

      if (entry.url) {
        external.hidden = false;
        externalLink.href = entry.url;
      }

      page.hidden = false;
    })
    .catch(function (err) {
      console.error(err);
      error.hidden = false;
      error.textContent = "Could not load this entry.";
    });
})();
