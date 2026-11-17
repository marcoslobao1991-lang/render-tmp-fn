// CÓPIA de fluency-yt-rmkt/motion/oferta.tsx pra VSL nova (16/11): mesma estrutura e material REAL, paleta de caderno,
// sem pílula, sem cartão colorido cheio. A original (da VSL de remarketing) não é tocada.
// OFERTA recriada (13/11, pedido do Marcos): do vídeo da VSL validada fica SÓ O ÁUDIO (public/fluency-yt-rmkt-oferta.m4a, 532 s);
// a imagem é toda nova, em tela cheia (1080×1920), no mesmo SISTEMA v2 da aula. Regra: MOSTRAR e PROVAR em vez de falar.
// Material REAL usado: áudio do aluno (onda real do próprio áudio), telas reais do app (public/fluency-yt-rmkt-app/app-*.jpg, capturadas do app rodando),
// cortes reais de Friends / Two and a Half Men / How I Met Your Mother e discurso real (Supabase), números do acervo (tabela scenes, 13/11).
// Tempos = segundos do ÁUDIO DA OFERTA (oferta/frases.txt e oferta/words.json). s(t) = frame local (a oferta roda dentro de uma Sequence).
import React from "react";
import { Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { COR, DISPLAY, SANS, SOMBRA, Cartao, Frase, Apoio, Entra, Riscada, Traco, Fundo, ap } from "./oferta-base";
import { ONDA, ONDA_DE, ONDA_ATE } from "../../fluency-yt-rmkt/oferta/onda";

const s = (t: number) => Math.round(t * 30);
const APP = (f: string) => staticFile("fluency-yt-rmkt-app/" + f);
const SUPA = "https://petrtewismhpzidcmmwb.supabase.co/storage/v1/object/public/media/";
const VPS = "https://media.srv1198551.hstgr.cloud/friends/";
const AZUL_CHEIO: React.CSSProperties = { background: "#fff", boxShadow: SOMBRA }; // era cartão azul cheio
const VERDE_CHEIO: React.CSSProperties = { background: "#fff", boxShadow: SOMBRA };
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
const ANEL = `0 0 0 7px ${COR.azul}, 0 22px 56px rgba(28,48,120,0.12)`;

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.ink, background: "linear-gradient(transparent 56%, #FFE27A 56%, #FFE27A 92%, transparent 92%)", padding: "0 0.08em" }}>{children}</span>;
const B: React.FC<{ c?: string; children: React.ReactNode }> = ({ c = COR.azul, children }) => <b style={{ color: c }}>{children}</b>;
// pílula de capítulo (dentro da zona segura: 160 px do topo)
const Pil: React.FC<{ children: React.ReactNode; tom?: string }> = () => null; // sem pílula de capítulo
const Centro: React.FC<{ top: number; em?: number; children: React.ReactNode }> = ({ top, em, children }) =>
	em === undefined ? <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div> : <Entra em={em} style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</Entra>;
