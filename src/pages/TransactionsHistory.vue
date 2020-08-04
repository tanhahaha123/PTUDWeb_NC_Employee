<template>
  <div class="content">
    <div class="md-layout-item md-small-size-100 md-size-100">
      <md-field class="md-layout-item md-small-size-100 md-size-33" :class="feild">
        <label>Nhập số tài khoản ngân hàng</label>
        <md-input type="text" v-model="dataInput" required></md-input>
        <span class="md-error">{{errorMess}}</span>
      </md-field>
      <md-button class="md-raised md-warning" @click="handleInput">Tìm kiếm</md-button>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Giao dịch chuyển khoản</h4>
          </md-card-header>
          <md-card-content>
            <tranfer-history-table :tranferFilter="tranferFilter"></tranfer-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field class="md-layout-item md-small-size-100 md-size-33">
          <md-icon>search</md-icon>
          <md-input type="text" placeholder="Nhập thông tin người cần tìm" v-model="tranferQuery" @input="tranferTableSearch"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Giao dịch nhận tiền</h4>
          </md-card-header>
          <md-card-content>
            <receive-history-table :receiveFilter="receiveFilter"></receive-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field class="md-layout-item md-small-size-100 md-size-33">
          <md-icon>search</md-icon>
          <md-input type="text" placeholder="Nhập thông tin người cần tìm" v-model="receiveQuery" @input="receiveTableSearch"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Giao dịch nhắc nợ</h4>
          </md-card-header>
          <md-card-content>
            <loan-history-table :loanFilter="loanFilter"></loan-history-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field class="md-layout-item md-small-size-100 md-size-33">
          <md-icon>search</md-icon>
          <md-input type="text" placeholder="Nhập số tài khoản cần tìm" v-model="loanQuery" @input="loanTableSearch"></md-input>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
//import { SimpleTable } from "@/components";
//this=this;
import {
  TranferHistoryTable,
  LoanHistoryTable,
  ReceiveHistoryTable
} from "@/components";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    TranferHistoryTable,
    LoanHistoryTable,
    ReceiveHistoryTable
  },
  data() {
    return {
      dataInput: "",
      tranferQuery:'',
      receiveQuery:'',
      loanQuery:'',
      errorMess:"",
      errorShow: false
    };
  },
  mounted() {
    this.$store.dispatch('resetTransaction');
  },
  computed: {
    ...mapGetters(["loanFilter"]),
    ...mapGetters(["receiveFilter"]),
    ...mapGetters(["tranferFilter"]),
    feild() {
      return {
        "md-invalid": this.errorShow
      };
    }
  },
  methods: {
    handleInput() {
      if (isNaN(this.dataInput)) {
        this.errorMess="Chuỗi nhập sai. Vui lòng thử lại";
        this.errorShow = true;
      } 
      else if(this.dataInput == ""){
        this.errorMess="Số tài khoản không được bỏ trống";
        this.errorShow = true;
      }
      else{
        this.errorShow = false;
        this.$store.dispatch("getAccountNumber", this.dataInput);
        this.$store.dispatch("getTranferHis", this.$store.state.accountNumber);
        this.$store.dispatch("getLoanHis", this.$store.state.accountNumber);
        this.$store.dispatch("getReceiveHis", this.$store.state.accountNumber);
      }
    },
    tranferTableSearch () {
      this.$store.dispatch('updateTranferQuery',this.tranferQuery);
    },
    receiveTableSearch () {
      this.$store.dispatch('updateReceiveQuery',this.receiveQuery);
    },
    loanTableSearch () {
      this.$store.dispatch('updateLoanQuery',this.loanQuery);
    }
  },
};
</script>
