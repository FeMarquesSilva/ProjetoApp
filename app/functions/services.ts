export function todoFunctions() {
    // Array de objetos com imagens dos bichinhos:
    const tamagochiImages = [
        { id: 1, source: require("@/assets/images/bichinho1.png") },
        { id: 2, source: require("@/assets/images/bichinho2.png") },
        { id: 3, source: require("@/assets/images/bichinho3.png") },
        { id: 4, source: require("@/assets/images/bichinho4.png") },
        { id: 5, source: require("@/assets/images/bichinho5.png") },
        { id: 6, source: require("@/assets/images/bichinho6.png") },
        { id: 7, source: require("@/assets/images/bichinho7.png") },
        { id: 8, source: require("@/assets/images/bichinho8.png") },
        { id: 9, source: require("@/assets/images/bichinho9.png") },
        { id: 10, source: require("@/assets/images/bichinho10.png") },
        { id: 11, source: require("@/assets/images/bichinho11.png") },
        { id: 12, source: require("@/assets/images/bichinho12.png") },
      ];

    return { tamagochiImages }
  }
  
  export type typeTamagochiList = {
    id: number;
    name: string;
    image: number;
    hunger: number;
    sleep: number;
    fun: number;
    status: string;
  };

  export const calculateStatus = (currentHunger: number, currentSleep : number, currentFun : number) => {
    const total = currentHunger + currentSleep + currentFun;
    if (total === 0) return 'morto';
    if (total <= 50) return 'crítico';
    if (total <= 100) return 'muito triste';
    if (total <= 150) return 'triste';
    if (total <= 200) return 'ok';
    if (total <= 250) return 'bem';
    return 'muito bem';
};
