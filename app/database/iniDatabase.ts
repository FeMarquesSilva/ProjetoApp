import { SQLiteDatabase } from "expo-sqlite";

export async function initiDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tamagchis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            image TEXT,  -- URI da imagem do bichinho
            hunger INTEGER DEFAULT 100, -- Atributo de Fome
            sleep INTEGER DEFAULT 100,  -- Atributo de Sono
            fun INTEGER DEFAULT 100     -- Atributo de Diversão
        );
    `);
}