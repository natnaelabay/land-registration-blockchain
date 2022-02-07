<template>
  <div class="bg-dark aaa">
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <b-overlay :show="isLoading" rounded="sm">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form @submit.prevent="submitForm" class="user">
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          v-model="form.f_name"
                          type="text"
                          class="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="First Name"
                        />
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="text"
                          v-model="form.l_name"
                          class="form-control form-control-user"
                          id="exampleLastName"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        v-model="form.id"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="National Id Number"
                      />
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-12 mb-3 mb-sm-0">
                        <input
                          v-model="form.password"
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Passphrase"
                        />
                      </div>
                    </div>
                    <input
                      placeholder="Register Account"
                      type="submit"
                      class="btn btn-primary btn-block"
                    />

                    <hr />
                  </form>
                  <hr />
                  <div class="text-center">
                    <a class="small" href="forgot-password.html"
                      >Forgot Password?</a
                    >
                  </div>
                  <div class="text-center">
                    <a class="small" href="login.html"
                      >Already have an account? Login!</a
                    >
                  </div>
                </div>
              </b-overlay>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Users from "../utils/Auth";
// import AuthContract from "../utils/Auth";

export default {
  data() {
    return {
      form: { f_name: "", l_name: "", id: "", password: "" },
    };
  },
  beforeCreate() {
    // Users.init();
  },
  computed: {
    isLoading() {
      return this.$store.state.BChain.isLoading;
    },
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
      this.$store.dispatch("BChain/attemptRegister", {
        f_name: this.form.f_name,
        l_name: this.form.l_name,
        id: this.form.id,
        password: this.form.password,
      });
      console.log(this.form);
      this.form.f_name = "";
      this.form.l_name = "";
      this.form.id = "";
      this.form.password = "";
      // this.$bvToast.toast(`Registered Successfully`, {
      //   title: "Success",
      //   autoHideDelay: 3000,
      //   appendToast: append,
      // });
    },
  },

  created() {},
};
</script>


<style scoped>
.bg-register-image {
  background: url(https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80);
  background-position: center;
  background-size: cover;
}
.aaa {
  padding-top: 6rem;
  padding-bottom: 6rem;
}
</style>