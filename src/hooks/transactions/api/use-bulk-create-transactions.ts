import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"]

export function useBulkCreateTransactions() {

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({ json })
      return await response.json()
    },
    onSuccess: (transactions) => {
      console.log(transactions)
      toast.success("Transações criadas")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      //TODO: Fazer "também invalidate summary"
    },
    onError: () => {
      toast.error("Falha ao criar as transações")
    }
  })

  return mutation
}