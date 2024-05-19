import { useOpenAccount } from "@/hooks/accounts/stores/use-open-account"

type Props = {
  account: string
  accountId: string
}

export function AccountColumn({ account, accountId }: Props) {

  const { onOpen } = useOpenAccount()

  const onClick = () => {
    onOpen(accountId)
  } 

  return (
    <div className="flex items-center cursor-pointer hover:underline" onClick={onClick}>
      {account}
    </div>
  )
}