import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { Code2, Layers, Wrench, Database, X, ChevronRight, Check } from "lucide-react";
import contentData from "../data/contentData.json";
import { TechnicalArsenalSection, ArsenalGroup } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = (contentData as any).technicalArsenal as TechnicalArsenalSection;

// Deep Vietnamese expert explanations for each technical category
const categoryExplanations: Record<string, { intro: string; depth: string[]; expertiseLevel: string }> = {
  languages: {
    intro: "Nền tảng tư duy logic lập trình và thuật toán vững chắc, áp dụng trực tiếp vào việc quy hoạch hiệu năng của hệ thống lớn.",
    depth: [
      "Java: Thành thạo lập trình hướng đối tượng (OOP), xử lý đa luồng, tối ưu hóa tác vụ đồng thời và nghiệp vụ cốt lõi phía máy chủ.",
      "JavaScript & TypeScript: Quản trị hoạt động bất đồng bộ, thao tác DOM hiệu suất cao và chuẩn hóa dữ liệu chặt chẽ bằng kiểu dữ liệu tĩnh.",
      "SQL: Thiết kế lược đồ dữ liệu quan hệ chuẩn hóa, cấu trúc chỉ mục tối ưu và viết các câu truy vấn hiệu quả cao.",
      "HTML5/CSS3: Xây dựng cấu trúc giao diện chuẩn SEO, thiết kế Responsive linh hoạt và kết hợp mượt mà với thư viện UI."
    ],
    expertiseLevel: "Lõi Tư Duy & Thuật Toán Hệ Thống"
  },
  frameworks: {
    intro: "Xây dựng các khối kiến trúc toàn phần linh hoạt từ dịch vụ API phía máy chủ đến trải nghiệm ứng dụng Web hiện đại, mượt mà.",
    depth: [
      "Spring Framework: Làm chủ kiến trúc Spring Boot (Spring MVC, DI/IOC, Spring Security bảo mật phân quyền đa lớp và Spring Data JPA).",
      "React (Vite): Xây dựng mô hình ứng dụng Single Page (SPA) nhanh chóng, tối ưu hóa quản lý State, Hook và tái sử dụng Component.",
      "Angular: Triển khai ứng dụng doanh nghiệp có cấu trúc module chặt chẽ, tối ưu luồng dữ liệu phản xạ thông qua RxJS.",
      "Tailwind CSS: Thiết kế giao diện thần tốc nhờ hệ thống lớp tiện ích (utility classes) tối tân, responsive tối ưu trên mọi màn hình."
    ],
    expertiseLevel: "Phát Triển Đa Nền Tảng & RESTful API"
  },
  tools: {
    intro: "Chuyển đổi quy trình thủ công sang tự động hóa chuẩn quy mô, đảm bảo tính nhất quán trên mọi môi trường chạy của ứng dụng.",
    depth: [
      "Git: Quản lý mã nguồn chặt chẽ với Git Flow, làm việc nhóm chuyên nghiệp, kiểm soát phiên bản và giải quyết conflict thông minh.",
      "Docker: Đóng gói cô lập ứng dụng (Containerization), tối giản hóa tài nguyên máy chủ và dễ dàng nhân bản mở rộng phần cứng.",
      "VPS (Ubuntu) / Nginx: Thiết lập cấu hình máy chủ Linux ảo, phân phối ứng dụng, cấu hình Reverse Proxy và xử lý bảo mật cổng mạng.",
      "Antigravity & VS Code: Sử dụng tối đa sức mạnh các công cụ và trình viết mã hàng đầu để nâng cao 10x năng suất phát triển và gỡ lỗi."
    ],
    expertiseLevel: "Tự Động Hóa & DevOps Thực Nghiệm"
  },
  databases: {
    intro: "Mô hình hóa dữ liệu thông minh, duy trì tính toàn vẹn thông tin và cung cấp tốc độ phản hồi tối ưu dưới tải cao.",
    depth: [
      "MySQL: Thiết lập quan hệ liên kết khóa ngoại chặt chẽ, thiết kế Database chuẩn xác và thực thi các thủ tục lưu trữ an toàn.",
      "MongoDB: Quản lý dữ liệu dạng NoSQL linh hoạt, lưu trữ tài liệu đa cấu trúc, mở rộng dữ liệu ngang mượt mà.",
      "Supabase: Tận dụng cơ sở dữ liệu Postgres trên đám mây tích hợp sẵn tính năng xác thực và thời gian thực thế hệ mới."
    ],
    expertiseLevel: "Quản Trị Cơ Sở Dữ Liệu Phân Tán"
  }
};

