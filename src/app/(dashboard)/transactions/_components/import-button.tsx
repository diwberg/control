import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useCSVReader } from "react-papaparse"

type Props = {
  onUpload: (results: any) => void
}

export function ImportButton({ onUpload }: Props) {

  const { CSVReader } = useCSVReader()

  // TODO: Add a paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
          <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
            <UploadIcon className="size-4 mr-2" />
            Importar
          </Button>
      )}
    </CSVReader>
  )
}