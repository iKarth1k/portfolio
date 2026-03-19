"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Plus, ChevronDown } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  color: string;
  github: string;
  demo: string;
}

const featuredProjects: Project[] = [
  {
    id: 0,
    title: "Hashtree.ai",
    category: "AI & ML",
    description:
      "**Problem:** Enterprise knowledge is siloed, making intelligent retrieval difficult.\n**Impact:** Employees waste time searching for documents, and traditional search lacks context-awareness.\n**Solution:** Built a multi-tenant RAG platform using FastAPI and Qdrant. Implemented document ingestion pipelines, vector embeddings, and role-based access control.",
    stack: ["FastAPI", "Qdrant", "LangChain", "Python"],
    image: "/Project_images/hashtree_simple.png",
    color: "#00F0FF",
    github: "https://github.com/iKarth1k",
    demo: "https://github.com/iKarth1k",
  },
  {
    id: 1,
    title: "Chatdocs.ai",
    category: "AI & ML",
    description:
      "**Problem:** Standard document retrieval systems are slow and often inaccurate.\n**Impact:** High latency in AI response times degrades user experience in enterprise applications.\n**Solution:** Developed a document QA system using Qdrant and SBERT embeddings. Optimized GPU-accelerated inference with CUDA and PyTorch, significantly reducing response latency.",
    stack: ["PyTorch", "CUDA", "SBERT", "Qdrant"],
    image: "/Project_images/chatdocs_simple.png",
    color: "#6D28D9",
    github: "https://github.com/iKarth1k",
    demo: "https://github.com/iKarth1k",
  },
  {
    id: 2,
    title: "AI Voice Call Assistant",
    category: "AI & ML",
    description:
      "**Problem:** Automated customer support lines use rigid, frustrating decision trees.\n**Impact:** Customers experience long wait times and poor voice interaction satisfaction.\n**Solution:** Built an AI-powered voice assistant for automated interactions using STT and TTS models. Developed backend services to process voice input and return synthesized speech in real time.",
    stack: ["Python", "STT/TTS", "FastAPI", "NLP"],
    image: "/Project_images/voice_assistant_simple.png",
    color: "#0F172A",
    github: "https://github.com/iKarth1k",
    demo: "https://github.com/iKarth1k",
  },
];

const allProjects: Project[] = [
  // AI Projects
  {
    id: 0,
    title: "Hashtree.ai",
    category: "AI & ML",
    description:
      "**Problem:** Enterprise knowledge is siloed, making intelligent retrieval difficult.\n**Impact:** Employees waste time searching for documents, and traditional search lacks context-awareness.\n**Solution:** Built a multi-tenant RAG platform using FastAPI and Qdrant. Implemented document ingestion pipelines, vector embeddings, and role-based access control.",
    stack: ["FastAPI", "Qdrant", "LangChain", "Python"],
    image: "/Project_images/hashtree_simple.png",
    color: "#00F0FF",
    github: "https://github.com/iKarth1k",
    demo: "https://github.com/iKarth1k",
  },
  {
    id: 1,
    title: "Chatdocs.ai",
    category: "AI & ML",
    description:
      "**Problem:** Standard document retrieval systems are slow and often inaccurate.\n**Impact:** High latency in AI response times degrades user experience in enterprise applications.\n**Solution:** Developed a document QA system using Qdrant and SBERT embeddings. Optimized GPU-accelerated inference with CUDA and PyTorch.",
    stack: ["PyTorch", "CUDA", "SBERT", "Qdrant"],
    image: "/Project_images/chatdocs_simple.png",
    color: "#6D28D9",
    github: "https://github.com/iKarth1k",
    demo: "https://github.com/iKarth1k",
  },
  {
    id: 2,
    title: "AI Voice Call Assistant",
    category: "AI & ML",
    description:
      "**Problem:** Automated customer support lines use rigid, frustrating decision trees.\n**Impact:** Customers experience long wait times and poor voice interaction satisfaction.\n**Solution:** Built an AI-powered voice assistant for automated interactions using STT and TTS models.",
    stack: ["Python", "STT/TTS", "FastAPI", "NLP"],
    image: "/Project_images/voice_assistant_simple.png",
    color: "#0F172A",
    github: "https://github.com/iKarth1k",
    demo: "https://github.com/iKarth1k",
  },

];

