"use client";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("please input your email !")
    .email("email is invalid !"),
  password: yup.string().required("please input your password !"),
});
type FormData = yup.InferType<typeof schema>;

export function LoginContent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // console.log(data);
    const { email, password } = data;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      alert(result.error);
    } else {
      router.replace("/dashboard");
    }
    return false;
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            {...register("email")}
            label="Email"
            placeholder="you@email.dev"
            error={errors.email && <span>{errors.email.message}</span>}
          />
          <PasswordInput
            {...register("password")}
            label="Password"
            placeholder="Your password"
            mt="md"
            error={errors.password && <span>{errors.password.message}</span>}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button loading={isSubmitting} type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
