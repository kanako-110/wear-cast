<template>
  <!-- 全体のレイアウト。 -->
  <!-- ヘッダー -->
  <!-- コンテンツ -->
  <main>
    <!-- loading? -->
    <home-index />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeIndex from "@/pages/Home/index.vue";
import { createAuth } from "@/compositions/useAuth";

export default defineComponent({
  name: "App",
  components: {
    HomeIndex,
  },
  setup() {
    createAuth();
  },
});
</script>
