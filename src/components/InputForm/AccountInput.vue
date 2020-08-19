<template>
  <form @submit.prevent="handleInput">
    <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Bảng điền thông tin</h4>
        </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field class="md-layout-item md-small-size-100 md-size-70" :class="getValidationClass('username')">
              <label>Tên khách hàng</label>
              <md-input type="text" v-model="input.username"></md-input>
              <span class="md-error" v-if="!$v.input.username.required">Tên khách hàng không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33" >
            <md-field :class="getValidationClass('phone')">
              <label>Số điện thoại</label>
              <md-input type="tel" v-model="input.phone"></md-input>
              <span class="md-error" v-if="!$v.input.phone.required">Số điện thoại không thể bỏ trống</span>
              <span class="md-error" v-else-if="!$v.input.phone.phone">Số điện thoại không hợp lệ</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('email')">
              <label>Email</label>
              <md-input type="email" v-model="input.email"></md-input>
              <span class="md-error" v-if="!$v.input.email.required">Email không thể bỏ trống</span>
              <span class="md-error" v-else-if="!$v.input.email.email">Email không hợp lệ</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field :class="getValidationClass('address')">
              <label>Địa chỉ</label>
              <md-input type="text" v-model="input.address"></md-input>
              <span class="md-error" v-if="!$v.input.address.required">Địa chỉ không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40" >
            <md-field :class="getValidationClass('indentity')">
              <label>Số chứng minh nhân dân</label>
              <md-input type="text" v-model="input.indentity"></md-input>
              <span class="md-error" v-if="!$v.input.indentity.required">CMND không thể bỏ trống</span>
              <span class="md-error" v-else-if="!$v.input.indentity.indentity">CMND không hợp lệ</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50" >
              <md-datepicker v-model="input.birthDay" :class="getValidationClass('birthDay')">
                <label>Ngày sinh</label>
                <span class="md-error" v-if="!$v.input.birthDay.required">Ngày sinh không thể bỏ trống</span>
                <span class="md-error" v-else-if="!$v.input.birthDay.day">Ngày sinh không hợp lệ</span>
              </md-datepicker>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('sex')">
            <label>Giới tính</label>
            <md-select v-model="input.sex" >
                <md-option value="Nam">Nam</md-option>
                <md-option value="Nữ">Nữ</md-option>
                <md-option value="Khác">Khác</md-option>
            </md-select>
            <span class="md-error" v-if="!$v.input.sex.required">Giới tính không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Nghề nghiệp</label>
              <md-input type="text" v-model="input.job"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Chức vụ</label>
              <md-input type="text" v-model="input.position"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('accountName')">
              <label>Tên tài khoản</label>
              <md-input type="text" v-model="input.accountName"></md-input>
              <span class="md-error" v-if="!$v.input.accountName.required">Tên tài khoản không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('password')">
              <label>Mật khẩu</label>
              <md-input type="text" v-model="input.password"></md-input>
              <span class="md-error" v-if="!$v.input.password.required">Mật khẩu không thể bỏ trống</span>
            </md-field>
          </div>
           <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('rePassword')">
              <label>Nhập lại mật khẩu</label>
              <md-input type="text" v-model="input.rePassword"></md-input>
              <span class="md-error" v-if="!$v.input.rePassword.required">Nhập lại mật khẩu</span>
              <span class="md-error" v-else-if="!$v.input.rePassword.sameAsPassword">Mật khẩu không giốn</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field class="md-layout-item md-small-size-100 md-size-50" :class="getValidationClass('branch')">
              <label>Chi nhánh</label>
              <md-input type="text" v-model="input.branch"></md-input>
              <span class="md-error" v-if="!$v.input.branch.required">Chi nhánh không thể bỏ trống</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Ghi chú</label>
              <md-input type="text" v-model="input.note"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-warning" type="submit" >Tạo tài khoản</md-button>
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
  email,
  sameAs,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
const day = (value, vm) => {
  return moment(value,"YYYY-MM-DD").isValid();
};
const phone = (value, vm) => {
  var phoneno = /^\d{9}$/;
  return phoneno.test(value);
};
const indentity = (value, vm) => {
  var phoneno = /^\d{10}$/;
  return phoneno.test(value);
};
export default {
  name: "account-input",
  mixins: [validationMixin],
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    //let now= new Date();
    let date = moment().format("YYYY-MM-DD");
    return {
      input:{ 
        username:null,
        phone:null,
        indentity:null,
        email:null,
        address:null,
        birthDay:date,
        sex:null,
        accountName:null,
        password:null,
        rePassword:null,
        branch:null,
        job:null,
        position:null,
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
      username:{
          required
        },
        phone: {
          required,
          phone
        },
        indentity:{
          required,
          indentity
        },
        email:{
          required,
          email
        },
        address:{
          required,
        },
        birthDay:{
          required,
          day
        },
        sex:{
          required,
        },
        accountName:{
          required,
        },
        password:{
          required,
        },
        rePassword:{
          required,
          sameAsPassword: sameAs('password')
        },
        branch:{
          required,
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
          this.$store.dispatch('createAccount',this.input).then(res=>{
            this.$notify({ 
              message:
              this.$store.state.statusRes.mess,
              icon: "add_alert",
              horizontalAlign: "top",
              verticalAlign: "bottom",
              type: this.$store.state.statusRes.stat
            });
          });
          //console.log(this.input);
          //Thong bao
        }
      },
  },
};
</script>
<style></style>
