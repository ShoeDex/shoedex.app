"use client";
import { useEffect, useRef } from "react";
import Card from "./Card";
import ShoeModel from "./ShoeModel";

import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 1.4;
      const positions = [15, 36, 60, 85];
      const rotations = [-8, -8, 4, 10];

      // pin cards section
      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // 设置初始为摊开状态并显示文字面（backText）
      cards.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        // 初始：摊开 + 显示 back（文字面）
        gsap.set(card, {
          left: `${positions[index]}%`,
          rotation: rotations[index],
        });
        gsap.set(frontEl, { rotateY: -180 });
        gsap.set(backEl, { rotateY: 0 });
      });

      // 滚动前段：由摊开过渡到中心堆叠（位置与旋转对调）
      cards.forEach((card, index) => {
        gsap.to(card, {
          left: "50%",
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container.current.querySelector(".cards"),
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.75,
            id: `spread-to-stack-${index}`,
          },
        });
      });

      // 翻转在收拢到中心的过程中同步进行，收拢结束时翻转完成
      cards.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        ScrollTrigger.create({
          trigger: container.current.querySelector(".cards"),
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.,
          id: `flip-during-stack-${index}`,
          onUpdate: (self) => {
            // 提前一些开始翻转，并按索引错开时间
            const globalAdvance = 0.2; // 全局提前量
            const perCardStagger = 0.1; // 每张卡错开量
            const progressWithLeadAndStagger = self.progress + globalAdvance - index * perCardStagger;
            const t = Math.min(1, Math.max(0, progressWithLeadAndStagger));
            const frontRotation = -180 + 180 * t; // -180 -> 0
            const backRotation = 0 + 180 * t; // 0 -> 180
            gsap.set(frontEl, { rotateY: frontRotation });
            gsap.set(backEl, { rotateY: backRotation });
          },
        });
      });
    },
    { scope: container }
  );

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <ReactLenis root options={{ lerp: 0.16 }}>
        <div className="container" ref={container}>
          <section className="hero">
            <div className="hero-content">
              <ShoeModel />
              <h1>
              Scan your sneakers, <br />
              Own your cards
              </h1>
              <button 
                className="cta-button"
                onClick={() => window.open('https://x.com/zanweiguo', '_blank')}
              >
                Download on App Store
              </button>
            </div>
          </section>

          <section className="cards">
            {[...Array(4)].map((_, index) => {
              // 为不同的卡片分配不同的背景图片
              const cardBackgrounds = [
                "/card-front-4.png",
                "/card-front-2.png",
                "/card-front-3.png",
                "/card-front.png"  // 第4张卡片使用第1张的背景
              ];
              
              return (
                <Card
                  key={index}
                  id={`card-${index + 1}`}
                  frontSrc={cardBackgrounds[index]}
                  frontAlt="Card Image"
                  backText="Your card details appear here"
                  ref={(el) => (cardRefs.current[index] = el)}
                />
              );
            })}
          </section>

          <section className="footer">
            <h1>Footer or Upcoming Section</h1>
          </section>
        </div>
      </ReactLenis>
    </>
  );
}
