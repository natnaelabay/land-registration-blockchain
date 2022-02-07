<template>
  <div class="aaa bg-dark">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <b-overlay :show="isLoading" rounded="sm">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form @submit.prevent="submitData" class="user">
                        <div class="form-group">
                          <input
                            type="text"
                            v-model="form.id"
                            class="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="ID"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            v-model="form.password"
                            type="password"
                            class="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                          />
                        </div>
                        <input
                          value="Login"
                          type="submit"
                          class="btn btn-primary btn-user btn-block"
                        />
                      </form>
                      <hr />
                    </div>
                    <div class="text-center">
                      <a class="small" href="register.html"
                        >Create an Account!</a
                      >
                    </div>
                  </b-overlay>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { f_name: "", l_name: "", id: "", password: "" },
    };
  },
  methods: {
    submitData(data) {
      console.log(this.form);
      this.form.router = this.$router;
      this.$store.dispatch("BChain/attemptLogin", this.form);
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.BChain.isLoading;
    },
  },
};
</script>

<style scoped>
.bg-login-image {
  background: url(https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80);
  background-position: center;
  background-size: cover;
}
.aaa {
  padding-top: 6rem;
  padding-bottom: 6rem;
}
</style>