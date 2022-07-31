<template>
  <div>
    <b-row>
      <data-table></data-table>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from "@/components/DataTable.vue";

export default {
  name: "Home",
  components: {
    DataTable,
  },
};
</script>
