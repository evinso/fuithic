"use client";

import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  desc?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ label, title, desc, children }: Props) {
  return (
    <div className="border-b border-[#2C2620] bg-[#0D0B09]">
      <div className="container-wide py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {label && (
            <div className="flex items-center gap-3 mb-4">
              <span className="gold-line !mb-0 !w-6" />
              <span className="label-sm text-[#C9A043]">{label}</span>
            </div>
          )}
          <h1 className="heading-lg text-[#EDE8DF] mb-3">{title}</h1>
          {desc && <p className="text-[#9B9189] max-w-2xl leading-relaxed">{desc}</p>}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </div>
  );
}
