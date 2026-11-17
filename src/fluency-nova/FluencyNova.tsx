// VSL NOVA do INGLÊS (16/11/2026) · lead IMG_6879 (selfie) + corpo IMG_6881 (tripé).
// Etapa 1 (esta): cortes auditados + TH + zoom seco em TODA emenda + legenda estilo Fluency. Motion só depois da
// tabela de disposição aprovada pelo Marcos (skill vsl-edicao §2b). Tempos: dados.ts (gerado em work/fluency-nova).
import React from "react";
import { AbsoluteFill, Audio, Freeze, OffthreadVideo, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame } from "remotion";
// render no GitHub Actions: o vídeo dele (925 MB) vem da VPS, não vai pro git
const REMOTO = "https://media.srv1198551.hstgr.cloud/fluency-nova-render/";
import { Oferta } from "./motion/oferta";
import WARP from "./warp.json";
import WARP90 from "./warp90.json";
import { Fundo } from "./motion/oferta-base";
import { CENAS_AULA, NovaFala, NOVA_FALA } from "./motion/aula";
import { CENAS_V2 } from "./motion/v2";
// o RESUMO foi cortado da copy (16/11): a cena dele (oferta antiga 441,2 → 498,0 s) não pode piscar na emenda; segura a cena anterior
const ofertaT = (tv: number) => { const o = tempoAntigo(tv); return o >= 431.2 && o < 498.0 ? 431.2 : o; }; // 431,3 = "Hoje, todos os dias... alunos" (frase também cortada)
// respiros na OFERTA (tempos da v1): ele em tela cheia, falando direto pra câmera, sem nada por cima
// + os começos de cena que ficavam com a tela VAZIA depois que a pílula de capítulo saiu (medidos por varredura de capturas, 16/11)
const TH_OFERTA: [number, number][] = [[676.3, 682.8], [758.5, 768.4], [812.4, 819.1], [987.5, 990.4], [1008.2, 1021.7], [1068.4, 1086.0], [1155.6, 1157.8], [1289.6, 99999]];
import { loadFont } from "@remotion/google-fonts/Inter";
import { DUR, TRECHOS, WORDS } from "./dados";
// OFERTA (16/11): o roteiro da oferta é o MESMO da VSL de remarketing → reaproveita as 20 cenas aprovadas de lá
// (fluency-yt-rmkt/motion/oferta.tsx), ressincronizadas na fala nova: warp.json = âncoras [tempo novo, tempo do áudio antigo]
// tiradas do casamento palavra a palavra (work/fluency-nova). <Freeze> entrega pra Oferta o frame "antigo" equivalente.
const ANC = WARP.anc as [number, number][];
// v2 → v1: tempo da regravação (IMG_6890) → tempo equivalente da 1ª gravação, onde a edição foi escrita
const A90 = WARP90.anc as [number, number][];
const paraV1 = (t: number) => {
  if (t <= A90[0][0]) return Math.max(0, A90[0][1] - (A90[0][0] - t));
  for (let i = 1; i < A90.length; i++) if (t <= A90[i][0]) { const [a0, b0] = A90[i - 1], [a1, b1] = A90[i]; return b0 + ((t - a0) / (a1 - a0)) * (b1 - b0); }
  const u = A90[A90.length - 1]; return u[1] + (t - u[0]);
};
const tempoAntigo = (t: number) => {
  if (t <= ANC[0][0]) return Math.max(0, ANC[0][1] - (ANC[0][0] - t));
  for (let i = 1; i < ANC.length; i++) if (t <= ANC[i][0]) { const [a0, b0] = ANC[i - 1], [a1, b1] = ANC[i]; return b0 + ((t - a0) / (a1 - a0)) * (b1 - b0); }
  const u = ANC[ANC.length - 1]; return u[1] + (t - u[0]);
};

const { fontFamily } = loadFont("normal", { weights: ["400"], subsets: ["latin", "latin-ext"] });
const FPS = 30;
export const VEL = 1.1; // velocidade (tom preservado)
export const FLUENCY_NOVA_FRAMES = Math.ceil((DUR / VEL) * FPS);
export type FluencyNovaProps = { fonte?: "hd" | "conf" };

