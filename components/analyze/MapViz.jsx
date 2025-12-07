"use client";

import { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { ArcLayer } from "@deck.gl/layers";
import StaticMap from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const INITIAL_VIEW_STATE = {
  longitude: 115,
  latitude: 0,
  zoom: 2.5,
  pitch: 45,
  bearing: 0,
};

export default function MapViz({ data }) {
  const [ready, setReady] = useState(false);

  // Render DeckGL setelah browser siap
  useEffect(() => {
    Promise.resolve().then(() => setReady(true));
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
    >
      <StaticMap
        mapLib={maplibregl}
        reuseMaps={true}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      />
    </DeckGL>
  );
}
