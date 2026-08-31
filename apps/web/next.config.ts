import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js bloque par défaut les requêtes vers les assets de dev (chunks JS,
  // websocket HMR) qui n'arrivent pas depuis "localhost" — nécessaire pour
  // tester le site depuis un téléphone sur le même réseau Wi-Fi, sinon tout
  // le JavaScript côté client échoue en silence (403) : ni les animations au
  // défilement, ni le menu mobile, ni rien d'interactif ne fonctionne.
  allowedDevOrigins: ["192.168.1.47"],
};

export default nextConfig;
