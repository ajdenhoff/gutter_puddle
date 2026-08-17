// Minimal Sanity client using plain fetch — no build step or npm dependency
// required for the public site. Reads use the CDN API, which works for
// public datasets without an auth token.
(function () {
  function sanityQuery(query, params) {
    var config = window.SANITY_CONFIG;
    var base =
      "https://" +
      config.projectId +
      ".apicdn.sanity.io/v" +
      config.apiVersion +
      "/data/query/" +
      config.dataset;
    var url = base + "?query=" + encodeURIComponent(query);

    if (params) {
      Object.keys(params).forEach(function (key) {
        url += "&$" + key + "=" + encodeURIComponent(JSON.stringify(params[key]));
      });
    }

    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error("Sanity query failed: " + response.status);
      }
      return response.json();
    }).then(function (json) {
      return json.result;
    });
  }

  // Builds a CDN image URL from a Sanity image field, e.g.
  // { asset: { _ref: "image-abc123-800x600-jpg" } }
  function sanityImageUrl(imageField, width) {
    var ref = imageField && imageField.asset && imageField.asset._ref;
    if (!ref) {
      return "";
    }

    var withoutPrefix = ref.replace(/^image-/, "");
    var lastDash = withoutPrefix.lastIndexOf("-");
    var format = withoutPrefix.slice(lastDash + 1);
    var withoutFormat = withoutPrefix.slice(0, lastDash);
    var secondLastDash = withoutFormat.lastIndexOf("-");
    var assetId = withoutFormat.slice(0, secondLastDash);
    var dimensions = withoutFormat.slice(secondLastDash + 1);

    var config = window.SANITY_CONFIG;
    var url =
      "https://cdn.sanity.io/images/" +
      config.projectId +
      "/" +
      config.dataset +
      "/" +
      assetId +
      "-" +
      dimensions +
      "." +
      format;

    if (width) {
      url += "?w=" + width + "&auto=format";
    }

    return url;
  }

  window.sanityQuery = sanityQuery;
  window.sanityImageUrl = sanityImageUrl;
})();
