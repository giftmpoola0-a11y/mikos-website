"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const heroImages = [
  {
    src: "/images/mikos-dessert.jpg",
    alt: "Mikos dessert",
    label: "Desserts",
    bg: "bg-[#f6d4dc]",
    height: "h-[340px]",
    floatDuration: 6,
  },
  {
    src: "/images/mikos-drink.jpg",
    alt: "Mikos drink",
    label: "Drinks",
    bg: "bg-[#f3e8dc]",
    height: "h-[340px]",
    floatDuration: 7,
  },
  {
    src: "/images/mikos-meal.jpg",
    alt: "Mikos meal",
    label: "Meals",
    bg: "bg-[#dbe9dc]",
    height: "h-[220px]",
    floatDuration: 8,
  },
  {
    src: "/images/mikos-interior.jpg",
    alt: "Mikos interior",
    label: "Moments",
    bg: "bg-[#f4c7d2]",
    height: "h-[220px]",
    floatDuration: 6.5,
  },
];

const heroContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

const heroCardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Sparkle({
  className = "",
  delay = 0,
  size = "md",
}: {
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div
      className={`absolute ${sizeClass} animate-twinkle-soft ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-[#f3b3c8]/70 shadow-[0_0_14px_rgba(243,179,200,0.65)]" />
      <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-[#f3b3c8]/70 shadow-[0_0_14px_rgba(243,179,200,0.65)]" />
    </div>
  );
}

function GlowOrb({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-[90px] animate-float-soft ${className}`}
    />
  );
}

