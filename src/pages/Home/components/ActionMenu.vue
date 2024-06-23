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
      <v-list-item
        v-for="(item, index) in list"
        :key="index"
        @click="item.action"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon" size="small" />
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { deleteOutfitPost } from "@/pages/Home/modules/deleteOutfitPost.ts";

export default defineComponent({
  name: "ActionMenu",
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup(props) {
    const edit = () => {
      console.log("edit");
    };

    const deletePost = async () => {
      await deleteOutfitPost(props.post.id, props.post.imageUrl);
      // refetch
    };

    const list = [
      { title: "Edit", icon: "mdi-pencil-outline", action: edit },
      { title: "Delete", icon: "mdi-delete-outline", action: deletePost },
    ];
    return { list };
  },
});
</script>
