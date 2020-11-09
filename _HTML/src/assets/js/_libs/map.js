import 'leaflet/dist/leaflet';

export default (function () {
  $('.js-map').each(function (i, el) {
    const data = $(el).data();

    const map = L.map(el, {
      center: data.coords,
      zoom: data.zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer(
      'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=U48sMRw4dwC9DBgqQxxi',
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }
    ).addTo(map);

    const marker = L.marker(data.marker, {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/icons/marker-icon.png',
        shadowUrl: 'assets/icons/marker-shadow.png',
      }),
    }).addTo(map);
  });
})();
