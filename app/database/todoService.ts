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
            throw error;
        } finally {
            await query.finalizeAsync()
        }
    }

    async function getTamagochi() {
        try {
            const response = await database.getAllAsync<TamagochiList>(`SELECT * FROM tamagchis;`)
            return response
        } catch (error) {
            throw error;
        }
    }

    //criando função para deletar a tabela de tamagochi
    async function deleteTamagochi() {
        try {
            const query = await database.prepareAsync(`DELETE FROM tamagchis;`)
            await query.executeAsync()
            await query.finalizeAsync()
        } catch (error) {
            throw error;
        }
    }


    return { saveTamagochi, getTamagochi }
}