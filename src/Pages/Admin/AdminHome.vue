<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

const links = [
  { name: "대시보드", path: "/Admin/Dashboard", icon: "fas fa-chart-line" },
  {
    name: "예약관리",
    path: "/Admin/AdminReservation",
    icon: "fas fa-calendar-check",
  },
  { name: "기사관리", path: "/Admin/Workers", icon: "fas fa-user-tie" },
  { name: "고객관리", path: "/Admin/Customers", icon: "fas fa-users" },
  { name: "설정", path: "/Admin/Settings", icon: "fas fa-cog" },
];

// 현재 경로에 따른 활성화 상태 계산
const isActive = (path) => route.path === path;

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<!-- 지수 대시보드 홈 -->

<template>
  <!-- 페이지 헤더 -->
  <header style="margin-top: 40px">
    <div class="logo">
      <img src="/public/prime/bingfree-logo.png" alt="빙프리로고" />
    </div>
    <div class="right">
      <div class="right-icon saerch">
        <img src="/public/prime/search-icon.png" alt="돋보기 아이콘" />
      </div>
      <div class="right-icon bell">
        <img src="/public/prime/bell-icon.png" alt="알림 아이콘" />
        <img class="redPoint" src="/public/prime/redPoint-icon.png" alt="알림이 있을때 활성화되는 빨간도트 아이콘" />
      </div>
      <div class="right-icon darkmode">
        <img src="/public/prime/darkmode-icon.png" alt="다크모드 아이콘" />
      </div>
      <div class="right-icon setting">
        <img src="/public/prime/setting-icon.png" alt="설정 아이콘" />
      </div>
      <div class="right-icon profile">
        <img src="/public/prime/profile-image-icon.png" alt="프로필 아이콘" />
      </div>
    </div>
  </header>
  <!-- 사이드바 -->
  <div class="sidebar">
    <nav class="side-menu">
      <router-link to="/Admin/Dashboard">
        <img src="/public/prime/dashboard-icon.png" alt="대시보드 아이콘" />
        <span>대시보드</span>
      </router-link>
      <router-link to="/Admin/AdminReservation">
        <img src="/public/prime/reservation-icon.png" alt="예약관리 아이콘" />
        <span>예약관리</span>
      </router-link>
      <router-link to="/Admin/Customers">
        <img src="/public/prime/customer-icon.png" alt="고객관리 아이콘" />
        <span>고객관리</span>
      </router-link>
      <router-link to="/Admin/Workers">
        <img src="/public/prime/worker-icon.png" alt="기사관리 아이콘" />
        <span>기사관리</span>
      </router-link>
      <router-link to="/Admin/Claim">
        <img src="/public/prime/claim-icon.png" alt="클레임 아이콘" />
        <span>클레임</span>
      </router-link>
      <router-link to="/Admin/Sales">
        <img src="/public/prime/pay-icon.png" alt="정산내역 아이콘" />
        <span>정산내역</span>
      </router-link>
      <router-link to="/Admin/Board">
        <img src="/public/prime/notice-icon.png" alt="게시판 아이콘" />
        <span>게시판</span>
      </router-link>
      <router-link to="/Admin/Settings">
        <img src="/public/prime/settings-icon.png" alt="설정 아이콘" />
        <span>설정</span>
      </router-link>
    </nav>
  </div>
  <!-- 전체 -->
  <div class="dashboard-wrap"></div>
</template>

<style scoped></style>
