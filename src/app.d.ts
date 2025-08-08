declare global {
  interface Note {
    title: string;
    slug: string;
    summary: string;
    image?: string;
    slug?: string;
    date: string;
    updated: string;
    tags: string[];
  }

  interface NoteTag {
    title: string;
    path: string;
    notes: Note[];
  }

  interface Movie {
    adult: boolean;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    rating?: number | null;
    createdAt: string;
    updatedAt: string;
    mega: boolean;
  }

  interface Show {
    adult: boolean;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    name: string;
    rating?: number | null;
    createdAt: string;
    updatedAt: string;
    mega: boolean;
  }

  interface SpotifySong {
    id: string;
    isTopTrack: boolean;
    name: string;
    artists: [{ name: string; url: string }];
    duration_ms: number;
    url: string;
    image: string;
    release_date: string;
    createdAt: string;
    updatedAt: string;
    super: boolean;
    mega: boolean;
  }

  interface SpotifyAlbum {
    id: string;
    isTopTrack: boolean;
    name: string;
    artists: [{ name: string; url: string }];
    total_tracks: number;
    url: string;
    image: string;
    release_date: string;
    createdAt: string;
    updatedAt: string;
    super: boolean;
    mega: boolean;
  }

  interface SpotifyArtist {
    id: string;
    name: string;
    genres: string[];
    url: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    super: boolean;
    mega: boolean;
  }
}

export {};
