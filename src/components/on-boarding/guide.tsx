import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function Guide({title, description}: { title: string, description: string}) {

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg p-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
         {description}
        </CardContent>
      </Card>
  )
}