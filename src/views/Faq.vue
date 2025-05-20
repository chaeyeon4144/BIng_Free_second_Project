<script setup>
import Navigation from "@/components/Navigation.vue";
import { ref } from "vue";
// 아코디언 질문,답변 데이터
const accordionItems = [
  {
    question: "예약은 어떻게 해야 하나요?",
    answer:
      "홈페이지에서 예약하기 버튼을 클릭하여 예약 폼을 작성하시면 됩니다. 예약 시 희망 날짜와 시간을 선택할 수 있습니다.",
  },
  {
    question: "예약 변경이 가능한가요?",
    answer: "예약일 24시간 전까지는 예약 변경이 가능합니다. 마이페이지에서 예약 내역을 확인하고 변경할 수 있습니다.",
  },
];

// 열려있는 인덱스들
const openIndexes = ref([]);

// 토글함수
function toggle(index){
  openIndexes.value = openIndexes.value[0] === index ? [] : [index]
}
</script>
<template>
  <Navigation />
  <div class="wrap">
    <ul class="taps_wrap">
      <li>
        <input type="radio" id="total" name="tap" checked />
        <label for="total">전체</label>
      </li>
      <li>
        <input type="radio" id="reservation" name="tap" />
        <label for="reservation">예약관련</label>
      </li>
      <li>
        <input type="radio" id="service" name="tap" />
        <label for="service">서비스관련</label>
      </li>
      <li>
        <input type="radio" id="pay" name="tap" />
        <label for="pay">결제관련</label>
      </li>
      <li>
        <input type="radio" id="cr" name="tap" />
        <label for="cr">취소/환불</label>
      </li>
    </ul>
    <div class="accordion">
      <div class="accordion_set" v-for="(item, index) in accordionItems" :key="index">
        <div class="accordion-item" :class="{ active: openIndexes.includes(index) }" @click="toggle(index)">
          <div class="accordion-header">
            <span class="question">Q</span>
            <button class="accordion-title">{{ item.question }}</button>
          </div>
          <span class="arrow-icon"></span>
        </div>
        <div class="accordion-content" v-show="openIndexes.includes(index)">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
    <div class="info_sec"></div>
  </div>
</template>
<style lang="scss" scoped></style>
