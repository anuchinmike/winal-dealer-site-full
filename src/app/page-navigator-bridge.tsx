"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { registerPageNavigator } from "@/app/dealer-product-modal-bridge";

/** Lets non-React code (the modal bridge) navigate with the client router. */
export function PageNavigatorBridge() {
  const router = useRouter();
  useEffect(() => {
    registerPageNavigator((href) => router.push(href));
    return () => registerPageNavigator(null);
  }, [router]);
  return null;
}
