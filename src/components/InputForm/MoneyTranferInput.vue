
<template>
  <form @submit.prevent="handleInput">
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field class="md-layout-item md-small-size-100 md-size-70" :class="getValidationClass('info')">
              <label>Thông tin người gửi</label>
              <md-input type="text" v-model="input.info"></md-input>
              <span class="md-error" v-if="!$v.input.info.required">Thông tin người gửi không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33" >
            <md-field :class="getValidationClass('accountNumber')">
              <label>Số tài khoản</label>
              <md-input type="text" v-model="input.accountNumber"></md-input>
              <span class="md-error" v-if="!$v.input.accountNumber.required">Số tài khoản không thể bỏ trống</span>
              <span class="md-error" v-else-if="!$v.input.accountNumber.accountNum">Số tài khoản không hợp lệ</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('bankName')">
              <label>Tên chi nhánh</label>
              <md-input type="text" v-model="input.bankName"></md-input>
              <span class="md-error" v-if="!$v.input.bankName.required">Tên ngân hàng không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field :class="getValidationClass('money')">
                <label>Số tiền</label>
                <md-input type="text" v-model="input.money"></md-input>
                <span class="md-error" v-if="!$v.input.money.required">Số tiền không thể bỏ trống</span>
                <span class="md-error" v-else-if="!$v.input.money.valid">Số tiền không hợp lệ</span>
            </md-field>
          </div>
           <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('note')">
                <label>Nội dung</label>
                <md-input type="text" v-model="input.note"></md-input>
                <span class="md-error" v-if="!$v.input.note.required">Nội dung không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" type="submit" >Chuyển tiền</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
const moment=require('moment');
import { validationMixin } from 'vuelidate'
import {
  required,
  minValue,
} from 'vuelidate/lib/validators';
const accountNum = (value, vm) => {
  var phoneno = /^\d{9}$/;
  return phoneno.test(value);
};
export default {
  name: "money-tranfer-input",
  mixins: [validationMixin],
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      input:{ 
        accountNumber:null,
        info:null,
        money:null,
        bankName:null,
        note:null
      },
      resMess:{
        stat:"",
        mess:""
      }
    };
  },
  validations:{
    input:{
        accountNumber:{
            required,
            accountNum
        },
        info:{
            required
        },
        money:{
            required,
            valid: minValue(50000)
        },
        bankName:{
            required
        },
        note:{
            required
        }
    }
  },
  computed:{
    
  },
  methods:{
    getValidationClass (fieldName) {
        const field = this.$v.input[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      handleInput () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$store.dispatch('updatebalance',this.input).then(res=>{
              //thông báo
            this.$notify({ 
              message:
              this.$store.state.statusUpdateRes.mess,
              icon: "add_alert",
              horizontalAlign: "top",
              verticalAlign: "bottom",
              type: this.$store.state.statusUpdateRes.stat
            });
          });
          console.log(this.input);
          
        }
      },
  },
};
</script>
<style></style>
