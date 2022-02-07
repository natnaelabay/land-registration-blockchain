<template>
  <div>
    <h2>Lands</h2>
    <b-table
      striped
      show-empty
      empty-text="No Registered Lands Currently"
      hover
      :items="lands"
      :fields="fields"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(timestamp)="data">
        {{ Unix(data.item.timestamp) }}
      </template>
      <template #cell(owner)="row">
        <div>
          {{
            row.item.owner.slice(0, 5) +
            "....." +
            row.item.owner.substring(30, row.item.owner.length - 1)
          }}
        </div>
      </template>
      <template #cell(manage)="row">
        <b-button variant="outline-primary" @click="launchModal(row.item)"
          >Locate on map</b-button
        >
      </template>
    </b-table>

    <b-modal
      hide-footer
      id="location-modal"
      centered
      title="Assign ownership for land"
    >
      <form @submit.prevent="submitForm" class="user">
        <div class="form-group row">
          <div
            class="col-12"
            style="position: relative; width: 400px; height: 400px"
          >
            <Map :coordinates="coordinates" />
          </div>
        </div>

        <input
          placeholder="Give Ownership"
          type="submit"
          class="btn btn-primary btn-block"
        />
      </form>
    </b-modal>
  </div>
</template>

<script>
import Map from "./MapDrawer.vue";
export default {
  components: {
    Map,
  },
  data() {
    return {
      form: { f_name: "", l_name: "", email: "", password: "" },
      fields: ["index", "timestamp", "owner", "manage"],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      coordinates_data: [],
    };
  },
  methods: {
    launchModal(data) {
      console.log(data);
      this.coordinates_data = data.coordinates;
      this.$bvModal.show("location-modal");
    },
    submitForm(e) {},
    Unix(timestamp) {
      return new Date(timestamp * 1000);
    },
  },
  computed: {
    lands() {
      return this.$store.state.BChain.lands;
    },
    coordinates() {
      return this.coordinates_data;
    },
  },
};
</script>