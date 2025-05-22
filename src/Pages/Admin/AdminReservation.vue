<!-- 효빈 관리자 예약 관리 -->
<script setup>
import { ref, computed } from "vue";
import { fullReservationList } from "@/data.mjs";

const currentPage = ref(1);
const perPage = 5;

// 검색 필터 상태
const searchType = ref("customer"); // "customer" 또는 "worker"
const searchText = ref("");

// 필터링 + 정렬
const filteredList = computed(() => {
  if (!searchText.value) return fullReservationList;

  return fullReservationList
    .map((item) => {
      const targetText =
        searchType.value === "customer"
          ? item.customer.name
          : item.worker.name || "";
      const matched = targetText.includes(searchText.value);
      return { ...item, matched };
    })
    .sort((a, b) => {
      if (a.matched === b.matched) return a.id - b.id;
      return a.matched ? -1 : 1; // 일치하는 항목 우선
    });
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredList.value.slice(start, start + perPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredList.value.length / perPage)
);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};
</script>
<template>
  <div>
    <div style="margin-bottom: 12px">
      <label style="margin-right: 8px">검색어</label>
      <select v-model="searchType" style="padding: 4px 8px; margin-right: 8px">
        <option value="customer">고객</option>
        <option value="worker">기사</option>
      </select>
      <input
        v-model="searchText"
        type="text"
        placeholder="이름을 입력하세요"
        style="padding: 4px 8px; width: 200px"
      />
    </div>
    <h2 class="profile-h2">예약 목록</h2>
    <table class="table">
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
      <tbody>
        <tr v-for="item in paginatedList" :key="item.id">
          <td>{{ item.number }}</td>
          <td>
            <template v-if="item.primemember">
              <!-- 파란 북마크 아이콘 -->
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="15" height="15" fill="url(#pattern0_273_889)" />
                <defs>
                  <pattern
                    id="pattern0_273_889"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_273_889"
                      transform="scale(0.0185185)"
                    />
                  </pattern>
                  <image
                    id="image0_273_889"
                    width="54"
                    height="54"
                    preserveAspectRatio="none"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>

              {{ item.customer.name }}
            </template>
            <template v-else>
              <!-- 초록 나뭇잎 아이콘 -->
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                  fill="#4ECF50"
                />
              </svg>
              {{ item.customer.name }}
            </template>
          </td>
          <td>{{ item.customer.mobile }}</td>
          <td>{{ item.reservdate }}</td>
          <td>{{ item.reservinfo.date }}</td>
          <td>{{ item.worker.name || "-" }}</td>
          <td>{{ item.worker.mobile || "-" }}</td>
          <td>
            <span
              :class="[
                'status-label',
                item.status === 'waiting'
                  ? 'blue'
                  : item.status === 'assigned'
                  ? 'orange'
                  : item.status === 'confirmed'
                  ? 'green'
                  : '',
              ]"
            >
              {{
                item.status === "waiting"
                  ? "대기중"
                  : item.status === "assigned"
                  ? "진행중"
                  : item.status === "confirmed"
                  ? "완료"
                  : "알수없음"
              }}
            </span>
          </td>
          <td>
            <button class="download">📄 리포트 다운로드</button>
            <button class="detail">ℹ️ 상세</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <span>총 {{ fullReservationList.length }}건의 예약</span>
      <div>
        <button @click="goToPage(currentPage - 1)">←</button>
        <button
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)">→</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.status-label {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  display: inline-block;
}
.status-label.orange {
  background-color: #ffcc80;
  color: #e65100;
}
.status-label.blue {
  background-color: #90caf9;
  color: #0d47a1;
}
.status-label.green {
  background-color: #a5d6a7;
  color: #2e7d32;
}
button.download {
  margin-right: 6px;
  background-color: #8bc34a;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
button.detail {
  background-color: #757575;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
.pagination button {
  margin: 0 4px;
  padding: 4px 8px;
}
.pagination .active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