// linha que TROCA no lugar (uma por vez)
const Troca: React.FC<{ itens: [number, React.ReactNode][]; top: number; size?: number; c?: string }> = ({ itens, top, size = 56, c = COR.ink }) => {
	const f = useCurrentFrame(); let r: [number, React.ReactNode] | null = null; for (const x of itens) if (f >= s(x[0])) r = x;
	return r ? <Entra key={r[0]} em={s(r[0])} style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center" }}><Apoio size={size} c={c}>{r[1]}</Apoio></Entra> : null;
};
const Check: React.FC<{ em: number; size?: number; cor?: string }> = ({ em, size = 70, cor = COR.verde }) => <svg width={size} height={size} viewBox="0 0 84 84" style={{ flexShrink: 0 }}><Traco d="M 14 44 L 34 64 L 70 22" em={em} dur={8} cor={cor} larg={13} len={120} /></svg>;
// vídeo real em loop (lista de cortes), de `de` até `ate` (frames locais)
type Clipe = { src: string; dur: number };
const Clipes: React.FC<{ clipes: Clipe[]; de: number; ate: number }> = ({ clipes, de, ate }) => {
	const f = useCurrentFrame(); const itens: { from: number; dur: number; src: string }[] = []; let t = de;
	for (let g = 0; t < ate && g < 300; g++) for (const c of clipes) { if (t >= ate) break; const d = Math.max(2, Math.round(c.dur * 30)); itens.push({ from: t, dur: Math.min(d, ate - t), src: c.src }); t += d; }
	return <>{itens.filter((i) => f >= i.from - 30 && f < i.from + i.dur + 2).map((i) => (
		<Sequence key={i.from} from={i.from} durationInFrames={i.dur} layout="none"><OffthreadVideo muted src={i.src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></Sequence>
	))}</>;
};
const FRIENDS: Clipe[] = [{ src: VPS + "friends-1.mp4", dur: 2.294 }, { src: VPS + "friends-2.mp4", dur: 1.627 }, { src: VPS + "friends-3.mp4", dur: 2.044 }];
const TAHM: Clipe[] = [{ src: SUPA + "tahm/tahm-s01e14/S01_E14_0.12.02.345-0.12.04.040.mp4", dur: 1.695 }];
const HIMYM: Clipe[] = [{ src: SUPA + "himym/himym-s01e07/HIMYM_S01_E07_0.10.14.528-0.10.16.189.mp4", dur: 1.661 }];
const DISCURSO = SUPA + "discursos/denzel/denzel_01_fall_forward.mp4"; // 50 s, real
// DEMO DO APP: celular com telas REAIS, capturadas do app de produção rodando (1179×2556, 3x) em 13/11.
// Cada tela entra no seu tempo; `video` = retângulo do player (fração da tela) onde a cena real fica tocando;
// `toque` = ponto (fração) que recebe o toque logo antes de trocar pra próxima tela. aneis = [de, ate, [x, y, w, h]].
type Tela = { de: number; src: string; video?: [number, number, number, number]; toque?: [number, number]; push?: boolean };
const V1: [number, number, number, number] = [0.03, 0.261, 0.897, 0.232], V2: [number, number, number, number] = [0.03, 0.218, 0.897, 0.231], V3: [number, number, number, number] = [0.03, 0.19, 0.897, 0.232], VS: [number, number, number, number] = [0.03, 0.232, 0.897, 0.231];
const CENA1: Clipe[] = [{ src: SUPA + "friends/friends-s01e01/Friends_S01_E01_0.00.49.774-0.00.52.745.mp4", dur: 2.971 }];
const Demo: React.FC<{ x: number; y: number; w: number; em: number; ate: number; telas: Tela[]; aneis?: [number, number, [number, number, number, number]][]; giro?: number }> = ({ x, y, w, em, ate, telas, aneis = [], giro = 0 }) => {
	const f = useCurrentFrame(); if (f < em) return null; const p = ap(f, em, 16); const h = (w * 2556) / 1179; const B = Math.round(w * 0.034); // moldura
	let k = 0; telas.forEach((t, i) => { if (f >= s(t.de)) k = i; });
	const t = telas[k], prox = telas[k + 1]; const fim = prox ? s(prox.de) : ate; const troca = ap(f, s(t.de), 9);
	const dt = prox && t.toque ? f - (s(prox.de) - 13) : -1; const raio = w * 0.125;
	const flut = Math.sin((f - em) / 34) * 7, incl = giro + Math.sin((f - em) / 52) * 1.2;
	const camada = (tl: Tela, de: number, ateF: number, estilo: React.CSSProperties) => (
		<div key={tl.src + de} style={{ position: "absolute", left: 0, top: 0, width: w, height: h, ...estilo }}>
			<Img src={APP(tl.src)} style={{ position: "absolute", left: 0, top: 0, width: w, height: h }} />
			{tl.video ? <div style={{ position: "absolute", left: tl.video[0] * w, top: tl.video[1] * h, width: tl.video[2] * w, height: tl.video[3] * h, borderRadius: w * 0.045, overflow: "hidden", background: "#0B1220" }}><Clipes clipes={CENA1} de={Math.max(em, de)} ate={ateF} /></div> : null}
		</div>
	);
	const push = !!t.push && k > 0 && troca < 1;
	return (
		<div style={{ position: "absolute", left: x - B, top: y - B + flut, width: w + B * 2, height: h + B * 2, opacity: Math.min(1, p * 1.4), transform: `perspective(2400px) translateY(${(1 - p) * 70}px) rotateY(${incl}deg) rotateX(${(1 - p) * 8}deg) scale(${0.94 + 0.06 * p})` }}>
			{/* sombra no chão */}
			<div style={{ position: "absolute", left: "6%", right: "6%", bottom: -46, height: 70, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(11,13,18,0.30), rgba(11,13,18,0))", filter: "blur(10px)" }} />
			{/* botões laterais */}
			<div style={{ position: "absolute", left: -5, top: h * 0.2, width: 7, height: h * 0.045, borderRadius: 4, background: "#2A2D35" }} />
			<div style={{ position: "absolute", left: -5, top: h * 0.28, width: 7, height: h * 0.075, borderRadius: 4, background: "#2A2D35" }} />
			<div style={{ position: "absolute", left: -5, top: h * 0.37, width: 7, height: h * 0.075, borderRadius: 4, background: "#2A2D35" }} />
			<div style={{ position: "absolute", right: -5, top: h * 0.3, width: 7, height: h * 0.11, borderRadius: 4, background: "#2A2D35" }} />
			{/* corpo: titânio */}
			<div style={{ position: "absolute", inset: 0, borderRadius: raio + B, background: "linear-gradient(135deg, #5B5F6B 0%, #1A1C22 28%, #0B0D12 55%, #3D404A 100%)", boxShadow: "0 50px 110px rgba(11,13,18,0.34), 0 0 0 2px rgba(255,255,255,0.10) inset" }} />
			<div style={{ position: "absolute", left: B - 5, top: B - 5, right: B - 5, bottom: B - 5, borderRadius: raio + 5, background: "#000" }} />
			{/* tela */}
			<div style={{ position: "absolute", left: B, top: B, width: w, height: h, borderRadius: raio, overflow: "hidden", background: "#fff" }}>
				<div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, transformOrigin: "50% 0", transform: `translateY(${w * 0.125}px) scale(${(h - w * 0.125) / h})` }}>
				{k > 0 && troca < 1 ? camada(telas[k - 1], s(telas[k - 1].de), s(t.de) + 12, push ? { transform: `translateX(${-troca * w * 0.3}px)`, filter: `brightness(${1 - troca * 0.25})` } : {}) : null}
				{camada(t, s(t.de), fim, k > 0 ? (push ? { transform: `translateX(${(1 - troca) * w}px)`, boxShadow: "-30px 0 60px rgba(11,13,18,0.18)" } : { opacity: troca }) : {})}
				{aneis.map(([a1, b1, [rx, ry, rw, rh]], i) => (f >= s(a1) && f < s(b1) ? <div key={i} style={{ position: "absolute", left: rx * w - 8, top: ry * h - 8, width: rw * w + 16, height: rh * h + 16, borderRadius: 24, border: `7px solid ${COR.azul}`, boxSizing: "border-box", boxShadow: "0 0 0 9999px rgba(11,13,18,0.34), 0 0 34px rgba(47,91,255,0.7)", opacity: ap(f, s(a1), 8) }} /> : null))}
				{dt >= 0 && dt < 18 && t.toque ? (
					<>
						<div style={{ position: "absolute", left: t.toque[0] * w - 60, top: t.toque[1] * h - 60, width: 120, height: 120, borderRadius: 99, border: `5px solid ${COR.azul}`, boxSizing: "border-box", transform: `scale(${0.3 + dt / 13})`, opacity: Math.max(0, 1 - dt / 17) }} />
						<div style={{ position: "absolute", left: t.toque[0] * w - 30, top: t.toque[1] * h - 30, width: 60, height: 60, borderRadius: 99, background: "rgba(47,91,255,0.55)", transform: `scale(${dt < 5 ? 0.6 + dt * 0.08 : 1})`, opacity: Math.max(0, 1 - dt / 15) }} />
					</>
				) : null}
				</div>
				{/* barra de status */}
				<div style={{ position: "absolute", left: w * 0.085, top: w * 0.04, fontFamily: SANS, fontWeight: 700, fontSize: w * 0.044, color: COR.ink }}>9:41</div>
				<div style={{ position: "absolute", right: w * 0.075, top: w * 0.046, width: w * 0.07, height: w * 0.034, borderRadius: w * 0.01, border: `${Math.max(2, w * 0.004)}px solid ${COR.ink}`, boxSizing: "border-box" }}><div style={{ position: "absolute", left: 2, top: 2, bottom: 2, width: "72%", borderRadius: w * 0.005, background: COR.ink }} /></div>
				{/* ilha dinâmica */}
				<div style={{ position: "absolute", left: w * 0.5 - w * 0.15, top: w * 0.028, width: w * 0.3, height: w * 0.085, borderRadius: 99, background: "#000" }} />
				{/* reflexo do vidro */}
				<div style={{ position: "absolute", inset: 0, background: "linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.07) 100%)", pointerEvents: "none" }} />
			</div>
		</div>
	);
};
// etiqueta que aponta pra parte acesa da tela (fica por cima da borda do aparelho)
const Etiqueta: React.FC<{ de: number; ate: number; lado: "e" | "d"; yc: number; children: React.ReactNode }> = ({ de, ate, lado, yc, children }) => {
	const f = useCurrentFrame(); if (f < s(de) || f >= s(ate)) return null; const p = ap(f, s(de), 9);
	return (
		<div style={{ position: "absolute", top: yc - 85, height: 170, width: 330, ...(lado === "e" ? { left: 26 } : { right: 26 }), borderRadius: 40, ...AZUL_CHEIO, ...MEIO, padding: "0 22px", boxSizing: "border-box", fontFamily: DISPLAY, fontWeight: 800, fontSize: 46, lineHeight: 1.04, letterSpacing: -1.4, color: "#fff", opacity: p, transform: `translateX(${(1 - p) * (lado === "e" ? -40 : 40)}px) scale(${0.92 + 0.08 * p})` }}><span>{children}</span></div>
	);
};
// cartões de explicação ao lado do celular: o último dito fica aceso
const Lado: React.FC<{ x: number; w: number; y: number; passo?: number; h?: number; itens: [number, React.ReactNode][] }> = ({ x, w, y, passo = 196, h = 172, itens }) => {
	const f = useCurrentFrame(); let at = -1; itens.forEach((it, i) => { if (f >= s(it[0])) at = i; });
	return <>{itens.map((it, i) => (
		<Cartao key={i} x={x} w={w} y={y + i * passo} h={h} em={s(it[0])} style={{ ...MEIO, padding: "0 26px", boxSizing: "border-box", fontFamily: SANS, fontWeight: 700, fontSize: 40, lineHeight: 1.14, letterSpacing: -0.6, color: i === at ? "#fff" : COR.ink, ...(i === at ? AZUL_CHEIO : {}) }}><span>{it[1]}</span></Cartao>
	))}</>;
};
const Preco: React.FC<{ v: string; size: number; c?: string }> = ({ v, size, c = COR.ink }) => (
	<span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 0.95, letterSpacing: -size * 0.04, color: c, whiteSpace: "nowrap" }}><span style={{ fontSize: size * 0.42, letterSpacing: -1, marginRight: size * 0.06 }}>R$</span>{v}</span>
);
// botão da página (fica ABAIXO do vídeo): pulsa e a seta aponta pra baixo
const Botao: React.FC<{ em: number; y: number; children: React.ReactNode }> = ({ em, y, children }) => {
	const f = useCurrentFrame(); if (f < em) return null; const pulso = 1 + Math.sin((f - em) / 7) * 0.025; const dy = Math.abs(Math.sin((f - em) / 9)) * 26;
	return (
		<>
			<Cartao y={y} h={190} x={90} w={900} em={em} style={{ ...MEIO, ...VERDE_CHEIO, borderRadius: 99, transform: `scale(${pulso})` }}><Frase size={72} c={COR.ink}>{children}</Frase></Cartao>
			<svg width={160} height={170} style={{ position: "absolute", left: 460, top: y + 220 + dy }}><path d="M 80 10 V 140 M 30 92 L 80 144 L 130 92" fill="none" stroke={COR.verde} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" /></svg>
		</>
	);
};

