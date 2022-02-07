<template>
  <div class="container">
    <h2 class="my-2">On sell Lands</h2>
    <b-overlay :show="isLoading" rounded="sm">
      <b-table
        show-empty
        empty-text="No users currently registered"
        hover
        :items="onSell"
        :fields="fields"
      >
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(manage)="row">
          <b-button @click="launchModal(row)" variant="primary"
            >Purchase</b-button
          >
          <b-button @click="showMap(row)" class="ml-2" variant="outline-primary"
            >See on map</b-button
          >
        </template>
        <template #cell(coordinates)="row">
          [
          {{
            row.item.coordinates[0].slice(0, 5) +
            ", " +
            row.item.coordinates[1].slice(0, 5)
          }}
          , ...]
        </template>
        <template #cell(owner)="row">
          {{
            row.item.owner.slice(0, 5) +
            "....." +
            row.item.owner.substring(30, row.item.owner.length - 1)
          }}
        </template>
      </b-table>
    </b-overlay>

    <b-modal
      hide-footer
      id="buy-modal"
      centered
      title="Are you sure you want to proceed buying?"
    >
      <button
        @click="submitForm"
        placeholder="Give Ownership"
        class="btn btn-success btn-block"
      >
        Proceed to payment
      </button>
      <button
        placeholder="Give Ownership"
        @click="hideModal"
        class="btn btn-danger btn-block"
      >
        Cancel
      </button>
    </b-modal>

    <b-modal
      hide-footer
      id="show-modal"
      centered
      title="Are you sure you want to proceed buying?"
    >
      <div class="form-group row">
        <div
          class="col-12"
          style="position: relative; width: 400px; height: 400px"
        >
          <Map :coordinates="coordinates" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Map from "../../components/admin/MapDrawer.vue";

export default {
  components: {
    Map,
  },
  data() {
    return {
      form: { lng: "", lat: "", email: "", password: "" },
      fields: ["index", "coordinates", "price", "owner", "manage"],
      address: "",
      features: [],
      owner: "",
      from: "",
      coo: [],
    };
  },

  created() {
    this.setupCom();
  },
  computed: {
    coordinates() {
      return this.coo;
    },
    users() {
      return this.$store.state.BChain.users.map((i) => {
        return { f_name: i[0], l_name: i[1], email: i[2], address: i[4] };
      });
    },
    isLoading() {
      return this.$store.state.BChain.isLoading;
    },
    onSell() {
      return this.$store.state.BChain.lands
        .map((i) => {
          return {
            forSell: i.forSell,
            price: i.price,
            owner: i.owner,
            coordinates: i.coordinates,
            id: i.id,
          };
        })
        .filter((j) => {
          console.log(this.owner);
          return j.forSell && this.owner.toLowerCase() != j.owner.toLowerCase();
        });
    },
  },
  methods: {
    async setupCom() {
      await ethereum.enable();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      this.owner = account;
    },
    launchModal(data) {
      this.from = data.item;
      this.$bvModal.show("buy-modal");
    },
    async submitForm(e) {
      this.$bvModal.hide("buy-modal");
      this.$store.dispatch("BChain/setIsLoading", true);

      await ethereum.enable();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account);
      const amountToSend = web3.utils.toWei(this.from.price, "ether"); // Convert to wei value
      web3.eth
        .sendTransaction({
          from: account,
          to: this.from.owner,
          value: amountToSend,
        })
        .then((tx) => {
          this.$store.state.BChain.instance
            .sellLand(
              this.from.id,
              // this.from.owner,
              account,
              { from: account }
            )
            .then((res) => {
              this.$store.dispatch("BChain/setIsLoading", false);
              this.$store.dispatch("BChain/getLands", false);

              console.log("this is done ", res);
            });
        });
    },
    showMap(data) {
      console.log(data);
      this.co = data.item.coordinates;
      this.$bvModal.show("show-modal");
    },
    hideModal() {
      this.$bvModal.hide("buy-modal");
    },
  },
};
</script>