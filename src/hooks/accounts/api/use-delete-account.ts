import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>

export function useDeleteAccount(id?: string) {

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[":id"]["$delete"]({ param: { id } })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Conta deletada")
      queryClient.invalidateQueries({ queryKey: ["account", { id }] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      // TODO: Invalidate summary
    },
    onError: () => {
      toast.error("Falha ao deletar a conta")
    }
  })

  return mutation
}