// ───────── 0:00 · centenas de alunos → O ÁUDIO DO ALUNO (prova) ─────────
const Audio1: React.FC<{ y: number; em: number }> = ({ y, em }) => {
	const f = useCurrentFrame(); const t = f / 30; const p = Math.max(0, Math.min(1, (t - ONDA_DE) / (ONDA_ATE - ONDA_DE))); const seg = Math.max(0, Math.min(ONDA_ATE - ONDA_DE, t - ONDA_DE));
	const mm = (x: number) => `${Math.floor(x / 60)}:${String(Math.floor(x % 60)).padStart(2, "0")}`;
	return (
		<Cartao y={y} h={250} em={em}>
			<div style={{ position: "absolute", left: 36, top: 60, width: 130, height: 130, borderRadius: 99, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
				{t >= ONDA_DE && t < ONDA_ATE ? <svg width={54} height={54}><rect x={6} y={4} width={15} height={46} rx={4} fill="#fff" /><rect x={33} y={4} width={15} height={46} rx={4} fill="#fff" /></svg> : <svg width={54} height={54}><path d="M 12 4 L 50 27 L 12 50 Z" fill="#fff" /></svg>}
			</div>
			<div style={{ position: "absolute", left: 200, right: 40, top: 56, height: 110, display: "flex", alignItems: "center", gap: 3 }}>
				{ONDA.map((v, i) => <div key={i} style={{ flex: 1, height: Math.max(8, v * 110), borderRadius: 4, background: i / ONDA.length < p ? "#25D366" : "#CBD2DE" }} />)}
			</div>
			<div style={{ position: "absolute", left: 200, right: 40, top: 182, display: "flex", justifyContent: "space-between", fontFamily: SANS, fontWeight: 600, fontSize: 32, color: COR.ink2 }}><span>{mm(seg)}</span><span>áudio real, sem corte</span><span>{mm(ONDA_ATE - ONDA_DE)}</span></div>
		</Cartao>
	);
};
const O01: React.FC = () => {
	const f = useCurrentFrame(); const tA = s(7.6);
	// 15/11, Marcos: "na hora do depoimento… deixa só o áudio puro sem legenda nem nada, só parecendo um play mesmo. E coloca PROPRIEDADE FLUENCY ROUTE".
	// Enquanto o áudio toca: só o cartão do aluno + o player, no meio da tela, e o selo de propriedade. As frases transcritas (fala) não aparecem mais.
	const dy = f < s(77.3) ? 330 : 0;
	return (
		<>
			<Pil>{f < tA ? "Fluency Route" : "O que um aluno me mandou"}</Pil>
			{f < tA ? (
				<>
					<Centro top={420} em={s(2.2)}><Frase size={170}>Centenas</Frase><Frase size={170}>de alunos</Frase></Centro>
					<Cartao y={830} h={270} em={s(3.1)} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={120} c={COR.ink}>no mundo inteiro</Frase></Cartao>
					<Centro top={1170} em={s(4.1)}><Apoio size={60} c={COR.ink}>destravando o inglês</Apoio></Centro>
				</>
			) : (
				<>
					<Cartao y={280 + dy} h={170} em={tA} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 36px", boxSizing: "border-box" }}>
						<div style={{ width: 104, height: 104, borderRadius: 99, background: "#E3E8F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width={60} height={60} viewBox="0 0 60 60"><circle cx={30} cy={22} r={13} fill="#98A2B3" /><path d="M 6 58 C 6 40 54 40 54 58 Z" fill="#98A2B3" /></svg></div>
						<div>
							<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 50, letterSpacing: -1.4, color: COR.ink }}>Aluno da Fluency Route</div>
							{f >= s(10.7) ? <Entra em={s(10.7)}><div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 36, color: COR.ink2, marginTop: 4 }}>mora nos EUA · fazia aula presencial lá</div></Entra> : null}
						</div>
					</Cartao>
					<Audio1 y={480 + dy} em={tA + 6} />
					{f < s(77.3) ? <div style={{ position: "absolute", left: 0, right: 0, top: 1120, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 36, letterSpacing: 7, color: COR.ink2 }}>PROPRIEDADE FLUENCY ROUTE</div> : (
						<>
							<Centro top={840} em={s(77.3)}><Apoio size={60}>E esse é só um dos exemplos</Apoio></Centro>
							<Cartao y={980} h={380} em={s(83.8)} style={{ ...AZUL_CHEIO, ...MEIO, padding: "0 40px", boxSizing: "border-box" }}><Frase size={104} c={COR.ink}>Isso pode acontecer com você também</Frase></Cartao>
						</>
					)}
				</>
			)}
		</>
	);
};

// ───────── 1:25 · o que esperar: UMA META (episódio real, sem legenda) ─────────
const O02: React.FC = () => {
	const f = useCurrentFrame(); const tM = s(92.2), tV = s(100.5);
	const item = (em: number, t: React.ReactNode) => <Entra em={s(em)} style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 22 }}><Check em={s(em) + 4} size={64} /><Apoio size={52} c={COR.ink}>{t}</Apoio></Entra>;
	return (
		<>
			<Pil>O treinamento</Pil>
			{f < tM ? <Centro top={520} em={s(88.9)}><Frase size={150}>O que você</Frase><Frase size={150}>pode <Azul>esperar?</Azul></Frase></Centro> : (
				<>
					<Centro top={290} em={tM}><Frase size={124}>Uma <Azul>meta clara</Azul></Frase></Centro>
					{f < tV ? <Troca top={500} size={58} itens={[[94.5, "Real e sólida"], [98.1, <>Você <B>sente a evolução</B> a cada dia</>]]} /> : null}
					<Cartao y={470} h={566} x={24} w={1032} em={tV} style={{ background: "#0B1220" }}>
						<Clipes clipes={FRIENDS} de={tV} ate={s(112.2)} />
						<div style={{ position: "absolute", right: 26, top: 26, padding: "10px 26px", borderRadius: 18, background: COR.azul, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 48, letterSpacing: -1.4 }}>sem legenda</div>
					</Cartao>
					<div style={{ position: "absolute", left: 80, right: 60, top: 1090 }}>
						{item(104.5, <>Seus <B>primeiros episódios</B></>)}
						{item(105.8, <>Seus <B>primeiros discursos</B></>)}
						{item(107.0, <>100% em inglês</>)}
					</div>
					<Troca top={1400} size={50} c={COR.ink2} itens={[[109.0, "Seu ouvido e a sua fala nunca mais vão ser os mesmos"]]} />
				</>
			)}
		</>
	);
};

