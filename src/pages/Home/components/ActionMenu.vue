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

  <v-dialog v-model="isEditDialogOpen" max-width="600" persistent>
    <outfit-post-edit-dialog :post="post" @cancel="closeEditModal" />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { deleteOutfitPost } from "@/pages/Home/modules/deleteOutfitPost.ts";
import OutfitPostEditDialog from "@/pages/Home/components/OutfitPostEditDialog.vue";

export default defineComponent({
  name: "ActionMenu",
  components: {
    OutfitPostEditDialog,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup(props) {
    const isEditDialogOpen = ref(false);
    const openEditDialog = () => {
      isEditDialogOpen.value = true;
    };

    const closeEditModal = () => {
      isEditDialogOpen.value = false;
    };

    const deletePost = async () => {
      // add confirm
      await deleteOutfitPost(props.post.id, props.post.imageUrl);
      // refetch
    };

    const list = [
      { title: "Edit", icon: "mdi-pencil-outline", action: openEditDialog },
      { title: "Delete", icon: "mdi-delete-outline", action: deletePost },
    ];

    return { list, isEditDialogOpen, closeEditModal };
  },
});
</script>
