<template>
  <div>
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="
                      text-xs
                      font-weight-bold
                      text-primary text-uppercase
                      mb-1
                    "
                  >
                    Transactions
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ my_transactions }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="
                      text-xs
                      font-weight-bold
                      text-primary text-uppercase
                      mb-1
                    "
                  >
                    Owned Lands
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ my_lands }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-overlay :show="isLoading" rounded="sm">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6">
            <h1>My Lands</h1>
            <LandList />
          </div>
          <div class="col">
            <h1>Transactions</h1>
            <Transactions />
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import Content from "../../components/admin/DashboardComponent.vue";
import LandList from "../../components/user/MyLands.vue";
import Transactions from "../../components/user/Transactions.vue";
export default {
  components: {
    Content,
    // UserList,
    LandList,
    Transactions,
  },


  computed: {
    my_lands() {
      return this.$store.state.BChain.myLands.length;
    },
    my_transactions() {
      return this.$store.state.BChain.my_transactions.length;
    },
    isLoading() {
      return this.$store.state.BChain.isLoading;
    }
  },
};
</script>