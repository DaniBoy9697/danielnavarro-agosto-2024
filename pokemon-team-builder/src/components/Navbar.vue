<template>
    <nav class="navbar">
      <ul>
        <li>
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li>
          <router-link to="/team" class="nav-link" active-class="active">My Team</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .navbar {
    background-color: #1DA1F2;
    padding: 1rem;
  }
  
  .navbar ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  .nav-link.active {
    text-decoration: underline;
  }
  </style>