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
  const textRevealRef = useRef(null);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 1.5;
      const positions = [12, 30, 50, 69, 88];
      const rotations = [-3, -2, 0, 3, 6];

      // pin cards section
      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Set initial state to spread out and show text face (backText)
      cards.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        // Initial: spread out + show back (text face)
        gsap.set(card, {
          left: `${positions[index]}%`,
          rotation: rotations[index],
        });
        gsap.set(frontEl, { rotateY: 180 });
        gsap.set(backEl, { rotateY: 0 });
      });

      // First scroll phase: transition from spread out to center stack (position and rotation swap)
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

      // Flip animation happens simultaneously during the gathering to center, flip completes when gathering ends
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
            // Start flip slightly earlier and stagger timing by index
            const globalAdvance = 0.2; // Global advance amount
            const perCardStagger = 0.08; // Stagger amount per card (adjusted for 5 cards)
            const progressWithLeadAndStagger = self.progress + globalAdvance - index * perCardStagger;
            const t = Math.min(1, Math.max(0, progressWithLeadAndStagger));
            const frontRotation = -180 + 180 * t; // -180 -> 0
            const backRotation = 0 + 180 * t; // 0 -> 180
            gsap.set(frontEl, { rotateY: frontRotation });
            gsap.set(backEl, { rotateY: backRotation });
          },
        });
      });

      // Text reveal animation with pin effect
      const textRevealSection = container.current.querySelector(".text-reveal");
      const words = textRevealSection.querySelectorAll(".text-reveal-word");
      
      // Initial setup: all text opacity set to 0.2
      gsap.set(words, { opacity: 0.2 });
      
      // Pin the text reveal section until all text is fully revealed
      const textRevealScrollHeight = window.innerHeight * 1.5; // Control scroll distance needed for text fade-in
      
      ScrollTrigger.create({
        trigger: textRevealSection,
        start: "top top",
        end: () => `+=${textRevealScrollHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Calculate opacity for each word
          words.forEach((word, index) => {
            const wordStart = index / words.length;
            const wordEnd = (index + 1) / words.length;
            const wordProgress = Math.min(1, Math.max(0, (progress - wordStart) / (wordEnd - wordStart)));
            const opacity = 0.2 + (0.8 * wordProgress); // From 0.2 to 1.0
            gsap.set(word, { opacity });
          });

          const startColor = { r: 0, g: 0, b: 0 }; // #000000
          const endColor = { r: 4, g: 50, b: 255 }; //rgb(4, 50, 255)
          
          const currentR = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
          const currentG = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
          const currentB = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
          
          const currentColor = `rgb(${currentR}, ${currentG}, ${currentB})`;
          gsap.set(textRevealSection, { backgroundColor: currentColor });
        },
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
      <ReactLenis root options={{ lerp: 0.16 /* linear interpolation factor */ }}>
        <div className="container" ref={container}>
          <section className="hero">
            <div className="hero-content">
              <ShoeModel />
              <h1>
              Scan your sneakers, <br />
              Own your cards
              </h1>
              <h2 className="hero-subtitle">
              ShoeDex is a sneaker app that turns 3D scans into AI-rated collectible cards.
              </h2>
              <button 
                className="cta-button"
                onClick={() => window.open('https://x.com/zanweiguo', '_blank')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.084 4.42383C14.3643 5.29395 13.1611 5.93848 12.2051 5.93848C12.0869 5.93848 11.9795 5.91699 11.915 5.90625C11.9043 5.85254 11.8721 5.69141 11.8721 5.51953C11.8721 4.42383 12.4307 3.32812 13.043 2.64062C13.8057 1.73828 15.0947 1.07227 16.1689 1.0293C16.1904 1.14746 16.2012 1.29785 16.2012 1.44824C16.2012 2.54395 15.7393 3.62891 15.084 4.42383ZM15.8359 6.16406C16.4375 6.16406 18.6182 6.22852 20.0469 8.28027C19.918 8.37695 17.7588 9.60156 17.7588 12.3301C17.7588 15.4775 20.5088 16.6055 20.5947 16.627C20.584 16.7021 20.1543 18.1523 19.1445 19.6455C18.2314 20.9453 17.2754 22.2666 15.8359 22.2666C14.3857 22.2666 14.0098 21.418 12.3555 21.418C10.7227 21.418 10.1426 22.2666 8.83203 22.2666C7.5 22.2666 6.57617 21.0742 5.52344 19.5918C4.28809 17.8408 3.2998 15.123 3.2998 12.5449C3.2998 8.41992 5.98535 6.16406 8.63867 6.16406C10.0352 6.16406 11.1953 7.1416 12.0869 7.1416C12.9248 7.1416 14.2354 6.16406 15.8359 6.16406Z" fill="currentColor"/>
                </svg>
                Download on App Store
              </button>
            </div>
          </section>

          <section className="cards">
            {[...Array(5)].map((_, index) => {
              // Assign different background images to different cards
              const cardBackgrounds = [
                "/card-front-5.png",
                "/card-front-4.png",
                "/card-front-2.png",
                "/card-front-3.png",
                "/card-front.png",
              ];
              
              return (
                <Card
                  key={index}
                  id={`card-${index + 1}`}
                  frontSrc={cardBackgrounds[index]}
                  frontAlt="Card Image"
                  ref={(el) => (cardRefs.current[index] = el)}
                />
              );
            })}
          </section>

          <section className="text-reveal">
            <div className="text-reveal-content">
              <h2 className="text-reveal-text">
                <span className="text-reveal-word">Rank</span>
                <span className="text-reveal-word">your</span>
                <span className="text-reveal-word">kicks</span>
                <br />
                <span className="text-reveal-word">Collect</span>
                <span className="text-reveal-word">your</span>
                <span className="text-reveal-word">picks</span>
              </h2>
            </div>
          </section>
        </div>
      </ReactLenis>
      
              {/* Footer moved outside container and ReactLenis */}
        <section className="footer">
          <div className="footer-title">ShoeDex</div>
        </section>
    </>
  );
}
