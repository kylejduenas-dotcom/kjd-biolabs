"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Float,
  PresentationControls,
  ContactShadows,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";

/** Crisp sticker label drawn on a canvas — mapped to the front arc of the vial. */
function useLabelTexture(name: string, dose: string) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 1024,
      H = 600;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const x = c.getContext("2d")!;
    // clean white sticker panel
    x.fillStyle = "#fbfdff";
    x.fillRect(0, 0, W, H);
    // teal accent bars top & bottom
    x.fillStyle = "#0499cc";
    x.fillRect(0, 0, W, 14);
    x.fillRect(0, H - 14, W, 14);
    // product name (navy, bold) — auto-fit so long names stay on the front arc
    x.fillStyle = "#0c2348";
    x.textAlign = "center";
    x.textBaseline = "middle";
    const lines = name.split("\n");
    const maxW = W * 0.74;
    let fontPx = 116;
    x.font = `800 ${fontPx}px 'DM Sans', Arial, sans-serif`;
    const widest = Math.max(...lines.map((l) => x.measureText(l).width));
    if (widest > maxW) fontPx = Math.floor(fontPx * (maxW / widest));
    x.font = `800 ${fontPx}px 'DM Sans', Arial, sans-serif`;
    const lineGap = fontPx * 1.02;
    const nameTop = 200 - ((lines.length - 1) * lineGap) / 2;
    lines.forEach((ln, i) => x.fillText(ln, W / 2, nameTop + i * lineGap));
    // dose pill
    const pillW = 280,
      pillH = 104,
      px = W / 2 - pillW / 2,
      py = 384;
    x.fillStyle = "#0499cc";
    const r = pillH / 2;
    x.beginPath();
    x.moveTo(px + r, py);
    x.arcTo(px + pillW, py, px + pillW, py + pillH, r);
    x.arcTo(px + pillW, py + pillH, px, py + pillH, r);
    x.arcTo(px, py + pillH, px, py, r);
    x.arcTo(px, py, px + pillW, py, r);
    x.closePath();
    x.fill();
    x.fillStyle = "#ffffff";
    x.font = "800 64px 'DM Sans', Arial, sans-serif";
    x.fillText(dose, W / 2, py + pillH / 2 + 4);
    // brand line
    x.fillStyle = "#7c93b3";
    x.font = "600 34px 'DM Sans', Arial, sans-serif";
    x.fillText("KJD BioLabs · Research Use Only", W / 2, H - 58);

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, [name, dose]);
}

// Front-facing label arc (centered on the camera-facing +Z side).
const LABEL_ARC = 2.4; // radians (~138°)
const LABEL_START = -LABEL_ARC / 2;

function Vial({
  position,
  scale = 1,
  name,
  dose,
  powder,
}: {
  position: [number, number, number];
  scale?: number;
  name: string;
  dose: string;
  powder: string;
}) {
  const label = useLabelTexture(name, dose);
  return (
    <group position={position} scale={scale}>
      {/* glass body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.46, 0.46, 2, 64]} />
        <MeshTransmissionMaterial
          thickness={0.45}
          roughness={0.03}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.04}
          anisotropicBlur={0.08}
          distortion={0.08}
          distortionScale={0.2}
          temporalDistortion={0}
          color="#eaf6fc"
          attenuationColor="#bfe6f5"
          attenuationDistance={3}
        />
      </mesh>
      {/* rounded glass shoulder */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.3, 0.46, 0.26, 64]} />
        <MeshTransmissionMaterial
          thickness={0.4}
          roughness={0.04}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.04}
          color="#eaf6fc"
          attenuationColor="#bfe6f5"
          attenuationDistance={3}
        />
      </mesh>
      {/* lyophilized cake at the bottom */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.52, 48]} />
        <meshStandardMaterial color={powder} roughness={0.92} />
      </mesh>
      {/* front-facing sticker label */}
      <mesh position={[0, -0.04, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry
          args={[0.468, 0.468, 0.7, 96, 1, true, LABEL_START, LABEL_ARC]}
        />
        <meshStandardMaterial
          map={label ?? undefined}
          roughness={0.5}
          metalness={0}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      {/* neck */}
      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.12, 48]} />
        <MeshTransmissionMaterial thickness={0.3} roughness={0.05} transmission={1} ior={1.5} color="#eaf6fc" />
      </mesh>
      {/* crimp ring */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.345, 0.345, 0.2, 48]} />
        <meshStandardMaterial color="#c7d0db" metalness={1} roughness={0.26} />
      </mesh>
      {/* cap */}
      <mesh position={[0, 1.47, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.26, 48]} />
        <meshStandardMaterial color="#0c2348" metalness={0.85} roughness={0.35} />
      </mesh>
    </group>
  );
}

/** Pull the camera back on narrow viewports so all three vials stay in frame. */
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const halfV = THREE.MathUtils.degToRad(15); // fov 30 → half = 15°
    const needed = 1.98 / (Math.tan(halfV) * aspect); // fit cluster half-width
    const z = THREE.MathUtils.clamp(needed + 0.4, 7.6, 12);
    camera.position.set(0, 0.45, z);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

export default function HeroVials3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.45, 7.8], fov: 30 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <ResponsiveCamera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 7, 4]} intensity={2.4} castShadow />
      <pointLight position={[-5, 2, 3]} intensity={28} color="#36cdee" />
      <pointLight position={[5, -1, 2]} intensity={14} color="#1287d2" />

      {/* in-scene reflections (no external HDRI fetch) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3} position={[0, 4, 2]} scale={[8, 6, 1]} />
        <Lightformer intensity={1.4} color="#9bdcf5" position={[-4, 1, 3]} scale={[3, 6, 1]} />
        <Lightformer intensity={1.2} color="#ffffff" position={[4, 2, 2]} scale={[3, 6, 1]} />
        <Lightformer intensity={0.8} color="#1287d2" position={[0, -3, 2]} scale={[8, 3, 1]} />
      </Environment>

      <PresentationControls
        global
        cursor
        snap
        polar={[-0.18, 0.18]}
        azimuth={[-0.5, 0.5]}
      >
        <Float rotationIntensity={0.3} floatIntensity={0.4} speed={1.3}>
          <group position={[0.05, -0.15, 0]}>
            <Vial position={[-1.42, -0.06, 0]} scale={0.8} name={"Bacteriostatic\nWater"} dose="10ml" powder="#eaf2fb" />
            <Vial position={[0, 0, 0.5]} scale={1.04} name={"BPC-157 /\nTB-500"} dose="10mg" powder="#f1ecdd" />
            <Vial position={[1.46, -0.06, 0]} scale={0.82} name="GHK-Cu" dose="100mg" powder="#2f6fd0" />
          </group>
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -1.45, 0]} opacity={0.55} scale={12} blur={2.6} far={3.2} color="#03101d" />
    </Canvas>
  );
}
