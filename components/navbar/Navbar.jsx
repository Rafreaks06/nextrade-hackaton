"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [atFooter, setAtFooter] = useState(false);
  const pathname = usePathname(); // ⬅ detect current page

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollY + viewportHeight >= fullHeight - 120) {
        setAtFooter(true);
      } else {
        setAtFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full fixed top-0 z-30 px-6 py-4 flex items-center justify-between text-white">

      {/* LOGO */}
      <Link href="/" className="text-3xl font-black tracking-tight hover:opacity-70 transition font-logo">
        NT
      </Link>

      {/* Jika sedang di /analyze → jangan render tombol pesan ANALISA */}
      {pathname !== "/analyze" && (
        <motion.div
          className="relative"
          animate={atFooter ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 1.4, repeat: atFooter ? Infinity : 0 }}
        >
          {/* Efek spotlight & glow */}
          {atFooter && (
            <>
              <motion.div
                className="absolute -inset-6 bg-white/10 blur-2xl rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.div
                className="absolute -inset-4 bg-white/30 blur-3xl rounded-full"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          {/* TEXT */}
          <Link href="/analyze" className="relative z-20">
            <motion.span
              initial={{ opacity: 0.4, letterSpacing: "0px" }}
              animate={
                atFooter
                  ? {
                      opacity: 1,
                      letterSpacing: "5px",
                      scale: 1.1,
                    }
                  : {
                      opacity: 0.2,
                      letterSpacing: "0px",
                      scale: 1,
                    }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-lg font-black font-logo"
            >
              ANALISA
            </motion.span>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
