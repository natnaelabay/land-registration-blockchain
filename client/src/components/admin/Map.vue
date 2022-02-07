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
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmF0aTEyMyIsImEiOiJja3ljdnh0Z20wdG9xMnhvOHZ4MHk4eDJmIn0.v7YdZ6yTgDcIchc_TuZPEg";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-91.874, 42.76], // starting position [lng, lat]
      zoom: 12,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    map.addControl(draw);

    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);

    let self = this;
    function updateArea(e) {
      const data = draw.getAll();
      // const answer = document.getElementById("calculated-area");
      console.log(data);
      if (data.features.length > 0) {
        // const area = turf.area(data);
        self.$emit("areaSelected", data);
        // Restrict the area to 2 decimal points.
        // const rounded_area = Math.round(area * 100) / 100;
        // answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
      } else {
        // answer.innerHTML = "";
        // if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
      }
    }
  },
};
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>