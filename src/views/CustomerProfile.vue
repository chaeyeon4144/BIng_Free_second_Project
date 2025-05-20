<script setup>
import Navigation from "@/components/Navigation.vue";

const reservationList = [
  {
    id: 1,
    customer: {
      name: "고윤정",
      mobile: "010-1234-1234",
      email: "yunjung@naver.com",
      address: "대구광역시 중구 동성로 3가 동성로 1길 15 5층",
    },
    membership: {
      name: "[호시자키]250kg이상",
      date: "2025-03-17 ~",
      count: "2회 / 6회",
      during: "3개월",
    },
    worker: {
      name: "김기사",
      mobile: "010-4321-4321",
      email: "mrkim@bingfree.co.kr",
    },
    inquiry: {
      type: "기타 문의",
      title: "라벨 증정",
      memo: "라벨 안 주고 가셨어요 ㅠㅠ",
      file: null,
    },
    reservinfo: {
      type: "비정기 청소",
      address: "대구광역시 중구 중앙대로 77길 22 스타벅스 종로점",
      date: "2025-05-15, 오후 11시 이후",
      plus: "자가점검키트",
      memo: "레포트 문자로 보내주세요",
    },
  },
  {
    id: 2,
    customer: {
      name: "김카페",
      mobile: "010-1245-1534",
      email: "cafekim@naver.com",
      address: "대구광역시 중구 동성로 3가 동성로 1길 15 5층",
    },
    membership: {
      name: null,
      date: null,
      count: null,
      during: null,
    },
    worker: {
      name: "김기사",
      mobile: "010-4321-4321",
      email: "mrkim@bingfree.co.kr",
    },
    inquiry: {
      type: null,
      title: null,
      memo: null,
      file: null,
    },
    reservinfo: {
      type: "일회성 청소",
      address: "대구광역시 중구 동성로 3가 동성로 1길 15 4층",
      date: "2025-05-22, 오후 2시",
      plus: null,
      memo: null,
    },
  },
];
</script>
<template>
  <Navigation />
  <div class="profile-wrap">
    <div class="profile inner">
      <p class="main-h4">마이페이지</p>
      <div class="profile-left">
        <div class="profile-box"></div>
        <div class="membership-box"></div>
      </div>
      <div class="profile-right">
        <ul>
          <li>나의 예약</li>
          <li>결제 내역</li>
        </ul>
        <input type="text" class="searchbar" />
        <div class="btn-box">
          <select name="" id="">
          <option value="waiting">배정대기</option>
          <option value="done">청소완료</option>
          <option value="assigned">배정대기</option>
          <option value="all">배정대기</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.profile-wrap {
  margin-top: 80px;
  width: 100%;
  height: auto;
  padding: 3% 0;
  .profile {
    background-color: rgba($color: #1456fd, $alpha: 0.03);
    width: 100%;
    height: 800px;
    border-radius: 8px;
    margin: auto;
  }
}
</style>
