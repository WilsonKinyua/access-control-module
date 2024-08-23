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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ref, watch } from "vue";
import type { User } from "@/types/User";

const props = defineProps<{ user?: User }>();

// form schema
const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  address: z.string().optional(),
  kraPin: z.string().nonempty("KRA PIN is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

const { handleSubmit, values, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    kraPin: "",
  },
});

const store = useStore();
const isLoading = ref(false);
const emit = defineEmits(["formSubmitted"]); // emit event to parent component

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      setValues(newUser as any);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    if (props.user) {
      // update user
      await store.dispatch("users/updateUser", {
        userId: props.user.id,
        userData: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          kraPin: values.kraPin,
        },
      });
      toast.success("User updated successfully");
    } else {
      // create user
      await store.dispatch("users/createUser", values);
      toast.success("User created successfully");
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
    <FormField v-slot="{ componentField }" name="firstName">
      <FormItem>
        <FormLabel>First Name <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input type="text" placeholder="Eg. John" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="lastName">
      <FormItem>
        <FormLabel>Last Name <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input type="text" placeholder="Eg. Doe" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="Eg. johndoe@mail.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phoneNumber">
      <FormItem>
        <FormLabel>Phone Number <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. +1 234 567 890"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. 123 Main St"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="kraPin">
      <FormItem>
        <FormLabel>KRA PIN <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. A123456789"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isLoading" class="w-full">
      <div v-if="isLoading" class="flex items-center justify-center">
        Please wait
        <Loader2 class="w-4 h-4 mr-2 animate-spin ml-2" />
      </div>
      <span v-else>{{ props.user ? "Update User" : "Create User" }}</span>
    </Button>
  </form>
</template>
