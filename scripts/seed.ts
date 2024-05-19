import { accounts, categories, transactions } from '@/db/schema';
import { convertAmountToMiliunits } from '@/lib/utils';
import { neon } from '@neondatabase/serverless';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env"})

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const SEED_USER_ID = "user_2gTKD15rpExfrdlDTrn44Qzb9FC"

const SEED_CATEGORIES = [
  {
    id: "category_1", name: "Alimentação", userId: SEED_USER_ID, plaidId: null
  },
  {
    id: "category_2", name: "Aluguel", userId: SEED_USER_ID, plaidId: null
  },
  {
    id: "category_3", name: "Abastecimento", userId: SEED_USER_ID, plaidId: null
  },
  {
    id: "category_4", name: "Veículo", userId: SEED_USER_ID, plaidId: null
  },
]

const SEED_ACCOUNTS = [
  {
    id: "account_1", name: "Dinheiro", userId: SEED_USER_ID, plaidId: null
  },
  {
    id: "account_2", name: "Banco", userId: SEED_USER_ID, plaidId: null
  },
]

const defaultTo = new Date()
const defaultFrom = subDays(defaultTo, 90)

const SEED_TRANSACTIONS: typeof transactions.$inferSelect[] = []

function generateRandomAmount(category: typeof categories.$inferInsert){
  switch (category.name) {
    case "Alimentação":
      // Alimentação will likely be a larger
      return Math.random() * 30 + 10
    case "Aluguel":
      return Math.random() * 400 + 90
    case "Abastecimento":
      return Math.random() * 50 + 15
    case "Veículo":
      return Math.random() * 30 + 10
    default:
      return Math.random() * 50 + 10
  }
}

function generateTransactionsForDay(day: Date) {
  const numTransactions = Math.floor(Math.random() * 4) + 1
  //1 to 4 transactions per day

  for (let i = 0; i < numTransactions; i++) {

    const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)]
      // 60% chance of being an expense
    const isExpense = Math.random() > 0.6 

    const amount = generateRandomAmount(category)
  
    const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount)
  
    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Supermercado",
      notes: "Transação de exemplo",
      cashback: null,
      cashbackAmount: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
  }

}

function generateTransactions (){
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo})

  days.forEach(day => generateTransactionsForDay(day))
}

generateTransactions()

async function main() {
  try {
    // Reset database
    await db.delete(transactions).execute()
    await db.delete(accounts).execute()
    await db.delete(categories).execute()
    // Seed Categories
    await db.insert(categories).values(SEED_CATEGORIES).execute()
    // Seed Accounts
    await db.insert(accounts).values(SEED_ACCOUNTS).execute()
    // Seed Transactions
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute()

  } catch (error) {
    console.error("Error during seed: ", error)
    process.exit(1)
  }
}
main()