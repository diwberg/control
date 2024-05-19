import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"]

export function useBulkDeleteCategories() {

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Categoria(s) deletada(s)")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      //TODO: Fazer "também invalidate summary"
    },
    onError: () => {
      toast.error("Falha ao deletar a(s) categoria(s)")
    }
  })

  return mutation
}