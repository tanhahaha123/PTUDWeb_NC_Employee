<template>
  <div>
    <md-table table-header-color="red" v-model="loanFilter">
      <md-table-empty-state md-label="Không có lịch sử giao dịch nào được ghi nhận"></md-table-empty-state>
      <md-table-row slot="md-table-row"  slot-scope="{ item }">
        <md-table-cell md-label='Ngày giao dịch'>{{ item.NgayGiaoDich }}</md-table-cell>
        <md-table-cell md-label='Số tiền'>{{ item.SoTien }}</md-table-cell>
        <md-table-cell md-label='Số tài khoản người gửi'>{{ item.SoTaiKhoanNguoiGui }}</md-table-cell>
        <md-table-cell md-label='Số tài khoản người nhận'>{{ item.SoTaiKhoanNguoiNhan }}</md-table-cell>
        <md-table-cell md-label='Tình trạng'>{{ item.LoaiGiaoDich }}</md-table-cell>
        <md-table-cell md-label='Mã giao dịch nhắc nợ'>{{ item.MaGiaoDichNhacNo }}</md-table-cell>
        <md-table-cell md-label='Nội dung'>{{ item.NoiDung}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "loan-history-table",
  props: ['loanFilter'],
};
</script>
