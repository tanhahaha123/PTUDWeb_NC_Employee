import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import AccountCreate from "@/pages/AccountCreate.vue";
import MoneyTranfer from "@/pages/MoneyTranfer.vue";
import Notifications from "@/pages/Notifications.vue";
import TransactionsHistory from "@/pages/TransactionsHistory.vue";

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
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "transactions",
        name: "Transactions History",
        component: TransactionsHistory
      }
    ]
  }
];

export default routes;
