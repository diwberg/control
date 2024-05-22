
import { AccountFilterAntonio } from "./filters/account-filter_antonio";
import { DateFilter } from "./filters/date-filter";

export function Filters() {

  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <AccountFilterAntonio />
      <DateFilter />
    </div>
  )
}