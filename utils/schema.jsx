import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"


export const budgets = pgTable("budgets", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	amount: varchar({ length: 255 }).notNull(),
	icon: varchar({ length: 255 }),
	createdBy: varchar({ length: 255 }).notNull(),
});

export const expenses = pgTable("expenses", {
	id: serial().primaryKey().notNull(),
	name: varchar().notNull(),
	amount: varchar().notNull(),
	budgetId: integer(),
	createdAt: varchar().notNull(),
});
