import { useEffect, useRef } from "react";
import { ReactPropsChildren } from "../../common/types";
import { useSignal } from "@dilane3/gx";
import { NavigationState, NavigationsElement } from "../../gx/signals/navigation/types";

export default function Main({ children }: ReactPropsChildren) {
  // Ref
  const mainRef = useRef<HTMLElement>(null);

  // Global state
  const { currentItem } = useSignal<NavigationState>("navigation");

  useEffect(() => {
    if (!mainRef.current) return;

    // Change the cursor when the mouse is over the main container
    mainRef.current.addEventListener("mouseover", handleMouseOver);
    mainRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mainRef.current?.removeEventListener("mouseover", handleMouseOver);
      mainRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [currentItem]); 

  useEffect(() => {
    if (currentItem === NavigationsElement.CURSOR) {
      document.body.style.cursor = "default";
    }
  }, [currentItem]);

  // Handler
  const handleMouseOver = () => {
    const cursor = currentItem === NavigationsElement.CURSOR ? "default" : "crosshair";

    document.body.style.cursor = cursor;
  };

  const handleMouseLeave = () => {
    document.body.style.cursor = "default";
  }

  return (
    <section ref={mainRef} className="bg-tertiary w-main h-full flex items-center justify-center">
      {children}
    </section>
  );
}
