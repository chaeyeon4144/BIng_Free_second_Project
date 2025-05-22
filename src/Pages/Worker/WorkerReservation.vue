<script setup>
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
  <div class="worker_reserv">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
          >
            <i class="fas fa-calendar-check text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              전체 예약
            </h3>
            <p
              class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white"
            >
              24건
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+5건</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
          >
            <i class="fas fa-check-circle text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              확정 예약
            </h3>
            <p
              class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white"
            >
              18건
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+3건</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300"
          >
            <i class="fas fa-clock text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              대기 예약
            </h3>
            <p
              class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white"
            >
              6건
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+2건</span>
          </div>
        </div>
      </div>
    </div>
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
            <button class="modal" style="font-size: 13px">영수증 보기</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.worker_reserv {
  width: 100%;
}
table {
  width: 90%;
  border-collapse: collapse;
  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
  th {
    background-color: #f5f5f5;
  }
}
</style>
