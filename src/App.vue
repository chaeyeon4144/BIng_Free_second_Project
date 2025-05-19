<script setup>
import { useRoute } from "vue-router";
import Topbar from "./components/Topbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
</script>

<template>
  <div>
    <Topbar v-if="route.name !== 'NotFound'" />
    <router-view></router-view>
    <Footer v-if="route.name !== 'NotFound'" />
  </div>
</template>
