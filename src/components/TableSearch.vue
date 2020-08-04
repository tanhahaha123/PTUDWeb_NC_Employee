<template>
    <div class="md-layout-item md-small-size-100 md-size-100">
        <md-field class="md-layout-item md-small-size-100 md-size-33">
          <md-icon>search</md-icon>
          <md-input type="text" v-model="term" @input="searchOnTable"></md-input>
        </md-field>
    </div>
</template>

<script>
export default {
  name: "table-search",
  props:['term','searchOntable']
};

</script>
