"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export const UpAnimation = ({
  children,
  trigger,
  toggleActions = "play none reverse none",
  overflow = "overflow-hidden",
  stagger,
  className,
  markers,
  AnimationContainer,
}: {
  children: ReactNode;
  trigger?: string | HTMLElement;
  toggleActions?: string;
  overflow?: string;
  className?: string;
  stagger?: boolean;
  markers?: boolean;
  AnimationContainer?: gsap.core.Animation | undefined;
}) => {
  const animationRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animationRef.current) return;

      const target = stagger
        ? animationRef.current.children
        : animationRef.current;

      gsap.set(target, { y: 500, opacity: 0 }); // 초기 상태 설정

      gsap.fromTo(
        target,
        {
          y: 500,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: trigger ? trigger : animationRef.current,
            start: "top center",
            end: "bottom bottom",
            toggleActions: toggleActions,
            markers: markers,
            invalidateOnRefresh: true,
            containerAnimation: AnimationContainer,
          },
        }
      );
    },
    {
      dependencies: [
        trigger,
        toggleActions,
        markers,
        stagger,
        AnimationContainer,
      ],
    }
  );

  return stagger ? (
    <div ref={animationRef} className={`${overflow} ${className}`}>
      {children}
    </div>
  ) : (
    <div className={`${overflow} ${className}`}>
      <div ref={animationRef}>{children}</div>
    </div>
  );
};

export const MaskAnimation = ({
  children,
  trigger,
  maskColor,
  markers,
}: {
  children: ReactNode;
  maskColor: string;
  trigger?: string;
  markers?: boolean;
}) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const [maskSize, setMaskSize] = useState<number>(0);

  // 리사이즈 핸들러
  const updateMaskSize = () => {
    if (animationRef.current) {
      setMaskSize(animationRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateMaskSize(); // 초기 사이즈 설정

    window.addEventListener("resize", updateMaskSize);
    return () => {
      window.removeEventListener("resize", updateMaskSize);
    };
  }, []);

  useGSAP(
    () => {
      if (!animationRef.current) return;

      setMaskSize(animationRef.current.offsetWidth);

      gsap.fromTo(
        animationRef.current,
        {
          left: 0,
        },
        {
          left: -maskSize,
          stagger: 0.2,
          duration: 3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: trigger ? trigger : animationRef.current,
            start: "top center",
            end: "bottom bottom",
            toggleActions: "play none none none",
            markers: markers,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { dependencies: [maskSize, trigger] }
  );

  return (
    <div className="relative overflow-hidden">
      <div>{children}</div>
      <div
        ref={animationRef}
        className={`absolute top-0 w-full h-full ${maskColor} z-20`}
      ></div>
    </div>
  );
};

export const SlidAnimation = ({ children }: { children: React.ReactNode }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [slideX, setSlideX] = useState(0);

  useGSAP(
    () => {
      if (!slideRef.current) return;

      if (!slideRef.current) return;
      setSlideX(slideRef.current.offsetWidth / 2);

      gsap.to(slideRef.current, {
        x: -slideX,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    },
    { dependencies: [slideX], scope: slideRef }
  );

  return (
    <div ref={slideRef} className="flex gap-0 flex-nowrap">
      {children}
      {children}
    </div>
  );
};

export const HorizonScroll = ({
  children,
  callbackTween,
}: {
  children: React.ReactNode;
  callbackTween?: (tween: gsap.core.Tween) => void;
}) => {
  const horizonRef = useRef<HTMLDivElement>(null);
  const horizonWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!horizonWrapperRef.current) return;
    if (!horizonRef.current) return;

    const isLarge = window.matchMedia("(min-width: 640px)").matches;
    if (!isLarge) return; // lg 미만이면 애니메이션 적용 안 함

    const horizonWrapper = horizonWrapperRef.current;
    const horizon = horizonRef.current;

    const horizonTween = gsap.to(horizon, {
      x: () => -1 * (horizonWrapper.scrollWidth - innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: horizonWrapperRef.current,
        pin: true,
        start: "top top",
        scrub: 1,
        end: () => "+=" + (horizon.scrollWidth - innerWidth),
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    if (callbackTween && isLarge && horizonTween) {
      callbackTween(horizonTween);
    }
  }, [callbackTween]);

  return (
    <div
      ref={horizonWrapperRef}
      className="w-full h-full relative overflow-hidden"
    >
      <div
        className="flex flex-col sm:flex-row flex-nowrap translate-x-0 w-full"
        ref={horizonRef}
      >
        {children}
      </div>
    </div>
  );
};

export const HorizonScrollNav = ({
  sections,
  listClass,
}: {
  sections: { id: string; title: string }[];
  listClass?: string;
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const index = sections.findIndex((section) => section.id === id);
    if (index === -1) return;

    const isLarge = window.matchMedia("(min-width: 640px)").matches;
    const scrollPos = isLarge ? el.offsetLeft : el.offsetTop;

    gsap.to(window, {
      scrollTo: {
        y: scrollPos,
        autoKill: false,
      },
      duration: 1,
    });
  };
  return (
    <ul className={`${listClass}`}>
      {sections.map((section, index) => {
        return (
          <li key={index}>
            <button
              className="cursor-pointer text-sm"
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
