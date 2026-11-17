// LEAD + AULA (0 → 9:36) no MESMO sistema da oferta aprovada (fluency-yt-rmkt/motion/base.tsx: branco editorial).
// Marcos 16/11: "usar o tom igual da oferta... a edição é pra ajudar a entender a copy... premium porém de cognição baixa...
// pode colocar eu na tela em alguns momentos com fundo embaçado, só não em tudo" + "SHOW DON'T TELL" + "stack já daria um slide"
// + "vc tá usando a mesma cena várias vezes". Regras: 1 ideia por tela; vídeo REAL (cena de Friends do app, b-roll) ou desenho
// que se monta NA PALAVRA; cada cena de Friends aparece UMA vez; modo "full" (só a edição) alterna com "div" (ele no cartão).
// Coordenadas = PALCO 1080×1130. Tempos = segundos da linha do tempo final; s() converte pra frame.
import React from "react";
import { Img, Loop, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { COR, DISPLAY, SANS, SOMBRA, Cartao, Frase, Apoio, Entra, Riscada, ap } from "./oferta-base";
// AULA DE QUADRO: sem pílula de capítulo (cara de landing page). O componente fica como no-op pra não reescrever as cenas.
const Pilula: React.FC<{ children?: React.ReactNode; tom?: string }> = () => null;

const s = (t: number) => Math.round(t * 30);
const AZUL_CHEIO: React.CSSProperties = { background: "transparent", boxShadow: "none" }; // era cartão azul cheio: agora só o texto em azul
const VERDE_CHEIO: React.CSSProperties = { background: "transparent", boxShadow: "none" };
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
// paleta de caderno: tinta calma + marca-texto (nada de azul elétrico)
const ACENTO = "#2B3F63", MARCA = "#FFE27A";
const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.ink, background: `linear-gradient(transparent 56%, ${MARCA} 56%, ${MARCA} 92%, transparent 92%)`, padding: "0 0.08em" }}>{children}</span>;
const Centro: React.FC<{ top: number; em?: number; children: React.ReactNode }> = ({ top, em, children }) =>
  em === undefined ? <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div> : <Entra em={s(em)} style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</Entra>;
// linha que TROCA no lugar (uma por vez)
const Troca: React.FC<{ itens: [number, React.ReactNode][]; top: number; size?: number; c?: string }> = ({ itens, top, size = 54, c = COR.ink }) => {
  const f = useCurrentFrame(); let r: [number, React.ReactNode] | null = null; for (const x of itens) if (f >= s(x[0])) r = x;
  return r ? <Entra key={r[0]} em={s(r[0])} style={{ position: "absolute", left: 50, right: 50, top, textAlign: "center" }}><Apoio size={size} c={c}>{r[1]}</Apoio></Entra> : null;
};
const conta = (f: number, de: number, ate: number, v: number) => Math.round(interpolate(f, [s(de), s(ate)], [0, v], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
// vídeo real num cartão (loop). leg = legenda EN amarela (cena de série); rot = rótulo à esquerda (faixa de stack)
const FR = (n: number) => `fluency-nova/friends/e01-${n}.mp4`;
const BR = (n: string) => `fluency-remake/broll/${n}.mp4`;
const Vid: React.FC<{ y: number; h: number; em: number; src: string; dur: number; pos?: string; leg?: string; rot?: string; borra?: number; children?: React.ReactNode }> = ({ y, h, em, src, dur, pos = "50% 40%", leg, rot, borra = 0, children }) => (
  <Cartao y={y} h={h} em={s(em)}>
    <Sequence from={s(em)} layout="none"><Loop durationInFrames={Math.max(2, Math.round(dur * 30))} layout="none">
      <OffthreadVideo muted src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} />
    </Loop></Sequence>
    {leg && <div style={{ position: "absolute", left: 20, right: 20, bottom: 22, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: "#FFD60A", filter: `blur(${borra}px)`, textShadow: "0 2px 8px #000, 0 0 3px #000" }}>{leg}</div>}
    {rot && <><div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "72%", background: "linear-gradient(90deg, rgba(11,13,18,.78), rgba(11,13,18,0))" }} />
      <div style={{ position: "absolute", left: 34, bottom: 26, fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, letterSpacing: -2, color: "#fff" }}>{rot}</div></>}
    {children}
  </Cartao>
);

