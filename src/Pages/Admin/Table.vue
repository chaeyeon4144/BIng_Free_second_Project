<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { fullReservationList } from "@/data.mjs";

const currentPage = ref(1);
// ㄴ테이블 페이지 표시
const perPage = 5;
// ㄴ한 페이지에 5개씩 보여줌

const searchType = ref("customer");
// ㄴ고객(기본값) 또는 기사 검색
const searchText = ref("");
// ㄴ이름 검색창 내용 받아오기
const memberFilter = ref("all");
// ㄴ회원 등급 검색 normal=일반 | prime=구독 | all= 전체(기본값)
const statusFilter = ref("all");
// ㄴwaiting = 배정대기 | assigned = 배정은 받았고 청소 대기 | done = 청소 완료 | confirmed = 확정완료  | all = 전체(기본값)
const shopFilter = ref("all");
// ㄴ personal = 일반회원 | business = 사업자회원 | all = 전체(기본값)
const dateFilter = ref("all");
// ㄴ날짜 필터링 today = 오늘 | plus7d = 오늘+7일 | plus15d = +15일 | plus1m + 한달 | plus3m = +3달 | all = 전체(기본값) | custom = 날짜 선택
const today = dayjs();
// ㄴ 오늘 날짜
const fromDate = ref(null);
// ㄴ 검색 날짜 시작일 ~
const toDate = ref(null);
// ㄴ 검색 날짜 끝나는 날

// 여기부터는 안 쓰면 주석 처리 또는 삭제
const openReservDetail = ref(false);
const reservdetail = ref(null);
// ㄴ 둘 다 예약 상세 모달 띄우는 거
const isCustomerOpen = ref(true);
const isMembershipOpen = ref(true);
const isWorkerOpen = ref(true);
const isInquiryOpen = ref(true);
// 상세 모달 안에 토글
const viewreceipt = ref(false);
function printReceipt() {
  window.print();
}
// ㄴ 영수증 모달 , 출력하기 설정

const stepStates = computed(() => {
  const status = reservdetail.value?.status;

  const labels = ["배정 완료", "작업 시작", "작업 완료", "확정 완료"];
  const times = {
    waiting: ["25.03.17 14:00", "-", "-", "-"],
    assigned: ["25.03.17 14:00", "25.05.15 23:00", "-", "-"],
    done: ["25.03.17 14:00", "25.05.15 23:00", "25.05.15 00:20", "-"],
    confirmed: ["25.03.17 14:00", "25.05.15 23:00", "25.05.15 00:20", "25.05.22 14:00"],
  };

  const colorPerStatus = {
    waiting: ["black", "", "", ""],
    assigned: ["black", "orange", "", ""],
    done: ["black", "black", "green", ""],
    confirmed: ["black", "black", "black", "purple"], // 확정 완료
  };

  const timeList = times[status] || ["-", "-", "-", "-"];
  const colorList = colorPerStatus[status] || ["", "", "", ""];

  return labels.map((label, i) => ({
    label,
    time: timeList[i],
    class: colorList[i],
  }));
});
// ㄴ 상세 모달 작업 진행 상황

function openDetailById(id) {
  const found = fullReservationList.find((item) => item.id === id);
  if (found) {
    reservdetail.value = found;
    openReservDetail.value = true;
  }
}
// ㄴ 테이블 정보 받아서 예약 모달에 넣는 함수

const fromDateInput = computed({
  get: () => (fromDate.value ? dayjs(fromDate.value).format("YYYY-MM-DD") : ""),
  set: (val) => {
    fromDate.value = val ? dayjs(val).startOf("day") : null;
  },
});
const toDateInput = computed({
  get: () => (toDate.value ? dayjs(toDate.value).format("YYYY-MM-DD") : ""),
  set: (val) => {
    toDate.value = val ? dayjs(val).endOf("day") : null;
  },
});
watch(dateFilter, (val) => {
  if (val === "today") {
    fromDate.value = today.startOf("day");
    toDate.value = today.endOf("day");
  } else if (val === "plus7d") {
    fromDate.value = today;
    toDate.value = today.add(7, "day");
  } else if (val === "plus15d") {
    fromDate.value = today;
    toDate.value = today.add(15, "day");
  } else if (val === "plus1m") {
    fromDate.value = today;
    toDate.value = today.add(1, "month");
  } else if (val === "plus3m") {
    fromDate.value = today;
    toDate.value = today.add(3, "month");
  } else if (val === "all") {
    fromDate.value = null;
    toDate.value = null;
  } else if (val === "custom") {
    // 날짜 선택 시 별도 초기화 X
    // 하지만 필터 적용은 수동으로 해야 하니 다음 라인 추가 👇
  }
  applyFilters(); // ✅ 날짜 변경 후 즉시 필터 반영
});
const dateRange = computed(() => {
  if (!fromDate.value || !toDate.value) return null;
  return [fromDate.value, toDate.value];
});
// 4개 다 날짜 필터링 관련