// ───────── 1:52 · é só o começo: o ACERVO (posters, contagem real, discurso real) ─────────
const O03: React.FC = () => {
	const f = useCurrentFrame(); const tN = s(118.3); const n = Math.round(ap(f, tN, 36) * 20508);
	const poster = (i: number, src: string) => <Cartao key={i} x={48 + i * 336} w={312} y={540} h={400} em={s(115.7) + i * 6} style={{ borderRadius: 34 }}><Img src={APP(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Cartao>;
	return (
		<>
			<Pil>E isso é só o começo</Pil>
			<Centro top={290} em={s(113.3)}><Frase size={104}>O treinamento</Frase><Frase size={104} c={COR.azul}>não para aí</Frase></Centro>
			{poster(0, "thumb-friends.jpg")}{poster(1, "thumb-tahm.jpg")}{poster(2, "thumb-himym.jpg")}
			<Cartao y={975} h={230} em={tN} style={{ ...AZUL_CHEIO, display: "flex", alignItems: "center", gap: 30, padding: "0 44px", boxSizing: "border-box" }}>
				<Frase size={150} c={COR.ink}>{n.toLocaleString("pt-BR")}</Frase>
				<Apoio size={46} c={COR.ink} style={{ lineHeight: 1.1 }}>cenas reais,<br />frase por frase</Apoio>
			</Cartao>
			<Cartao x={48} w={560} y={1240} h={315} em={s(119.7)} style={{ background: "#0B1220" }}>
				{f >= s(119.7) ? <Sequence from={s(119.7)} layout="none"><OffthreadVideo muted src={DISCURSO} startFrom={240} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></Sequence> : null}
				<div style={{ position: "absolute", left: 18, bottom: 18, padding: "8px 20px", borderRadius: 14, background: "rgba(11,13,18,0.78)", color: "#fff", fontFamily: SANS, fontWeight: 700, fontSize: 34 }}>Discursos inteiros</div>
			</Cartao>
			<Cartao x={632} w={400} y={1240} h={315} em={s(121.1)} style={{ ...MEIO, flexDirection: "column", gap: 8 }}>
				<Frase size={62}>Blocos</Frase><Frase size={62} c={COR.azul}>essenciais</Frase>
			</Cartao>
		</>
	);
};

// ───────── 2:06 · TUDO NO APP: tela real, e cada coisa que ele fala acende na tela ─────────
const O04: React.FC = () => (
	<>
		<Pil>Onde você treina</Pil>
		<Centro top={270} em={s(125.9)}><Frase size={96}>Dentro do <Azul>nosso aplicativo</Azul></Frase></Centro>
		<Demo x={280} y={500} w={520} em={s(126.3)} ate={s(142.2)}
			telas={[{ de: 126.3, src: "app-series.jpg", toque: [0.5, 0.37] }, { de: 127.7, src: "app-eps.jpg", toque: [0.5, 0.19], push: true }, { de: 128.9, src: "app-cena.jpg", video: V1, push: true }, { de: 131.9, src: "app-cena-pt.jpg", video: V3, toque: [0.25, 0.93] }, { de: 136.3, src: "app-cena2.jpg", push: true }]}
			aneis={[[129.3, 130.6, [0.079, 0.544, 0.25, 0.038]], [130.6, 131.9, [0.028, 0.816, 0.9, 0.152]], [132.1, 133.9, [0.03, 0.532, 0.9, 0.125]]]} />
		<Etiqueta de={129.3} ate={130.6} lado="d" yc={1135}>Repetição continuada</Etiqueta>
		<Etiqueta de={130.6} ate={131.9} lado="e" yc={1470}>Repetição espaçada</Etiqueta>
		<Etiqueta de={132.1} ate={133.9} lado="d" yc={1176}>Scripts em inglês e português</Etiqueta>
		<Etiqueta de={133.9} ate={136.2} lado="e" yc={838}>Áudios, treinos e aulas</Etiqueta>
		<Etiqueta de={138.7} ate={142.2} lado="d" yc={1470}>Passo a passo, sem firula</Etiqueta>
	</>
);

// ───────── 2:22 · o plano de voo: cruza a linha da fluência essencial e entra num ciclo que não para ─────────
const O05: React.FC = () => {
	const f = useCurrentFrame(); const t0 = s(142.5), tC = s(146.6); const p = ap(f, t0 + 6, 70); const giro = ((f - tC) / 50) * 360;
	const px = 130 + p * 560, py = 1330 - p * 640 - Math.sin(p * Math.PI) * 60;
	return (
		<>
			<Pil>O caminho</Pil>
			<Centro top={300} em={t0}><Frase size={124}>Seu <Azul>plano de voo</Azul></Frase></Centro>
			<Cartao y={500} h={940} em={t0 + 4}>
				<svg width={984} height={940} viewBox="48 500 984 940" style={{ position: "absolute", inset: 0 }}>
					<line x1={90} x2={990} y1={860} y2={860} stroke={COR.azul} strokeWidth={6} strokeDasharray="6 22" strokeLinecap="round" />
					<Traco d="M 130 1330 Q 420 1280 690 690" em={t0 + 6} dur={70} cor={COR.ink2} larg={12} len={1100} />
					<circle cx={px} cy={py} r={26} fill={COR.azul} />
					{f >= tC ? <g transform={`rotate(${giro} 770 660)`}><Traco d="M 770 580 A 80 80 0 1 1 701 620" em={tC} dur={14} cor={COR.azul} larg={15} len={460} /><path d="M 684 598 L 702 624 L 728 606" fill="none" stroke={COR.azul} strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" /></g> : null}
				</svg>
				<div style={{ position: "absolute", left: 44, top: 290, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: COR.azul }}>fluência essencial</div>
				<div style={{ position: "absolute", left: 44, bottom: 40, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: COR.ink2 }}>hoje</div>
			</Cartao>
			<Troca top={1470} size={52} itens={[[146.6, <>Cruzou a linha: <B>a evolução não para mais</B></>]]} />
		</>
	);
};

// ───────── 2:30 · por que tanta gente continua travada (3 retratos) ─────────
const O06: React.FC = () => {
	const f = useCurrentFrame();
	const cartao = (y: number, em: number, rot: string, grande: React.ReactNode, sub: React.ReactNode) => (
		<Cartao y={y} h={260} em={s(em)}>
			<div style={{ position: "absolute", left: 44, top: 30, fontFamily: SANS, fontWeight: 700, fontSize: 36, color: COR.vermelho }}>{rot}</div>
			<div style={{ position: "absolute", left: 44, top: 78 }}>{grande}</div>
			<div style={{ position: "absolute", left: 46, right: 30, bottom: 30, fontFamily: SANS, fontWeight: 600, fontSize: 38, color: COR.ink2 }}>{sub}</div>
		</Cartao>
	);
	return (
		<>
			<Pil tom={COR.vermelho}>É só olhar ao redor</Pil>
			<Centro top={280} em={s(154.0)}><Frase size={84}>Por que tanta gente continua <span style={{ color: COR.vermelho }}>travada</span> por anos?</Frase></Centro>
			{cartao(560, 160.2, "Curso tradicional", <><Preco v="500 a 800" size={96} /><span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 44, color: COR.ink2 }}> por mês</span></>, "Por anos, decorando regras")}
			{cartao(850, 168.3, "Aula presencial", <Frase size={70}>Conteúdo novo toda semana</Frase>, "E não domina nem o básico do 1º mês")}
			{cartao(1140, 176.4, "Curso e viagem", <Preco v="10 a 15 mil" size={96} />, "E trava na hora de pedir um café")}
			{f >= s(182.3) ? <Troca top={1440} size={58} itens={[[182.3, "Não é falta de esforço"], [183.3, <>É falta do <B>método certo</B></>]]} /> : null}
		</>
	);
};

// ───────── 3:05 · a âncora: poderia custar 2, 3 mil → a missão → nem 3 mil nem 1.500 ─────────
const O07: React.FC = () => {
	const f = useCurrentFrame(); const t3 = s(189.4), tMis = s(201.6), tFim = s(214.6);
	return (
		<>
			<Pil>O valor</Pil>
			{f < tMis ? (
				<>
					<Centro top={420} em={s(186.1)}><Frase size={92} c={COR.ink2}>A gente poderia cobrar</Frase></Centro>
					<Centro top={600} em={s(188.8)}><Preco v={f >= t3 ? "3.000" : "2.000"} size={280} /></Centro>
					<Troca top={960} size={58} itens={[[190.5, <>Por um método que <B>realmente funciona</B></>], [195.6, "Você sente no ouvido e na boca"], [198.4, <>E ainda assim <B>valeria cada centavo</B></>]]} />
				</>
			) : f < tFim ? (
				<>
					<Centro top={420} em={tMis}><Frase size={110}>Nosso compromisso</Frase><Frase size={110} c={COR.azul}>foi outro</Frase></Centro>
					<Cartao y={760} h={420} em={s(204.5)} style={{ ...MEIO, padding: "0 50px", boxSizing: "border-box" }}><Frase size={84}>Levar isso pro <Azul>maior número de pessoas</Azul></Frase></Cartao>
					<Troca top={1250} size={54} c={COR.ink2} itens={[[209.3, "Qualquer pessoa disposta a treinar"]]} />
				</>
			) : (
				<>
					<Centro top={440} em={tFim}><Frase size={230} c={COR.ink2}><Riscada em={s(214.8) + 8}><Preco v="3.000" size={230} c="inherit" /></Riscada></Frase></Centro>
					<Centro top={730} em={s(215.1)}><Frase size={230} c={COR.ink2}><Riscada em={s(215.2) + 14}><Preco v="1.500" size={230} c="inherit" /></Riscada></Frase></Centro>
					<Centro top={1090} em={s(216.2)}><Frase size={96}>Decidimos fazer <Azul>totalmente diferente</Azul></Frase></Centro>
				</>
			)}
		</>
	);
};

// ───────── 3:38 · O PREÇO ─────────
const O08: React.FC = () => {
	const tP = s(222.4);
	const menos = (y: number, em: number, t: string) => <Cartao y={y} h={150} x={110} w={860} em={s(em)} style={{ ...MEIO, gap: 22, fontFamily: SANS, fontWeight: 700, fontSize: 48, color: COR.ink }}><span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 70, color: COR.verde }}>&lt;</span>{t}</Cartao>;
	return (
		<>
			<Pil>Treinamento completo da Fluency Route</Pil>
			<Centro top={330} em={s(218.8)}><Apoio size={58}>Hoje, você garante o acesso por</Apoio></Centro>
			<Cartao y={470} h={560} em={tP} style={{ ...AZUL_CHEIO, ...MEIO, flexDirection: "column" }}>
				<Preco v="49" size={390} c={COR.ink} />
				<Entra em={s(223.3)}><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 56, color: "#fff", marginTop: 6 }}>por mês, no plano anual</div></Entra>
			</Cartao>
			{menos(1090, 226.2, "que um livro didático")}
			{menos(1270, 228.3, "que um jantar no fim de semana")}
		</>
	);
};

