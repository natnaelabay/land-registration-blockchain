<template>
  <div>
    <h1>Users</h1>
    <b-table
      show-empty
      empty-text="No users currently registered"
      hover
      :items="users"
      :fields="fields"
    >
      <template #cell(manage)="row">
        <div>
          <b-button @click="launchModal(row)" variant="primary">Lands</b-button>
        </div>
      </template>
      <template #cell(address)="row">
        {{
          row.item.address.slice(0, 5) +
          "....." +
          row.item.address.substring(30, row.item.address.length - 1)
        }}
      </template>
    </b-table>

    <b-modal
      hide-footer
      id="give-owner-ship"
      centered
      title="Assign ownership for land"
      class=""
    >
      <form @submit.prevent="submitForm" class="user pr-5">
        <div
          class="col-12"
          style="position: relative; width: 100%; height: 400px"
        >
          <Map @areaSelected="areaSelected" />
        </div>
        <input
          placeholder="Give Ownership"
          type="submit"
          class="btn btn-primary btn-block"
        />
        <div class="form-group row pr-5 pl-5 pt-2">
          <!-- <div class="col-sm-6 mb-3 mb-sm-0">
            <input
              v-model="form.lng"
              type="text"
              class="form-control form-control-user"
              id="exampleFirstName"
              placeholder="Latitude"
            />
          </div>
          <div class="col-sm-6">
            <input
              type="text"
              v-model="form.lat"
              class="form-control form-control-user"
              id="exampleLastName"
              placeholder="Longitude"
            />
          </div> -->
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Map from "./Map.vue";
export default {
  components: {
    Map,
  },
  data() {
    return {
      form: { lng: "", lat: "", email: "", password: "" },
      fields: [
        { key: "f_name", label: "First Name" },
        { key: "l_name", label: "Last Name" },
        { key: "email", label: "Email" },
        "address",
        "manage",
      ],
      address: "",
      features: [],
    };
  },
  methods: {
    launchModal(data) {
      this.address = data.item.address;
      console.log(data.item.address);
      this.$bvModal.show("give-owner-ship");
    },
    async submitForm(e) {
      this.$bvModal.hide("give-owner-ship");
      this.$store.dispatch("BChain/setIsLoading", true);
      let accounts = await window.web3.eth.getAccounts();
      let a = [];
      for (let i = 0; i < this.features.length - 1; i++) {
        a.push(`${this.features[i][0]}`);
        a.push(`${this.features[i][1]}`);
      }
      this.$store.state.BChain.instance
        .createLand(a, this.address, {
          from: accounts[0],
        })
        .then((result) => {
          this.$store.dispatch("BChain/setIsLoading", false);
          this.$store.dispatch("BChain/getLands");
        })
        .catch((err) => {
          this.$store.dispatch("BChain/setIsLoading", false);
          console.log(err);
        });
    },

    areaSelected(data) {
      this.features = data.features[0].geometry.coordinates[0];
      console.log(this.features);
    },
  },
  computed: {
    users() {
      return this.$store.state.BChain.users.map((i) => {
        return { f_name: i[0], l_name: i[1], email: i[2], address: i[4] };
      });
    },
  },
};
</script>