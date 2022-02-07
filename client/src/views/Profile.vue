<template>
  <div id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">Profile</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
          <router-link class="nav-link" to="/admin">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'land-gallery' }">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Land Galleries</span></router-link
          >
        </li>
        <li class="nav-item">
          <b-button
            variant="link"
            @click="logMeOut"
            class="nav-link"
            to="/admin"
          >
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>logout</span></b-button
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />
      </ul>

      <div id="content-wrapper" class="d-flex flex-column">
        <nav
          class="
            navbar navbar-expand navbar-light
            bg-white
            topbar
            mb-4
            static-top
            shadow
          "
        >
          <!-- Sidebar Toggle (Topbar) -->
          <button
            id="sidebarToggleTop"
            class="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Search -->
          <form
            class="
              d-none d-sm-inline-block
              form-inline
              mr-auto
              ml-md-3
              my-2 my-md-0
              mw-100
              navbar-search
            "
          >
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </nav>
        <div id="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>


<script>
export default {
  methods: {
    logMeOut() {
      localStorage.clear();
      this.$router.push({ name: "home" }).catch(() => {});
    },
  },
  created() {},
  computed: {
    // lands2() {
    //   return this.$store.state.BChain.lands.map((i) => {
    //     return { lat: i[0], lng: i[1], owner: i[2] };
    //   });
    // },

    my_lands() {
      return this.$store.state.BChain.myLands.length;
    },
    my_transactions() {
      return this.$store.state.BChain.my_transactions.length;
    },
  },
};
</script>