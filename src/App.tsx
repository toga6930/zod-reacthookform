import React from "react";
import "./styles.css";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  name: string;
  email: string;
  age: number;
  password: string;
  confirm: string;
}

export default function App() {
  const schema: ZodType<Props> = z
    .object({
      name: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(100),
      password: z.string().min(8).max(20),
      confirm: z.string().min(8).max(20)
    })
    .refine((data) => data.password === data.confirm, {
      message: "Don't Match",
      path: ["confirm"]
    });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Props>({
    resolver: zodResolver(schema)
  });

  const submitData = (data: Props) => {
    console.log("OK", data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>Name</label>
        <input type="text" {...register("name")} />
        {errors.name && <span> {errors.name.message}</span>}
        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <span> {errors.age.message}</span>}
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <span> {errors.email.message}</span>}
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <span> {errors.password.message}</span>}
        <label>Confirm Password</label>
        <input type="password" {...register("confirm")} />
        {errors.confirm && <span> {errors.confirm.message}</span>}

        <input type="submit" className="submit" />
      </form>
    </div>
  );
}