// ───────── LEAD ─────────
const L2: React.FC = () => (<>
  <Pilula>O truque</Pilula>
  <Vid y={170} h={554} em={1.86} src={FR(1)} dur={3} leg="There's nothing to tell" />
  <Centro top={800} em={1.9}><Frase size={150}>com <Azul>Friends</Azul></Frase></Centro>
</>);
// STACK (slide próprio): cada situação entra na palavra e FICA
const L3: React.FC = () => (<>
  <Centro top={110}><Frase size={96}>Enquanto você faz</Frase><Frase size={96} c={COR.ink}>outras coisas</Frase></Centro>
  <Vid y={350} h={225} em={3.58} src={BR("dirigir")} dur={7.9} rot="dirigindo" />
  <Vid y={597} h={225} em={4.13} src={BR("bike")} dur={7.9} rot="pedalando" />
  <Vid y={844} h={225} em={5.62} src={BR("fone")} dur={7.9} rot="só com um fone" />
</>);
const L4: React.FC = () => {
  const f = useCurrentFrame(); const off = ap(f, s(10.81), 8);
  return (<>
    <Pilula>Por que funciona</Pilula>
    <Cartao y={210} h={260} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", boxSizing: "border-box" }}>
      <Frase size={84} c={off > 0.5 ? COR.ink2 : COR.ink}><Riscada em={s(10.95)}>Tradução mental</Riscada></Frase>
      <div style={{ position: "relative", width: 170, height: 90, borderRadius: 45, background: off > 0.5 ? "#D9DEE8" : COR.vermelho, flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 9, left: 89 - 80 * off, width: 72, height: 72, borderRadius: 36, background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,.25)" }} />
      </div>
    </Cartao>
  </>);
};
// a MESMA cena repetida 3 vezes: a legenda vai ficando nítida (outra cena, não a do hook)
const L5: React.FC = () => {
  const f = useCurrentFrame(); const R = [15.29, 16.83, 17.83]; const k = R.filter((r) => f >= s(r)).length; const ini = R[Math.max(0, k - 1)];
  return (<>
    <Pilula>A repetição das cenas</Pilula>
    <Vid key={k} y={170} h={554} em={Math.max(14.66, ini)} src={FR(8)} dur={1.54} leg="Sounds like a date to me" borra={[12, 12, 5, 0][k]} />
    {k > 0 && <Centro key={k} top={770} em={R[k - 1]}><Frase size={240} c={k === 3 ? ACENTO : COR.ink}>{k}×</Frase></Centro>}
    <Troca top={1020} itens={[[19.33, "você entende cada vez melhor"]]} />
  </>);
};
const L6: React.FC = () => {
  const f = useCurrentFrame(); const sep = f >= s(27.42);
  return (<>
    <Pilula tom={sep ? ACENTO : COR.vermelho}>O embolado do inglês</Pilula>
    <Cartao y={250} h={330} em={s(22.83)} style={{ ...MEIO, padding: "0 30px", boxSizing: "border-box" }}>
      {sep ? <Entra em={s(27.42)}><Frase size={96} c={COR.ink}>Sounds like a date to me</Frase></Entra> : <Frase size={88} c={COR.vermelho} style={{ letterSpacing: -5 }}>soundslikeadatetome</Frase>}
    </Cartao>
    {sep ? <Centro top={680} em={27.76}><Frase size={150}>você <Azul>entende</Azul></Frase></Centro>
      : <Troca top={680} size={72} c={COR.vermelho} itens={[[25.53, "tudo grudado"], [26.02, "e rápido demais"]]} />}
  </>);
};
const L7: React.FC = () => {
  const f = useCurrentFrame();
  return (<>
    <Pilula>A primeira meta</Pilula>
    <Centro top={160} em={28.79}><Apoio size={64} c={COR.ink}>Seu primeiro episódio</Apoio></Centro>
    {f >= s(30.2) && <Centro top={250}><Frase size={330} c={COR.ink}>{conta(f, 30.2, 30.9, 100)}%</Frase></Centro>}
    <Centro top={610} em={31.68}><Frase size={100}>sem <Riscada em={s(32.0)}>legenda</Riscada></Frase></Centro>
    <Cartao y={800} h={250} x={48} w={480} em={s(33.32)} style={{ ...VERDE_CHEIO, ...MEIO }}><Frase size={120} c={COR.ink}>em dias</Frase></Cartao>
    <Cartao y={800} h={250} x={552} w={480} em={s(34.0)} style={MEIO}><Frase size={120} c={COR.ink2}><Riscada em={s(34.3)}>anos</Riscada></Frase></Cartao>
  </>);
};
const L8: React.FC = () => (<>
  <Pilula>Quem já fez</Pilula>
  <Vid y={170} h={500} em={34.5} src={BR("sala")} dur={7.9} />
  <Centro top={720} em={35.6}><Frase size={92}>Aula presencial nos</Frase><Frase size={92} c={COR.ink}>Estados Unidos</Frase></Centro>
  <Troca top={980} size={56} itens={[[39.3, "pararam pra fazer esse mesmo truque"]]} />
</>);
// escada: cada episódio pede menos esforço
const Escada: React.FC<{ T: number[]; base: number; alt: number[] }> = ({ T, base, alt }) => {
  const n = T.length, gap = 20, wd = (984 - gap * (n - 1)) / n;
  return <>{T.map((em, i) => (
    <Cartao key={i} x={48 + i * (wd + gap)} w={wd} y={base - alt[i]} h={alt[i]} em={s(em)} style={{ background: i === n - 1 ? MARCA : "#DCE3EF", boxShadow: "0 18px 44px rgba(28,48,120,0.10)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 18, boxSizing: "border-box" }}>
      <Frase size={n > 3 ? 54 : 76} c={COR.ink}>EP {i + 1}</Frase>
    </Cartao>))}</>;
};
const L9: React.FC = () => (<>
  <Pilula>Depois do 1º episódio</Pilula>
  <Centro top={150}><Apoio size={48}>esforço pra entender</Apoio></Centro>
  <Escada T={[44.6, 50.2, 53.7]} base={860} alt={[620, 380, 190]} />
  <Troca top={910} size={64} itens={[[52.0, <>muito mais <Azul>fácil</Azul></>], [58.0, <>até entender <Azul>tudo de primeira</Azul></>]]} />
</>);
const L10: React.FC = () => (<>
  <Centro top={120}><Frase size={100}>Inglês <Azul>em definitivo</Azul></Frase></Centro>
  <Vid y={290} h={245} em={72.9} src={BR("entrevista")} dur={7.9} rot="entrevista de emprego" />
  <Vid y={557} h={245} em={74.9} src={BR("ligacao")} dur={7.9} rot="multinacional" />
  <Vid y={824} h={245} em={76.0} src={BR("aviao")} dur={7.9} rot="morar fora" />
</>);
const L11: React.FC = () => (<>
  <Centro top={250} em={83.4}><Frase size={190}>Milhares</Frase><Frase size={190}>de alunos</Frase></Centro>
  <Cartao y={720} h={270} em={s(84.6)} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={104} c={COR.ink}>no Brasil e no mundo</Frase></Cartao>
</>);

// ───────── AULA ─────────
const A1: React.FC = () => {
  const f = useCurrentFrame(); const p = conta(f, 110.8, 111.9, 90);
  return (<>
    <Pilula>Fluency Route</Pilula>
    <Centro top={170} em={105.2}><Frase size={110}>Fluência essencial</Frase></Centro>
    {f >= s(110.8) && <><Centro top={530}><Frase size={250} c={COR.ink}>{p}%</Frase></Centro>
      <Cartao y={820} h={64} style={{ borderRadius: 32, background: COR.linha }}><div style={{ width: `${p}%`, height: "100%", background: ACENTO }} /></Cartao>
      <Centro top={920}><Apoio size={56} c={COR.ink}>do inglês falado nas conversas</Apoio></Centro></>}
  </>);
};
const A2: React.FC = () => (<>
  <Pilula tom={COR.vermelho}>O vídeo mais polêmico</Pilula>
  <Cartao y={170} h={554}><Img src={staticFile("fluency-nova/yt-thumb.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Cartao>
  <Centro top={770} em={120.2}><Frase size={78}>“Isso é sem graça, mas me deixou <Azul>fluente</Azul> em inglês”</Frase></Centro>
  <Centro top={1040} em={121.5}><Apoio size={44}>420 mil visualizações</Apoio></Centro>
</>);
const A3: React.FC = () => (<>
  <Pilula>Hoje</Pilula>
  <Centro top={190} em={124.5}><Frase size={170}>Alunos no</Frase><Frase size={170} c={COR.ink}>mundo inteiro</Frase></Centro>
  <Cartao y={660} h={330} em={s(129.5)} style={{ ...VERDE_CHEIO, ...MEIO, padding: "0 40px", boxSizing: "border-box" }}><Frase size={92} c={COR.ink}>estavam travados, hoje são fluentes</Frase></Cartao>
</>);
const A4: React.FC = () => (<>
  <Pilula>Por que Friends</Pilula>
  <Vid y={170} h={554} em={135.8} src={FR(2)} dur={4.4} leg="There's gotta be something wrong with him" />
  <Centro top={780} em={143.8}><Frase size={100}>Quase todo fluente usou <Azul>Friends</Azul></Frase></Centro>
</>);
const A5: React.FC = () => (<>
  <Pilula>Por que Friends</Pilula>
  <Vid y={150} h={520} em={155.2} src={FR(6)} dur={2.95} leg="This is not even a date" />
  <Centro top={720} em={156.5}><Frase size={108}>Conversas do <Azul>cotidiano</Azul></Frase></Centro>
  <Troca top={980} size={52} itens={[[165.2, "o inglês essencial"], [168.9, "o vocabulário que a gente mais usa"]]} />
</>);
const A6: React.FC = () => {
  const f = useCurrentFrame(); const n = conta(f, 184.4, 186.9, 500);
  return (<>
    <Pilula>Paul Nation, linguista</Pilula>
    <Cartao y={150} h={520} style={{ padding: 26, boxSizing: "border-box", display: "grid", gridTemplateColumns: "repeat(25, 1fr)", gap: 7, alignContent: "center" }}>
      {Array.from({ length: 500 }, (_, i) => <div key={i} style={{ aspectRatio: "1", borderRadius: 5, background: i < n ? ACENTO : COR.linha }} />)}
    </Cartao>
    <Centro top={690}><Frase size={250} c={COR.ink}>{n}</Frase></Centro>
    <Centro top={960} em={187.4}><Apoio size={54} c={COR.ink}>palavras pra conversar pelo resto da vida</Apoio></Centro>
  </>);
};
const FALAS = ["There's nothing to tell. It's just some guy I work with.", "Come on. You're going out with a guy.", "Okay, everybody relax. This is not even a date.", "Sounds like a date to me.", "And it turns out it's my mother.", "Are you okay, sweetie?", "Let me get you some coffee."];
const TOP: [string, number][] = [["you", 1], ["I", 0.93], ["that", 0.7], ["what", 0.62], ["me", 0.55], ["who", 0.42]];
const A7: React.FC = () => {
  const f = useCurrentFrame(); const n = conta(f, 196.7, 208.3, 800); const rola = ((f - s(191.7)) * 1.6) % (FALAS.length * 60);
  return (<>
    <Pilula>Calculadora de palavras</Pilula>
    <Cartao y={150} h={250} style={{ padding: "0 34px", boxSizing: "border-box" }}>
      <div style={{ transform: `translateY(${-rola}px)` }}>{[...FALAS, ...FALAS, ...FALAS].map((x, i) => <div key={i} style={{ height: 60, lineHeight: "60px", fontFamily: SANS, fontWeight: 600, fontSize: 38, color: COR.ink2, whiteSpace: "nowrap" }}>{x}</div>)}</div>
    </Cartao>
    <Centro top={420}><Frase size={230} c={f >= s(208.0) ? ACENTO : COR.ink}>{n}</Frase></Centro>
    <Centro top={660} em={204.9}><Apoio size={50} c={COR.ink}>palavras diferentes numa temporada inteira</Apoio></Centro>
    <Cartao y={780} h={240} em={s(211.5)} style={{ display: "flex", alignItems: "flex-end", gap: 16, padding: "18px 30px 14px", boxSizing: "border-box" }}>
      {TOP.map(([p, v], i) => <div key={p} style={{ flex: 1, textAlign: "center" }}>
        <div style={{ height: 130 * v * ap(f, s(211.7) + i * 4, 12), background: ACENTO, borderRadius: "10px 10px 0 0" }} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 48, color: COR.ink }}>{p}</div></div>)}
    </Cartao>
    <Troca top={1040} size={46} itens={[[215.9, "mais de 100 vezes por episódio"]]} />
  </>);
};
const A8: React.FC = () => (<>
  <Pilula>Fluência essencial</Pilula>
  <Centro top={190} em={232.1}><Frase size={130}>Fluente no</Frase><Frase size={130} c={COR.ink}>essencial</Frase></Centro>
  <Cartao y={560} h={210} em={s(244.5)} style={MEIO}><Frase size={76}><Riscada em={s(246.5)}>coisa nova todo dia</Riscada></Frase></Cartao>
  <Cartao y={800} h={250} em={s(249.9)} style={{ ...AZUL_CHEIO, ...MEIO, padding: "0 40px", boxSizing: "border-box" }}><Frase size={82} c={COR.ink}>cada vez melhor no essencial</Frase></Cartao>
</>);
const A9: React.FC = () => (<>
  <Pilula>Você já conhece</Pilula>
  {["you", "that", "me", "what", "who", "I"].map((p, i) => (
    <Cartao key={p} x={48 + (i % 3) * 334} w={316} y={170 + Math.floor(i / 3) * 190} h={170} em={s(259.6) + i * 5} style={MEIO}><Frase size={92}>{p}</Frase></Cartao>))}
  <Centro top={590} em={266.7}><Frase size={120}>Só não é</Frase><Frase size={120} c={COR.ink}>fluente nelas</Frase></Centro>
  <Troca top={920} size={54} itens={[[271.4, "tem aluno entendendo episódio em questão de dias"], [281.4, "não adianta palavra nova todo dia"]]} />
</>);
const A10: React.FC = () => (<>
  <Pilula>Como usar Friends</Pilula>
  <Vid y={150} h={520} em={290.2} src={FR(9)} dur={6.3} leg="I realize I am totally naked" />
  <Centro top={710}><Apoio size={52}>Friends tem</Apoio></Centro>
  <Troca top={800} size={96} c={COR.ink} itens={[[294.4, <b>tudo que você precisa</b>], [299.9, <b>as expressões</b>], [301.4, <b>as emendas de palavras</b>], [302.9, <b>o vocabulário mais usado</b>]]} />
</>);
const A11: React.FC = () => (<>
  <Pilula tom={COR.vermelho}>O jeito comum</Pilula>
  <Vid y={170} h={500} em={309.0} src={BR("tv")} dur={7.9} />
  <Centro top={720} em={313.4}><Frase size={96}>3 temporadas</Frase><Frase size={96}><Riscada em={s(317.2)}>sem entender nada</Riscada></Frase></Centro>
  <Troca top={990} size={56} itens={[[319.4, "até funciona um pouco"], [322.4, <>o melhor é o <Azul>exato oposto</Azul></>]]} />
</>);
// funil: do idioma inteiro até UMA cena (a cena real toca no fim)
// o idioma inteiro = palavra que não acaba mais (aparecem em cascata dentro da caixa)
const IDIOMA = "you that me what who I although nevertheless whereby notwithstanding photosynthesis ubiquitous meanwhile dwelling hence albeit furthermore thereby accordingly whilst moreover henceforth quintessential serendipity onomatopoeia perpendicular hitherto bureaucracy entrepreneur thermodynamics".split(" ");
const A12: React.FC = () => {
  const f = useCurrentFrame(); const T = [336.2, 341.6, 352.7, 365.5]; const k = T.filter((x) => f >= s(x)).length;
  const cx: [number, number, string][] = [[984, 900, "o idioma inteiro"], [800, 700, "inglês essencial · 90% a menos"], [610, 500, "1 episódio"]];
  return (<>
    <Pilula>Quanto menos, melhor</Pilula>
    {k === 0 && <Centro top={420} em={328.3}><Frase size={130}>Menos coisa</Frase><Frase size={130} c={COR.ink}>pra treinar</Frase></Centro>}
    {cx.map(([wd, h, r], i) => f >= s(T[i]) && (
      <Cartao key={i} x={(1080 - wd) / 2} w={wd} y={1080 - h} h={h} em={s(T[i])} style={{ boxShadow: k - 1 === i ? `0 0 0 6px ${ACENTO}, ${SOMBRA}` : SOMBRA, background: k - 1 === i ? "#fff" : "#F1F4FA" }}>
        <div style={{ textAlign: "center", paddingTop: 22, fontFamily: DISPLAY, fontWeight: 800, fontSize: 50, letterSpacing: -1.5, color: k - 1 === i ? ACENTO : COR.ink2 }}>{r}</div>
        {i === 0 && k === 1 && <div style={{ position: "absolute", left: 40, right: 40, top: 110, bottom: 30, display: "flex", flexWrap: "wrap", alignContent: "flex-start", gap: "10px 22px", overflow: "hidden" }}>
          {IDIOMA.map((p, j) => <span key={j} style={{ fontFamily: SANS, fontWeight: 600, fontSize: 38, color: "#7D879B", opacity: f >= s(T[0]) + j * 2 ? 1 : 0 }}>{p}</span>)}
        </div>}
      </Cartao>))}
    {f >= s(T[3]) && <Vid y={700} h={236} em={T[3]} src={FR(3)} dur={2.3}><div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 0 8px ${ACENTO}`, borderRadius: 44 }} /></Vid>}
    {f >= s(T[3]) && <Centro top={955} em={T[3]}><Frase size={84} c={COR.ink}>1 cena</Frase></Centro>}
  </>);
};
const A13: React.FC = () => {
  const f = useCurrentFrame(); const n = Math.max(1, Math.floor((f - s(369.4)) / 69) + 1);
  return (<>
    <Pilula>O nome disso</Pilula>
    <Centro top={150} em={369.6}><Frase size={120}>Treino <Azul>concentrado</Azul></Frase></Centro>
    <Vid y={420} h={520} em={369.4} src={FR(3)} dur={2.3} leg="Does he have a hump and a hair piece?">
      <div key={n} style={{ position: "absolute", right: 24, top: 22, background: ACENTO, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, padding: "4px 26px", borderRadius: 20 }}>{n}×</div>
    </Vid>
    <Troca top={980} size={52} itens={[[374.5, "a mesma cena, repetida"], [380.5, "até entender tudo sem legenda"]]} />
  </>);
};
const A14: React.FC = () => {
  const f = useCurrentFrame(); const nit = f >= s(392.7);
  return (<>
    <Pilula>O que acontece</Pilula>
    <Cartao y={210} h={300} style={{ ...MEIO, padding: "0 30px", boxSizing: "border-box" }}>
      <Frase size={92} c={nit ? ACENTO : COR.ink2} style={{ filter: nit ? undefined : "blur(9px)" }}>Stop cleansing my aura</Frase>
    </Cartao>
    <Troca top={600} size={70} itens={[[390.6, "o embolado fica nítido"], [393.7, "eles falam em velocidade normal"], [398.1, <>a 2ª cena fica <Azul>muito mais fácil</Azul></>], [405.8, <>o inglês <Azul>se repete</Azul> o tempo inteiro</>]]} />
  </>);
};
const A15: React.FC = () => {
  const f = useCurrentFrame(); const g = interpolate(f, [s(409.8), s(420.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const sg = Math.round(g * 1200);
  return (<>
    <Pilula tom={ACENTO}>A primeira meta</Pilula>
    <Vid y={170} h={520} em={409.8} src={FR(15)} dur={6} />
    <Cartao y={720} h={30} style={{ borderRadius: 15, background: COR.linha }}><div style={{ width: `${g * 100}%`, height: "100%", background: ACENTO }} /></Cartao>
    <Centro top={770}><Frase size={190} c={g >= 1 ? ACENTO : COR.ink} style={{ fontVariantNumeric: "tabular-nums" }}>{String(Math.floor(sg / 60)).padStart(2, "0")}:{String(sg % 60).padStart(2, "0")}</Frase></Centro>
    <Troca top={990} size={52} itens={[[413.5, "um episódio inteiro, 100% sem legenda"], [419.4, "20 minutos de conversa, entendendo tudo"]]} />
  </>);
};
const A17: React.FC = () => (<>
  <Pilula>Como um músico</Pilula>
  <Vid y={170} h={500} em={445.8} src={BR("violao")} dur={7.9} />
  <Centro top={720} em={449.3}><Frase size={108}>Uma música <Azul>por vez</Azul></Frase></Centro>
  <Troca top={920} size={56} itens={[[456.4, "repetindo cada trecho"], [464.0, "no inglês é a mesma coisa"], [468.5, "e dá pra treinar fazendo outras coisas"]]} />
</>);
const A18: React.FC = () => (<>
  <Pilula>Depois de poucos episódios</Pilula>
  <Vid y={150} h={520} em={474.4} src={BR("celular2")} dur={7.9} />
  <Centro top={720} em={478.0}><Frase size={96}>O que você <Azul>quiser</Azul> em inglês</Frase></Centro>
</>);
const A19: React.FC = () => (<>
  <Pilula>A conta</Pilula>
  <Centro top={130} em={488.9}><Frase size={440} c={COR.ink}>5</Frase></Centro>
  <Centro top={560} em={489.4}><Frase size={120}>episódios</Frase></Centro>
  <Cartao y={770} h={290} em={s(495.8)} style={{ ...MEIO, padding: "0 30px", boxSizing: "border-box" }}><Frase size={74}>Todo mundo <Riscada em={s(498.5)}>estuda</Riscada>.<br />Você <Azul>treina</Azul>.</Frase></Cartao>
</>);
const A20: React.FC = () => (<>
  <Pilula>Na Fluency Route</Pilula>
  <Vid y={170} h={500} em={508.6} src={FR(24)} dur={2.0} leg="Did I say that out loud?" />
  <Centro top={720} em={511.5}><Frase size={104}>Os alunos <Azul>dão risada</Azul></Frase></Centro>
  <Centro top={940} em={514.0}><Apoio size={54} c={COR.ink}>quando entendem o 1º episódio sem legenda</Apoio></Centro>
</>);
const A21: React.FC = () => (<>
  <Pilula>Cada episódio</Pilula>
  <Centro top={140}><Apoio size={48}>esforço pra entender</Apoio></Centro>
  <Escada T={[522.8, 524.5, 526.4, 534.0, 547.8]} base={850} alt={[620, 440, 310, 210, 130]} />
  <Troca top={900} size={56} itens={[[527.9, "você não quer mais parar de treinar"], [539.0, "igual o músico: a 1ª música é a mais difícil"], [552.0, "depois, uma música nova em minutos"]]} />
</>);

// ───────── trecho que só existe NESTA VSL (12:43 → 13:33): treino de fala. Tela cheia (coordenadas 1080×1920) ─────────
export const NovaFala: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, transform: "translateY(60px)" }}>
    <div style={{ position: "absolute", left: 0, top: 114, width: 1080, height: 200 }}><Pilula>Treino de fala</Pilula></div>
    <Centro top={290} em={766.95}><Frase size={116}>Treine também</Frase><Frase size={116}>a sua <Azul>fala</Azul></Frase></Centro>
    <Entra em={s(769.0)} style={{ position: "absolute", left: 330, top: 590, width: 420, height: 911, borderRadius: 58, overflow: "hidden", boxShadow: `0 0 0 14px ${COR.ink}, 0 40px 90px rgba(28,48,120,0.3)` }}>
      <Img src={staticFile("fluency-yt-rmkt-app/app-shad.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </Entra>
    <Troca top={1560} size={54} itens={[[771.6, "grave a sua fala e compare com a série"], [789.0, <>feedback de pronúncia <Azul>por IA</Azul></>], [801.0, "shadowing com os mesmos episódios"], [807.0, "uma coisa já ajuda a outra"]]} />
  </div>
);
export const NOVA_FALA = { de: 766.9, ate: 812.9 };

// modos (16/11 noite): "split" = TELA MEIADA (quadro em cima, ELE embaixo ocupando a largura toda) · "slide" = quadro em tela cheia.
// Onde não tem cena é ELE em tela cheia com legenda: é o padrão. A edição é PONTUAL: só entra onde mostra a ideia.
// Saíram: slogans (Milhares de alunos, Alunos no mundo inteiro), b-roll genérico (sala, entrevista, tv, violão, estudo) e a cena 2 de Friends.
export const CENAS_AULA: { de: number; ate: number; modo: "split" | "slide"; C: React.FC }[] = [
  // LEAD
  { de: 1.85, ate: 3.0, modo: "split", C: L2 },      // cena real de Friends
  { de: 3.0, ate: 6.92, modo: "split", C: L3 },      // stack: enquanto faz outras coisas
  { de: 6.92, ate: 14.66, modo: "split", C: L4 },    // tradução mental desliga
  { de: 14.66, ate: 21.38, modo: "split", C: L5 },   // a mesma cena 1× 2× 3×
  { de: 21.38, ate: 28.75, modo: "split", C: L6 },   // embolado → separa
  { de: 28.75, ate: 34.5, modo: "slide", C: L7 },    // 100% sem legenda, dias × anos
  { de: 43.3, ate: 56.0, modo: "split", C: L9 },     // EP1 → EP3: cada um mais fácil
  { de: 34.5, ate: 43.3, modo: "split", C: L8 },     // aula presencial nos Estados Unidos (vídeo)
  { de: 63.6, ate: 82.5, modo: "split", C: L10 },    // entrevista · multinacional · morar fora (stack de vídeo)
  // AULA
  { de: 155.2, ate: 168.9, modo: "split", C: A5 },   // cena de Friends: conversa do cotidiano
  { de: 309.0, ate: 326.0, modo: "split", C: A11 },  // assistindo 3 temporadas sem entender
  { de: 445.8, ate: 474.4, modo: "split", C: A17 },  // o músico repetindo cada trecho
  { de: 474.4, ate: 488.6, modo: "split", C: A18 },  // o que você quiser em inglês
  { de: 508.6, ate: 522.7, modo: "split", C: A20 },  // cena de Friends: os alunos dão risada
  { de: 108.3, ate: 114.6, modo: "split", C: A1 },   // 90% do inglês falado
  { de: 118.5, ate: 124.4, modo: "split", C: A2 },   // o vídeo do YouTube (thumbnail real)
  { de: 143.8, ate: 155.2, modo: "split", C: A4 },   // Friends
  { de: 181.5, ate: 191.7, modo: "slide", C: A6 },   // 500 palavras
  { de: 191.7, ate: 224.0, modo: "slide", C: A7 },   // calculadora: 800 palavras, you/that/me
  { de: 242.0, ate: 259.5, modo: "split", C: A8 },   // coisa nova todo dia (riscado)
  { de: 259.5, ate: 271.4, modo: "split", C: A9 },   // você já conhece essas palavras
  { de: 294.4, ate: 309.0, modo: "split", C: A10 },  // expressões / emendas / vocabulário
  { de: 328.3, ate: 366.6, modo: "slide", C: A12 },  // funil até 1 cena
  { de: 366.6, ate: 387.8, modo: "split", C: A13 },  // treino concentrado: a cena repetindo
  { de: 387.8, ate: 409.8, modo: "split", C: A14 },  // o embolado fica nítido
  { de: 409.8, ate: 424.4, modo: "split", C: A15 },  // 20 minutos entendendo tudo
  { de: 488.6, ate: 508.6, modo: "split", C: A19 },  // 5 episódios · estuda × treina
  { de: 522.7, ate: 552.0, modo: "split", C: A21 },  // escada dos 5 episódios
];
