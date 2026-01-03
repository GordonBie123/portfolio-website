export interface Song {
  title: string;
  artist: string;
  albumArt: string;
  url: string;
}

export const topTracks: Song[] = [
  {
    title: "Weightless",
    artist: "Marconi Union",
    albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&h=200&auto=format&fit=crop",
    url: "https://spotify.com"
  },
  {
    title: "Midnight City",
    artist: "M83",
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&h=200&auto=format&fit=crop",
    url: "https://spotify.com"
  },
  {
    title: "Experience",
    artist: "Ludovico Einaudi",
    albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&h=200&auto=format&fit=crop",
    url: "https://spotify.com"
  },
  {
    title: "Clair de Lune",
    artist: "Claude Debussy",
    albumArt: "https://images.unsplash.com/photo-1507838596016-a947c6165634?q=80&w=200&h=200&auto=format&fit=crop",
    url: "https://spotify.com"
  }
];
