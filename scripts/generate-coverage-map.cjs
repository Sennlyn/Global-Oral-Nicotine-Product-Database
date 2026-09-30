// Natural Earth 1:110m, public domain. Keep all countries and both poles in view.
const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('scripts/research/countries.geojson', 'utf8'));
const paths = data.features.map(f => {
  const polygons = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polygons.flatMap(p => p.map(ring => ring.map(([lon, lat], i) => `${i ? 'L' : 'M'}${((lon+180)*3).toFixed(2)},${((90-lat)*3).toFixed(2)}`).join('')+'Z')).join('');
  return {id:f.properties.ADM0_A3, name:f.properties.ADMIN, d};
});
fs.writeFileSync('src/data/world-map-paths.json', JSON.stringify(paths));
