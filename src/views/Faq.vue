<script setup>
import Navigation from "@/components/Navigation.vue";
</script>
<template>
  <Navigation />
  <div class="wrap">
    <ul class="taps_wrap">
      <li>
        <label for="total">전체</label>
        <input style="position:absolute "  type="radio" id="total" />
      </li>
      <li>
        <label for="reservation">예약관련</label>
        <input type="radio" id="reservation" />
      </li>
      <li>
        <label for="service">서비스관련</label>
        <input type="radio" id="service" />
      </li>
      <li>
        <label for="pay">결제관련</label>
        <input type="radio" id="pay" />
      </li>
      <li>
        <label for="cr">취소/환불</label>
        <input type="radio" id="cr" />
      </li>
    </ul>
    <div class="faq_list_wrap"></div>
    <div class="info_sec"></div>
  </div>
</template>
