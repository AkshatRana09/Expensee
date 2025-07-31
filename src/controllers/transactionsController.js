import { sql } from '../config/db.js';

export async function getTransactionByUserId(req, res) {
    try {
        const { userId } = req.params;
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId}
            ORDER BY created_at DESC;
        `;
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error getting the transactions", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const createTransaction = async (req, res) => {
  try {
    console.log("📩 Incoming POST to /transactions", req.body);
    const { title, amount, type, userId, emoji } = req.body;

    // make sure all are present
    if (!title || !amount || !type || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTransaction = await prisma.transaction.create({
      data: { title, amount, type, userId, emoji },
    });

    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error("❌ Error in createTransaction:", error.message);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID" });
        }
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id}
            RETURNING *;
        `;
        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.log("Error deleting transaction", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getSummaryByUserId(req, res) {
    try {
        const { userId } = req.params;
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance 
            FROM transactions 
            WHERE user_id = ${userId};
        `;
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income 
            FROM transactions 
            WHERE user_id = ${userId} AND amount > 0;
        `;
        const expensesResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as expenses 
            FROM transactions 
            WHERE user_id = ${userId} AND amount < 0;
        `;

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses
        });
    } catch (error) {
        console.log("Error getting the summary", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
