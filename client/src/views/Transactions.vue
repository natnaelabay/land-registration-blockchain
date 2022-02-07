<template>
  <div class="wrapper p-5 bg-dark">
    <div class="mt-5">
      <div class="contain-me">
        <h1 class="text-center text-white mb-3">Transaction Distribution</h1>
      </div>
      <div
        class="contain-me"
        style="width: 80%; margin: 0px auto; position: relative; height: 25rem"
      >
        <div id="map" class=""></div>
      </div>
    </div>
    <div class="mt-5 text-dark">a</div>
    <div class="mt-5 container">
      <b-card class="text-center">
        <b-table :items="allTransactions" :fields="fields" caption-top>
          <template #table-caption>Recent Transactions</template>
          <template #cell(from)="row">
            {{
              row.item.from.slice(0, 5) +
              "....." +
              row.item.from.substring(30, row.item.from.length - 1)
            }}
          </template>
          <template #cell(to)="row">
            {{
              row.item.to.slice(0, 5) +
              "....." +
              row.item.to.substring(30, row.item.to.length - 1)
            }}
          </template>
        </b-table>
      </b-card>
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
export default {
  data() {
    return {
      fields: ["land_id", "from", "to"],
    };
  },
  computed: {
    allTransactions() {
      return this.$store.state.BChain.all_transactions.map((i) => {
        return {
          from: i[0],
          to: i[1],
          land_id: i[2],
        };
      });
    },
    coordinates() {
      return [];
    },
  },
  methods: {
    setupMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibmF0aTEyMyIsImEiOiJja3ljdnh0Z20wdG9xMnhvOHZ4MHk4eDJmIn0.v7YdZ6yTgDcIchc_TuZPEg";
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: [-91.874, 42.76], // starting position
        zoom: 13, // starting zoom
      });

      let features = [];

      let coordinates = this.$store.state.BChain.lands;
      console.log(coordinates);

      for (let i = 0; i < coordinates.length; i++) {
        let data = [];
        console.log(parseFloat(coordinates[i].coordinates[0]));
        data.push(parseFloat(coordinates[i].coordinates[0]));
        data.push(parseFloat(coordinates[i].coordinates[1]));

        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: data,
          },
          properties: {
            title: "Mapbox",
            description: "Transaction",
          },
        });
      }

      const geojson = {
        type: "FeatureCollection",
        features: features,
      };

      map.on("load", () => {
        map.loadImage(
          "https://i.imgur.com/MK4NUzI.png",
          function (error, image) {
            //this is where we load the image file
            if (error) throw error;
            map.addImage("custom-marker", image); //this is where we name the image file we are loading
            map.addLayer({
              id: "markers",
              class: "marker", //this is the name of the layer, it is what we will reference below
              type: "symbol",
              source: {
                //now we are adding the source to the layer more directly and cleanly
                type: "geojson",
                data: geojson, // CHANGE THIS TO REFLECT WHERE YOUR DATA IS COMING FROM
              },
              layout: {
                "icon-image": "custom-marker", // the name of image file we used above
                "icon-allow-overlap": false,
                "icon-size": 0.5, //this is a multiplier applied to the standard size. So if you want it half the size put ".5"
              },
            });
          }
        );
      });
    },
  },
  mounted() {
    if (this.$store.state.BChain.instance) {
      this.setupMap();
    } else {
      this.$store.dispatch("BChain/init").then((res) => {
        this.$store.dispatch("BChain/getLands");
        this.setupMap();
      });
    }
  },
};
</script>
<style>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.marker {
  background-image: url("https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.mapboxgl-popup {
  max-width: 200px;
}
.mapboxgl-popup-content {
  text-align: center;
  font-family: "Open Sans", sans-serif;
}
</style>