<script setup lang="ts">
import { toast } from "vue-sonner";
// @ts-ignore
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import { Loader2 } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ref, watch } from "vue";
import type { Project } from "@/types/Project";

const props = defineProps<{ project?: Project }>();

// form schema
const schema = z.object({
  name: z.string().nonempty("Project name is required"),
  description: z.string().nonempty("Project description is required"),
  location: z.string().optional(),
  status: z.string().nonempty("Project status is required"),
  startDate: z.string(),
  endDate: z.string(),
});

const { handleSubmit, values, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: "",
    description: "",
    location: "",
    status: "",
    startDate: "",
    endDate: "",
  },
});

const store = useStore();
const isLoading = ref(false);
const emit = defineEmits(["formSubmitted"]); // emit event to parent component

watch(
  () => props.project,
  (newProject) => {
    if (newProject) {
      setValues(newProject as any);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    if (props.project) {
      // update project
      await store.dispatch("projects/updateProject", {
        projectId: props.project.id,
        projectData: values,
      });
      toast.success("Project updated successfully");
    } else {
      // create project
      await store.dispatch("projects/createProject", values);
      toast.success("Project created successfully");
    }
    resetForm();
    emit("formSubmitted");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message.join(", "));
    } else {
      toast.error(error.message);
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Project Name <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. New Project"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel
          >Project Description <span class="text-red-500">*</span></FormLabel
        >
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. Project description"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="location">
      <FormItem>
        <FormLabel>Location</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. New York"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="status">
      <FormItem>
        <FormLabel
          >Project Status <span class="text-red-500">*</span></FormLabel
        >
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup label="Status">
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="startDate">
      <FormItem>
        <FormLabel>Start Date <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input type="date" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="endDate">
      <FormItem>
        <FormLabel>End Date <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input type="date" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isLoading" class="w-full">
      <div v-if="isLoading" class="flex items-center justify-center">
        Please wait
        <Loader2 class="w-4 h-4 mr-2 animate-spin ml-2" />
      </div>
      <span v-else>{{
        props.project ? "Update Project" : "Create Project"
      }}</span>
    </Button>
  </form>
</template>
