<template>
  <div class="container mt-5">
    <form @submit.prevent="SubmitData">
      <div class="form-group">
        <label for="exampleInputEmail1">Latitude</label>
        <input
          type="text"
          v-model="form.lat"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Latitude"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Longitude</label>
        <input
          v-model="form.lng"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Longitude"
        />
      </div>
      <button type="submit" class="btn btn-primary">Register Land to DB</button>
    </form>
  </div>
</template>


<script>
import Land from "../utils/Auth";
export default {
  props: ["address"],
  data() {
    return {
      form: {
        lat: "",
        lng: "",
      },
    };
  },
  beforeCreate() {
    // Land.init();
  },
  methods: {
    async SubmitData() {
      let accounts = await window.web3.eth.getAccounts();
      console.log(this.form);
      Land.instance
        // .createLand(this.form.lng, this.form.lat, ethereum.selectedAddress, {
        .createLand(this.form.lng, this.form.lat, this.address, {
          from: accounts[0],
        })
        .then((result) => {
          console.log("result is here homie");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>