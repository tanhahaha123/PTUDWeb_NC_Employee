import store from "../store/index.js";
import VueRouter from "vue-router";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import AccountCreate from "@/pages/AccountCreate.vue";
import MoneyTranfer from "@/pages/MoneyTranfer.vue";
import TransactionsHistory from "@/pages/TransactionsHistory.vue";

// Authentication for employee
import Login from "@/pages/Authentication/Login.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "accountCreate",
        name: "Account Create",
        component: AccountCreate
      },
      {
        path: "moneyTranfer",
        name: "Money Tranfer",
        component: MoneyTranfer
      },
      {
        path: "transactions",
        name: "Transactions History",
        component: TransactionsHistory
      }
    ]
  },
  { path: "/login", component: Login }
];

const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  //Page cho phép
  const publicPages = ["/login", "/register", "/forgetpassword"];
  // Page can quyen login de truy cap
  const authRequired = !publicPages.includes(to.path);

  //Kiểm tra đã login trong localStorage
  const loggedIn = localStorage.getItem("user");

  if (!authRequired && loggedIn) return next("/dashboard");
  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

// function UserProfileBeforeEnter(to,from,next){
//   (async ()=>{
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     next();
//   })();
// };

export { router };
