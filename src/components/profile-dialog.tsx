import { updateProfile } from "@/api/profile";
import { getRestaurant, type GetRestaurantResponse } from "@/api/restaurant";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const profileSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileDialog() {
  const { data: restaurant } = useQuery({
    queryKey: ["get-restaurant"],
    queryFn: getRestaurant,
  });

  const updateRestaurantCache = ({ name, description }: ProfileFormValues) => {
    const cached = queryClient.getQueryData<GetRestaurantResponse>([
      "get-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetRestaurantResponse>(["get-restaurant"], {
        ...cached,
        name,
        description,
      });
    }

    return { previousProfile: cached };
  };

  const { mutateAsync: update } = useMutation({
    mutationFn: updateProfile,
    onMutate: updateRestaurantCache,
    onError(_, _v, context) {
      if (context?.previousProfile) {
        queryClient.setQueryData<GetRestaurantResponse>(
          ["get-restaurant"],
          context.previousProfile,
        );
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      name: restaurant?.name ?? "",
      description: restaurant?.description ?? "",
    },
  });

  const handleUpdateProfile = handleSubmit(async (data) => {
    try {
      await update(data);

      toast.success("Perfil atualizado com sucesso");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar perfil");
    }
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Visualize e edite as informações da sua loja
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleUpdateProfile}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3 resize-none"
              id="description"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
