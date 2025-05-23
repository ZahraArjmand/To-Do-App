<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My Todo App</v-toolbar-title>

      <v-spacer />

      <v-btn text to="/" tag="router-link">Home</v-btn>
      <v-btn text to="/create" tag="router-link">Add Todo</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup></script>

<style scoped></style>
