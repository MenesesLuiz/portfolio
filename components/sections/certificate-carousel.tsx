"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Certification } from "@/content/portfolio";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

type CertificateCarouselProps = {
  certifications: Certification[];
};

function Certificate({ certificate, duplicate = false }: { certificate: Certification; duplicate?: boolean }) {
  const card = useRef<HTMLAnchorElement>(null);

  const tilt = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch" || !card.current) return;
    const bounds = card.current.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -7;
    card.current.style.setProperty("--certificate-rotate-x", `${rotateX.toFixed(2)}deg`);
    card.current.style.setProperty("--certificate-rotate-y", `${rotateY.toFixed(2)}deg`);
  };

  const resetTilt = () => {
    card.current?.style.setProperty("--certificate-rotate-x", "0deg");
    card.current?.style.setProperty("--certificate-rotate-y", "0deg");
  };

  return <a ref={card} href={duplicate ? undefined : certificate.credentialUrl ?? certificate.image} target={duplicate ? undefined : "_blank"} rel={duplicate ? undefined : "noreferrer"} tabIndex={duplicate ? -1 : undefined} aria-hidden={duplicate || undefined} onPointerMove={tilt} onPointerLeave={resetTilt} className="certificate-item group"><Image src={certificate.image} alt={duplicate ? "" : `Certificado ${certificate.title}, ${certificate.issuer}`} width={certificate.imageWidth} height={certificate.imageHeight} sizes="(max-width: 639px) 72vw, 18rem" className="h-auto w-full object-contain" /><h3 className="mt-4 text-base font-semibold tracking-[-.025em] text-[var(--foreground)]">{certificate.title}</h3></a>;
}

export function CertificateCarousel({ certifications }: CertificateCarouselProps) {
  return <div className="certificate-carousel mt-14" aria-label="Certificações"><InfiniteSlider gap={32} duration={38} className="certificate-viewport" trackClassName="certificate-track" duplicateChildren={certifications.map((certificate) => <Certificate key={`${certificate.title}-duplicate`} certificate={certificate} duplicate />)}>{certifications.map((certificate) => <Certificate key={certificate.title} certificate={certificate} />)}</InfiniteSlider></div>;
}
