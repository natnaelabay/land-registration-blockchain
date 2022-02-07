<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-custom fixed-top">
    <a class="navbar-brand logo-image" href="index.html"
      ><img src="/static/images/logo.svg" alt="alternative"
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-awesome fas fa-bars"></span>
      <span class="navbar-toggler-awesome fas fa-times"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link page-scroll" to="/login"
            >BUY <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link page-scroll"
            :to="{ name: 'transactions' }"
          >
            TRANSACTIONS</router-link
          >
        </li>
        <li class="nav-item"> 
          <router-link class="nav-link page-scroll" :to="{ name: 'Register' }"
            >REGISTER</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link page-scroll" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </li>
      </ul>
      <span class="nav-item social-icons">
        <span class="fa-stack">
          <a href="#your-link">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fab fa-facebook-f fa-stack-1x"></i>
          </a>
        </span>
        <span class="fa-stack">
          <a href="#your-link">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fab fa-twitter fa-stack-1x"></i>
          </a>
        </span>
      </span>
    </div>
  </nav>
</template>