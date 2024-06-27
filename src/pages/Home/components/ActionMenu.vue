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

  <v-dialog v-model="isUpdateModalOpen" max-width="600" persistent>
    <outfit-post-update-dialog
      :post="post"
      @close="closeUpdateModal"
      @outfit-submit="$emit('outfit-submit')"
    />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { deleteOutfitPost } from "@/pages/Home/modules/deleteOutfitPost.ts";
import OutfitPostUpdateDialog from "@/pages/Home/components/OutfitPostUpdateDialog.vue";

export default defineComponent({
  name: "ActionMenu",
  components: {
    OutfitPostUpdateDialog,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ["outfit-submit"],
  setup(props) {
    const isUpdateModalOpen = ref(false);
    const openUpdateDialog = () => {
      isUpdateModalOpen.value = true;
    };

    const closeUpdateModal = () => {
      isUpdateModalOpen.value = false;
    };

    // openConfirmModal
    const deletePost = async () => {
      // add confirm
      await deleteOutfitPost(props.post.id, props.post.imageUrl);
      // refetch
    };

    const list = [
      { title: "Edit", icon: "mdi-pencil-outline", action: openUpdateDialog },
      { title: "Delete", icon: "mdi-delete-outline", action: deletePost },
    ];

    return { list, isUpdateModalOpen, closeUpdateModal };
  },
});
</script>
