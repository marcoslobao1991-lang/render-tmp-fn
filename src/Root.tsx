import "./index.css";
import { Composition } from "remotion";
import { FluencyNova, FLUENCY_NOVA_FRAMES } from "./fluency-nova/FluencyNova";

export const RemotionRoot: React.FC = () => (
  <Composition id="fluency-nova" component={FluencyNova} durationInFrames={FLUENCY_NOVA_FRAMES} fps={30} width={1080} height={1920} defaultProps={{ fonte: "hd" as const }} />
);
