<script setup>
import Navigation from "@/components/Navigation.vue";
import { ref, computed } from "vue";

// 마이페이지 탭
const tab = ref("reservList");
// 마이페이지 검색 - 상태
const selectedStatus = ref("all");
// 마이페이지 검색 - 날짜
const selectedPeriod = ref("all");
// 프로필 수정 탭
const tabedit = ref("BasicInfo");
// 결제 수단 추가 모달
const paymentmodal = ref(false);
// 상세보기 모달
const reservdetail = ref(null); // 예약 기본 정보
const reservExtra = ref(null); // 상세 정보 (detailList에서 가져옴)
const reservdetailmodal = ref(false); // 모달 표시 여부

// 상세 클릭시 값 전달
function openReservDetail(item) {
  console.log("click");
  reservdetail.value = item;
  reservExtra.value = detailList.find((d) => d.id === item.id); // id로 매칭
  reservdetailmodal.value = true;
}

// 상세모달 아코디언 기능
const isCustomerOpen = ref(true);
const isMembershipOpen = ref(false);
const isWorkerOpen = ref(false);
const isInquiryOpen = ref(false);

// 카드 번호 인식
const cardInputs = ref(["", "", "", ""]); // 4개의 입력 칸
const cardNumber = computed(() => cardInputs.value.join(""));
const cardBrand = computed(() => getCardBrand(cardNumber.value));

function getCardBrand(number) {
  if (/^4/.test(number)) return "visa";
  if (/^5[1-5]/.test(number)) return "master";
  return null;
}

// 마이페이지 검색 -상태, 날짜 필터링
const filteredList = computed(() => {
  let result = reversedList.value;

  // 상태 필터
  if (selectedStatus.value !== "all") {
    result = result.filter((item) => item.status === selectedStatus.value);
  }

  // 날짜 필터
  if (selectedPeriod.value !== "all") {
    const now = new Date();
    let threshold = new Date();

    switch (selectedPeriod.value) {
      case "1month":
        threshold.setMonth(now.getMonth() - 1);
        break;
      case "3month":
        threshold.setMonth(now.getMonth() - 3);
        break;
      case "1year":
        threshold.setFullYear(now.getFullYear() - 1);
        break;
    }

    result = result.filter((item) => {
      const parsedDate = parseKoreanDate(item.date);
      return parsedDate >= threshold;
    });
  }

  return result;
});

// 마이페이지 검색 - 날짜 필터링
function parseKoreanDate(dateStr) {
  // 예: "2025-05-15, 오후 11시 이후"
  const [datePart, timePartRaw] = dateStr.split(", ");
  const timeMatch = timePartRaw?.match(/(오전|오후)\s(\d{1,2})시/);

  let hour = 0;
  if (timeMatch) {
    hour = parseInt(timeMatch[2]);
    if (timeMatch[1] === "오후" && hour < 12) hour += 12;
    if (timeMatch[1] === "오전" && hour === 12) hour = 0; // 오전 12시는 자정
  }

  const fullDateStr = `${datePart}T${hour.toString().padStart(2, "0")}:00:00`;
  return new Date(fullDateStr);
}

