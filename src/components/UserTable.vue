<script setup lang="ts">
import { computed, ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import DataTable from "@/components/ui/table/DataTable.vue";
import { Input } from "@/components/ui/input";
import { createColumns } from "@/components/users/columns";
import type { User } from "@/types/User";

const props = defineProps<{ limit?: number }>();

const store = useStore();
const users = computed(() => store.getters["users/allUsers"]);
const searchQuery = ref("");
const isSheetOpen = ref(false);

// view user details
const viewUser = (id: number) => {};

// edit user details
const editUser = (user: User) => {};

// delete user
const deleteUser = (id: number) => {
  if (confirm("Are you sure you want to delete this user?")) {
  }
};

// fetch users from the store
const getUsers = () => {
  store.dispatch("users/fetchUsers");
};

// Filter users based on search query and limit to the specified number of latest users
const filteredUsers = computed(() => {
  let filtered = users.value;
  if (searchQuery.value) {
    filtered = filtered.filter(
      (user: User) =>
        user.firstName
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.phoneNumber
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        user.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.kraPin.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (user.role &&
          user.role.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()))
    );
  }
  if (props.limit) {
    filtered = filtered.slice(0, props.limit);
  }
  return filtered;
});

// Create columns for the DataTable component with edit and delete actions
const columns = createColumns({ viewUser, editUser, deleteUser });

getUsers();
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 md:flex">
    <div class="space-y-8">
      <Input
        v-model="searchQuery"
        type="text"
        placeholder="Search users by email or name or role etc..."
        class="lg:w-1/3"
      />
      <DataTable :columns="columns" :data="filteredUsers" />
    </div>
  </div>
</template>
