<script setup lang="ts">
import { toast } from "vue-sonner";
// @ts-ignore
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import { Loader2 } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import { RouterLink } from "vue-router";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ref } from "vue";

// form schema
const schema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

const { handleSubmit, values, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    email: "",
    password: "",
  },
});

const store = useStore();
const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await store.dispatch("auth/login", values);
    toast.success("Login successful");
    resetForm();
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
  <Card>
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl text-center">
        Login to your account
      </CardTitle>
      <CardDescription>
        Enter your email and password to access your account
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit" class="space-y-4">
      <CardContent class="grid gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="mail@johndoe.com"
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
                v-bind="componentField"
                placeholder="********"
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
          <span v-else>Login</span>
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
        <RouterLink to="/auth/register">Create an account</RouterLink>
      </Button>
    </CardContent>
  </Card>
</template>
