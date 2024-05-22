
import { DataCharts } from "./_components/charts/data-charts";
import { DataGrid } from "./_components/data-grid";

export default function HomePage() {


  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  )
}