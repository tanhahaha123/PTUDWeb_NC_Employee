<template>
  <div>
  <md-table table-header-color="green" v-model="receiveFilter">
      <md-table-empty-state md-label="Không có lịch sử giao dịch nào được ghi nhận"></md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label='Ngày giao dịch'>{{ item.NgayGiaoDich }}</md-table-cell>
        <md-table-cell md-label='Số tiền'>{{ item.SoTien }}</md-table-cell>
        <md-table-cell md-label='Thông tin người gửi'>{{ item.ThongTinNguoiGui }}</md-table-cell>
        <md-table-cell md-label='Số tài khoản người gửi'>{{ item.GiaoDichVoiSoTK }}</md-table-cell>
        <md-table-cell md-label='Tên ngân hàng'>{{ item.TenNganHang }}</md-table-cell>
        <md-table-cell md-label='Mã giao dịch'>{{ item.MaGiaoDich }}</md-table-cell>
        <md-table-cell md-label='Nội dung'>{{ item.NoiDung}}</md-table-cell>
      </md-table-row> 
    </md-table> 
  </div>
</template>

<script>
export default {
  name: "receive-history-table",
  props: ['receiveFilter']
};
</script>
