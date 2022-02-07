<template>
  <div>
    <b-overlay :show="isLoading" rounded="sm">
      <Content :users="users" :transactions="transactions" :lands="lands" />
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <UserList />
          </div>
          <div class="col">
            <LandList />
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>


<script>
import Content from "../../components/admin/DashboardComponent.vue";
import UserList from "../../components/admin/UserList.vue";
import LandList from "../../components/admin/LandList.vue";
export default {
  components: {
    Content,
    UserList,
    LandList,
  },
  computed: {
    users() {
      return this.$store.state.BChain.users.length;
    },
    transactions() {
      return this.$store.state.BChain.all_transactions.length;
    },
    lands() {
      return this.$store.state.BChain.lands.length;
    },
    isLoading() {
      return this.$store.state.BChain.isLoading;
    }
  },
};
</script>