// enquadramento por clipe: origem do zoom no rosto; nível B = zoom seco da emenda (≈8 %, regra da casa)
const ENQ: Record<string, { ox: string; oy: string; b: number }> = {
  "6879": { ox: "50%", oy: "34%", b: 1.06 }, // selfie: rosto já grande, zoom menor
  // tripé: o reflexo da lente do teleprompter (parte de BAIXO) some num DEGRADÊ escuro na base, sem zoom (Marcos 16/11:
  // "escurecer a tela um pouco na base pra camuflar isso sem ter que dar mto zoom")
  "6881": { ox: "51%", oy: "27%", b: 1.08 },
  "6890": { ox: "49%", oy: "8%", b: 1.28 }, // base 1,20 ancorada no alto: corta os 15 % de baixo (tablet do teleprompter + reflexo, Marcos 16/11)
};

// LEAD (selfie, luz ruim embaixo): Marcos 16/11 "faz a lead dar um zoom no meu rosto, pq ficou toda cagada a iluminação".
// Plano fechado que ACOMPANHA o rosto: posição medida a cada 4 s no bruto 6879 (fração do quadro), interpolada.
const ROSTO_LEAD: [number, number, number][] = [ // [s do bruto, x, y]
  [2.4, 0.8, 0.33], [4, 0.46, 0.22], [6, 0.56, 0.25], [7, 0.52, 0.2], [8, 0.27, 0.15], [9, 0.41, 0.2], [10, 0.44, 0.2], [11, 0.6, 0.22], [12, 0.52, 0.2], [13, 0.48, 0.2], [16, 0.48, 0.17], [20, 0.39, 0.2], [24, 0.49, 0.17], [28, 0.6, 0.27],
  [32, 0.38, 0.15], [36, 0.42, 0.15], [40, 0.45, 0.2], [44, 0.49, 0.17], [48, 0.53, 0.12], [52, 0.6, 0.2], [56, 0.49, 0.22], [60, 0.47, 0.25],
  [64, 0.54, 0.2], [68, 0.42, 0.2], [72, 0.49, 0.25], [76, 0.56, 0.22], [80, 0.47, 0.25], [84, 0.38, 0.22], [88, 0.42, 0.22], [92, 0.58, 0.3], [96, 0.62, 0.25],
];
const rostoEm = (tb: number) => {
  const k = ROSTO_LEAD; if (tb <= k[0][0]) return { x: k[0][1], y: k[0][2] };
  for (let i = 1; i < k.length; i++) if (tb <= k[i][0]) { const p = (tb - k[i - 1][0]) / (k[i][0] - k[i - 1][0]), e = p * p * (3 - 2 * p); return { x: k[i - 1][1] + (k[i][1] - k[i - 1][1]) * e, y: k[i - 1][2] + (k[i][2] - k[i - 1][2]) * e }; }
  return { x: k[k.length - 1][1], y: k[k.length - 1][2] };
};
const W = 1080, H = 1920;
// CORPO: 6881b.mp4 = fundo BORRADO (máscara RVM local work/fluency-nova/matte + ffmpeg; pedido 16/11 "na parte da aula troca o fundo ou embaça")
// tratamento da lead (Marcos 16/11: "clarão atrás da câmera estourando... tratamento completo"): o arquivo 6879t.mp4 já vem com
// DEHAZE LOCAL (work/fluency-nova/dehaze.sh, K 0,62: véu = mínimo local do brilho borrado, subtraído só onde existe).
// Aqui por cima: contraste leve + vinheta nas bordas (o que estourou de vez não tem volta, a vinheta disfarça).
const LEAD_COR = "contrast(1.04) saturate(0.86)"; // o dehaze puxa a pele pro laranja: saturação abaixo de 1 compensa
// transform do plano fechado: rosto em (50 %, 36 %) da tela, sem nunca mostrar borda
const lentePlano = (tb: number, s: number, ty = 0.34, topoLivre = 0) => {
  if (tb < 2.4) return `scale(1.15)`; // câmera ainda passando pela sala (sem rosto)
  const f = rostoEm(tb); let ox = 0.5 * W - f.x * W * s, oy = ty * H - f.y * H * s;
  ox = Math.min(0, Math.max(W - W * s, ox)); oy = Math.min(topoLivre, Math.max(H - H * s, oy)); // topoLivre: a imagem pode descer até o fundo do painel opaco
  return `translate(${ox}px, ${oy}px) scale(${s})`;
};

