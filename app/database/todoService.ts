import { useSQLiteContext } from "expo-sqlite"

interface Tamagochi {
    name: string;
    image: string; // Representa o caminho ou identificador da imagem
    hunger: number;
    sleep: number;
    fun: number;
}

// Todas as funções de banco, deverá ser criada neste arquivo, para ser exportadora, e importado somente nos locais necessários.
export function useTodoDatabase() {
    const database = useSQLiteContext()

    //Funçã para salvar os bichinhos na tabela do banco de dados chamada: tamagchis
    async function saveTamagochi({ name, image, hunger, sleep, fun }: { name: string, image: number, hunger: number, sleep: number, fun: number }) {
        const query = await database.prepareAsync(`INSERT INTO tamagchis (name, image, hunger, sleep, fun) 
            VALUES ($name, $image, $hunger, $sleep, $fun);`)
        try {
            await query.executeAsync({ $name: name, $image: image, $hunger: hunger, $sleep: sleep, $fun: fun })
        } catch (error) {
            throw error;
        } finally {
            await query.finalizeAsync()
        }
    }

    async function getTamagochi() {
        try {
            const response = await database.getAllAsync<any>(`SELECT * FROM tamagchis;`)
        } catch (error) {
            throw error;
        }
    }

    return { saveTamagochi, getTamagochi }
}