// ───────── 3:50 · não é um curso: os treinos + um Personal English Trainer ─────────
const O09: React.FC = () => (
	<>
		<Pil>Por R$ 49 por mês</Pil>
		<Centro top={300} em={s(232.5)}><Frase size={100}>Você não está comprando</Frase><Frase size={150} c={COR.ink2}><Riscada em={s(233.4) + 6}>um curso</Riscada></Frase></Centro>
		<Cartao y={700} h={300} em={s(234.4)} style={{ display: "flex", alignItems: "center", gap: 30, padding: "0 44px", boxSizing: "border-box" }}><Check em={s(235.7)} size={110} /><Frase size={72}>Todos os <Azul>treinos concentrados</Azul></Frase></Cartao>
		<Cartao y={1040} h={360} em={s(240.4)} style={{ ...AZUL_CHEIO, ...MEIO, flexDirection: "column", gap: 10 }}>
			<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 44, color: "rgba(255,255,255,0.86)" }}>e a gente como o seu</div>
			<Frase size={104} c={COR.ink}>Personal English Trainer</Frase>
		</Cartao>
		<Troca top={1450} size={52} c={COR.ink2} itens={[[244.3, "Até a fluência essencial acontecer"], [248.3, "Seguindo as fases naturais da sua evolução"]]} />
	</>
);

// ───────── 4:11 · o botão e a Kiwify ─────────
const O10: React.FC = () => (
	<>
		<Pil>Como entrar</Pil>
		<Centro top={380} em={s(251.4)}><Frase size={116}>Clique no botão</Frase><Frase size={116} c={COR.verde}>aqui embaixo</Frase></Centro>
		<Botao em={s(252.1)} y={720}>Fazer minha inscrição</Botao>
		<Cartao y={1180} h={280} em={s(254.9)} style={{ display: "flex", alignItems: "center", gap: 34, padding: "0 44px", boxSizing: "border-box" }}>
			<svg width={110} height={130} viewBox="0 0 110 130" style={{ flexShrink: 0 }}><path d="M 28 56 V 38 a 27 27 0 0 1 54 0 V 56" fill="none" stroke={COR.ink} strokeWidth={13} strokeLinecap="round" /><rect x={10} y={56} width={90} height={68} rx={16} fill={COR.ink} /></svg>
			<div>
				<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 60, letterSpacing: -1.8, color: COR.ink }}>Pagamento pela Kiwify</div>
				<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 38, lineHeight: 1.16, color: COR.ink2, marginTop: 8 }}>uma das maiores plataformas de produtos digitais do Brasil</div>
			</div>
		</Cartao>
	</>
);

