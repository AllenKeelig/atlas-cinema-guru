"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Heart, Clock, Activity } from "lucide-react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`h-screen bg-teal-700 text-white flex flex-col transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col mt-6 px-2">
        <nav className="flex flex-col gap-4">
          <SidebarLink href="/" label="Home" icon={<Home size={22} />} expanded={expanded} />
          <SidebarLink href="/favorites" label="Favorites" icon={<Heart size={22} />} expanded={expanded} />
          <SidebarLink href="/watch-later" label="Watch Later" icon={<Clock size={22} />} expanded={expanded} />
        </nav>

        {/* Moved "Recent Activity" directly below navigation */}
        {expanded && (
          <div className="mt-6 p-3 border-t border-white/20 text-sm opacity-90">
            <p className="font-semibold mb-2">Recent Activity</p>
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

function SidebarLink({
  href,
  label,
  icon,
  expanded,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  expanded: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
    >
      {icon}
      {expanded && <span>{label}</span>}
    </Link>
  );
}