// ── legenda estilo Fluency: minúsculo como falado, sem pontuação, ≤ 7 palavras / 2,8 s, quebra em pontuação ou pausa ──
const FIX: [RegExp, string][] = [
  [/fluence road|fluency road|fancy road|fluencyroute/gi, "Fluency Route"], [/\bqify\b|\bkify\b/gi, "Kiwify"], [/\bagastar\b/gi, "gastar"], [/r\$\s?(\d+)[,.]?00/gi, "R$ $1"], [/points road/gi, "Fluency Route"],
];
type Bloco = { start: number; end: number; texto: string };
const BLOCOS: Bloco[] = (() => {
  const out: Bloco[] = []; let cur: typeof WORDS = [];
  WORDS.forEach((w, i) => {
    cur.push(w); const nx = WORDS[i + 1];
    const quebra = !nx || /[.?!]$/.test(w.word) || cur.length >= 7 || nx.start - w.end > 0.35 || (/[,;:]$/.test(w.word) && cur.length >= 3) || w.end - cur[0].start > 2.8;
    if (quebra) {
      let texto = cur.map((x) => x.word).join(" ");
      for (const [re, s] of FIX) texto = texto.replace(re, s);
      texto = texto.replace(/[.,;:!?"“”]/g, "").replace(/\s+/g, " ").trim();
      texto = texto.replace(/(^|\s)(\S+)/g, (_m, sp, p) => sp + (/^(Fluency|Route|Kiwify|Friends|How|Met|Your|Mother|Two|Half|Men|Paul|Nation|Marcos|Lobão|Brasil|Estados|Unidos|I)$/.test(p) ? p : p.toLowerCase()));
      out.push({ start: cur[0].start, end: cur[cur.length - 1].end, texto }); cur = [];
    }
  });
  return out;
})();
const Legenda: React.FC<{ t: number; split?: boolean }> = ({ t, split }) => {
  const b = BLOCOS.find((k, i) => t >= k.start - 0.05 && t < (BLOCOS[i + 1]?.start ?? k.end + 0.4) - 0.05 && t <= k.end + 0.25);
  if (!b) return null;
  return (
    <div style={{ position: "absolute", left: "6%", right: "6%", top: split ? "81%" : "78%", transform: "translateY(-50%)", display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ fontFamily, fontSize: 39, fontWeight: 400, lineHeight: 1.38, color: "#fff", textAlign: "center", background: "rgba(0,0,0,0.58)", textShadow: "0 2px 6px rgba(0,0,0,.65)", padding: "14px 34px", borderRadius: 4, maxWidth: "100%", textWrap: "balance" } as React.CSSProperties}>{b.texto}</div>
    </div>
  );
};

// TELA MEIADA: o quadro ocupa a metade de cima (0 → MEIO) e ele desce pra metade de baixo, largura toda (sem cartão).
const MEIO = 960, DESCE = 930, RAMPA_S = 0.3, PAPEL = "#F7F6F2";
export const FluencyNova: React.FC<FluencyNovaProps> = ({ fonte = "hd" }) => {
  const t = (useCurrentFrame() / FPS) * VEL;    // tempo do CONTEÚDO (a composição roda VEL× mais rápido)
  const tv = paraV1(t);                         // tempo v1 equivalente: é nele que a edição decide o que mostrar
  const fv = Math.round(tv * FPS);
  const cenaV2 = CENAS_V2.find((c) => t >= c.de && t < c.ate);   // cenas escritas nos tempos ATUAIS (sem warp)
  const cena = cenaV2 ?? CENAS_AULA.find((c) => tv >= c.de && tv < c.ate);
  const respiro = TH_OFERTA.some(([a, b]) => tv >= a && tv < b);
  const naOferta = tv >= WARP.de && !respiro;
  const fala = tv >= NOVA_FALA.de && tv < NOVA_FALA.ate;
  // rampa do split: o quadro desce em 0,3 s quando vem de tela cheia; emenda de split com split não reanima; saída seca
  const split = cena?.modo === "split";
  const ini = split ? (() => { let d = cena!.de; for (;;) { const ant = CENAS_AULA.find((c) => c.modo === "split" && Math.abs(c.ate - d) < 0.01); if (!ant) return d; d = ant.de; } })() : 0;
  const p = split ? (cenaV2 ? Math.min(1, Math.max(0, (t - cenaV2.de) / RAMPA_S)) : Math.min(1, Math.max(0, (tv - ini) / RAMPA_S))) : 0; const pe = 1 - (1 - p) * (1 - p) * (1 - p);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* ELE (6890 = imagem nova + áudio sem reverbe). SEMPRE montado: é dele que sai o áudio. No split desce pra metade de baixo */}
      <div style={{ position: "absolute", inset: 0, zIndex: split ? 3 : 0, clipPath: split ? `inset(${MEIO * pe}px 0 0 0)` : undefined }}>
        <div style={{ position: "absolute", inset: 0, transform: `translateY(${DESCE * pe}px)` }}>
          {TRECHOS.map((x, i) => {
            const de = Math.round((x.ini / VEL) * FPS), dur = Math.round((x.fim / VEL) * FPS) - de;
            if (x.clip === "aluno") return <Sequence key={i} from={de} durationInFrames={dur} layout="none"><Audio src={staticFile("fluency-yt-rmkt-oferta.m4a")} startFrom={Math.round(x.a * FPS)} playbackRate={VEL} /></Sequence>;
            const e = ENQ[x.clip]; const z = i % 2 ? e.b : x.clip === "6890" ? 1.2 : 1; // zoom SECO em toda emenda (6890: base já em 1,20)
            return (
              <Sequence key={i} from={de} durationInFrames={dur} layout="none">
                <AbsoluteFill style={{ overflow: "hidden" }}>
                  <OffthreadVideo src={(fonte === "conf" ? staticFile(`fluency-nova/${x.clip}-conf.mp4`) : getRemotionEnvironment().isStudio ? staticFile(`fluency-nova/${x.clip}.mp4`) : `${REMOTO}${x.clip}.mp4`)} startFrom={Math.round(x.a * FPS)} playbackRate={VEL}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${z})`, transformOrigin: `${e.ox} ${e.oy}` }} />
                </AbsoluteFill>
              </Sequence>
            );
          })}
        </div>
        {/* degradê na base: cobre o reflexo do teleprompter (tela cheia) e dá leitura pra legenda */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "30%", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 50%, rgba(0,0,0,.8) 100%)" }} />
      </div>
      {/* QUADRO (papel neutro, sem enfeite): metade de cima no split, tela inteira no slide. Cenas escritas nos tempos da v1 */}
      {cena && <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: split ? MEIO * pe : 1920, background: PAPEL, overflow: "hidden", zIndex: 2, boxShadow: split ? "0 10px 30px rgba(0,0,0,.35)" : undefined, backgroundImage: "radial-gradient(rgba(11,13,18,0.07) 1.5px, transparent 1.6px)", backgroundSize: "36px 36px" }}>
        <div style={split ? { position: "absolute", left: 54, top: -72, width: 1080, height: 1130, transform: "scale(0.9)", transformOrigin: "0 0" } : { position: "absolute", left: 0, top: 395, width: 1080, height: 1130 }}>
          <Freeze frame={cenaV2 ? Math.round(t * FPS) : fv}><cena.C /></Freeze>
        </div>
      </div>}
      {/* OFERTA reaproveitada (time-warp) e o trecho de treino de fala que só existe nesta VSL */}
      {naOferta && <AbsoluteFill style={{ zIndex: 5 }}><Freeze frame={Math.round(ofertaT(tv) * FPS)}><Oferta seco /></Freeze></AbsoluteFill>}
      {fala && !respiro && <AbsoluteFill style={{ zIndex: 6 }}><Fundo /><Freeze frame={fv}><NovaFala /></Freeze></AbsoluteFill>}
      {/* legenda sempre que ele está na tela (tela cheia ou metade de baixo) */}
      {(!cena || split) && !naOferta && !(fala && !respiro) && <div style={{ position: "absolute", inset: 0, zIndex: 4 }}><Legenda t={t} split={split} /></div>}
    </AbsoluteFill>
  );
};