// ───────── 4:20 · AS 3 FASES (telas reais do app e cena real) ─────────
const Fases: React.FC<{ at: number }> = ({ at }) => (
	<div style={{ position: "absolute", left: 48, right: 48, top: 270, display: "flex", gap: 16 }}>
		{[1, 2, 3].map((i) => <div key={i} style={{ flex: 1, height: 100, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 50, letterSpacing: -1.4, background: i === at ? COR.azul : "#fff", color: i === at ? "#fff" : i < at ? COR.verde : "#B5BDCB", boxShadow: SOMBRA }}>Fase {i}</div>)}
	</div>
);
const O11: React.FC = () => {
	const f = useCurrentFrame(); const t1 = s(264.6), t2 = s(276.4), t3 = s(287.8); const at = f >= t3 ? 3 : f >= t2 ? 2 : f >= t1 ? 1 : 0;
	return (
		<>
			<Pil>O que você recebe</Pil>
			<Fases at={at} />
			{at === 0 ? <Centro top={700} em={s(259.8)}><Frase size={140}>As <Azul>3 fases</Azul></Frase><Frase size={140}>do treinamento</Frase></Centro> : null}
			{at === 1 ? (
				<>
					<Centro top={410} em={t1}><Frase size={104}>Treinos de <Azul>ouvido</Azul></Frase></Centro>
					<Demo giro={7} x={64} y={580} w={430} em={t1 + 4} ate={t2} telas={[{ de: 264.7, src: "app-eps.jpg", toque: [0.5, 0.19] }, { de: 266.5, src: "app-cena.jpg", video: V1, push: true }, { de: 271.0, src: "app-cena-en.jpg", video: V2 }]} aneis={[[268.2, 271.0, V1]]} />
					<Lado x={540} w={492} y={600} passo={250} h={220} itens={[[266.5, <>Destravar o <b>listening</b></>], [268.9, <>Discursos e cenas conversacionais</>], [271.0, <>Até o americano parar de parecer rápido e embolado</>]]} />
				</>
			) : null}
			{at === 2 ? (
				<>
					<Centro top={410} em={t2}><Frase size={104}>Treinos de <Azul>fala</Azul></Frase></Centro>
					<Demo giro={7} x={64} y={580} w={430} em={t2 + 4} ate={t3} telas={[{ de: 276.4, src: "app-shad.jpg", video: VS }]} aneis={[[280.5, 287.8, [0.33, 0.815, 0.34, 0.16]]]} />
					<Lado x={540} w={492} y={600} passo={250} h={220} itens={[[278.5, <>Destravar a <b>sua boca</b></>], [280.5, <>Blocos conversacionais e shadowing</>], [282.8, <>Frases inteiras sem pensar palavra por palavra</>]]} />
				</>
			) : null}
			{at === 3 ? (
				<>
					<Centro top={410} em={t3}><Frase size={104}>Rota para a <Azul>imersão</Azul></Frase></Centro>
					<Cartao y={570} h={566} x={24} w={1032} em={t3 + 4} style={{ background: "#0B1220" }}>
						<Clipes clipes={[...FRIENDS, ...TAHM, ...HIMYM]} de={t3 + 4} ate={s(298.6)} />
						{f >= s(295.3) ? <Entra em={s(295.3)} style={{ position: "absolute", right: 26, top: 26, padding: "10px 26px", borderRadius: 18, background: COR.azul, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 48, letterSpacing: -1.4 }}>sem legenda</Entra> : null}
					</Cartao>
					<div style={{ position: "absolute", left: 48, right: 48, top: 1180, display: "flex", gap: 16 }}>
						{([[294.2, "Filmes"], [294.4, "Séries"], [294.7, "Podcasts"]] as [number, string][]).map(([em, t]) => <Entra key={t} em={s(em)} style={{ flex: 1, height: 130, borderRadius: 34, background: "#fff", boxShadow: SOMBRA, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 54, letterSpacing: -1.6, color: COR.ink }}>{t}</Entra>)}
					</div>
					<Troca top={1370} size={54} itens={[[290.3, "Você expande pro que realmente gosta"], [296.8, <>Treinando naturalmente <B>no seu dia a dia</B></>]]} />
				</>
			) : null}
		</>
	);
};

// ───────── 4:58 · O EMPILHAMENTO: tudo o que entra na assinatura vai se somando, com imagem real de cada item, e fecha no preço.
// Sem preço inventado por item: o áudio não dá valores, então a pilha é de ITENS (com os números reais do acervo) e o total é o R$ 49.
const O12: React.FC = () => {
	const f = useCurrentFrame(); const tTot = s(311.7);
	const itens: { em: number; t: string; sub: string; img?: string; clipes?: Clipe[] }[] = [
		{ em: 298.6, t: "Acesso completo ao app", sub: "Listening e Shadowing", img: "app-cena-pt.jpg" },
		{ em: 301.4, t: "Material organizado", sub: "Fase 1, Fase 2 e Fase 3", img: "app-eps.jpg" },
		{ em: 304.0, t: "Friends", sub: "6.941 cenas", clipes: FRIENDS },
		{ em: 304.7, t: "Two and a Half Men", sub: "7.100 cenas", clipes: TAHM },
		{ em: 305.6, t: "How I Met Your Mother", sub: "6.467 cenas", clipes: HIMYM },
		{ em: 307.4, t: "Treinos concentrados", sub: "prontos pra você fazer", img: "app-cena.jpg" },
		{ em: 309.1, t: "Continuada e espaçada", sub: "os 2 tipos de repetição, no app", img: "app-cena2.jpg" },
	];
	let at = -1; itens.forEach((it, i) => { if (f >= s(it.em)) at = i; });
	const H = 132, PASSO = 146, Y0 = 410;
	return (
		<>
			<Pil>Tudo o que entra na sua assinatura</Pil>
			<Centro top={275} em={s(298.6)}><Frase size={92}>Um <Azul>acesso completo</Azul></Frase></Centro>
			{itens.map((it, i) => {
				const em = s(it.em); if (f < em) return null; const p = ap(f, em, 11); const novo = i === at && f < tTot;
				return (
					<div key={i} style={{ position: "absolute", left: 48, top: Y0 + i * PASSO, width: 984, height: H, borderRadius: 36, background: "#fff", boxShadow: novo ? ANEL : SOMBRA, opacity: p, transform: `translateY(${(1 - p) * -60}px) scale(${0.94 + 0.06 * p})` }}>
						<div style={{ position: "absolute", left: 14, top: 14, width: 184, height: 104, borderRadius: 24, overflow: "hidden", background: "#0B1220" }}>
							{it.clipes ? <Clipes clipes={it.clipes} de={em} ate={s(316.2)} /> : <Img src={APP(it.img!)} style={{ position: "absolute", left: 0, top: -70, width: 184 }} />}
						</div>
						<div style={{ position: "absolute", left: 224, right: 110, top: 22, fontFamily: DISPLAY, fontWeight: 800, fontSize: 46, letterSpacing: -1.4, color: COR.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.t}</div>
						<div style={{ position: "absolute", left: 226, right: 110, top: 80, fontFamily: SANS, fontWeight: 600, fontSize: 32, color: it.clipes ? COR.azul : COR.ink2 }}>{it.sub}</div>
						<div style={{ position: "absolute", right: 30, top: 32 }}><Check em={em + 5} size={68} /></div>
					</div>
				);
			})}
			<Cartao y={Y0 + itens.length * PASSO + 6} h={196} em={tTot} style={{ ...AZUL_CHEIO, ...MEIO, gap: 24 }}><Apoio size={52} c={COR.ink}>Tudo incluso por</Apoio><Preco v="49" size={140} c={COR.ink} /><Apoio size={52} c={COR.ink}>por mês</Apoio></Cartao>
		</>
	);
};

// ───────── 5:16 · duas garantias: o risco fica do nosso lado ─────────
const O13: React.FC = () => (
	<>
		<Pil>O que pouca gente tem coragem de oferecer</Pil>
		<Troca top={300} size={54} c={COR.ink2} itens={[[319.6, "Nossa missão: você sair do platô"], [322.9, "E sentir o inglês entrando no automático"]]} />
		<Entra em={s(328.4)} style={{ position: "absolute", left: 40, top: 400, width: 1000 }}><Img src={APP("shield-guarantee.png")} style={{ width: 1000, display: "block" }} /></Entra>
		<Centro top={900} em={s(329.0)}><Frase size={190}><Azul>2</Azul> garantias</Frase></Centro>
		<Cartao y={1150} h={320} em={s(330.2)} style={{ ...MEIO, gap: 34 }}>
			<Apoio size={66} c={COR.ink}>O seu risco:</Apoio>
			<Entra em={s(332.4)}><Frase size={200} c={COR.verde}>zero</Frase></Entra>
		</Cartao>
	</>
);

// ───────── 5:33 · 1ª garantia: 7 dias, incondicional ─────────
const O14: React.FC = () => {
	const f = useCurrentFrame(); const tSe = s(343.5), tDev = s(353.5);
	const passos: [number, string][] = [[337.0, "Entra hoje"], [337.7, "Assiste as aulas"], [338.9, "Conhece os treinos"], [340.1, "Acessa o aplicativo"], [342.1, "Mexe em tudo"]];
	return (
		<>
			<Pil tom={COR.verde}>1ª garantia</Pil>
			<Centro top={280} em={s(335.0)}><Frase size={260} c={COR.verde}>7 dias</Frase><Apoio size={62} c={COR.ink} style={{ marginTop: 6 }}>incondicional</Apoio></Centro>
			{f < tSe ? (
				<Cartao y={700} h={600} em={s(336.8)}>
					<div style={{ position: "absolute", left: 50, top: 44 }}>
						{passos.map(([em, t]) => <Entra key={t} em={s(em)} style={{ display: "flex", alignItems: "center", gap: 24, height: 102 }}><Check em={s(em) + 3} size={66} /><Apoio size={56} c={COR.ink}>{t}</Apoio></Entra>)}
					</div>
				</Cartao>
			) : f < tDev ? (
				<>
					<Centro top={720} em={tSe}><Apoio size={56}>E se em até 7 dias você sentir que</Apoio></Centro>
					<Troca top={860} size={84} itens={[[344.8, <b>não é pra você</b>], [346.0, <b>não curtiu meu jeito de ensinar</b>], [347.7, <b>não vai funcionar pra você</b>], [350.4, <b>preferia gastar com pizza</b>]]} />
				</>
			) : (
				<>
					<Cartao y={700} h={420} em={tDev} style={{ ...VERDE_CHEIO, ...MEIO, flexDirection: "column" }}><Frase size={230} c={COR.ink}>100%</Frase><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 54, color: "#fff" }}>do seu dinheiro de volta</div></Cartao>
					<div style={{ position: "absolute", left: 48, right: 48, top: 1170 }}>
						{([[356.7, "Sem perguntas"], [357.5, "Sem formulário chato"], [358.5, "Sem explicar nada pra ninguém"]] as [number, string][]).map(([em, t]) => <Entra key={t} em={s(em)} style={{ height: 110, marginBottom: 18, borderRadius: 34, background: "#fff", boxShadow: SOMBRA, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 700, fontSize: 50, color: COR.ink }}>{t}</Entra>)}
					</div>
				</>
			)}
		</>
	);
};

