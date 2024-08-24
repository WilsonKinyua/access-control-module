<script setup lang="ts">
import { computed, ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import DataTable from "@/components/ui/table/DataTable.vue";
import { Input } from "@/components/ui/input";
import { createColumns } from "@/components/users/columns";
import type { User } from "@/types/User";
import { Plus } from "lucide-vue-next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserForm from "@/components/UserForm.vue";
import Button from "./ui/button/Button.vue";
import { toast } from "vue-sonner";

const props = defineProps<{ limit?: number }>();

const store = useStore();
const users = computed(() => store.getters["users/allUsers"]);
const searchQuery = ref("");
const isSheetOpen = ref(false);
const userRole = computed(() => store.getters["auth/userRole"]);
const selectedUser = ref<User | undefined>(undefined);

// edit user details
const editUser = (user: User) => {
  if (userRole.value !== "Admin") {
    toast.error("You are not authorized to edit users");
    return;
  }
  isSheetOpen.value = true;
  selectedUser.value = user;
};

// delete user
const deleteUser = (id: number) => {
  if (userRole.value !== "Admin") {
    toast.error("You are not authorized to delete users");
    return;
  }
  if (confirm("Are you sure you want to delete this user?")) {
    store.dispatch("users/deleteUser", id);
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
const columns = createColumns({ editUser, deleteUser });

const handleFormSubmitted = () => {
  isSheetOpen.value = false;
  getUsers();
  selectedUser.value = undefined;
};

getUsers();
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 md:flex">
    <div class="space-y-8">
      <div class="lg:flex lg:justify-between lg:items-center">
        <Input
          v-model="searchQuery"
          type="text"
          placeholder="Search users by email or name or role etc..."
          class="lg:w-1/3"
        />
        <Sheet v-model:open="isSheetOpen" v-if="userRole === 'Admin'">
          <SheetTrigger>
            <Button @click="isSheetOpen = false"> <Plus /> Add User </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader class="text-left">
              <SheetTitle>
                {{ selectedUser ? "Edit User" : "Create a new user" }}
              </SheetTitle>
              <SheetDescription>
                <p class="mb-5">
                  Fill in the form below to
                  {{ selectedUser ? "edit" : "create" }} a user.
                </p>
                <UserForm
                  :user="selectedUser"
                  @formSubmitted="handleFormSubmitted"
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <DataTable :columns="columns" :data="filteredUsers" />
    </div>
  </div>
</template>
