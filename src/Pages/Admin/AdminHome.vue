<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

const links = [
  {
    name: "대시보드",
    imgUrl: "/public/prime/dashboard-icon.png",
    path: "/Admin/Dashboard",
    icon: "fas fa-chart-line",
  },
  {
    name: "예약관리",
    imgUrl: "/public/prime/reservation-icon.png",
    path: "/Admin/AdminReservation",
    icon: "fas fa-calendar-check",
  },
  {
    name: "고객관리",
    imgUrl: "/public/prime/customer-icon.png",
    path: "/Admin/Customers",
    icon: "fas fa-users",
  },
  {
    name: "기사관리",
    imgUrl: "/public/prime/worker-icon.png",
    path: "/Admin/Workers",
    icon: "fas fa-user-tie",
  },
  {
    name: "클레임",
    imgUrl: "/public/prime/claim-icon.png",
    path: "/Admin/Claim",
    icon: "fas fa-user-tie",
  },
  {
    name: "정산내역",
    imgUrl: "/public/prime/pay-icon.png",
    path: "/Admin/Sales",
    icon: "fas fa-user-tie",
  },
  {
    name: "게시판",
    imgUrl: "/public/prime/notice-icon.png",
    path: "/Admin/Board",
    icon: "fas fa-user-tie",
  },
  {
    name: "설정",
    imgUrl: "/public/prime/settings-icon.png",
    path: "/Admin/Settings",
    icon: "fas fa-cog",
  },
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
        <img
          class="redPoint"
          src="/public/prime/redPoint-icon.png"
          alt="알림이 있을때 활성화되는 빨간도트 아이콘"
        />
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
  <div class="home">
    <!-- 사이드바 -->
    <div class="sidebar">
      <nav class="side-menu">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'bg-indigo-100 text-indigo-700': isActive(link.path) }"
        >
          <img :src="link.imgUrl" :alt="link.name" />
          {{ link.name }}
        </router-link>
      </nav>
    </div>
    <!-- 전체 -->
    <div class="admin-right">
      <p v-if="isLoggedIn">🛠 {{ userName }} 기사님!</p>
      <div>
        <main><router-view></router-view></main>
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
