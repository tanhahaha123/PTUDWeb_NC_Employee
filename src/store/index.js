import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { router } from "../routes/routes";
import { alert } from './alert.module';
import { account } from './account.module';

Vue.use(Vuex);
import axios from 'axios';

const axiosApiInstance = axios.create();

// Request
axiosApiInstance.interceptors.request.use(
  async config => {
    let a= JSON.parse(localStorage.getItem("user"));
    console.log("Request: ",a);
    //const keys = JSON.parse(value)
    console.log("Here acesstoken", a.response.accessToken);
    if(a){
      config.headers = { 
        "x-access-token": a.response.accessToken
      }
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  console.log("originalRequest: ", originalRequest);
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const payload = {
      "AccessToken": JSON.parse(localStorage.getItem("user")).response.accessToken,
      "RefreshToken": JSON.parse(localStorage.getItem("user")).response.refreshToken
    }
    let response;
    try {
      response = await axios.post('https://bank25.herokuapp.com/api/auth/refresh-token/employee',payload);
      //console.log(response);
    }
    catch(e){
      localStorage.removeItem("user");
      router.push("login");
      // console.log("Log: ", e.response);
    }
    const localStore = JSON.parse(localStorage.getItem("user"));
    localStore.response.accessToken = response.data.AccessToken
    //console.log("localStore: ", localStore.response);
    localStorage.setItem("user", JSON.stringify(localStore));  

    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default new Vuex.Store({
  state: {
    //tables cho TransactionHistory
    receiveHisTable:[],
    tranferHisTable:[],
    loanHisTable:[],
    accountNumber:'',
    tranferQuery:'',
    receiveQuery:'',
    loanQuery:'',
    //create account
    statusRes:{
      stat:"",
      mess:""
    },
    //update balance
    statusUpdateRes:{
      stat:"",
      mess:""
    },
  },
  getters:{
    tranferFilter(state) {
      if (state.tranferQuery.length === 0) {
        return state.tranferHisTable;
      }

      const lcQuery = state.tranferQuery.toLocaleLowerCase();
      return state.tranferHisTable.filter(
        t => t.ThongTinNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    },
    receiveFilter(state) {
      if (state.receiveQuery.length === 0) {
        return state.receiveHisTable;
      }

      const lcQuery = state.receiveQuery.toLocaleLowerCase();
      return state.receiveHisTable.filter(
        t => t.ThongTinNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    },
    loanFilter(state) {
      if (state.loanQuery.length === 0) {
        return state.loanHisTable;
      }

      const lcQuery = state.loanQuery.toLocaleLowerCase();
      return state.loanHisTable.filter(
        t => t.SoTaiKhoanNguoiGui.toLocaleLowerCase().includes(lcQuery)
      );
    }
  },
  mutations: {
    GET_ACCOUNT_NUMBER(state,stk){
      state.accountNumber=stk;
    },
    GET_RECEIVE_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.receiveHisTable=payload;
    },
    GET_TRANFER_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.tranferHisTable=payload;
      // state.tranferHisTable=payload.map(t=>{
      //   t.NgayGiaoDich=moment(t.NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // });
      
    },
    GET_LOAN_HISTORY(state, payload){
      for(const i in payload){
        payload[i].NgayGiaoDich=moment(payload[i].NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.loanHisTable=payload;
    },
    UPDATE_TRANFER_QUERY(state, payload) {
      state.tranferQuery = payload;
    },
    UPDATE_RECEIVE_QUERY(state, payload) {
      state.receiveQuery = payload;
    },
    UPDATE_LOAN_QUERY(state, payload) {
      state.loanQuery= payload;
    },
    RESET_TRANSACTION(state){
      state.tranferHisTable=[];
      state.receiveHisTable=[];
      state.loanHisTable=[];
      state.tranferQuery='';
      state.receiveQuery='';
      state.loanQuery='';
    },
    UPDATE_STATUS_CREATE_RESPONE(state,payload){
      if(payload==true){
        state.statusRes.stat="success";
        state.statusRes.mess="Tạo tài khoản thành công";
      } else if(payload==false){
        state.statusRes.stat="danger";
        state.statusRes.mess="Có lỗi khi thực hiện tạo tài khoản";
      }
    },
    UPDATE_STATUS_UPDATE_RESPONE(state,payload){
      if(payload==true){
        state.statusUpdateRes.stat="success";
        state.statusUpdateRes.mess="Chuyển tiền thành công";
      } else if(payload==false){
        state.statusUpdateRes.stat="danger";
        state.statusUpdateRes.mess="Có lỗi khi thực hiện chuyển tiền";
      }
    }
  },
  actions: {
    //lay so tai khoan can tim
    getAccountNumber(ctx,stk){
      ctx.commit('GET_ACCOUNT_NUMBER',stk);
    },
    //lay lich su nhan tien
    async getReceiveHis(ctx,stk){
      const respone=await axiosApiInstance.get('https://bank25.herokuapp.com/api/internal/transaction/ReceiveTransaction/'+stk);
      ctx.commit('GET_RECEIVE_HISTORY',Object.values(respone.data));
    },
    //lay lich su chuyen khoan
    async getTranferHis(ctx,stk){
      const respone=await axiosApiInstance.get('https://bank25.herokuapp.com/api/internal/transaction/TranferTransaction/'+stk);
      console.log(respone);
      ctx.commit('GET_TRANFER_HISTORY',Object.values(respone.data));
    },
    //lay lich su nhac no
    async getLoanHis(ctx,stk){
      const respone=await axiosApiInstance.get('https://bank25.herokuapp.com/api/internal/transaction/LoanTransaction/'+stk);
      ctx.commit('GET_LOAN_HISTORY',Object.values(respone.data));
    },
    //lay chuoi tim kiem lich su chuyen khoan
    updateTranferQuery(ctx, term) {
      ctx.commit('UPDATE_TRANFER_QUERY', term);
    },
    //lay chuoi tim kiem lich su nhan tien
    updateReceiveQuery(ctx, term) {
      ctx.commit('UPDATE_RECEIVE_QUERY', term);
    },
    //lay chuoi tim kiem lich su nhac no
    updateLoanQuery(ctx, term) {
      ctx.commit('UPDATE_LOAN_QUERY', term);
    },
    //reset du lieu trang lich su giao dich
    resetTransaction(ctx){
      ctx.commit('RESET_TRANSACTION');
    },
    //tao tai khoan
    async createAccount(ctx,input){
      console.log(input);
      var status=true;
      let rowTaiKhoanKhachHang={
        "TenDangNhap": input.accountName,
        "MatKhau": input.password,
        "Email": input.email,
        "SoDienThoai": input.phone,
        "TenKhachHang": input.username,
        "GioiTinh": input.sex,
        "SoCMND": input.indentity,
        "NgaySinh": input.birthDay,
        "DiaChi": input.address,
        "ChiNhanhMo": input.branch,
        "NgheNghiep": input.job,
        "ChucVu": input.position,
        "GhiChu":input.note
    }
    console.log(rowTaiKhoanKhachHang);
      let respone=await axiosApiInstance.post('https://bank25.herokuapp.com/api/internal/accountuser/AddUserAccount',rowTaiKhoanKhachHang).then(response => { 
        console.log(response)
      })
      .catch(error => {
          console.log(error.response)
          status=false;
      });
      ctx.commit('UPDATE_STATUS_CREATE_RESPONE',status);
      console.log(status);
    },
    async updatebalance(ctx,input){
      var status=true
      let rowThongTinGuiTien={
        "stk": input.accountNumber,
        "ThongTinNguoiGui": input.info,
        "NoiDung": input.note,
        "TenNganHang": input.phone,
        "SoTien": input.money
      }
      let ThongTinSTK=await axiosApiInstance.get("https://bank25.herokuapp.com/api/internal/accountbank/detail/"+input.accountNumber)
      console.log(rowThongTinGuiTien);
      console.log(ThongTinSTK.data);
      console.log(ThongTinSTK.data[0].LoaiTaiKhoan);
      if(ThongTinSTK.data[0].LoaiTaiKhoan=="thanh toán"){
        let respone=await axiosApiInstance.post('https://bank25.herokuapp.com/api/internal/paymentaccount/UpdateBalance',rowThongTinGuiTien).then(response => { 
          console.log(response)
        })
        .catch(error => {
            console.log(error.response)
            status=false;
        });
      }
      if(ThongTinSTK.data[0].LoaiTaiKhoan=="tiết kiệm"){
        let respone=await axiosApiInstance.post('https://bank25.herokuapp.com/api/internal/savingaccount/UpdateBalance',rowThongTinGuiTien).then(response => { 
          console.log(response)
        })
        .catch(error => {
            console.log(error.response)
            status=false;
        });
      }
      ctx.commit('UPDATE_STATUS_UPDATE_RESPONE',status);
    }
  },
  modules: {
    alert,
    account
  }
})
