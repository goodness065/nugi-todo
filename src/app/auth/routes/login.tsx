import React from "react";
import {
  useSubmit,
  ActionFunctionArgs,
  Form,
  redirect,
} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/common/button";
import { saveSession } from "../utils/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type FormFields = z.infer<typeof schema>;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  saveSession(JSON.stringify(updates));
  return redirect(`/`);
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const submit = useSubmit();

  return (
    <div className="w-full h-[calc(100vh-180px)] flex justify-center items-center flex-col">
      <h2 className="font-semibold text-2xl sm:text-[32px] mb-2">Login</h2>
      <div className="max-w-[400px] w-full border border-stroke rounded-lg p-4 bg-white">
        <Form
          className="space-y-4 tutorial"
          onSubmit={handleSubmit((data) => submit(data, { method: "POST" }))}
        >
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full h-12 p-1 border border-gray-400 rounded-md outline-none"
            />
            {errors.email && (
              <div className="text-sm text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full h-12 p-1 border border-gray-400 rounded-md outline-none"
            />
            {errors.password && (
              <div className="text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>
          <Button type="submit" title="Submit" isLoading={isSubmitting} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
