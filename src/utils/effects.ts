export const staticEffects: Record<string, string> = {
    "11": "desligado",
    "1": "vermelho",
    "2": "verde",
    "3": "azul",
    "4": "branco",
    "5": "verde",
    "6": "rosa",
    "7": "ciano",
    "8": "roxo",
    "9": "amarelo",
    "10": "laranja",
};

export const dynamicsEffects: Record<string, string> = {
    "12": "flashes",
    "13": "pulso em StandBy",
    "14": "fade em StandBy",
    "15": "fogo",
    "16": "chuva",
    "17": "quente",
    "18": "frio",
    "19": "efeitos aleatorios",
};


export const allEffects: Record<string, string> = {
    ...dynamicsEffects,
    ...staticEffects,
}