import { motion } from "framer-motion";
import Image from "next/image";
import { Song } from "@/data/spotify";
import Link from "next/link";
import { Play } from "lucide-react";

export function SpotifyCard({ song }: { song: Song }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-4 rounded-xl shadow-sm border border-light-gray group flex flex-col items-center text-center"
    >
      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
        <Image
          src={song.albumArt}
          alt={song.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-matcha/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-3 bg-white rounded-full text-matcha shadow-lg">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </div>
      <Link 
        href={song.url} 
        target="_blank"
        className="text-sm font-bold text-charcoal hover:text-matcha transition-colors line-clamp-1"
      >
        {song.title}
      </Link>
      <p className="text-xs text-medium-gray line-clamp-1">{song.artist}</p>
    </motion.div>
  );
}