// ───────── 6:01 · 2ª garantia: 90 dias pra aplicar ─────────
const O15: React.FC = () => {
	const f = useCurrentFrame(); const tSe = s(373.5), tNao = s(381.7), tDev = s(398.4), tOu = s(405.8);
	const lista = (itens: [number, React.ReactNode][], cor: string) => (
		<div style={{ position: "absolute", left: 46, right: 30, top: 130 }}>
			{itens.map(([em, t], i) => <Entra key={i} em={s(em)} style={{ display: "flex", alignItems: "center", gap: 22, minHeight: 112 }}><Check em={s(em) + 3} size={62} cor={cor} /><Apoio size={48} c={COR.ink}>{t}</Apoio></Entra>)}
		</div>
	);
	const rot: React.CSSProperties = { position: "absolute", left: 46, top: 40, fontFamily: SANS, fontWeight: 700, fontSize: 42, color: COR.ink2 };
	return (
		<>
			<Pil tom={COR.verde}>2ª garantia</Pil>
			<Centro top={280} em={s(362.7)}><Frase size={230} c={COR.verde}>90 dias</Frase><Apoio size={56} c={COR.ink} style={{ marginTop: 6 }}>pra aplicar o sistema de verdade</Apoio></Centro>
			{f < tSe ? <Troca top={760} size={58} c={COR.ink2} itens={[[368.3, "Pra quem entra pra jogar o jogo"], [372.5, <b style={{ color: COR.ink }}>A gente vai além</b>]]} /> : f < tNao ? (
				<Cartao y={680} h={500} em={tSe}><div style={rot}>Se você</div>{lista([[373.7, <>Seguir os <b>treinos concentrados</b></>], [375.8, <>Colocar em prática o <b>passo a passo</b></>], [378.3, <>Treinar ouvido e fala <b>com consistência</b></>]], COR.azul)}</Cartao>
			) : f < tOu ? (
				<>
					<Cartao y={680} h={610} em={tNao}><div style={rot}>E em até 90 dias não sentir que</div>{lista([[384.2, <>O seu ouvido <b>melhorou estrondosamente</b></>], [388.0, <>Entende <b>episódios sem legenda</b></>], [390.6, <>Entende seus <b>primeiros discursos</b></>], [394.2, <>Sua fala <b>flui mais natural</b></>]], COR.azul)}</Cartao>
					<Cartao y={1320} h={230} em={tDev} style={{ ...VERDE_CHEIO, ...MEIO, padding: "0 30px", boxSizing: "border-box" }}><Frase size={70} c={COR.ink}>Devolvemos todo o seu investimento</Frase></Cartao>
				</>
			) : (
				<>
					<Cartao y={700} h={300} em={tOu} style={{ ...MEIO, boxShadow: ANEL }}><Frase size={104}>Ou você <Azul>destrava</Azul></Frase></Cartao>
					<Cartao y={1040} h={340} em={s(409.6)} style={{ ...VERDE_CHEIO, ...MEIO, padding: "0 30px", boxSizing: "border-box" }}><Frase size={92} c={COR.ink}>ou a gente assume o risco</Frase></Cartao>
				</>
			)}
		</>
	);
};

// ───────── 6:51 · as duas, lado a lado ─────────
const O16: React.FC = () => {
	const g = (x: number, em: number, n: string, t: React.ReactNode) => (
		<Cartao x={x} w={476} y={470} h={600} em={s(em)}>
			<div style={{ position: "absolute", left: 0, right: 0, top: 60, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 250, lineHeight: 1, letterSpacing: -8, color: COR.verde }}>{n}</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 310, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 70, letterSpacing: -2, color: COR.ink }}>dias</div>
			<div style={{ position: "absolute", left: 24, right: 24, bottom: 50, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 44, lineHeight: 1.14, color: COR.ink2 }}>{t}</div>
		</Cartao>
	);
	return (
		<>
			<Pil tom={COR.verde}>As duas garantias</Pil>
			<Centro top={300} em={s(411.3)}><Frase size={110}>Então tá aí</Frase></Centro>
			{g(48, 412.3, "7", <>pra testar<br />sem medo</>)}
			{g(556, 414.3, "90", <>pra aplicar e<br />sentir o resultado</>)}
			<Cartao y={1130} h={300} em={s(417.9)} style={{ ...AZUL_CHEIO, ...MEIO, padding: "0 40px", boxSizing: "border-box" }}><Frase size={80} c={COR.ink}>E você pode começar agora</Frase></Cartao>
		</>
	);
};

// ───────── 7:02 · quando eu mudei o foco pra TREINAR ─────────
const O17: React.FC = () => {
	const f = useCurrentFrame(); const tAl = s(431.3);
	const pts: [number, number][] = [[250, 300], [330, 210], [470, 250], [560, 190], [640, 260], [760, 220], [820, 330], [300, 420], [380, 480], [600, 430], [720, 470], [860, 520], [520, 340], [200, 250], [900, 280]];
	return (
		<>
			<Pil>A minha virada</Pil>
			{f < tAl ? (
				<>
					<Centro top={300} em={s(423.6)}><Apoio size={58}>Quando eu mudei o foco pra</Apoio><Frase size={240} c={COR.azul} style={{ marginTop: 10 }}>treinar</Frase></Centro>
					<div style={{ position: "absolute", left: 48, right: 48, top: 760, display: "flex", gap: 16 }}>
						{([[426.3, "o ouvido"], [427.8, "a fala"], [428.9, "o essencial"]] as [number, string][]).map(([em, t]) => <Entra key={t} em={s(em)} style={{ flex: 1, height: 170, borderRadius: 40, background: "#fff", boxShadow: SOMBRA, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 56, letterSpacing: -1.6, color: COR.ink }}>{t}</Entra>)}
					</div>
					<Cartao y={1000} h={320} em={s(430.1)} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={110} c={COR.ink}>Tudo mudou pra mim</Frase></Cartao>
				</>
			) : (
				<>
					<Centro top={300} em={tAl}><Frase size={104}>Hoje, <Azul>todos os dias</Azul></Frase></Centro>
					<Cartao y={500} h={640} em={tAl + 6}>
						<svg width={984} height={640} style={{ position: "absolute", inset: 0 }}>
							{pts.map(([x, y], i) => { const em = s(434.0) + i * 3; return f >= em ? <g key={i}><circle cx={x} cy={y} r={14 + 30 * ((f - em) % 40) / 40} fill="none" stroke={COR.azul} strokeWidth={4} opacity={1 - ((f - em) % 40) / 40} /><circle cx={x} cy={y} r={14} fill={COR.azul} /></g> : null; })}
						</svg>
						<div style={{ position: "absolute", left: 0, right: 0, bottom: 44, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 46, color: COR.ink2 }}>alunos em todos os lugares do mundo</div>
					</Cartao>
					<Troca top={1210} size={56} itens={[[435.9, <>Entendendo o que é <B>a rota da fluência</B></>], [437.9, <>E usando os <B>treinos concentrados</B></>]]} />
				</>
			)}
		</>
	);
};