// 상세 모달 데이터
const detailList = [
  {
    id: 1,
    customer: {
      name: "고윤정",
      mobile: "010-1234-1234",
      email: "yunjung@naver.com",
      address: "대구광역시 중구 동성로 3가 동성로 1길 15 5층",
    },
    membership: {
      name: "호시자키",
      package: "6회권",
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
    id: 3,
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

// 예약 내역 데이터
const reservList = ref([
  {
    id: 1,
    number: "BING-2025-001",
    status: "done",
    date: "2025-03-18, 오후 11시 이후",
    memo: "라벨 부착해주세요.",
    price: 0,
    reservdate: "2025.03.17(월) 14:00",
  },
  {
    id: 2,
    number: "BING-2025-002",
    status: "assigned",
    date: "2025-05-15, 오후 11시 이후",
    memo: "레포트 문자로 보내주세요",
    price: 0,
    reservdate: "2025.04.30(수) 16:00",
  },

  {
    id: 3,
    number: "BING-2025-003",
    status: "waiting",
    date: "2025-06-18, 오후 11시 이후",
    memo: "세제 신청했어요 ~ ^^",
    price: 0,
    reservdate: "2025.06.17(화) 14:00",
  },
]);
const reversedList = computed(() => {
  return [...reservList.value].reverse();
});

// 테이블 헤더 데이터
const TableHeaders = [
  { key: "item", label: "결제 내역" },
  { key: "amount", label: "결제금액" },
  { key: "date", label: "결제일" },
  { key: "period", label: "이용 기간" },
  { key: "status", label: "상태" },
  { key: "receipt", label: "영수증" },
];

// 테이블 내용 데이터
const TableData = [
  {
    item: "호시자키(250kg~) 6회권",
    amount: "1,134,000원",
    date: "2025.03.17 14:00",
    period: "2025.03.17 ~ 2026.03.17",
    status: "결제완료",
    receipt: "영수증 보기",
    receiptUrl: "#",
  },
];
</script>
<template>
  <Navigation />
  <div class="profile-wrap">
    <div class="profile-inner inner">
      <p class="profile-h1 mypage">마이페이지</p>
      <div class="profile">
        <!-- 마이페이지 왼쪽 (고객프로필, 구독 정보) -->
        <div class="profile-left">
          <div class="profile-box">
            <!-- 고객 프로필 -->
            <div class="profile-info">
              <img src="/prime/profile_profileimg.png" alt="프로필 이미지" />
              <p class="profile-h2">
                <b class="profile-h1">{{ detailList[0].customer.name }}</b> 님
              </p>
              <ul class="profile-h3">
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_456_258)">
                      <path
                        d="M5.79727 0.865637C5.52656 0.21173 4.81289 -0.136317 4.13086 0.0500114L1.03711 0.893762C0.425391 1.06251 0 1.61798 0 2.25079C0 10.9484 7.05234 18.0008 15.75 18.0008C16.3828 18.0008 16.9383 17.5754 17.107 16.9637L17.9508 13.8699C18.1371 13.1879 17.7891 12.4742 17.1352 12.2035L13.7602 10.7973C13.1871 10.5582 12.5227 10.7235 12.1324 11.2051L10.7121 12.9383C8.23711 11.7676 6.2332 9.76368 5.0625 7.28868L6.7957 5.87189C7.27734 5.47814 7.44258 4.8172 7.20352 4.24415L5.79727 0.869152V0.865637Z"
                        fill="#1456FD"
                        fill-opacity="0.8"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_456_258">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  {{ detailList[0].customer.mobile }}
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.6875 2.25C0.755859 2.25 0 3.00586 0 3.9375C0 4.46836 0.249609 4.96758 0.675 5.2875L8.325 11.025C8.72578 11.3238 9.27422 11.3238 9.675 11.025L17.325 5.2875C17.7504 4.96758 18 4.46836 18 3.9375C18 3.00586 17.2441 2.25 16.3125 2.25H1.6875ZM0 6.1875V13.5C0 14.741 1.00898 15.75 2.25 15.75H15.75C16.991 15.75 18 14.741 18 13.5V6.1875L10.35 11.925C9.54844 12.5262 8.45156 12.5262 7.65 11.925L0 6.1875Z"
                      fill="#1456FD"
                      fill-opacity="0.8"
                    />
                  </svg>
                  {{ detailList[0].customer.email }}
                </li>
                <li>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9937 8.98438C17.9937 9.54688 17.525 9.9875 16.9937 9.9875H15.9937L16.0156 14.9937C16.0156 15.0781 16.0094 15.1625 16 15.2469V15.75C16 16.4406 15.4406 17 14.75 17H14.25C14.2156 17 14.1813 17 14.1469 16.9969C14.1031 17 14.0594 17 14.0156 17H13H12.25C11.5594 17 11 16.4406 11 15.75V15V13C11 12.4469 10.5531 12 10 12H8C7.44687 12 7 12.4469 7 13V15V15.75C7 16.4406 6.44063 17 5.75 17H5H4.00313C3.95625 17 3.90937 16.9969 3.8625 16.9937C3.825 16.9969 3.7875 17 3.75 17H3.25C2.55937 17 2 16.4406 2 15.75V12.25C2 12.2219 2 12.1906 2.00312 12.1625V9.9875H1C0.4375 9.9875 0 9.55 0 8.98438C0 8.70312 0.09375 8.45312 0.3125 8.23438L8.325 1.25C8.54375 1.03125 8.79375 1 9.0125 1C9.23125 1 9.48125 1.0625 9.66875 1.21875L17.65 8.23438C17.9 8.45312 18.025 8.70312 17.9937 8.98438Z"
                      fill="#1456FD"
                      fill-opacity="0.8"
                    />
                  </svg>
                  {{ detailList[0].customer.address }}
                </li>
              </ul>
            </div>
            <button class="modal" v-on:click="tab = 'profileedit'">
              프로필 수정
            </button>
          </div>
          <!-- 구독 정보 -->
          <p class="profile-h2">구독 정보</p>
          <div class="membership-box">
            <div class="membership-info">
              <p class="profile-h1">
                {{ detailList[0].membership.name }}({{
                  detailList[0].membership.package
                }})
              </p>
              <ul class="profile-h3">
                <li>
                  <span class="profile-h3 title">구독 시작 |</span>
                  {{ detailList[0].membership.date }}
                </li>
                <li>
                  <span class="profile-h3 title">회차 정보 | </span
                  >{{ detailList[0].membership.count }}
                </li>
                <li>
                  <span class="profile-h3 title">청소 주기 |</span>
                  {{ detailList[0].membership.during }}
                </li>
              </ul>
            </div>
            <div class="payment-info">
              <p
                class="profile-h3"
                style="color: #757575; font-weight: 500; margin: 4%"
              >
                결제 수단 관리
              </p>
              <ul>
                <hr class="payment" />
                <li>
                  <img src="/prime/profile_card (1).png" alt="카드 이미지1" />
                  <p>삼성카드</p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.87812 0.622266C6.06797 0.239063 6.4582 0 6.88359 0H11.1164C11.5418 0 11.932 0.239063 12.1219 0.622266L12.375 1.125H15.75C16.3723 1.125 16.875 1.62773 16.875 2.25C16.875 2.87227 16.3723 3.375 15.75 3.375H2.25C1.62773 3.375 1.125 2.87227 1.125 2.25C1.125 1.62773 1.62773 1.125 2.25 1.125H5.625L5.87812 0.622266ZM2.25 4.5H15.75V15.75C15.75 16.991 14.741 18 13.5 18H4.5C3.25898 18 2.25 16.991 2.25 15.75V4.5ZM5.625 6.75C5.31562 6.75 5.0625 7.00312 5.0625 7.3125V15.1875C5.0625 15.4969 5.31562 15.75 5.625 15.75C5.93438 15.75 6.1875 15.4969 6.1875 15.1875V7.3125C6.1875 7.00312 5.93438 6.75 5.625 6.75ZM9 6.75C8.69062 6.75 8.4375 7.00312 8.4375 7.3125V15.1875C8.4375 15.4969 8.69062 15.75 9 15.75C9.30938 15.75 9.5625 15.4969 9.5625 15.1875V7.3125C9.5625 7.00312 9.30938 6.75 9 6.75ZM12.375 6.75C12.0656 6.75 11.8125 7.00312 11.8125 7.3125V15.1875C11.8125 15.4969 12.0656 15.75 12.375 15.75C12.6844 15.75 12.9375 15.4969 12.9375 15.1875V7.3125C12.9375 7.00312 12.6844 6.75 12.375 6.75Z"
                      fill="#BDBDBD"
                    />
                  </svg>
                </li>
                <hr class="payment" />
                <li>
                  <img src="/prime/profile_card (2).png" alt="카드 이미지1" />
                  <p>우리카드</p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.87812 0.622266C6.06797 0.239063 6.4582 0 6.88359 0H11.1164C11.5418 0 11.932 0.239063 12.1219 0.622266L12.375 1.125H15.75C16.3723 1.125 16.875 1.62773 16.875 2.25C16.875 2.87227 16.3723 3.375 15.75 3.375H2.25C1.62773 3.375 1.125 2.87227 1.125 2.25C1.125 1.62773 1.62773 1.125 2.25 1.125H5.625L5.87812 0.622266ZM2.25 4.5H15.75V15.75C15.75 16.991 14.741 18 13.5 18H4.5C3.25898 18 2.25 16.991 2.25 15.75V4.5ZM5.625 6.75C5.31562 6.75 5.0625 7.00312 5.0625 7.3125V15.1875C5.0625 15.4969 5.31562 15.75 5.625 15.75C5.93438 15.75 6.1875 15.4969 6.1875 15.1875V7.3125C6.1875 7.00312 5.93438 6.75 5.625 6.75ZM9 6.75C8.69062 6.75 8.4375 7.00312 8.4375 7.3125V15.1875C8.4375 15.4969 8.69062 15.75 9 15.75C9.30938 15.75 9.5625 15.4969 9.5625 15.1875V7.3125C9.5625 7.00312 9.30938 6.75 9 6.75ZM12.375 6.75C12.0656 6.75 11.8125 7.00312 11.8125 7.3125V15.1875C11.8125 15.4969 12.0656 15.75 12.375 15.75C12.6844 15.75 12.9375 15.4969 12.9375 15.1875V7.3125C12.9375 7.00312 12.6844 6.75 12.375 6.75Z"
                      fill="#BDBDBD"
                    />
                  </svg>
                </li>
                <hr class="payment" />
              </ul>
              <button class="modal" @click="paymentmodal = true">+ 추가</button>
            </div>
          </div>
        </div>

        <!-- 마이페이지 오른쪽 (예약 내역, 결제 내역) -->
        <div class="profile-right">
          <!-- 탭 -->
          <ul class="tab" v-if="tab !== 'profileedit'">
            <li
              v-on:click="tab = 'reservList'"
              :class="{ active: tab === 'reservList' }"
            >
              나의 예약
            </li>
            <li
              v-on:click="tab = 'paymentHistory'"
              :class="{ active: tab === 'paymentHistory' }"
            >
              결제 내역
            </li>
          </ul>
          <!-- 검색 -->
          <div class="btn-box" v-if="tab !== 'profileedit'">
            <input type="text" class="searchbar" />
            <select name="status" id="status" v-model="selectedStatus">
              <option value="all">전체 상태</option>
              <option value="waiting">배정대기</option>
              <option value="assigned">청소진행</option>
              <option value="done">청소완료</option>
            </select>
            <select name="date" id="date" v-model="selectedPeriod">
              <option value="all">전체 기간</option>
              <option value="1month">1개월</option>
              <option value="3month">3개월</option>
              <option value="1year">1년</option>
            </select>
          </div>
          <!-- 예약 내역 -->
          <div class="reserv-list" v-show="tab === 'reservList'">
            <div class="list" v-for="list in filteredList" :key="list.id">
              <ul>
                <li
                  class="profile-h2 reservlist-title"
                  :class="`status-${list.status}`"
                  style="font-weight: 600"
                >
                  <div class="title">
                    예약 번호: {{ list.number }}
                    <span :class="`statusbox-${list.status}`">
                      {{
                        list.status === "done"
                          ? "완료"
                          : list.status === "assigned"
                          ? "진행중"
                          : list.status === "waiting"
                          ? "대기중"
                          : "알 수 없음"
                      }}</span
                    >
                  </div>
                  <div class="txtbox">
                    <span class="profile-h4">{{ list.reservdate }}</span>
                    <button class="modal" @click="openReservDetail(list)">
                      상세보기
                    </button>
                  </div>
                </li>
                <li class="profile-h4">
                  <span class="profile-h4 title">청소 일정 |</span>
                  {{ list.date }}
                </li>
                <li class="profile-h4">
                  <span class="profile-h4 title">요청 사항 |</span>
                  {{ list.memo }}
                </li>
                <li class="profile-h4">
                  <span class="profile-h4 title">결제 금액 |</span>
                  {{ list.price }}
                </li>
              </ul>
              <div class="btnbox">
                <button
                  :class="['edit', list.status == 'done' ? 'disabled' : '']"
                >
                  수정
                </button>
                <button
                  :class="['cancel', list.status == 'done' ? 'disabled' : '']"
                >
                  취소
                </button>
                <button
                  :class="['fix', list.status !== 'assigned' ? 'disabled' : '']"
                >
                  청소 확정
                </button>
              </div>
            </div>
          </div>
          <!-- 결제 내역 -->
          <div class="payment-history" v-show="tab === 'paymentHistory'">
            <table class="payment-table profile-h4">
              <thead>
                <tr>
                  <th v-for="header in TableHeaders" :key="header.key">
                    {{ header.label }}
                  </th>
                </tr>
              </thead>
              <tbody class="profile-h4">
                <tr v-for="(row, index) in TableData" :key="index">
                  <td>{{ row.item }}</td>
                  <td>{{ row.amount }}</td>
                  <td>{{ row.date }}</td>
                  <td>{{ row.period }}</td>
                  <td>
                    <span
                      class="statusbox-done"
                      style="font-size: 12px; padding: 2% 4%"
                      >{{ row.status }}</span
                    >
                  </td>
                  <td>
                    <button class="modal" style="font-size: 13px">
                      영수증 보기
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 프로필 수정 -->
          <div class="profileeditmodal" v-show="tab === 'profileedit'">
            <ul class="tabedit" v-if="tab === 'profileedit'">
              <li
                v-on:click="tabedit = 'BasicInfo'"
                :class="{ active: tabedit === 'BasicInfo' }"
              >
                기본 정보
              </li>
              <li
                v-on:click="tabedit = 'BusinessInfo'"
                :class="{ active: tabedit === 'BusinessInfo' }"
              >
                사업자 정보
              </li>
            </ul>
            <hr />
            <div class="basicinfo" v-show="tabedit === 'BasicInfo'">
              <form class="register-form">
                <div class="form-group">
                  <label for="userid">아이디</label>
                  <input type="text" id="userid" placeholder="아이디 입력" />
                </div>
                <hr />

                <div class="form-group">
                  <label for="password">비밀번호</label>
                  <div class="withsmall">
                    <input
                      type="password"
                      id="password"
                      placeholder="비밀번호 입력"
                    />
                    <small
                      >※영문, 대소문자, 숫자, 특수문자 중 3개 이상을 조합하여
                      8자리 이상 입력해 주세요.</small
                    >
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="businessotp">비밀번호 확인</label>
                  <div class="withsmall">
                    <input
                      type="password"
                      id="passwordConfirm"
                      placeholder="비밀번호 재입력"
                    />
                    <small
                      >※영문, 대소문자, 숫자, 특수문자 중 3개 이상을 조합하여
                      8자리 이상 입력해 주세요.</small
                    >
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="name">이름</label>
                  <input type="text" id="name" placeholder="이름 입력" />
                </div>
                <hr />

                <div class="form-group">
                  <label for="phone">휴대폰 번호</label>
                  <div class="inline-group">
                    <input type="text" id="phone" placeholder="숫자만 입력" />
                    <button type="button">중복확인</button>
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="email">이메일</label>
                  <div class="inline-group">
                    <input type="email" id="email" placeholder="이메일 입력" />
                    <button type="button">중복확인</button>
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label>주소</label>
                  <div class="address">
                    <div class="inline-group">
                      <input
                        type="text"
                        class="addresstext"
                        placeholder="우편번호"
                      />
                      <button type="button">우편번호 검색</button>
                    </div>
                    <input type="text" placeholder="주소" />
                    <input type="text" placeholder="상세주소" />
                  </div>
                </div>
                <hr />
                <div class="form-group checkbox">
                  <input type="checkbox" id="marketing" />
                  <label for="marketing">
                    마케팅 활용 및 이메일 수신에 모두 동의합니다.
                  </label>
                </div>
                <hr style="color: #bdbdbd; height: 1px" />
                <div class="btnbox">
                  <button class="edit">취소</button>
                  <button class="fix" style="padding: 1% 2%">저장</button>
                </div>
              </form>
            </div>
            <div class="Businessinfo" v-show="tabedit === 'BusinessInfo'">
              <form class="register-form">
                <div class="form-group">
                  <label for="businessname">회사/점포명</label>
                  <input
                    type="text"
                    id="businessname"
                    placeholder="회사 또는 점포명 입력"
                  />
                </div>
                <hr />

                <div class="form-group">
                  <label for="ceoname">대표자명</label>
                  <input
                    type="ceoname"
                    id="ceoname"
                    placeholder="대표자명 입력"
                  />
                </div>
                <hr />

                <div class="form-group">
                  <label for="businessotp">기업인증</label>
                  <input type="file" name="businessotp" id="businessotp" />
                  <small style="color: #9e9e9e"
                    >※<b>사업자등록증명원</b>을 첨부해주세요</small
                  >
                </div>
                <hr />

                <div class="form-group">
                  <label for="businessnum">사업자등록번호</label>
                  <div class="businessnumbox">
                    <input
                      type="businessnum"
                      id="businessnum"
                      placeholder="사업자등록번호 입력"
                    />
                    <small
                      ><ul>
                        <li>
                          ※ 사업자등록번호 도용 방지를 위해 기업인증을 시행하고
                          있습니다
                        </li>
                        <li>
                          ※ 인증이 되지 않을 경우 고객센터(064-739-6155)로
                          문의해 주세요.
                        </li>
                        <li>
                          ※ 가입 후 사업자등록번호/회사명을 변경하시려면
                          고객센터로 사업자등록증을 보내주셔야 합니다.
                        </li>
                      </ul></small
                    >
                  </div>
                </div>
                <hr />

                <hr />
                <div class="form-group">
                  <label>사업장 주소</label>
                  <div class="address">
                    <div class="inline-group">
                      <input
                        type="text"
                        class="addresstext"
                        placeholder="우편번호"
                      />
                      <button type="button">우편번호 검색</button>
                    </div>
                    <input type="text" placeholder="주소" />
                    <input type="text" placeholder="상세주소" />
                  </div>
                </div>
                <hr />
                <hr style="color: #bdbdbd; height: 1px" />
                <div class="btnbox">
                  <button class="edit">취소</button>
                  <button class="fix" style="padding: 1% 2%">저장</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="overlay"
        v-show="paymentmodal || reservdetailmodal"
        @click="
          () => {
            paymentmodal = false;
            reservdetailmodal = false;
          }
        "
      ></div>

      <div class="paymentmodal" v-show="paymentmodal">
        <p class="profile-h1">결제 수단 추가</p>
        <div class="card-info-box">
          <div class="card-number">
            <label class="profile-h2">카드 번호</label>
            <div class="inputs">
              <input
                v-for="(value, index) in cardInputs"
                :key="index"
                maxlength="4"
                v-model="cardInputs[index]"
                type="text"
              />
              <img
                v-if="cardBrand"
                :src="`/prime/profile_${cardBrand}.png`"
                :alt="cardBrand"
              />
            </div>
          </div>
          <div class="card-info">
            <div class="infos">
              <label class="profile-h2">MM / YY</label>
              <input type="text" maxlength="2" />
              <span>/</span>
              <input type="text" maxlength="2" />
            </div>
            <label class="profile-h2">CVC</label>
            <input type="text" maxlength="3" />
          </div>
          <div class="card-name">
            <label class="profile-h2">카드 소유자 이름</label>
            <input type="text" />
          </div>
        </div>
        <div class="btnbox">
          <button class="edit" style="padding: 1% 3%">취소</button>
          <button class="fix">저장</button>
        </div>
      </div>
      <div class="reservdetailmodal" v-if="reservdetailmodal && reservExtra">
        <div class="reservdetail-title">
          <p class="profile-h2">예약 상세 정보</p>
          <hr />
          <div
            class="title"
            :class="`status-${reservdetail.status}`"
            style="font-weight: 600"
          >
            예약 번호: {{ reservdetail.number }}
            <span :class="`statusbox-${reservdetail.status}`">
              {{
                reservdetail.status === "done"
                  ? "완료"
                  : reservdetail.status === "assigned"
                  ? "진행중"
                  : reservdetail.status === "waiting"
                  ? "대기중"
                  : "알 수 없음"
              }}</span
            >
          </div>
        </div>
        <div class="reservdetail-info-box">
          <div class="reservdetail-left">
            <p class="profile-h2">기본 정보</p>
            <div class="customerinfo">
              <p class="profile-h3" @click="isCustomerOpen = !isCustomerOpen">
                예약자 정보<span>{{ isCustomerOpen ? "▲" : "▼" }}</span>
              </p>

              <ul v-show="isCustomerOpen">
                <li><span>이름</span>{{ reservExtra.customer.name }}</li>
                <li><span>연락처</span>{{ reservExtra.customer.mobile }}</li>
                <li><span>이메일</span>{{ reservExtra.customer.email }}</li>
                <li><span>주소</span>{{ reservExtra.customer.address }}</li>
              </ul>
            </div>
            <div class="membershipinfo">
              <p
                class="profile-h3"
                @click="isMembershipOpen = !isMembershipOpen"
              >
                구독권 정보<span>{{ isMembershipOpen ? "▲" : "▼" }}</span>
              </p>

              <ul v-show="isMembershipOpen">
                <li>
                  <span>구독권</span>{{ reservExtra.membership?.name || "-" }}
                </li>
                <li>
                  <span>구독일</span>{{ reservExtra.membership?.date || "-" }}
                </li>
                <li>
                  <span>회차</span>{{ reservExtra.membership?.count || "-" }}
                </li>
                <li>
                  <span>주기</span>{{ reservExtra.membership?.during || "-" }}
                </li>
              </ul>
            </div>
            <div class="workerinfo">
              <p class="profile-h3" @click="isWorkerOpen = !isWorkerOpen">
                담당자 정보 <span>{{ isWorkerOpen ? "▲" : "▼" }}</span>
              </p>

              <ul v-show="isWorkerOpen">
                <li><span>이름</span>{{ reservExtra.worker.name }}</li>
                <li><span>연락처</span>{{ reservExtra.worker.mobile }}</li>
                <li><span>이메일</span>{{ reservExtra.worker.email }}</li>
              </ul>
            </div>
            <div class="inquiryinfo">
              <p class="profile-h3" @click="isInquiryOpen = !isInquiryOpen">
                문의 정보<span>{{ isInquiryOpen ? "▲" : "▼" }}</span>
              </p>

              <ul v-show="isInquiryOpen">
                <li>
                  <span>문의유형</span>{{ reservExtra.inquiry?.type || "-" }}
                </li>
                <li>
                  <span>제목</span>{{ reservExtra.inquiry?.title || "-" }}
                </li>
                <li><span>내용</span>{{ reservExtra.inquiry?.memo || "-" }}</li>
              </ul>
            </div>
          </div>
          <div class="reservdetail-right">
            <p class="profile-h2">예약 정보</p>
            <div class="reservdetailinfo">
              <button class="modal" style="text-align: right">
                첨부파일보기
              </button>
              <ul>
                <li class="firstli">
                  <span>서비스 유형</span
                  >{{ reservExtra.reservinfo?.type || "-" }}
                </li>
                <li>
                  <span>서비스 주소</span
                  >{{ reservExtra.reservinfo?.address || "-" }}
                </li>
                <li>
                  <span>서비스 일시</span
                  >{{ reservExtra.reservinfo?.date || "-" }}
                </li>
                <li>
                  <span>추가 서비스</span
                  >{{ reservExtra.reservinfo?.plus || "-" }}
                </li>
                <li>
                  <span>요청사항</span>{{ reservExtra.reservinfo?.memo || "-" }}
                </li>
              </ul>
            </div>
            <div class="price-summary"></div>
          </div>
        </div>

        <button @click="reservdetailmodal = false">닫기</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
