import { useSQLiteContext } from "expo-sqlite"

type TamagochiList = {
    id: number;
    name: string;
    image: number;
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
            console.error("Error saving tamagochi:", error);
        } finally {
            await query.finalizeAsync()
        }
    }
    // Função para buscar os bichinhos cadastrados no banco de dados
    async function getTamagochi(): Promise<TamagochiList[]> {
        try {
            const response = await database.getAllAsync<TamagochiList>(`SELECT * FROM tamagchis;`)
            return response
        } catch (error) {
            console.error("Error fetching tamagchis:", error);
            throw error;
        }
    }

    return { saveTamagochi, getTamagochi }
}