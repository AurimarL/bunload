import z from "zod";

export const formSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Sua senha deve ter no mínimo 8 caracteres"),
    confirm_password: z
      .string()
      .min(8, "Confirmação deve ter no mínimo 8 caracteres"),
    team_id: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"], // mostra o erro no campo de confirmação
  });
export type IformSchema = z.infer<typeof formSchema>;
