// src/hooks/useAbcWaas.ts

import { useContext } from "react";
import { AbcWaasContext } from "@/context/AbcWaasContext";

export function useAbcWaas() {
  const context = useContext(AbcWaasContext);

  if (!context) {
    throw new Error("Must be used inside AbcWaasProvider");
  }

  return context;
}
