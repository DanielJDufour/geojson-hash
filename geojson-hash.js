function geojson_hash(geojson, options) {
  const hashfn = (function () {
    if (typeof options === "object" && typeof options.hasher === "function") {
      return options.hasher;
    }

    // see https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
    return function (str) {
      let hash = 0;
      if (str.length === 0) return hash;
      for (let i = 0; i < str.length; i++) {
        const chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // convert to a 32-bit integer
      }
      return hash;
    }
  })();

  let hashes = [];
  if (geojson.type === "FeatureCollection") {
    geojson.features.forEach(function (feature) {
      geojson_hash(feature, options).forEach(function (hash) {
        hashes.push(hash);
      });
    })
  } else if (geojson.type === "Feature") {
    hashes = hashes.concat(geojson_hash(geojson.geometry, options));
  } else if (geojson.type === "MultiPolygon") {
    geojson.coordinates.forEach(function (polygon) {
      hashes.push(hashfn(JSON.stringify(polygon)));
    });
  } else if (geojson.type === "Polygon") {
    hashes.push(hashfn(JSON.stringify(geojson.coordinates)));
  }
  return hashes;
}

if (typeof define === "function" && define.amd) {
  define(function() { return geojson_hash; });
}

if (typeof module === "object") {
  module.exports = geojson_hash;
  module.exports.default = geojson_hash;
  module.exports.geojson_hash = geojson_hash;
}

if (typeof self === "object") {
  self.geojson_hash = geojson_hash;
}

if (typeof window === "object") {
  window.geojson_hash = geojson_hash;
}