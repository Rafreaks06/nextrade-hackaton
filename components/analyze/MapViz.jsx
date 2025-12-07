"use client";

import { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { ArcLayer } from "@deck.gl/layers";
import StaticMap from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Debug awal
console.log(
  "WEBGL SUPPORT?",
  typeof window !== "undefined" ? window.WebGLRenderingContext : "NO WINDOW"
);

const INITIAL_VIEW_STATE = {
  longitude: 115,
  latitude: 0,
  zoom: 2.5,
  pitch: 45,
  bearing: 0,
};

export default function MapViz({ data }) {
  const [ready, setReady] = useState(false);

  // STEP 1 – Debug apakah WebGL bisa dibuat
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    console.log("GL CONTEXT?", gl);

    if (gl) {
      console.log("MAX_TEXTURE_SIZE =", gl.getParameter(gl.MAX_TEXTURE_SIZE));
    } else {
      console.log("WEBGL FAILED TO INITIALIZE");
    }

    setReady(true); // <-- PENTING, BARU render DeckGL
  }, []);

  if (!ready) return <div className="w-full h-screen bg-black" />;

  const layers = [
    new ArcLayer({
      id: "trade-arcs",
      data,
      getSourcePosition: (d) => d.coords_source,
      getTargetPosition: (d) => d.coords_target,
      getSourceColor: [255, 255, 255],
      getTargetColor: (d) => d.profit_analysis.color,
      getWidth: 3,
      pickable: true,
      autoHighlight: true,
    }),
  ];

  return (
    <DeckGL
      controller={true}
      initialViewState={INITIAL_VIEW_STATE}
      layers={layers}
      glOptions={{ antialias: true }}
      onWebGLInitialized={(gl) => {
        console.log("DECKGL GL =", gl);
      }}
    >
      <StaticMap
        mapLib={maplibregl}
        reuseMaps={true}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        onLoad={(e) => {
          try {
            const gl = e.target.painter.context.gl;
            console.log("MAPLIBRE GL =", gl);
          } catch (err) {
            console.log("MAPLIBRE LOAD ERROR", err);
          }
        }}
      />
    </DeckGL>
  );
}