// Shuffle Text Effect Component
function ShuffleText({
  text,
  isActive,
  className,
}: {
  text: string;
  isActive: boolean;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (frame > index) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      frame += 1;
      if (frame > text.length + 5) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return <span className={className}>{displayText}</span>;
}

function ProjectRow({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll logic removed as per user request to "let it be like before"
  }, []);

  return (
    <div className="border-b border-white/5" ref={rowRef}>
      {/* Row Header */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
        className={`
          group relative py-8 px-4 cursor-pointer transition-all duration-300
          ${isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}
        `}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <span
              className={`font-mono transition-colors text-sm whitespace-nowrap ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}
            >
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>

            <h3
              className={`font-bold text-3xl md:text-5xl transition-colors ${isExpanded || isHovered ? "text-white" : "text-slate-400"}`}
            >
              <ShuffleText text={project.title} isActive={isHovered} />
            </h3>
          </div>

          {/* Inline Image Preview (Static, appears on hover) */}
          {/* Inline Image Preview (Static, reserved space) */}
          <div className="hidden md:block w-40 h-24 flex-shrink-0 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-lg overflow-hidden border-2 ${
                project.id === 1
                  ? "border-cyan shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  : project.id === 2
                    ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                    : project.id === 5
                      ? "border-slate-600 shadow-[0_0_20px_rgba(71,85,105,0.25)]"
                      : ""
              }`}
              style={{
                borderColor:
                  project.id === 1 || project.id === 2
                    ? undefined
                    : project.color,
                boxShadow:
                  project.id === 1 || project.id === 2
                    ? undefined
                    : `0 0 20px ${project.color}40`,
              }}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent animate-scan" />
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="hidden md:block font-mono text-cyan/50 tracking-wider text-xs whitespace-nowrap">
              {project.category}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              className={`transition-colors flex-shrink-0 ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}
            >
              <Plus size={24} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-8 pt-4 bg-white/[0.01]">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left: Project Image */}
                <div className="md:col-span-5">
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 relative group bg-black">
                    {/* Noise texture overlay */}
                    <motion.div
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
                        mixBlendMode: "overlay",
                      }}
                    />

                    {/* Main image with smooth multi-stage blur */}
                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      initial={{
                        filter:
                          "blur(60px) brightness(0.4) contrast(1.3) saturate(0.3)",
                        opacity: 0.3,
                      }}
                      animate={{
                        filter: [
                          "blur(60px) brightness(0.4) contrast(1.3) saturate(0.3)",
                          "blur(30px) brightness(0.7) contrast(1.15) saturate(0.7)",
                          "blur(10px) brightness(0.9) contrast(1.05) saturate(0.95)",
                          "blur(0px) brightness(1) contrast(1) saturate(1)",
                        ],
                        opacity: [0.3, 0.6, 0.9, 1],
                      }}
                      transition={{
                        duration: 0.8,
                        times: [0, 0.3, 0.65, 1],
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full h-full object-cover"
                      style={{
                        willChange: "filter, opacity",
                      }}
                    />

                    {/* Scanline overlay */}
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.03) 2px, rgba(0, 240, 255, 0.03) 4px)",
                      }}
                    />

                    {/* Hologram Scanlines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.03)_2px,rgba(0,240,255,0.03)_4px)]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right: Details */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div>
                    <h4 className="text-xs text-cyan uppercase tracking-wider mb-3 font-mono border-b border-cyan/20 pb-2 inline-block">
                      // DOSSIER
                    </h4>
                    <div className="text-sm text-slate-300 leading-relaxed mb-4 space-y-2">
                      {project.description.split("\n").map((line, i) => {
                        const parts = line.split("**");
                        if (parts.length === 3) {
                          return (
                            <p key={i}>
                              <strong className="text-cyan">{parts[1]}</strong>
                              {parts[2]}
                            </p>
                          );
                        }
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
                        // TECHNOLOGY_MATRIX
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] md:text-xs px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-cyan hover:bg-cyan/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium font-mono text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 flex items-center gap-2"
                      >
                        <Github size={16} />
                        Code
                      </a>
                      {project.demo !== "#" ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn px-4 py-2 rounded-lg bg-cyan/5 border border-cyan/20 text-cyan font-medium font-mono text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-cyan hover:text-black hover:border-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2"
                        >
                          Live Demo
                          <ExternalLink
                            size={16}
                            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
                          />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-600 font-medium font-mono text-sm tracking-wide flex items-center gap-2 cursor-not-allowed"
                        >
                          No Demo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Archive Card Component
function ArchiveCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-cyan/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col h-full"
    >
      {/* Card Image */}
      <div className="h-48 w-full relative overflow-hidden bg-black/50">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />

        {/* Overlay Links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-black/50 border border-white/10 rounded-full hover:bg-cyan hover:text-black hover:border-cyan text-slate-200 transition-all duration-300 backdrop-blur-md hover:scale-110"
            title="View Code"
          >
            <Github size={20} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-black/50 border border-white/10 rounded-full hover:bg-cyan hover:text-black hover:border-cyan text-slate-200 transition-all duration-300 backdrop-blur-md hover:scale-110"
            title="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan transition-colors">
            {project.title}
          </h3>
          <span className="text-[10px] font-mono text-cyan/70 border border-cyan/20 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>

        <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Mobile-only buttons */}
        <div className="flex gap-2 mt-3 md:hidden">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-cyan/5 border border-cyan/20 text-cyan text-xs font-semibold px-3 py-2.5 rounded-lg text-center hover:bg-cyan hover:text-black hover:border-cyan transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            Live Demo ↗
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-lg text-center hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <Github size={14} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects({ onViewAll }: { onViewAll: () => void }) {
  const [expandedFeatured, setExpandedFeatured] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [isArchiveTriggerHovered, setIsArchiveTriggerHovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState("HTML/CSS");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [showArchive]);

  const categories = [
    "AI & ML",
    "FULL STACK",
    "PYTHON",
    "REACT",
    "NODE/EXPRESS",
    "TYPESCRIPT",
    "API",
    "JAVASCRIPT",
    "HTML/CSS",
    "PHP & SQL",
  ];

  const filteredProjects = allProjects.filter(
    (p) => p.category === activeFilter,
  );

  return (
    <section
      id="projects"
      className="relative py-32 bg-[#050505] overflow-hidden"
    >
      <motion.div
        className="container mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-cyan/60 text-sm mb-4">
            // FEATURED_PROJECTS
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-300 tracking-tight">
            FEATURED <span className="text-cyan">WORK</span>
          </h2>
        </div>

        {/* Featured Projects List */}
        <div className="space-y-0 mb-4 md:mb-8">
          {featuredProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedFeatured === index}
              onToggle={() => {
                if (expandedFeatured !== index) {
                  setShowArchive(false);
                }
                setExpandedFeatured(expandedFeatured === index ? null : index);
              }}
            />
          ))}
        </div>

        {/* Archive Trigger */}
        <div className="border-b border-white/5 bg-[#050505] relative z-20">
          <div
            onMouseEnter={() => setIsArchiveTriggerHovered(true)}
            onMouseLeave={() => setIsArchiveTriggerHovered(false)}
            onClick={() => {
              if (!showArchive) {
                setExpandedFeatured(null);
              }
              setShowArchive(!showArchive);
            }}
            className={`
              group relative py-4 md:py-8 px-4 cursor-pointer transition-all duration-300
              ${showArchive ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <span
                  className={`font-mono transition-colors text-sm ${showArchive || isArchiveTriggerHovered ? "text-cyan" : "text-slate-600"}`}
                >
                  // ARCHIVE
                </span>
                <span
                  className={`font-bold text-3xl md:text-5xl transition-colors ${showArchive || isArchiveTriggerHovered ? "text-white" : "text-slate-400"}`}
                >
                  <ShuffleText
                    text="VIEW ALL PROJECTS"
                    isActive={isArchiveTriggerHovered}
                  />
                </span>
              </div>
              <motion.div
                animate={{ rotate: showArchive ? 180 : 0 }}
                className={`transition-colors ${showArchive || isArchiveTriggerHovered ? "text-cyan" : "text-slate-600"}`}
              >
                <ChevronDown size={24} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Archive Grid */}
        <AnimatePresence>
          {showArchive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden bg-[#0a0a0a]"
            >
              <div className="px-4 py-6 md:py-12">
                {/* Filter Tabs */}
                <div className="relative mb-8 md:mb-16">
                  <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto no-scrollbar md:flex-wrap gap-3 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`
                          px-5 py-2 md:px-7 md:py-3 rounded-full text-[10px] md:text-xs font-bold font-mono border transition-all duration-300 uppercase tracking-wide whitespace-nowrap flex-shrink-0
                          ${
                            activeFilter === cat
                              ? "bg-cyan text-black border-cyan shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                              : "bg-transparent border-white/10 text-slate-500 hover:border-cyan/50 hover:text-cyan"
                          }
                        `}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Left Scroll Hint */}
                  <AnimatePresence>
                    {canScrollLeft && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-0 top-0 bottom-2 w-8 pointer-events-none md:hidden flex items-center justify-start pl-2"
                      >
                        <motion.div
                          animate={{ x: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <span className="text-cyan font-bold text-xs shadow-black drop-shadow-md">
                            {"<"}
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right Scroll Hint */}
                  <AnimatePresence>
                    {canScrollRight && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 top-0 bottom-2 w-8 pointer-events-none md:hidden flex items-center justify-end pr-2"
                      >
                        <motion.div
                          animate={{ x: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <span className="text-cyan font-bold text-xs shadow-black drop-shadow-md">
                            {">"}
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ArchiveCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-mist/50 font-mono">NO PROJECTS FOUND</p>
                    <p className="text-mist/30 text-sm mt-2">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