// Map icon strings to Lucide components with primary cream aesthetic
const iconMap: Record<string, ReactNode> = {
  Code2: <Code2 size={20} className="text-[#DEDBC8]" />,
  Layers: <Layers size={20} className="text-[#DEDBC8]" />,
  Wrench: <Wrench size={20} className="text-[#DEDBC8]" />,
  Database: <Database size={20} className="text-[#DEDBC8]" />
};

export default function Skills() {
  const [selectedGroup, setSelectedGroup] = useState<ArsenalGroup | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto handle escape key to close modal nicely
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGroup(null);
    };
    if (selectedGroup) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedGroup]);

  return (
    <section
      id="skills"
      className="py-24 bg-black px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle fractal noise background */}
      <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none" />

      {/* Background glow ambient highlights */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#DEDBC8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Headers */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase mb-3">
            TECHNICAL ARSENAL // 02
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#E1E0CC] tracking-tight mb-4">
            <WordsPullUp text={data.title} />
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed" style={{ color: "rgba(225, 224, 204, 0.7)" }}>
            {data.subtitle}
          </p>
        </div>

        {/* 4-Column Card Grid with staggered entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#212121]/30 hover:bg-[#212121]/60 border border-white/5 hover:border-[#DEDBC8]/20 rounded-2xl p-6 transition-all duration-300 flex flex-col items-start text-left liquid-glass"
            >
              {/* Box Heading */}
              <div className="flex items-center gap-2 mb-4 text-slate-200">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 group-hover:bg-[#DEDBC8]/10 group-hover:border-[#DEDBC8]/30 transition-all">
                  {iconMap[group.icon] || <Code2 size={16} />}
                </div>
                <h3 className="font-sans font-semibold text-white text-base tracking-wide group-hover:text-[#DEDBC8] transition-colors">
                  {group.title}
                </h3>
              </div>

              {/* Tag Pills Container */}
              <div className="flex flex-wrap gap-2 w-full mb-6">
                {group.items.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05, borderColor: "rgba(222, 219, 200, 0.4)", color: "#ffffff" }}
                    className="font-mono text-xs text-gray-300 bg-black/40 border border-white/5 hover:border-[#DEDBC8]/40 px-3 py-1.5 rounded-xl cursor-default transition-all duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Click to inspect detailed popup */}
              <button
                onClick={() => setSelectedGroup(group)}
                className="font-mono text-[10px] tracking-wider text-[#DEDBC8]/70 hover:text-white transition-colors duration-250 cursor-pointer mt-auto flex items-center gap-1 group/btn"
              >
                VIEW DETAIL // <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Elegant AnimatePresence Popup Details Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedGroup && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              
              {/* Backdrop Layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGroup(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
              />

              {/* Content Centered Container card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-2xl bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-10 overflow-hidden liquid-glass shadow-2xl z-10 text-left"
              >
                {/* Subtle noise in about card too */}
                <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

                {/* Glowing decorative light source */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#DEDBC8]/5 blur-[70px] rounded-full pointer-events-none" />

                {/* Exit absolute handler button */}
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#DEDBC8] hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Header Title with Custom Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#DEDBC8]/10 rounded-2xl border border-[#DEDBC8]/20 flex items-center justify-center">
                    {iconMap[selectedGroup.icon]}
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8]/70 uppercase block mb-1">
                      {categoryExplanations[selectedGroup.id]?.expertiseLevel || "TECHNICAL COMPETENCY"}
                    </span>
                    <h3 className="font-sans font-bold text-white text-xl sm:text-2xl leading-tight">
                      {selectedGroup.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5 relative z-10">
                  {/* Paragraph intro description */}
                  <p className="font-sans text-gray-300 text-sm leading-relaxed" style={{ color: "rgba(225, 224, 204, 0.85)" }}>
                    {categoryExplanations[selectedGroup.id]?.intro}
                  </p>

                  {/* Subskill bullet points */}
                  <div className="space-y-3.5">
                    <h4 className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase mb-2">
                      CORE SPECIALIZATION METRICS :
                    </h4>
                    {categoryExplanations[selectedGroup.id]?.depth.map((d, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded bg-[#DEDBC8]/10 border border-[#DEDBC8]/30 text-[#DEDBC8] mt-0.5 shrink-0">
                          <Check size={12} />
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {d}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tags bottom badge footer list */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {selectedGroup.items.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] sm:text-xs text-[#E1E0CC] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
