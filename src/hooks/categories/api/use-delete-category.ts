import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>

export function useDeleteCategory(id?: string) {

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"]["$delete"]({ param: { id } })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Categoria(s) deletada(s)")
      queryClient.invalidateQueries({ queryKey: ["category", { id }] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      // TODO: Invalidate summary
    },
    onError: () => {
      toast.error("Falha ao deletar a(s) categoria(s)")
    }
  })

  return mutation
}