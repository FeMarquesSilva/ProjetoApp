import { useSQLiteContext } from "expo-sqlite";
import { typeTamagochiList } from "../functions/services"

// Todas as funções de banco, deverá ser criada neste arquivo, para ser exportadora, e importado somente nos locais necessários.
export function useTodoDatabase() {
  const database = useSQLiteContext();

  //Funçã para salvar os bichinhos na tabela do banco de dados chamada: tamagchis
  async function saveTamagochi({name, image, hunger, sleep, fun, status }: {
    name: string; image: number; hunger: number; sleep: number; fun: number; status: string;
  }) {
    const query = await database.prepareAsync(`INSERT INTO tamagchis (name, image, hunger, sleep, fun, status) 
            VALUES ($name, $image, $hunger, $sleep, $fun, $status);`);
    try {
      await query.executeAsync({
        $name: name,
        $image: image,
        $hunger: hunger,
        $sleep: sleep,
        $fun: fun,
        $status: status,
      });
    } catch (error) {
      throw error;
    } finally {
      await query.finalizeAsync();
    }
  }

  async function getTamagochi() {
    try {
      const response = await database.getAllAsync<typeTamagochiList>(`SELECT * FROM tamagchis;`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //criando função para deletar a tabela de tamagochi caso necessário;
  async function deleteTamagochi() {
    try {
      const query = await database.prepareAsync(`DROP TABLE tamagchis;`);
      await query.executeAsync();
      await query.finalizeAsync();
    } catch (error) {
      throw error;
    }
  }

  //Função para atualizar as informações:
  async function alterTamagochi({ id, name, image, hunger, sleep, fun, status}: {
    id: number; name: string; image: number; hunger: number; sleep: number; fun: number; status: string;
  }) {
    const query = await database.prepareAsync(
      `UPDATE tamagchis SET name = $name, image = $image, hunger = $hunger, sleep = $sleep, fun = $fun, status = $status WHERE id = $id;`
    );
    try {
      await query.executeAsync({
        $id: id,
        $name: name,
        $image: image,
        $hunger: hunger,
        $sleep: sleep,
        $fun: fun,
        $status: status,
      });
    } catch (error) {
      throw error;
    } finally {
      await query.finalizeAsync();
    }
  }

  //Função para deletar o tamagochi da tabela de acordo com o ID:
  async function deleteTamagochiById({ id }: { id: number }) {
    const query = await database.prepareAsync(`DELETE FROM tamagchis WHERE id = $id`);
    try {
      await query.executeAsync({ $id: id });
    } catch (error) {
      throw error;
    } finally {
      await query.finalizeAsync();
    }
  }

  return { saveTamagochi, getTamagochi, deleteTamagochi, alterTamagochi, deleteTamagochiById };
}
