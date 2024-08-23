<script setup lang="ts">
import { computed, ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import DataTable from "@/components/ui/table/DataTable.vue";
import { Input } from "@/components/ui/input";
import type { Project } from "@/types/Project";
import { Plus } from "lucide-vue-next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Button from "./ui/button/Button.vue";
import { toast } from "vue-sonner";
import ProjectForm from "./ProjectForm.vue";
import { createColumns } from "./projects/columns";

const props = defineProps<{ limit?: number }>();

const store = useStore();
const projects = computed(() => store.getters["projects/allProjects"]);
const searchQuery = ref("");
const isSheetOpen = ref(false);
const userRole = computed(() => store.getters["auth/userRole"]);
const selectedProject = ref<Project | undefined>(undefined);

// edit project details
const editProject = (project: Project) => {
  if (userRole.value !== "Admin" && userRole.value !== "Project Manager") {
    toast.error("You are not authorized to edit projects");
    return;
  }
  isSheetOpen.value = true;
  selectedProject.value = project;
};

// delete project
const deleteProject = (id: number) => {
  if (userRole.value !== "Admin") {
    toast.error("You are not authorized to delete projects");
    return;
  }
  if (confirm("Are you sure you want to delete this project?")) {
    store.dispatch("projects/deleteProject", id);
  }
};

// fetch projects from the store
const getProjects = () => {
  store.dispatch("projects/fetchProjects");
};

// Filter projects based on search query and limit to the specified number of latest projects
const filteredProjects = computed(() => {
  let filtered = projects.value;
  if (searchQuery.value) {
    filtered = filtered.filter(
      (project: Project) =>
        project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.description
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.location
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.status
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.assignedUsers.filter(
          (user) =>
            user.firstName
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            user.lastName
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        ).length > 0
    );
  }
  if (props.limit) {
    filtered = filtered.slice(0, props.limit);
  }
  return filtered;
});

// Create columns for the DataTable component with edit and delete actions
const columns = createColumns({ editProject, deleteProject });

const handleFormSubmitted = () => {
  isSheetOpen.value = false;
  getProjects();
  selectedProject.value = undefined;
};

getProjects();
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 md:flex">
    <div class="space-y-8">
      <div class="flex justify-between items-center">
        <Input
          v-model="searchQuery"
          type="text"
          placeholder="Search projects by name or description..."
          class="lg:w-1/3"
        />
        <Sheet
          v-model:open="isSheetOpen"
          v-if="userRole === 'Admin'"
        >
          <SheetTrigger>
            <Button @click="isSheetOpen = false"> <Plus /> Add Project </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader class="text-left">
              <SheetTitle>
                {{ selectedProject ? "Edit Project" : "Create a new project" }}
              </SheetTitle>
              <SheetDescription>
                <p class="mb-5">
                  Fill in the form below to
                  {{ selectedProject ? "edit" : "create" }} a project.
                </p>
                <ProjectForm
                  :project="selectedProject"
                  @formSubmitted="handleFormSubmitted"
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <DataTable :columns="columns" :data="filteredProjects" />
    </div>
  </div>
</template>
