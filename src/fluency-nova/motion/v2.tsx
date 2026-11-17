// Cenas que só existem na REGRAVAÇÃO (IMG_6890). Diferente do aula.tsx (tempos da v1 + warp), aqui os tempos são
// os da linha do tempo ATUAL, achados pela palavra (w), então acompanham qualquer corte novo antes delas.
import React from "react";
import { Loop, OffthreadVideo, Sequence, staticFile } from "remotion";
import { DISPLAY, Cartao, Frase, Entra } from "./oferta-base";
import { w } from "./tempo";

const s = (t: number) => Math.round(t * 30);
const Faixa: React.FC<{ y: number; em: number; nome: string; rot: string }> = ({ y, em, nome, rot }) => (
  <Cartao y={y} h={235} em={s(em)}>
    <Sequence from={s(em)} layout="none"><Loop durationInFrames={237} layout="none">
      <OffthreadVideo muted src={staticFile(`fluency-remake/broll/${nome}.mp4`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} />
    </Loop></Sequence>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "74%", background: "linear-gradient(90deg, rgba(11,13,18,.78), rgba(11,13,18,0))" }} />
    <div style={{ position: "absolute", left: 34, bottom: 26, fontFamily: DISPLAY, fontWeight: 800, fontSize: 62, letterSpacing: -2, color: "#fff" }}>{rot}</div>
  </Cartao>
);

// LEAD (nova): "E quando isso acontecer, o seu inglês já vai ser totalmente OPERACIONAL: assistir filmes sem legenda,
// conversar em inglês, ler livros em inglês. E essa própria imersão vai te deixando cada dia mais fluente."
const T0 = w(56, "quando"), TOP = w(T0, "operacional"), TF = w(TOP, "filmes"), TC = w(TOP, "conversar"), TL = w(TOP, "ler"), TI = w(TL, "imersão"), TFIM = w(TI, "então");
const Operacional: React.FC = () => (<>
  <Entra em={s(TOP - 0.2)} style={{ position: "absolute", left: 40, right: 40, top: 130, textAlign: "center" }}><Frase size={104}>Inglês <span style={{ background: "linear-gradient(transparent 56%, #FFE27A 56%, #FFE27A 92%, transparent 92%)" }}>operacional</span></Frase></Entra>
  <Faixa y={290} em={TF} nome="friends2" rot="filmes sem legenda" />
  <Faixa y={545} em={TC} nome="celular" rot="conversar em inglês" />
  <Faixa y={800} em={TL} nome="estudo" rot="ler livros em inglês" />
</>);

export const CENAS_V2: { de: number; ate: number; modo: "split" | "slide"; C: React.FC }[] = [
  { de: T0, ate: TFIM, modo: "split", C: Operacional },
];
