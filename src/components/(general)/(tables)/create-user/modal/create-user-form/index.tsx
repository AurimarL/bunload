"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Team } from "@/payload-types";
import { formSchema, type IformSchema } from "./zod";

export function CreateUserForm({
  data,
  handler,
  onSuccess,
}: {
  data: {
    teams: Team[];
  };
  handler: {
    handleCreateUser: (data: IformSchema) => Promise<void>;
  };
  onSuccess?: () => void;
}) {
  const form = useForm<IformSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      team_id: "",
    } as IformSchema,
  });

  const [state, formAction] = useActionState(
    async (
      _prevState: IformSchema | { error?: string },
      formData: IformSchema,
    ) => {
      try {
        await handler.handleCreateUser(formData);
        return { ...formData, error: undefined }; // sucesso
      } catch (err) {
        return {
          ...formData,
          error: err instanceof Error ? err.message : "Erro desconhecido",
        };
      }
    },
    {
      confirm_password: "",
      email: "",
      password: "",
      team_id: "",
      error: undefined,
    },
  );

  const [isPending, startTransition] = useTransition();

  // Handle Submit
  function onSubmit(values: IformSchema) {
    startTransition(() => {
      formAction(values);
    });
  }

  // TODO: Study more the erros!
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.email && !state.error) {
      toast.success("Usuário criado com sucesso!");
      form.reset(); // ✅ limpa form
      onSuccess?.(); // ✅ avisa o pai p/ fechar modal
    }
  }, [state, form, onSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormDescription>This is your Email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormDescription>This is your Password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.teams.map((team) => {
                    return (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Criando..." : "Criar"}
        </Button>
      </form>
    </Form>
  );
}
