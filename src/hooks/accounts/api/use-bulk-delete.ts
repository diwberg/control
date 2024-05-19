import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"]

export function useBulkDeleteAccounts() {

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Conta(s) deletada(s)")
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      //TODO: Fazer "também invalidate summary"
    },
    onError: () => {
      toast.error("Falha ao deletar a conta")
    }
  })

  return mutation
}