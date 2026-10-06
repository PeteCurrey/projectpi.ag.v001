import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, Compass } from "lucide-react";

export default function Philosophy() {
  return (
    <section className="relative py-32 md:py-44 bg-obsidian-pure overflow-hidden border-b border-oliveGrey/70">
      {/* Background Architectural Texture */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80"
          alt="London stone architecture background texture"
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/90 to-obsidian" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center md:text-left">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center space-x-3 px-3 py-1 border border-oliveGrey/70 bg-obsidian-surface rounded-xs">
            <span className="w-1.5 h-1.5 bg-brass rounded-xs" />
            <span className="text-[10px] uppercase font-mono tracking-ultra text-stone">
              ETHOS & METHODOLOGICAL CERTAINTY
            </span>
          </div>

          {/* Monumental Typographic Statement */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-warmWhite tracking-tight leading-[1.05] font-serif uppercase">
              We don't sell suspicion. <br />
              <span className="text-brass italic font-normal">We establish facts.</span>
            </h2>
          </div>

          {/* Supporting Copy */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-oliveGrey/60 items-start text-left">
            <div className="md:col-span-8 space-y-4">
              <p className="text-lg md:text-xl text-warmWhite font-light leading-relaxed">
                Every investigation begins with a question. Our role is to establish what can be known,
                what can be evidenced, and what should happen next.
              </p>
              <p className="text-sm text-stone-muted leading-relaxed font-light">
                Sensationalist assumptions, confirmation bias, and unsubstantiated conjecture have no place
                in serious commercial governance or legal disputes. We conduct rigorous, lawful inquiry that
                withstands the intense adversarial scrutiny of High Court cross-examination.
              </p>
            </div>

            <div className="md:col-span-4 space-y-4 bg-obsidian-surface/60 border border-oliveGrey/80 p-6 rounded-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                THE THREE DISCIPLINARY GATES
              </span>
              <ul className="space-y-3 text-xs text-stone">
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-brass text-[10px]">01</span>
                  <span><strong>WHAT CAN BE KNOWN:</strong> Exhaustive multi-source intelligence gathering.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-brass text-[10px]">02</span>
                  <span><strong>WHAT CAN BE EVIDENCED:</strong> CPR-compliant proofs of fact and exhibits.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-mono text-brass text-[10px]">03</span>
                  <span><strong>WHAT HAPPENS NEXT:</strong> Strategic counsel for litigation or board action.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
