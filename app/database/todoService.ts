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
    async function saveTamagochi({name, image, hunger, sleep, fun } : { name : string, image: string , hunger : number, sleep: number, fun: number }) {
        const query = await database.prepareAsync(`INSERT INTO tamagchis (null, name, image, hunger, sleep, fun) VALUES (
           $name,
           $image,
           $hunger,
           $sleep,
           $fun,
        `)
        try {
            await query.executeAsync({ name, image, hunger, sleep, fun })
        } catch (error) {
            console.log(error)
        } finally {
            await query.finalizeAsync()
        }
    }
    return { saveTamagochi }
}