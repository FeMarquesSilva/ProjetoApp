

export function todoFunctions() {

    const bichinhoImages = [
        { id: 1, source: require("@/assets/images/bichinho.png") },
        { id: 2, source: require("@/assets/images/bichinho2.png") },
        { id: 3, source: require("@/assets/images/bichinho3.png") },
        { id: 4, source: require("@/assets/images/bichinho4.png") },
        { id: 5, source: require("@/assets/images/bichinho5.png") },
      ];

      const bichinhoImagesByID: { [key: number]: any } = {
        1: require('@/assets/images/bichinho.png'),
        2: require('@/assets/images/bichinho2.png'),
        3: require('@/assets/images/bichinho3.png'),
        4: require('@/assets/images/bichinho4.png'),
        5: require('@/assets/images/bichinho5.png'),
    };

    
    
    return { bichinhoImages, bichinhoImagesByID }
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