function SectionSparkles() {
  return (
    <>
      <Sparkle className="left-[8%] top-[16%]" delay={0.3} size="md" />
      <Sparkle className="left-[24%] top-[68%]" delay={1.1} size="sm" />
      <Sparkle className="left-[42%] top-[72%]" delay={1.4} size="sm" />
      <Sparkle className="right-[18%] top-[14%]" delay={2.1} size="lg" />
      <Sparkle className="right-[8%] bottom-[18%]" delay={0.9} size="md" />
      <Sparkle className="right-[28%] bottom-[10%]" delay={1.7} size="sm" />
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const featuredItems = [
    {
      title: "Signature Burger",
      desc: "A rich, satisfying favorite that gives Mikos that modern comfort-food feel.",
      image: "/images/mikos-burger.jpg",
    },
    {
      title: "Berry Drink",
      desc: "Fresh, bright, and made to look as good as it tastes.",
      image: "/images/mikos-drink.jpg",
    },
    {
      title: "Cheesecake Slice",
      desc: "Soft, indulgent, and dessert-forward in the best way.",
      image: "/images/mikos-cheesecake.jpg",
    },
    {
      title: "Loaded Dessert Cup",
      desc: "A playful sweet treat designed for cravings and camera moments.",
      image: "/images/mikos-dessert.jpg",
    },
    {
      title: "Grilled Plate",
      desc: "A hearty plate that balances the sweet side of the brand.",
      image: "/images/mikos-meal.jpg",
    },
    {
      title: "Celebration Cake",
      desc: "Elegant cakes made for birthdays, milestones, and memorable moments.",
      image: "/images/mikos-cake.jpg",
    },
  ];

  const gallerySlides = [
    {
      title: "Dessert Moments",
      category: "Desserts",
      description:
        "Sweet treats made for cravings, celebrations, and the kind of moments people post before the first bite.",
      image: "/images/mikos-gallery-1.jpg",
    },
    {
      title: "Refreshing Drinks",
      category: "Drinks",
      description:
        "Colorful, refreshing drinks that add brightness, flavor, and personality to the Mikos experience.",
      image: "/images/mikos-gallery-2.jpg",
    },
    {
      title: "Comfort Meals",
      category: "Meals",
      description:
        "Satisfying plates served with warmth, comfort, and a polished Mikos touch that keeps people coming back.",
      image: "/images/mikos-gallery-3.jpg",
    },
    {
      title: "Warm Atmosphere",
      category: "Moments",
      description:
        "A modern, welcoming space for birthdays, soft dates, catch-ups, and memorable visits.",
      image: "/images/mikos-gallery-4.jpg",
    },
    {
      title: "Celebration Cakes",
      category: "Cakes",
      description:
        "Elegant cakes and sweet creations designed for milestones, celebrations, and special orders.",
      image: "/images/mikos-gallery-5.jpg",
    },
    {
      title: "Signature Presentation",
      category: "Experience",
      description:
        "From plating to color and detail, Mikos is built to feel memorable before the first taste.",
      image: "/images/mikos-gallery-6.jpg",
    },
  ];

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const activeSlide = gallerySlides[activeGalleryIndex];

  const previewSlides = useMemo(() => {
    return [
      gallerySlides[(activeGalleryIndex + 1) % gallerySlides.length],
      gallerySlides[(activeGalleryIndex + 2) % gallerySlides.length],
      gallerySlides[(activeGalleryIndex + 3) % gallerySlides.length],
    ];
  }, [activeGalleryIndex, gallerySlides]);

  const goToPrevGallery = () => {
    setActiveGalleryIndex((prev) =>
      prev === 0 ? gallerySlides.length - 1 : prev - 1
    );
  };

  const goToNextGallery = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];
  const textBlockVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };
  
  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 26,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (menuOpen) return;
  
      if (currentScrollY < 40) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
  
      lastScrollY.current = currentScrollY;
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fffaf8] text-[#2f2323]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute left-[-6%] top-[4%] h-112 w-md rounded-full bg-[#f8d4df]/40 blur-[110px] animate-float-slow" />
        <div className="absolute right-[2%] top-[10%] h-96 w-[24rem] rounded-full bg-[#f5bfd0]/32 blur-[100px] animate-float-medium" />
        <div className="absolute left-[8%] bottom-[8%] h-88 w-88 rounded-full bg-[#ffdbe8]/30 blur-[100px] animate-float-soft" />
        <div className="absolute right-[10%] bottom-[14%] h-80 w-[20rem] rounded-full bg-[#f9d8e2]/26 blur-[95px] animate-float-slow" />
        <div className="absolute left-[38%] top-[22%] h-72 w-[18rem] rounded-full bg-[#f7c7d5]/18 blur-[90px] animate-float-medium" />
        <div className="absolute right-[34%] bottom-[26%] h-64 w-[16rem] rounded-full bg-[#f4dbe4]/18 blur-[85px] animate-float-soft" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,210,223,0.28),transparent_26%),radial-gradient(circle_at_82%_24%,rgba(245,190,208,0.22),transparent_24%),radial-gradient(circle_at_58%_78%,rgba(255,221,232,0.20),transparent_22%),radial-gradient(circle_at_34%_58%,rgba(247,199,213,0.12),transparent_18%)] animate-shimmer-pulse" />

        <Sparkle className="left-[8%] top-[12%]" delay={0.4} size="md" />
        <Sparkle className="left-[24%] top-[30%]" delay={1.2} size="sm" />
        <Sparkle className="left-[14%] bottom-[18%]" delay={2.2} size="sm" />
        <Sparkle className="right-[14%] top-[18%]" delay={1.8} size="lg" />
        <Sparkle className="right-[8%] top-[44%]" delay={0.9} size="md" />
        <Sparkle className="right-[22%] bottom-[12%]" delay={1.5} size="md" />
        <Sparkle className="left-[46%] top-[14%]" delay={2.4} size="sm" />
        <Sparkle className="right-[42%] bottom-[22%]" delay={1.1} size="sm" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <AnimatePresence>
          {showNavbar && (
            <motion.header
              initial={{ y: -110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -110, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-0 z-50 bg-[#fffaf8]/92 backdrop-blur-md"
            >
              <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
                <Link href="#home" className="flex items-center">
                  <Image
                    src="/images/mikos-logoo.png"
                    alt="Mikos"
                    width={220}
                    height={90}
                    className="h-16 w-auto object-contain mix-blend-multiply"
                    priority
                  />
                </Link>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMenuOpen(true)}
                    className="rounded-full border border-[#d9b2bc] px-5 py-2.5 text-sm font-medium transition hover:bg-[#f9e8ed]"
                  >
                    Menu
                  </button>

                  <a
                    href="#contact"
                    className="rounded-full bg-[#d97c93] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Visit Mikos
                  </a>
                </div>
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Fullscreen Overlay Menu */}
        <div
          className={`fixed inset-0 z-100 transition-all duration-300 ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-[#fdf1f4]/95 backdrop-blur-md" />

          <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 md:px-8">
            <div className="flex items-center justify-between border-b border-[#ead0d7] pb-5">
              <span className="text-2xl font-semibold text-[#d97c93]">
                Mikos
              </span>

              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[#d9b2bc] px-5 py-2.5 text-sm font-medium transition hover:bg-white"
              >
                Close
              </button>
            </div>

            <div className="grid flex-1 gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="w-fit text-4xl leading-tight transition hover:text-[#d97c93] md:text-6xl"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-[#2f2323] px-6 py-3 text-center text-white transition hover:opacity-90"
                  >
                    Find Us
                  </a>

                  <a
                    href="#menu"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-[#d9b2bc] px-6 py-3 text-center transition hover:bg-white"
                  >
                    Explore Food
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:content-center">
                {[
                  {
                    title: "Meals",
                    text: "Comfort plates with a polished Mikos touch.",
                    color: "bg-[#f6d4dc]",
                  },
                  {
                    title: "Drinks",
                    text: "Refreshing, bright, and visually memorable.",
                    color: "bg-[#efe1d1]",
                  },
                  {
                    title: "Cakes",
                    text: "Elegant celebration cakes and slices.",
                    color: "bg-[#dbe7db]",
                  },
                  {
                    title: "Desserts",
                    text: "Sweet treats made for cravings and camera moments.",
                    color: "bg-[#f2ccd7]",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`min-h-[180px] rounded-4xl p-6 ${item.color}`}
                  >
                    <p className="text-2xl font-semibold">{item.title}</p>
                    <p className="mt-3 max-w-[18rem] text-sm leading-7 text-[#6b5559]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section
          id="home"
          className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:py-24"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <GlowOrb className="left-[0%] top-[2%] h-80 w-[20rem] bg-[#f8d4df]/40" />
            <GlowOrb className="right-[4%] top-[8%] h-88 w-88 bg-[#f5bfd0]/32" />
            <GlowOrb className="left-[18%] bottom-[4%] h-72 w-[18rem] bg-[#ffdbe8]/28" />
            <GlowOrb className="right-[22%] bottom-[10%] h-56 w-56 bg-[#f7c7d5]/18" />
            <SectionSparkles />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55 },
                  },
                }}
                className="mb-4 text-sm uppercase tracking-[0.28em] text-[#c88998]"
              >
                Restaurant & Dessert Parlor
              </motion.p>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7 },
                  },
                }}
                className="max-w-2xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Meals, desserts, and moments worth coming back for.
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65 },
                  },
                }}
                className="mt-6 max-w-xl text-base leading-8 text-[#6b5559] md:text-lg"
              >
                A warm, modern spot for delicious meals, beautiful cakes,
                refreshing drinks, and sweet treats served in a space people
                love to remember.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65 },
                  },
                }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#menu"
                  className="rounded-full bg-[#2f2323] px-6 py-3 text-center text-white transition hover:opacity-90"
                >
                  View Menu
                </a>
                <a
                  href="#gallery"
                  className="rounded-full border border-[#d9b2bc] px-6 py-3 text-center transition hover:bg-[#f9e8ed]"
                >
                  Explore Gallery
                </a>
              </motion.div>
            </motion.div>

            <div className="relative">
              <div className="pointer-events-none absolute -left-6 top-10 h-36 w-36 rounded-full bg-[#f4c7d2]/40 blur-3xl" />
              <div className="pointer-events-none absolute -right-2 bottom-4 h-40 w-40 rounded-full bg-[#dbe9dc]/50 blur-3xl" />

              <motion.div
                variants={heroContainerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-4"
              >
                {heroImages.map((image, index) => (
                  <motion.div
                    key={image.src}
                    variants={heroCardVariants}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      y: {
                        duration: image.floatDuration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: index * 0.2,
                      },
                    }}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.25 },
                    }}
                    className={`group relative overflow-hidden rounded-4xl ${image.bg} shadow-[0_14px_40px_rgba(47,35,35,0.08)]`}
                  >
                    <div className={`relative w-full ${image.height}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        priority={index < 2}
                      />
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#2f2323]/30 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium tracking-wide text-[#2f2323] backdrop-blur-sm">
                        {image.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Menu Preview */}
        <section id="menu" className="bg-[#fdf1f4] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <motion.div
                className="max-w-2xl"
                variants={textBlockVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.p
                  variants={textRevealVariants}
                  className="text-sm uppercase tracking-[0.28em] text-[#c88998]"
                >
                  Our Menu
                </motion.p>

                <motion.h2
                  variants={textRevealVariants}
                  className="mt-3 text-3xl font-semibold md:text-5xl"
                >
                  A menu worth taking your time with
                </motion.h2>

                <motion.p
                  variants={textRevealVariants}
                  className="mt-4 text-base leading-8 text-[#6b5559] md:text-lg"
                >
                  From satisfying meals to refreshing drinks, cakes, and sweet
                  treats, Mikos brings together comfort, presentation, and
                  flavor in one menu experience.
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-col gap-3 sm:flex-row"
                variants={textBlockVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.a
                  variants={textRevealVariants}
                  href="/menu/mikos-full-menu.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#2f2323] px-6 py-3 text-center text-white transition hover:opacity-90"
                >
                  Open Full Menu
                </motion.a>

                <motion.a
                  variants={textRevealVariants}
                  href="/menu/mikos-full-menu.pdf"
                  download
                  className="rounded-full border border-[#d9b2bc] px-6 py-3 text-center transition hover:bg-[#f9e8ed]"
                >
                  Download Menu
                </motion.a>
              </motion.div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Meals",
                  image: "/menu/menu-preview-1.jpg",
                },
                {
                  title: "Drinks",
                  image: "/menu/menu-preview-2.jpg",
                },
                {
                  title: "Desserts & Cakes",
                  image: "/menu/menu-preview-3.jpg",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group overflow-hidden rounded-4xl border border-[#f0d7de] bg-white shadow-sm"
                >
                  <div className="relative">
                    <div
                      className="h-[280px] w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.03] sm:h-[340px] md:h-[420px]"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#2f2323]/45 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-2xl font-semibold text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-3xl bg-[#fdf1f4] p-6 md:p-8"
            >
              <p className="text-sm leading-7 text-[#6b5559] md:text-base">
                Prefer the full version? Open the complete Mikos menu as a PDF
                for a better view of all items, categories, and pricing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="relative overflow-hidden bg-[#fdf1f4] px-6 py-24 md:py-28"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <GlowOrb className="left-[2%] top-[8%] h-72 w-[18rem] bg-[#f7ccd8]/36" />
            <GlowOrb className="right-[8%] bottom-[6%] h-80 w-[20rem] bg-[#f4c1d1]/28" />
            <GlowOrb className="left-[30%] bottom-[14%] h-56 w-56 bg-[#ffdbe8]/18" />
            <GlowOrb className="right-[28%] top-[16%] h-48 w-48 bg-[#f6d4dc]/18" />

            <Sparkle className="left-[10%] top-[18%]" delay={0.6} size="sm" />
            <Sparkle className="right-[14%] top-[24%]" delay={1.6} size="md" />
            <Sparkle className="left-[24%] bottom-[20%]" delay={2.2} size="sm" />
            <Sparkle className="right-[24%] bottom-[12%]" delay={1.1} size="sm" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#f6d4dc] blur-2xl opacity-70" />
              <div className="absolute -bottom-6 right-10 h-28 w-28 rounded-full bg-[#f3e8dc] blur-2xl opacity-70" />

              <div className="relative overflow-hidden rounded-[2.25rem] bg-white shadow-[0_20px_60px_rgba(47,35,35,0.08)] ring-1 ring-[#efd8de]">
                <video
                  className="h-[460px] w-full object-cover"
                  src="/videos/mikos-about.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-5 left-5 rounded-2xl border border-white/40 bg-white/85 px-4 py-3 backdrop-blur-md"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[#c88998]">
                    Mikos Atmosphere
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#2f2323]">
                    Warm meals • Sweet moments
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="max-w-xl"
              variants={textBlockVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.p
                variants={textRevealVariants}
                className="text-sm uppercase tracking-[0.28em] text-[#c88998]"
              >
                About Mikos
              </motion.p>

              <motion.h2
                variants={textRevealVariants}
                className="mt-4 text-4xl leading-[1.05] md:text-6xl"
              >
                A place where flavor, comfort, and atmosphere meet
              </motion.h2>

              <motion.p
                variants={textRevealVariants}
                className="mt-6 text-lg leading-8 text-[#6b5559]"
              >
                Mikos is designed for people who want more than just a meal. It
                is for birthdays, soft dates, coffee catch-ups, dessert runs,
                and the kind of food moments you want to post before you even
                take the first bite.
              </motion.p>

              <motion.p
                variants={textRevealVariants}
                className="mt-5 text-base leading-8 text-[#6b5559]"
              >
                From hearty meals to cakes, drinks, and sweet treats, the
                experience is meant to feel warm, polished, and memorable.
              </motion.p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-3xl border border-[#efd8de] bg-white/70 p-5 backdrop-blur-sm"
                >
                  <p className="text-sm uppercase tracking-[0.18em] text-[#c88998]">
                    Experience
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#6b5559]">
                    A stylish dine-in setting shaped around comfort, desserts,
                    and shareable moments.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-3xl border border-[#efd8de] bg-white/70 p-5 backdrop-blur-sm"
                >
                  <p className="text-sm uppercase tracking-[0.18em] text-[#c88998]">
                    Signature Feel
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#6b5559]">
                    Soft pink branding, memorable plating, warm hospitality, and
                    a modern social atmosphere.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured */}
        <section className="relative overflow-hidden bg-[#fff9fa] px-6 pt-20 pb-24 md:pt-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#fdf1f4] to-[#fff9fa]" />

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <GlowOrb className="left-[4%] top-[8%] h-72 w-[18rem] bg-[#f8d4df]/30" />
            <GlowOrb className="right-[6%] top-[16%] h-64 w-[16rem] bg-[#f5bfd0]/22" />
            <GlowOrb className="left-[18%] bottom-[10%] h-56 w-56 bg-[#ffdbe8]/22" />
            <GlowOrb className="right-[18%] bottom-[8%] h-72 w-[18rem] bg-[#f9d8e2]/20" />
            <GlowOrb className="left-[42%] top-[20%] h-48 w-48 bg-[#f7c7d5]/14" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(249,210,223,0.16),transparent_22%),radial-gradient(circle_at_82%_20%,rgba(245,190,208,0.14),transparent_20%),radial-gradient(circle_at_52%_78%,rgba(255,221,232,0.12),transparent_22%)]" />

            <Sparkle className="left-[10%] top-[20%]" delay={0.4} size="sm" />
            <Sparkle className="right-[14%] top-[24%]" delay={1.3} size="md" />
            <Sparkle className="left-[26%] bottom-[18%]" delay={2.1} size="sm" />
            <Sparkle className="right-[22%] bottom-[14%]" delay={1.1} size="sm" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <motion.div
                variants={textBlockVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.p
                  variants={textRevealVariants}
                  className="text-sm uppercase tracking-[0.28em] text-[#c88998]"
                >
                  Featured Picks
                </motion.p>

                <motion.h2
                  variants={textRevealVariants}
                  className="mt-3 text-3xl font-semibold md:text-5xl"
                >
                  Signature favorites from Mikos
                </motion.h2>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                href="#contact"
                className="text-sm font-medium text-[#d97c93]"
              >
                Visit us →
              </motion.a>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 36, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative"
                >
                  <div className="pointer-events-none absolute -inset-2 rounded-[2.2rem] bg-linear-to-br from-[#f7d6df]/40 via-transparent to-[#f3e6dc]/40 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

                  <div className="relative overflow-hidden rounded-4xl border border-[#efd6dd] bg-[#fff7f8]/70 shadow-[0_16px_45px_rgba(47,35,35,0.08)] backdrop-blur-sm transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_24px_60px_rgba(47,35,35,0.14)]">
                    <div className="relative h-80 overflow-hidden">
                      <div
                        className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-[#2f2323]/45 via-[#2f2323]/8 to-transparent" />

                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.18 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute left-5 top-5"
                      >
                        <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md">
                          Mikos Pick
                        </span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.65,
                          delay: 0.24 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute bottom-5 left-5 right-5"
                      >
                        <h3 className="max-w-56 text-2xl font-semibold leading-tight text-white drop-shadow-sm">
                          {item.title}
                        </h3>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.3 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative p-6"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="h-[2px] w-12 rounded-full bg-[#d97c93]" />
                        <span className="text-xs uppercase tracking-[0.22em] text-[#c88998]">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="text-sm leading-7 text-[#6b5559]">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section
          id="gallery"
          className="relative overflow-hidden bg-[#fffaf8] px-6 py-24 md:py-28"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <GlowOrb className="left-[4%] top-[8%] h-88 w-88 bg-[#f8d4df]/36" />
            <GlowOrb className="right-[6%] top-[16%] h-80 w-[20rem] bg-[#f5bfd0]/28" />
            <GlowOrb className="left-[16%] bottom-[6%] h-64 w-[16rem] bg-[#ffdbe8]/24" />
            <GlowOrb className="right-[12%] bottom-[10%] h-80 w-[20rem] bg-[#f9d8e2]/24" />
            <GlowOrb className="left-[44%] top-[24%] h-48 w-48 bg-[#f7c7d5]/14" />

            <Sparkle className="left-[12%] top-[18%]" delay={0.5} size="sm" />
            <Sparkle className="right-[18%] top-[20%]" delay={1.4} size="md" />
            <Sparkle className="left-[28%] bottom-[16%]" delay={2} size="sm" />
            <Sparkle className="right-[10%] bottom-[18%]" delay={1.1} size="md" />
            <Sparkle className="left-[48%] top-[12%]" delay={2.4} size="sm" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              className="mb-12 text-center"
              variants={textBlockVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.p
                variants={textRevealVariants}
                className="text-sm uppercase tracking-[0.28em] text-[#c88998]"
              >
                Gallery
              </motion.p>

              <motion.h2
                variants={textRevealVariants}
                className="mt-3 text-3xl font-semibold md:text-5xl"
              >
                The Mikos look and feel
              </motion.h2>

              <motion.p
                variants={textRevealVariants}
                className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6b5559] md:text-lg"
              >
                Explore Mikos through meals, desserts, drinks, cakes, and the
                moments that make the space feel memorable.
              </motion.p>
            </motion.div>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, x: -36, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-[780px]"
              >
                <div className="relative h-[520px] sm:h-[580px]">
                  {previewSlides
                    .slice()
                    .reverse()
                    .map((slide, index) => {
                      const stackLevel = previewSlides.length - index;
                      const isTopPreview = stackLevel === 1;

                      return (
                        <motion.button
                          key={`${slide.image}-${index}`}
                          type="button"
                          initial={{ opacity: 0, x: -20, y: 20, scale: 0.96 }}
                          whileInView={{ opacity: 0.92, x: 0, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          onClick={() =>
                            setActiveGalleryIndex(
                              gallerySlides.findIndex(
                                (item) => item.image === slide.image
                              )
                            )
                          }
                          className={`absolute left-0 top-0 h-full w-[82%] overflow-hidden rounded-4xl border border-[#d9b2bc] bg-[#f8efe9] text-left shadow-[0_10px_35px_rgba(47,35,35,0.08)] transition duration-300 ${
                            isTopPreview ? "hover:-translate-x-1" : ""
                          }`}
                          style={{
                            transform: `translateX(${
                              -32 * stackLevel
                            }px) translateY(${20 * stackLevel}px) scale(${
                              1 - stackLevel * 0.02
                            })`,
                            zIndex: stackLevel,
                          }}
                          aria-label={`Open ${slide.title}`}
                        >
                          <div className="relative h-full w-full">
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 45vw"
                            />
                          </div>
                          <div className="absolute inset-0 bg-linear-to-t from-[#2f2323]/20 via-transparent to-transparent" />
                        </motion.button>
                      );
                    })}

                  <motion.div
                    key={activeSlide.image}
                    initial={{ opacity: 0, x: 24, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-0 z-20 h-full w-[88%] overflow-hidden rounded-4xl border border-[#d9b2bc] bg-[#f8efe9] shadow-[0_18px_55px_rgba(47,35,35,0.12)]"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={activeSlide.image}
                        alt={activeSlide.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority
                      />
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-[#2f2323]/20 via-transparent to-transparent" />

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute right-6 top-5 rounded-full bg-[#fffaf8]/90 px-4 py-1 text-sm font-medium text-[#d97c93] backdrop-blur-sm"
                    >
                      Mikos
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex items-center justify-center gap-3"
                >
                  <button
                    type="button"
                    onClick={goToPrevGallery}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d9b2bc] text-[#d97c93] transition hover:bg-[#f9e8ed]"
                    aria-label="Previous gallery image"
                  >
                    <span className="text-2xl leading-none">←</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextGallery}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d9b2bc] text-[#d97c93] transition hover:bg-[#f9e8ed]"
                    aria-label="Next gallery image"
                  >
                    <span className="text-2xl leading-none">→</span>
                  </button>
                </motion.div>
              </motion.div>

              <motion.div
                key={activeSlide.title}
                initial={{ opacity: 0, x: 28, y: 18 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-xl text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 flex justify-center lg:justify-start"
                >
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#d9b2bc] text-[#d97c93]">
                    <div className="text-center">
                      <p className="text-sm uppercase tracking-[0.22em]">
                        {activeSlide.category}
                      </p>
                      <p className="mt-2 text-2xl font-semibold">Mikos</p>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm uppercase tracking-[0.28em] text-[#c88998]"
                >
                  {activeSlide.category}
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-3xl font-semibold uppercase leading-tight text-[#d97c93] md:text-5xl"
                >
                  {activeSlide.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 text-base leading-8 text-[#6b5559] md:text-lg"
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
                >
                  {gallerySlides.map((slide, index) => {
                    const isActive = index === activeGalleryIndex;

                    return (
                      <button
                        key={slide.image}
                        type="button"
                        onClick={() => setActiveGalleryIndex(index)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-[#d97c93] text-white"
                            : "border border-[#d9b2bc] text-[#6b5559] hover:bg-[#f9e8ed]"
                        }`}
                      >
                        {slide.category}
                      </button>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-24">
          <div className="mx-auto max-w-7xl rounded-4xl bg-[#2f2323] px-8 py-16 text-white md:px-14">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/60">
                  Visit Mikos
                </p>
                <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
                  Come for the food. Stay for the vibe.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-white/75">
                  A warm destination for beautiful desserts, satisfying meals,
                  refreshing drinks, and moments worth sharing.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">Opening Hours</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Tue – Sun
                    <br />
                    
                  </p>
                </div>

                <div className="rounded-3xl bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                  <a href="https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=salim+armour+road+blantyre%2C+Blantyre%2C+Malawi%2C+265&FORM=FBKPL1&mkt=en-US" target="_blank" rel="noopener noreferrer">Salim Armour Road, Blantyre, Malawi</a>
                  </p>
                </div>

                <div className="rounded-3xl bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">Contact</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                  +265 888 24 94 63
                  </p>
                </div>

                <div className="rounded-3xl bg-white/5 p-6">
                <h3 className="text-lg font-semibold">Instagram</h3>
                <a
                  href="https://www.instagram.com/mikos_bt/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block text-sm leading-7 text-white/70 transition hover:text-white"
                >
                  @mikos_bt
                </a>
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}