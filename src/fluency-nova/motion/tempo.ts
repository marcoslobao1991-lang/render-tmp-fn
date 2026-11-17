import { WORDS } from "../dados";
export const FPS = 30;
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
// tempo da 1a palavra que comeca com `p` a partir de `de` (sincronia na palavra, sem chute)
export const w = (de: number, p: string) => WORDS.find((x) => x.start >= de - 0.05 && norm(x.word).startsWith(norm(p)))?.start ?? de;
