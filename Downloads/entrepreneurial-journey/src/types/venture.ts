export interface Venture {
  id: string;
  title: string; // Lesson title
  ventureName: string;
  yearLaunched: number;
  yearClosed?: number;
  backgroundStory: string;
  tractionAchieved: string;
  autopsy: string; // Why it failed
  lessonsGained: string[];
  animation?: string; // Animation identifier
  views: number;
  reactions: VentureReactions;
  productLink?: string;
  isActive?: boolean;
}

export interface VentureReactions {
  heart: number; // Inspired
  sad: number; // Sad
  laugh: number; // Funny
  surprise: number; // Surprised
  angry: number; // Frustrated
  thinking: number; // Thought-provoking
}

export interface EmojiReaction {
  emoji: string;
  label: string;
  count: number;
  percentage: number;
}

export type ReactionType = 'heart' | 'sad' | 'laugh' | 'surprise' | 'angry' | 'thinking';
