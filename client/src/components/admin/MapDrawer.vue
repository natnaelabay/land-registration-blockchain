<template>
  <div>
    <div id="map" class=""></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

export default {
  props: ["coordinates"],
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmF0aTEyMyIsImEiOiJja3ljdnh0Z20wdG9xMnhvOHZ4MHk4eDJmIn0.v7YdZ6yTgDcIchc_TuZPEg";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/light-v10", // style URL
      center: [-91.874, 42.76], // starting position
      zoom: 12, // starting zoom
    });

    map.on("load", () => {
      let data = [];
      for (let i = 0; i < this.coordinates.length; i++) {
        data.push([
          parseFloat(this.coordinates[i]),
          parseFloat(this.coordinates[i + 1]),
        ]);
        i++;
      }
      console.log(data)
      // Add a data source containing GeoJSON data.
      map.addSource("maine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            // These coordinates outline Maine.
            coordinates: [data],
          },
        },
      });

      // Add a new layer to visualize the polygon.
      map.addLayer({
        id: "maine",
        type: "fill",
        source: "maine", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5,
        },
      });
      // Add a black outline around the polygon.
      map.addLayer({
        id: "outline",
        type: "line",
        source: "maine",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    });

 
  },
};
</script>

<style scoped>
/* #map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
} */
</style>