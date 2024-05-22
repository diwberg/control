import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"]

export function useBulkDeleteTransactions() {

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-delete"]["$post"]({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Transações deletada(s)")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["summary"] })
    },
    onError: () => {
      toast.error("Falha ao deletar as transações")
    }
  })

  return mutation
}