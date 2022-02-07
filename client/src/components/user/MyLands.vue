<template>
  <div>
    <b-table
      show-empty
      empty-text="No Lands registered with this account"
      striped
      hover
      :items="lands"
      :fields="fields"
    >
      <template #cell(coordinates)="row">
        {{ row.item.coordinates[0] + "....." }}
      </template>
      <template #cell(owner)="row">
        {{
          row.item.owner.slice(0, 5) +
          "....." +
          row.item.owner.substring(30, row.item.owner.length - 1)
        }}
      </template>

      <template #cell(manage)="row">
        <div>
          <b-button @click="launchModal(row)" variant="primary"
            >Put on Sell</b-button
          >
        </div>
      </template>
    </b-table>

    <b-modal
      hide-footer
      id="give-owner-ship"
      centered
      title="Assign ownership for land"
    >
      <form @submit.prevent="putOnSellForm" class="user">
        <div class="form-group">
          <input
            v-model="price"
            type="number"
            required
            class="form-control form-control-user"
            id="exampleInputPassword"
            placeholder="Eth"
          />
        </div>
        <b-btn type="submit" class="btn btn-primary btn-user btn-block"
          >Set Price tag</b-btn
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import MapDrawer from "../admin/MapDrawer.vue";
export default {
  components: {
    MapDrawer,
  },
  data() {
    return {
      fields: ["id", "coordinates", "owner", "manage"],
      items: [],
      owner: "",
      form: {
        tax: "",
        price: "",
        address: "",
      },
      my_coordinates: [],
      price: 0,
      o: 0,
    };
  },
  methods: {
    // launchModal(data) {
    //   console.log(data);
    // },
    submitForm(data) {
      this.$bvModal.hide("put-on-sell1");
      this.putOnSellForm(data);
    },
    launchModal(data) {
      this.owner = data.item.owner;
      this.o = data.item.id;
      this.my_coordinates = data.item.coordinates;
      this.$bvModal.show("give-owner-ship");
    },
    modalShow(data) {
      this.owner = data.item.owner;
      this.my_coordinates = data.item.coordinates;
      this.$bvModal.show("put-on-sell1");
    },
    async putOnSellForm(data) {
      this.$bvModal.hide("give-owner-ship");
      this.$store.dispatch("BChain/setIsLoading", true);
      await ethereum.enable();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      await this.$store.state.BChain.instance
        .updateLandForsell(parseInt(this.price), this.o, {
          from: account,
        })
        .then((result) => {
          this.$store.dispatch("BChain/setIsLoading", false);
          console.log("SUCCESS");
        })
        .catch((err) => {
          this.$store.dispatch("BChain/setIsLoading", false);
          console.log(err);
        });
    },
  },
  computed: {
    lands() {
      return this.$store.state.BChain.myLands.map((i) => {
        return {
          id: i[0],
          coordinates: i[1],
          owner: i[2],
          timestamp: i[3],
          sold: i[6],
        };
      });
      // .filter((j) => !j.sold);
    },
    coordinates() {
      return this.my_coordinates;
    },
  },
  created() {
    // if (this.$store.state.BChain.instance)
    // else {
    //   this.$store.dispatch("BChain/init").then((e) => {
    //     this.$store.dispatch("BChain/getMyLands");
    //   });
    // }
  },
};
</script>