const filteredList = ref([]);
function applyFilters() {
  const result = fullReservationList
    .filter((item) => {
      const reservDate = dayjs(item.reservinfo.date, "YYYY.MM.DD"); // 이제 date만 사용!

      const isInDateRange =
        !fromDate.value || !toDate.value
          ? true
          : reservDate.isAfter(fromDate.value.subtract(1, "day")) && reservDate.isBefore(toDate.value.add(1, "day"));

      const statusMatched = statusFilter.value === "all" || item.status === statusFilter.value;

      const memberMatched =
        memberFilter.value === "all" ||
        (memberFilter.value === "normal" && !item.primemember) ||
        (memberFilter.value === "prime" && item.primemember);

      const shopMatched = shopFilter.value === "all" || item.customer.shop === shopFilter.value;

      const searchMatched = searchText.value
        ? (searchType.value === "customer" ? item.customer.name : item.worker.name || "").includes(searchText.value)
        : true;

      return statusMatched && memberMatched && shopMatched && searchMatched && isInDateRange;
    })
    .sort((a, b) => a.id - b.id);

  filteredList.value = result;
  currentPage.value = 1;
}
onMounted(() => {
  applyFilters();
});
// 3개 다 필터링 관련

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredList.value.slice(start, start + perPage);
});
const totalPages = computed(() => Math.ceil(filteredList.value.length / perPage));
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};
// 페이지 네이션 관련
</script>
<template>
  <div class="table-wrap">
    <!-- 상단 검색창 -->
    <div class="searchbox">
      <p class="profile-h2">회원 검색</p>
      <div class="namesearchbox profile-h4">
        <label>검색어</label>
        <select v-model="searchType">
          <option value="customer">고객</option>
          <option value="worker">기사</option>
        </select>
        <input v-model="searchText" type="text" placeholder="이름을 입력하세요" @keydown.enter="applyFilters" />
      </div>
      <hr />
      <div class="searchtop profile-h4">
        <div class="memberbox">
          <label>회원등급</label>
          <label><input type="radio" v-model="memberFilter" value="all" /> 전체</label>
          <label
            ><input type="radio" v-model="memberFilter" value="normal" />
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                fill="#4ECF50" />
            </svg>
            일반</label
          >
          <label
            ><input type="radio" v-model="memberFilter" value="prime" />
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect width="15" height="15" fill="url(#pattern0_273_887)" />
              <defs>
                <pattern id="pattern0_273_887" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_273_887" transform="scale(0.0185185)" />
                </pattern>
                <image
                  id="image0_273_887"
                  width="54"
                  height="54"
                  preserveAspectRatio="none"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg==" />
              </defs>
            </svg>
            구독</label
          >
        </div>
        <div class="shopbox">
          <label>회원구분</label>
          <label><input type="radio" value="all" v-model="shopFilter" /> 전체</label>
          <label><input type="radio" value="personal" v-model="shopFilter" /> 개인회원</label>
          <label><input type="radio" value="business" v-model="shopFilter" /> 사업자회원</label>
        </div>
      </div>
      <hr />
      <div class="searchbt profile-h4">
        <div class="statusbox">
          <label>예약상태</label>
          <label><input type="radio" value="all" v-model="statusFilter" /> 전체</label>
          <label><input type="radio" value="waiting" v-model="statusFilter" /> 배정대기</label>
          <label><input type="radio" value="assigned" v-model="statusFilter" /> 청소대기</label>
          <label><input type="radio" value="confirmed" v-model="statusFilter" /> 청소완료</label>
          <label><input type="radio" value="done" v-model="statusFilter" /> 확정완료</label>
        </div>
        <div class="searchdate">
          <div class="datepicker-box">
            <label>예약일시</label>
            <input
              type="date"
              v-model="fromDateInput"
              @change="
                () => {
                  dateFilter = 'custom';
                  applyFilters();
                }
              " />
            ~
            <input
              type="date"
              v-model="toDateInput"
              @change="
                () => {
                  dateFilter = 'custom';
                  applyFilters();
                }
              " />
          </div>
          <ul class="date-filter">
            <li style="font-size: 12px" :class="{ active: dateFilter === 'all' }" @click="dateFilter = 'all'">전체</li>
            <li style="font-size: 12px" :class="{ active: dateFilter === 'today' }" @click="dateFilter = 'today'">
              오늘
            </li>
            <li style="font-size: 12px" :class="{ active: dateFilter === 'plus7d' }" @click="dateFilter = 'plus7d'">
              7일
            </li>
            <li style="font-size: 12px" :class="{ active: dateFilter === 'plus15d' }" @click="dateFilter = 'plus15d'">
              15일
            </li>
            <li style="font-size: 12px" :class="{ active: dateFilter === 'plus1m' }" @click="dateFilter = 'plus1m'">
              1개월
            </li>
            <li style="font-size: 12px" :class="{ active: dateFilter === 'plus3m' }" @click="dateFilter = 'plus3m'">
              3개월
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="search-action" style="margin-top: 12px">
        <button class="search-button" @click="applyFilters">검색</button>
      </div>
    </div>
    <!-- 테이블 -->
    <div class="tablelist">
      <h2 class="profile-h2">예약 목록</h2>
      <table class="table">
        <!-- 여기서 본인이 쓸 제목으로 바꾸기! -->
        <thead>
          <tr>
            <th>예약번호</th>
            <th>고객명</th>
            <th>고객 연락처</th>
            <th>예약일자</th>
            <th>청소일자</th>
            <th>담당기사</th>
            <th>담당 기사 연락처</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <!-- 여기서 내용 바꾸기 -->
        <tbody>
          <tr v-for="item in paginatedList" :key="item.id">
            <td>{{ item.number }}</td>
            <td class="customername">
              <template v-if="item.primemember">
                <!-- 파란 북마크 아이콘 -->
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="15" height="15" fill="url(#pattern0_273_889)" />
                  <defs>
                    <pattern id="pattern0_273_889" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_273_889" transform="scale(0.0185185)" />
                    </pattern>
                    <image
                      id="image0_273_889"
                      width="54"
                      height="54"
                      preserveAspectRatio="none"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg==" />
                  </defs>
                </svg>

                {{ item.customer.name }}
              </template>
              <template v-else>
                <!-- 초록 나뭇잎 아이콘 -->
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                    fill="#4ECF50" />
                </svg>
                {{ item.customer.name }}
              </template>
            </td>

            <!-- 데이터 바꾸려면 data.mjs 참고해서 사용하기
            ex) 고객 주소 사용할 거면 {{ item.customer.mobile }} => {{ item.customer.address }}
            기사 이메일 사용할 거면 {{ item.worker.name || "-" }} => {{ item.worker.email || "-" }}
             -->
            <td class="profile-h4">{{ item.customer.mobile }}</td>
            <td class="profile-h4">{{ item.reservdate }}</td>
            <td class="profile-h4">{{ item.reservinfo.date }} {{ item.reservinfo.time }}</td>
            <td class="profile-h4">{{ item.worker.name || "-" }}</td>
            <td class="profile-h4">{{ item.worker.mobile || "-" }}</td>
            <td class="profile-h4">
              <span :class="`statusbox-${item.status}`">
                {{
                  item.status === "waiting"
                    ? "대기중"
                    : item.status === "assigned"
                    ? "진행중"
                    : item.status === "done"
                    ? "청소완료"
                    : item.status === "confirmed"
                    ? "확정완료"
                    : "알수없음"
                }}
              </span>
            </td>
            <td class="btnbox">
              <button class="modal" v-on:click="viewreceipt = true">영수증 보기</button>
              <button class="modal" @click="openDetailById(item.id)">상세보기</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div class="pagination">
        <span>총 {{ filteredList.length }}건의 예약</span>
        <div class="pagebox">
          <button @click="goToPage(currentPage - 1)">←</button>
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)">
            {{ page }}
          </button>
          <button @click="goToPage(currentPage + 1)">→</button>
        </div>
      </div>
    </div>
    <!-- 모달 오버레이 -->
    <div
      class="overlay"
      v-show="openReservDetail || viewreceipt"
      @click="
        () => {
          openReservDetail = false;
          viewreceipt = false;
        }
      "></div>
    <!-- 예약 상세 모달 -->
    <div class="reservdetailmodal" v-if="openReservDetail && reservdetail">
      <div class="reservdetail-title">
        <p class="profile-h2">예약 상세 정보</p>
        <hr />
        <div class="title" :class="`status-${reservdetail.status}`" style="font-weight: 600">
          예약 번호: {{ reservdetail.number }}
          <span
            style="display: inline; padding: 0.5% 1% 0.5%"
            :class="reservdetail?.status ? `statusbox-${reservdetail.status}` : ''">
            {{
              reservdetail?.status === "waiting"
                ? "대기중"
                : reservdetail?.status === "assigned"
                ? "진행중"
                : reservdetail?.status === "done"
                ? "청소완료"
                : reservdetail?.status === "confirmed"
                ? "확정완료"
                : "알수없음"
            }}</span
          >
        </div>
      </div>
      <div class="reservdetail-info-box">
        <div class="reservdetail-left">
          <p class="profile-h2" style="font-size: 16px; font-weight: 500">기본 정보</p>
          <div class="customerinfo">
            <p class="profile-h3" @click="isCustomerOpen = !isCustomerOpen">
              예약자 정보
              <span class="icon">
                <template v-if="isCustomerOpen">
                  <!-- 위쪽 아이콘 (▲) -->
                  <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
                <template v-else>
                  <!-- 아래쪽 아이콘 (▼) -->
                  <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
              </span>
            </p>

            <ul v-show="isCustomerOpen" class="profile-h4">
              <li><span>이름</span>{{ reservdetail.customer.name }}</li>
              <li><span>연락처</span>{{ reservdetail.customer.mobile }}</li>
              <li><span>이메일</span>{{ reservdetail.customer.email }}</li>
              <li><span>주소</span>{{ reservdetail.customer.address }}</li>
            </ul>
          </div>
          <div class="membershipinfo">
            <p class="profile-h3" @click="isMembershipOpen = !isMembershipOpen">
              구독권 정보
              <span class="icon">
                <template v-if="isMembershipOpen">
                  <!-- 위쪽 아이콘 (▲) -->
                  <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
                <template v-else>
                  <!-- 아래쪽 아이콘 (▼) -->
                  <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
              </span>
            </p>

            <ul v-show="isMembershipOpen" class="profile-h4">
              <li><span>구독권</span>{{ reservdetail.membership?.name || "-" }}</li>
              <li><span>구독일</span>{{ reservdetail.membership?.date || "-" }}</li>
              <li><span>회차</span>{{ reservdetail.membership?.count || "-" }}</li>
              <li><span>주기</span>{{ reservdetail.membership?.during || "-" }}</li>
            </ul>
          </div>
          <div class="workerinfo">
            <p class="profile-h3" @click="isWorkerOpen = !isWorkerOpen">
              담당자 정보
              <span class="icon">
                <template v-if="isWorkerOpen">
                  <!-- 위쪽 아이콘 (▲) -->
                  <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
                <template v-else>
                  <!-- 아래쪽 아이콘 (▼) -->
                  <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
              </span>
            </p>

            <ul v-show="isWorkerOpen" class="profile-h4">
              <li><span>이름</span>{{ reservdetail.worker.name }}</li>
              <li><span>연락처</span>{{ reservdetail.worker.mobile }}</li>
              <li><span>이메일</span>{{ reservdetail.worker.email }}</li>
            </ul>
          </div>
          <div class="inquiryinfo">
            <p class="profile-h3" @click="isInquiryOpen = !isInquiryOpen">
              문의 정보
              <span class="icon">
                <template v-if="isInquiryOpen">
                  <!-- 위쪽 아이콘 (▲) -->
                  <svg width="18" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
                <template v-else>
                  <!-- 아래쪽 아이콘 (▼) -->
                  <svg width="18" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                      stroke="#424242"
                      stroke-width="1.4"
                      stroke-linecap="round" />
                  </svg>
                </template>
              </span>
            </p>

            <ul v-show="isInquiryOpen" class="profile-h4">
              <li><span>문의유형</span>{{ reservdetail.inquiry?.type || "-" }}</li>
              <li><span>제목</span>{{ reservdetail.inquiry?.title || "-" }}</li>
              <li><span>내용</span>{{ reservdetail.inquiry?.memo || "-" }}</li>
            </ul>
          </div>
        </div>
        <div class="reservdetail-right">
          <p class="profile-h3" style="font-weight: 500">예약 정보</p>
          <div class="reservdetailinfo">
            <button class="modal profile-h4" style="text-align: right; font-size: 14px">첨부파일보기</button>
            <ul class="profile-h4">
              <li class="firstli"><span>서비스 유형</span>{{ reservdetail.reservinfo?.type || "-" }}</li>
              <li><span>제빙기 정보</span>{{ reservdetail.reservinfo?.machine || "-" }}</li>
              <li><span>서비스 주소</span>{{ reservdetail.reservinfo?.address || "-" }}</li>
              <li><span>서비스 일시</span>{{ reservdetail.reservinfo?.date || "-" }}</li>
              <li><span>추가 서비스</span>{{ reservdetail.reservinfo?.plus || "-" }}</li>
              <li><span>요청사항</span>{{ reservdetail.reservinfo?.memo || "-" }}</li>
            </ul>
          </div>
          <div class="info-box-bt">
            <ul class="timeline">
              <p class="profile-h3">작업 진행 상황</p>
              <li v-for="(step, index) in stepStates" :key="index">
                <span class="dot" :class="step.class"></span>
                <div class="label profile-h4">
                  <p>{{ step.label }}</p>
                  <p>{{ step.time }}</p>
                </div>
              </li>
            </ul>
            <div class="receipt">
              <p class="profile-h3">결제 정보</p>
              <ul class="payment profile-h4">
                <li>
                  <p style="color: #616161">서비스 금액</p>
                  <p>{{ reservdetail.payment?.service.toLocaleString() }}원</p>
                </li>
                <li>
                  <p style="color: #616161">추가 서비스</p>
                  <p>{{ reservdetail.payment?.extra.toLocaleString() }}원</p>
                </li>
                <li>
                  <p style="color: #616161">쿠폰 할인</p>
                  <p>{{ reservdetail.payment?.coupon.toLocaleString() }}원</p>
                </li>
                <li>
                  <p style="color: #616161">구독권 차감</p>
                  <p>
                    {{
                      reservdetail.payment?.membershipDiscount.toLocaleString("ko-KR", {
                        signDisplay: "always",
                      })
                    }}원
                  </p>
                </li>
                <li>
                  <p style="color: #616161">서비스 차감</p>
                  <p>
                    {{
                      reservdetail.payment?.extraDiscount.toLocaleString("ko-KR", {
                        signDisplay: "always",
                      })
                    }}원
                  </p>
                </li>
                <hr />
                <li class="profile-h3" style="margin: 0">
                  <p><strong>총 결제 금액</strong></p>
                  <p style="color: red">
                    {{
                      (
                        (reservdetail.payment?.service || 0) +
                        (reservdetail.payment?.extra || 0) +
                        (reservdetail.payment?.coupon || 0) +
                        (reservdetail.payment?.membershipDiscount || 0) +
                        (reservdetail.payment?.extraDiscount || 0)
                      ).toLocaleString()
                    }}원
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <button @click="openReservDetail = false">닫기</button>
    </div>
    <!-- 영수증 보기 모달 -->
    <div class="viewreceipt" v-show="viewreceipt">
      <img src="/prime/profile_receipt.png" alt="영수증 이미지" />
      <img src="/prime/profile_receipt.png" class="print-only" alt="영수증 이미지" />

      <div class="btnbox">
        <button class="edit" style="padding: 1.5% 3%" @click="printReceipt">출력하기</button>
        <button class="fix" style="padding: 1.6% 5.5%" @click="viewreceipt = false">닫기</button>
      </div>
    </div>
  </div>
</template>
<style></style>