// ───────── 7:21 · o resumo: você já entendeu tudo ─────────
const O18: React.FC = () => {
	const f = useCurrentFrame();
	const itens: [number, React.ReactNode, React.ReactNode][] = [
		[443.2, <>A fluência real está no <b>subconsciente</b></>, "O consciente não tem velocidade pra isso"],
		[451.6, <>Só existe um caminho: <b>o treino</b></>, "É ele que joga o inglês pro subconsciente"],
		[457.3, <>2 treinos: <b>ouvido</b> e <b>fala</b></>, "Lapidar a percepção e destravar a voz"],
		[472.3, <>Em cima da <b>fluência essencial</b></>, "As 500 a 700 palavras mais usadas"],
		[486.3, <><b>Treinos concentrados</b></>, "Discursos e séries, repetição continuada e espaçada"],
	];
	let at = -1; itens.forEach((it, i) => { if (f >= s(it[0])) at = i; });
	return (
		<>
			<Pil>Recapitulando</Pil>
			<Centro top={280} em={s(441.3)}><Frase size={88} style={{ whiteSpace: "nowrap" }}>Você já <Azul>entendeu tudo</Azul></Frase></Centro>
			{itens.map((it, i) => {
				const on = i === at;
				return (
					<Cartao key={i} y={440 + i * 216} h={196} em={s(it[0])} style={{ display: "flex", alignItems: "center", gap: 26, padding: "0 34px", boxSizing: "border-box", ...(on ? AZUL_CHEIO : {}) }}>
						<div style={{ width: 84, height: 84, borderRadius: 26, flexShrink: 0, background: on ? "#fff" : "#E8F7EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 52, color: on ? COR.azul : COR.verde }}>{on ? i + 1 : "✓"}</div>
						<div>
							<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 46, lineHeight: 1.1, letterSpacing: -0.8, color: on ? "#fff" : COR.ink }}>{it[1]}</div>
							<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 32, color: on ? "rgba(255,255,255,0.85)" : COR.ink2, marginTop: 6 }}>{it[2]}</div>
						</div>
					</Cartao>
				);
			})}
			<Troca top={1530} size={46} c={COR.ink2} itens={[[494.2, "Do jeito que eu e meus alunos fizemos pra destravar de vez"]]} />
		</>
	);
};

// ───────── 8:18 · a decisão: mais um ano em círculo × começar hoje ─────────
const O19: React.FC = () => {
	const f = useCurrentFrame(); const tA = s(502.7), tB = s(513.9); const giro = ((f - tA) / 70) * 360;
	return (
		<>
			<Pil>Agora</Pil>
			<Centro top={290} em={s(500.9)}><Frase size={124}>A decisão <Azul>é sua</Azul></Frase></Centro>
			{f < tA ? <Troca top={700} size={62} itens={[[498.2, <>Hoje você tem a chance de <B>virar essa chave</B></>]]} /> : null}
			<Cartao y={480} h={520} em={tA} style={f >= tB ? { opacity: 0.55 } : undefined}>
				<svg width={330} height={330} style={{ position: "absolute", left: 40, top: 95 }}>
					<circle cx={165} cy={165} r={120} fill="none" stroke="#DCE1EA" strokeWidth={22} />
					<g transform={`rotate(${giro} 165 165)`}><circle cx={165} cy={45} r={26} fill={COR.ink2} /></g>
				</svg>
				<div style={{ position: "absolute", left: 400, right: 30, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
					{([[505.0, "Mais uma dica solta"], [508.1, "Mais um curso"], [509.6, "Mais uma apostila"], [511.8, "Mais um ano em círculo"]] as [number, string][]).map(([em, t], i) => <Entra key={t} em={s(em)}><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: i === 3 ? 50 : 44, color: i === 3 ? COR.vermelho : COR.ink2 }}>{t}</div></Entra>)}
				</div>
			</Cartao>
			<Cartao y={1040} h={470} em={tB} style={{ ...AZUL_CHEIO }}>
				<div style={{ position: "absolute", left: 50, top: 50, fontFamily: SANS, fontWeight: 700, fontSize: 46, color: "rgba(255,255,255,0.86)" }}>ou</div>
				<div style={{ position: "absolute", left: 50, right: 40, top: 120 }}><Frase size={100} c={COR.ink}>Entrar pra Fluency Route</Frase></div>
				<Entra em={s(515.4)} style={{ position: "absolute", left: 52, right: 40, bottom: 50 }}><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 48, lineHeight: 1.14, color: "#fff" }}>e começar hoje a treinar do jeito certo</div></Entra>
			</Cartao>
		</>
	);
};

// ───────── 8:38 · o fecho: tá tudo pronto, clica no botão ─────────
const O20: React.FC = () => (
	<>
		<Pil tom={COR.verde}>Tá tudo esperando você</Pil>
		<Centro top={290} em={s(518.7)}><Frase size={116}>Tá tudo <Azul>pronto</Azul></Frase><Frase size={116}>pra você</Frase></Centro>
		<Demo x={320} y={600} w={440} em={s(519.3)} ate={s(532)} telas={[{ de: 519.3, src: "app-cena-pt.jpg", video: V3 }]} />
		<div style={{ position: "absolute", left: 0, right: 0, top: 1130, height: 500, background: "linear-gradient(rgba(250,251,253,0), #FAFBFD 38%)" }} />
		<Botao em={s(521.5)} y={1230}>Garantir a minha vaga</Botao>
		<Troca top={1650} size={46} c={COR.ink2} itens={[[525.8, "A próxima história de transformação pode ser a sua"]]} />
	</>
);

const CENAS: [number, React.FC][] = [[0, O01], [85.6, O02], [112.0, O03], [125.7, O04], [142.1, O05], [150.0, O06], [185.3, O07], [218.5, O08], [230.5, O09], [251.2, O10],
	[259.6, O11], [298.4, O12], [316.0, O13], [333.1, O14], [361.2, O15], [411.2, O16], [421.9, O17], [441.2, O18], [498.0, O19], [518.5, O20]];
// a oferta inteira (frames locais: 0 = primeira palavra do áudio da oferta). Entra subindo por cima da aula.
export const Oferta: React.FC<{ seco?: boolean }> = ({ seco }) => {
	const f = useCurrentFrame(); let C: React.FC = O01; for (const [t, c] of CENAS) if (f >= s(t)) C = c;
	const p = ap(f, 0, 12);
	return (
		<div style={{ position: "absolute", inset: 0, transform: seco ? undefined : `translateY(${(1 - p) * 1920}px)` }}>
			<Fundo />
			<div style={{ position: "absolute", inset: 0, transform: "translateY(60px)" }}><C /></div>
		</div>
	);
};
