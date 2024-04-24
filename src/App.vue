<template>
  <!-- 全体のレイアウト。 -->
  <!-- ヘッダー -->
  <!-- コンテンツ -->
  <main>
    <home-index />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeIndex from "@/pages/Home/index.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeIndex,
  },
});
</script>
