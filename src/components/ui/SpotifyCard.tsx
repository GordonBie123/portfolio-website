import { motion } from "framer-motion";
import Image from "next/image";
import { Song } from "@/data/spotify";
import { Play } from "lucide-react";

export function SpotifyCard({ song }: { song: Song & { isNowPlaying?: boolean } }) {
  return (
    <motion.a
      href={song.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-xl overflow-hidden border border-light-gray shadow-sm hover:border-matcha/40 transition-all duration-300 block aspect-square"
    >
      <Image
        src={song.albumArt}
        alt={song.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        {song.isNowPlaying && (
          <div className="flex items-center gap-1.5 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 antialiased">
              Live Now
            </span>
          </div>
        )}
        <h4 className="text-xs font-bold truncate pr-4">{song.title}</h4>
        <p className="text-[10px] text-white/70 truncate">{song.artist}</p>
      </div>

      <div className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Play size={10} className="text-white fill-white" />
      </div>
    </motion.a>
  );
}
