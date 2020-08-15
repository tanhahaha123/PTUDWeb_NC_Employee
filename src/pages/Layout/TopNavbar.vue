<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
            >
              <label>Search...</label>
            </md-autocomplete>
          </div>
          <md-list>
            <md-list-item href="#/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right"></ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <!-- Hiển thị Icon đăng nhập ( đang đăng nhập hay chưa đăng nhập) -->
            <li class="md-list-item" v-if="userInfo">
              <a
                
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-avatar class="md-avatar-icon md-small md-primary">{{
                        userInfo.TenNhanVien.split(" ")
                          [
                            userInfo.TenNhanVien.split(" ").length - 1
                          ].toString()
                          .charAt(0)
                      }}</md-avatar>
                      <p class="hidden-lg hidden-md">Profile</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Trang cá nhân</a></li>
                      <li><a href="#">Cài đặt</a></li>
                      <li><a href="#" @click="LogOut">Đăng xuất</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
            <md-list-item href="#/user" v-else>
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userInfo: null,
      selectedEmployee: null,
      employees: ["Jim Halpert"]
    };
  },
  methods: {
    ...mapActions("alert", ["clear"]),
    ...mapActions("account", ["logout"]),
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    LogOut() {
      //console.log("logout");
      this.logout();
    }
    // getDebtReminderIsCancel() {
    //   return this.debtReminderTable.source;
    //   //console.log(this.debtReminderTable.source);
    // },
    // isSelected1(item) {
    //   return item.LoaiGiaoDich == "đã hủy";
    // },
    // selected(item) {
    //   this.selectedMessage(item);
    // }
  },
  computed: {
    // ...mapState(["debtReminderTable", "status"])
  },
  created() {
    // this.$store.dispatch("getDebtReminder");
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    //console.log("Created");
  }
};
</script>

<style lang="css">
.isSelected {
  background-color: #ebebe6;
}
</style>
