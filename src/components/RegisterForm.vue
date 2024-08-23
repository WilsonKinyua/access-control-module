<script setup lang="ts">
import { toast } from "vue-sonner";
// @ts-ignore
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import { Loader2 } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { RouterLink } from "vue-router";

// form schema
const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  kraPin: z.string().nonempty("KRA PIN is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
  attachments: z.array(z.string()).optional(),
});

const { handleSubmit, values, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    kraPin: "",
    password: "",
    attachments: [],
  },
});

const store = useStore();
const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await store.dispatch("auth/register", values);
    toast.success("Registration successful. Please login", {
      duration: 10000,
    });
    resetForm();
    // redirect to login page
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
  <Card class="lg:w-[40%]">
    <CardHeader class="space-y-1 text-center">
      <CardTitle class="text-2xl"> Register a new account </CardTitle>
      <CardDescription>
        Enter the details to create a new account
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit" class="space-y-4">
      <CardContent class="grid lg:grid-cols-2 gap-2">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel
              >First Name <span class="text-red-500">*</span></FormLabel
            >
            <FormControl>
              <Input
                id="firstName"
                type="text"
                placeholder="Eg. John"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Last Name <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                id="lastName"
                type="text"
                placeholder="Eg. Doe"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                id="email"
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
            <FormLabel
              >Phone Number <span class="text-red-500">*</span></FormLabel
            >
            <FormControl>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="Eg. +254 700 000 000"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="address">
          <FormItem>
            <FormLabel>Address <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                id="address"
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
                id="kraPin"
                type="text"
                placeholder="Eg. A123456789B"
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
                id="password"
                type="password"
                placeholder="********"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="attachments">
          <FormItem>
            <FormLabel>Attachments</FormLabel>
            <FormControl>
              <Input
                id="attachments"
                type="file"
                multiple
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button type="submit" :disabled="isLoading" class="w-full">
          <div v-if="isLoading" class="flex items-center justify-center">
            Please wait
            <Loader2 class="w-4 h-4 mr-2 animate-spin ml-2" />
          </div>
          <span v-else>Register</span>
        </Button>
      </CardFooter>
    </form>
    <CardContent>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground"> Or </span>
        </div>
      </div>
      <Button class="w-full my-2" variant="secondary" size="sm" as-child>
        <RouterLink to="/auth/login">Login</RouterLink>
      </Button>
    </CardContent>
  </Card>
</template>
