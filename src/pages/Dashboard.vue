<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#/accountCreate">
            <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>account_box</md-icon>
            <h3 class="title">Tạo tài khoản</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Tạo tài khoản khách hàng
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <a href="#/moneyTranfer">
              <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>attach_money</md-icon>
            <h3 class="title">Chuyển tiền</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Chuyển tiền vào tài khoản
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <a href="#/transactions">
              <md-icon>forward</md-icon>
            </a>
          </template>

          <template slot="content">
            <md-icon>receipt_long</md-icon>
            <h3 class="title">Lịch sử giao dịch</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              Xem lịch sử giao dịch của một tài khoản
            </div>
          </template>
        </stats-card>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"></div> -->
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
} from "@/components";

export default {
  components: {
    StatsCard,
  },
};
</script>
