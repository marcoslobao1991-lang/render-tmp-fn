// CÓPIA de fluency-yt-rmkt/motion/base.tsx com a PALETA DE CADERNO desta VSL (16/11): tinta #2B3F63 no lugar do azul elétrico e do verde, papel #F7F6F2, sem brilho azul.
// BASE do motion da VSL de remarketing (13/11). Estilo: BRANCO EDITORIAL (o slide premium aprovado na Antimarketing 6628):
// branco-gelo, tinta quase preta, UM acento (azul), vermelho só pra negar, verde só pra afirmar. Bricolage Grotesque 800.
// Regras: 1 ideia por quadro, ≤ 3 elementos, letra ≥ 36 px, o que é dito em sequência TROCA no lugar (não empilha lista).
// Tudo é sincronizado em tempo do ORIGINAL: fr(n) = frame em que a frase n começa; fw(n, "palavra") = frame daquela palavra.
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import { FRASES } from "../../fluency-yt-rmkt/dados";
import { TRECHOS } from "../../fluency-yt-rmkt/trechos";
import { WORDS } from "../../fluency-yt-rmkt/words";

export const DISPLAY = loadDisplay("normal", { weights: ["500", "700", "800"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const SANS = loadSans("normal", { weights: ["400", "600", "700"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const COR = { ink: "#0B0D12", ink2: "#475467", azul: "#2B3F63", verde: "#2B3F63", vermelho: "#E5383B", gelo: "#F7F6F2", linha: "#D9DEE8" };
export const FPS = 30;
// velocidade da parte do YouTube (13/11 Marcos: "já pode acelerar 10%"); a oferta da VSL fica em 1×
export const VEL = 1.14;
export const durTrecho = (t: { de: number; ate: number }) => Math.round(((t.ate - t.de) / VEL) * FPS);
// PALCO = área da edição (em cima). O apresentador fica num cartão embaixo (ver FluencyYtRmkt).
export const PALCO = { w: 1080, h: 1130, pad: 72 };

// tempo do original → frame da composição (o trecho que contém t; se t caiu num corte, o começo do próximo trecho)
const INI: number[] = [];
{ let ac = 0; for (const t of TRECHOS) { INI.push(ac); ac += durTrecho(t); } }
// (a ordem dos trechos é a do QUEBRA-CABEÇA, não a do tempo; z = abertura fria, ignorada aqui: as cenas sincronizam no lugar "de verdade")
export const frameDe = (t: number) => {
	let prox = -1;
	for (let i = 0; i < TRECHOS.length; i++) {
		const x = TRECHOS[i]; if (x.z) continue;
		if (t >= x.de && t < x.ate) return INI[i] + Math.round(((t - x.de) / VEL) * FPS);
		if (x.de > t && (prox < 0 || x.de < TRECHOS[prox].de)) prox = i;
	}
	return prox >= 0 ? INI[prox] : INI[INI.length - 1] + 99999;
};
// frames da abertura fria (os trechos z vêm primeiro)
export const FRIA = TRECHOS.filter((x) => x.z).reduce((s, x) => s + durTrecho(x), 0);
const POR_N = new Map(FRASES.map((f) => [f.n, f]));
export const fr = (n: number) => frameDe(POR_N.get(n)!.a);
const lim = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
// frame da palavra dentro da frase n (ocorr = qual ocorrência, começando em 0)
export const fw = (n: number, palavra: string, ocorr = 0) => {
	const f = POR_N.get(n)!; const alvo = lim(palavra); let k = 0;
	for (const [w, a] of WORDS) { if (a < f.a - 0.02) continue; if (a > f.b + 0.02) break; if (lim(w).startsWith(alvo)) { if (k === ocorr) return frameDe(a); k++; } }
	throw new Error(`fw: "${palavra}" não está na frase ${n}`);
};

const c01 = (x: number) => Math.max(0, Math.min(1, x));
export const ap = (f: number, em: number, dur = 9) => interpolate(c01((f - em) / dur), [0, 1], [0, 1], { easing: Easing.out(Easing.cubic) });

// entra subindo e saindo do desfoque na hora `em`; antes disso não existe
export const Entra: React.FC<{ em: number; dy?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ em, dy = 26, style, children }) => {
	const f = useCurrentFrame(); if (f < em) return null; const p = ap(f, em);
	return <div style={{ opacity: p, transform: `translateY(${(1 - p) * dy}px)`, filter: p < 1 ? `blur(${(1 - p) * 7}px)` : undefined, ...style }}>{children}</div>;
};
// rótulo com régua (o "capítulo" da aula, em cima à esquerda)
export const Rotulo: React.FC<{ children: React.ReactNode; tom?: string }> = ({ children, tom = COR.azul }) => (
	<div style={{ position: "absolute", left: PALCO.pad, top: 76, display: "flex", alignItems: "center", gap: 18 }}>
		<div style={{ width: 54, height: 5, background: tom, borderRadius: 3 }} />
		<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 30, letterSpacing: 3.6, textTransform: "uppercase", color: tom }}>{children}</div>
	</div>
);
// frase gigante (caixa de frase, alinhada à esquerda). size ≥ 84
export const Frase: React.FC<{ size?: number; c?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ size = 120, c = COR.ink, style, children }) => (
	<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 0.98, letterSpacing: -size * 0.035, color: c, ...style }}>{children}</div>
);
// frase de apoio (palavras dele), 44–56 px
export const Apoio: React.FC<{ size?: number; c?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ size = 50, c = COR.ink2, style, children }) => (
	<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: size, lineHeight: 1.18, letterSpacing: -0.6, color: c, ...style }}>{children}</div>
);
// palavra com risco vermelho desenhando por cima na hora `em`
export const Riscada: React.FC<{ em: number; cor?: string; children: React.ReactNode }> = ({ em, cor = COR.vermelho, children }) => {
	const f = useCurrentFrame(); const p = ap(f, em, 8);
	return (
		<span style={{ position: "relative", display: "inline-block", color: p > 0.5 ? COR.ink2 : undefined }}>
			{children}
			<span style={{ position: "absolute", left: "-3%", top: "52%", height: "0.09em", width: `${p * 106}%`, background: cor, borderRadius: 99, transform: "rotate(-2.5deg)", transformOrigin: "left center" }} />
		</span>
	);
};
// traço SVG que se desenha de `em` até `em + dur`
export const Traco: React.FC<{ d: string; em: number; dur?: number; cor?: string; larg?: number; len?: number; tracejado?: boolean }> = ({ d, em, dur = 14, cor = COR.ink, larg = 8, len = 2000, tracejado }) => {
	const f = useCurrentFrame(); const p = ap(f, em, dur); if (f < em) return null;
	return <path d={d} fill="none" stroke={cor} strokeWidth={larg} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={tracejado ? "4 22" : len} strokeDashoffset={tracejado ? 0 : (1 - p) * len} opacity={tracejado ? p : 1} />;
};
export const Fundo: React.FC = () => {
	const f = useCurrentFrame(); const dx = Math.sin(f / 90) * 40, dy = Math.cos(f / 110) * 30;
	return (
		<div style={{ position: "absolute", inset: 0, background: COR.gelo, overflow: "hidden" }}>
			<div style={{ position: "absolute", left: -300 + dx, top: -380 + dy, width: 1200, height: 1100, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(11,13,18,0), rgba(11,13,18,0))" }} />
			<div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(11,13,18,0.09) 1.6px, transparent 1.7px)", backgroundSize: "38px 38px", WebkitMaskImage: "radial-gradient(75% 45% at 50% 30%, #000 0%, transparent 100%)" }} />
		</div>
	);
};
export type Cena = { de: number; C: React.FC };

// ───────── SISTEMA v2 (13/11, "mais bonito, mais moderno, bate o olho e entende") ─────────
// 1 tipo de superfície (cartão branco com sombra, sem contorno), conteúdo CENTRALIZADO ocupando o palco inteiro,
// elemento principal ≥ 900 px, azul só na RESPOSTA do quadro.
export const SOMBRA = "0 1px 2px rgba(11,13,18,0.05), 0 22px 56px rgba(28,48,120,0.13)";
export const Pilula: React.FC<{ children: React.ReactNode; tom?: string }> = ({ children, tom = COR.azul }) => (
	<div style={{ position: "absolute", left: 48, top: 56, display: "flex", alignItems: "center", gap: 16, padding: "14px 30px 14px 22px", borderRadius: 99, background: "#fff", boxShadow: SOMBRA }}>
		<div style={{ width: 16, height: 16, borderRadius: 99, background: tom }} />
		<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 32, letterSpacing: -0.2, color: COR.ink }}>{children}</div>
	</div>
);
export const Cartao: React.FC<{ y: number; h: number; x?: number; w?: number; em?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ y, h, x = 48, w = 984, em, style, children }) => {
	const f = useCurrentFrame(); if (em !== undefined && f < em) return null; const p = em === undefined ? 1 : ap(f, em, 10);
	return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 44, background: "#fff", boxShadow: SOMBRA, overflow: "hidden", opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${0.97 + 0.03 * p})`, ...style }}>{children}</div>;
};
// linha de apoio centralizada que TROCA no lugar
export const Troca: React.FC<{ itens: [number, React.ReactNode][]; top: number; size?: number }> = ({ itens, top, size = 50 }) => {
	const f = useCurrentFrame(); let r: [number, React.ReactNode] | null = null; for (const x of itens) if (f >= x[0]) r = x;
	return r ? <Entra key={r[0]} em={r[0]} style={{ position: "absolute", left: 48, right: 48, top, textAlign: "center" }}><Apoio size={size} c={COR.ink}>{r[1]}</Apoio></Entra> : null;
};
