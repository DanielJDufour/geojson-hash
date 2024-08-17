# geojson-hash
> Compute Hash for Each GeoJSON Primitive

## features
- compute hash for each polygon in multipolygon

## demo
tbd

## usage
```js
import geojson_hash from "geojson-hash";

const geojson = { type: 'Feature', properties: {…}, geometry: {…} };

geojson_hash(geojson);
[
  1513537198, // first polygon
  -758745827, // second polygon
  416108140,  // third polygon
  -1318335687 // fourth polygon
]
```