<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        variant="plain"
        density="comfortable"
        icon="mdi-dots-horizontal"
        v-bind="props"
      />
    </template>
    <v-list density="compact">
      <v-list-item v-for="(item, index) in list" :key="index">
        <template v-slot:prepend>
          <v-icon :icon="item.icon" size="small" />
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ActionMenu",
  props: {},
  setup() {
    const list = [
      { title: "Edit", icon: "mdi-pencil-outline" },
      { title: "Delete", icon: "mdi-delete-outline" },
    ];
    return { list };
  },
});
</script>
