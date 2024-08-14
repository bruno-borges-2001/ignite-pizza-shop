import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

import { registerRestaurant } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const signUpFormSchema = z.object({
  restaurantName: z.string().min(1, "Campo obrigatório"),
  managerName: z.string().min(1, "Campo obrigatório"),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: registerRestaurant,
  });

  const handleSignUp: SubmitHandler<SignUpForm> = async (data) => {
    try {
      console.log(data);

      await signUp(data);

      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () =>
            navigate(`/sign-in?email=${data.email}`, { replace: true }),
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar restaurante");
    }
  };

  const handleSubmitError: SubmitErrorHandler<SignUpForm> = (err) => {
    toast.error(Object.values(err)[0]?.message);
  };

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-4 top-4">
          <Link to="/sign-in" replace>
            Fazer Login
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <header className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </header>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleSignUp, handleSubmitError)}
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">O nome do seu restaurante</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu número de telefone</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar Painel
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com os nossos{" "}
              <a href="#" className="underline underline-offset-4">
                termos de serviço
              </a>{" "}
              e{" "}
              <a href="#" className="underline underline-offset-4">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
