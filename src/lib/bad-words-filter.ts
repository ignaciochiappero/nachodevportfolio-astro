const badWordsES = [
  "puta",
  "puto",
  "mierda",
  "cagada",
  "pendejo",
  "pendeja",
  "idiota",
  "estupido",
  "estupida",
  "imbecil",
  "imbecíl",
  "boludo",
  "boluda",
  "pelotudo",
  "pelotuda",
  "forro",
  "forra",
  "verga",
  "pija",
  "concha",
  "carajo",
  "cabron",
  "maldito",
  "maldita",
];

const badWordsEN = [
  "fuck",
  "fucking",
  "shit",
  "asshole",
  "bitch",
  "bastard",
  "dick",
  "cock",
  "pussy",
  "cunt",
  "fag",
  "retard",
  "idiot",
  "stupid",
  "dumb",
  "bullshit",
];

const badWordsPT = [
  "puta",
  "puto",
  "merda",
  "idiota",
  "babaca",
  "caralho",
  "porra",
  "viado",
  "vadia",
  "arrombado",
];

const allBadWords = [...badWordsES, ...badWordsEN, ...badWordsPT];

export function containsBadWords(text: string) {
  const normalizedText = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "");

  return allBadWords.some((word) => {
    const normalizedWord = word
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return new RegExp(`\\b${normalizedWord}\\b|${normalizedWord}`, "i").test(
      normalizedText,
    );
  });
}

export function sanitizeName(name: string) {
  return name
    .trim()
    .slice(0, 30)
    .replace(/[<>\"'`\\]/g, "")
    .replace(/\s+/g, " ");
}

export function isValidName(name: string) {
  const sanitized = sanitizeName(name);

  if (sanitized.length < 2) {
    return {
      valid: false,
      reason: "El nombre debe tener al menos 2 caracteres",
    };
  }

  if (!/[a-zA-ZáéíóúñÁÉÍÓÚÑ]/.test(sanitized)) {
    return {
      valid: false,
      reason: "El nombre debe contener al menos una letra",
    };
  }

  if (containsBadWords(sanitized)) {
    return {
      valid: false,
      reason: "Usa un nombre apropiado para iniciar el chat",
    };
  }

  return { valid: true };
}
