import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>

export function useDeleteTransaction(id?: string) {

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"]["$delete"]({ param: { id } })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Transação deletada")
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error("Falha ao deletar a transação")
    }
  })

  return mutation
}