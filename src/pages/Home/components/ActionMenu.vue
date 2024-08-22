<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        aria-label="Actions menu"
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
      @outfit-update="$emit('outfit-update')"
    />
  </v-dialog>

  <v-dialog v-model="isDeleteModalOpen" max-width="600">
    <outfit-post-delete-confirm-dialog
      :post="post"
      @outfit-post-deleted="handleAfterDelete"
      @cancel="closeDeleteModal"
    />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";
import OutfitPostUpdateDialog from "@/pages/Home/components/OutfitPostUpdateDialog.vue";
import OutfitPostDeleteConfirmDialog from "@/pages/Home/components/OutfitPostDeleteConfirmDialog.vue";

export default defineComponent({
  name: "ActionMenu",
  components: {
    OutfitPostUpdateDialog,
    OutfitPostDeleteConfirmDialog,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ["outfit-update", "outfit-post-deleted"],
  setup(_, { emit }) {
    const isUpdateModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);

    const openUpdateDialog = () => {
      isUpdateModalOpen.value = true;
    };

    const closeUpdateModal = () => {
      isUpdateModalOpen.value = false;
    };

    const openDeleteDialog = () => {
      isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => {
      isDeleteModalOpen.value = false;
    };

    const handleAfterDelete = () => {
      closeDeleteModal();
      emit("outfit-post-deleted");
    };

    const list = [
      { title: "Edit", icon: "mdi-pencil-outline", action: openUpdateDialog },
      { title: "Delete", icon: "mdi-delete-outline", action: openDeleteDialog },
    ];

    return {
      list,
      isUpdateModalOpen,
      closeUpdateModal,
      isDeleteModalOpen,
      closeDeleteModal,
      handleAfterDelete,
    };
  },
});
</script>
