<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">Bản thông tin</h4>
            <p class="category">
              Điền thông tin cần thiết để chuyển tiền
            </p>
          </md-card-header>
          <money-tranfer-input></money-tranfer-input>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {MoneyTranferInput} from "@/components";
export default {
  components: {
    MoneyTranferInput
  }
};
</script>
