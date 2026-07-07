import { CategorySlug } from "@/lib/types";
import { categoryBases } from "@/lib/data/base";

// Heuristic keyword -> emoji suggestions, scoped per category so the same
// word (e.g. "bottle") can't pick the wrong emoji across unrelated
// categories. Always just a starting suggestion — the Emoji field stays a
// plain editable text input, so admins can override it any time.
const CATEGORY_EMOJI_RULES: Record<CategorySlug, Array<{ pattern: RegExp; emoji: string }>> = {
  "korean-food": [
    { pattern: /buldak|hot chicken|spicy/i, emoji: "🌶️" },
    { pattern: /ramen|ramyun|noodle/i, emoji: "🍜" },
    { pattern: /chicken/i, emoji: "🍗" },
    { pattern: /chocolate|choco/i, emoji: "🍫" },
    { pattern: /seaweed|gim|nori/i, emoji: "🌿" },
    { pattern: /shake|smoothie|meal replacement|protein drink/i, emoji: "🥤" },
    { pattern: /kimchi/i, emoji: "🥬" },
    { pattern: /rice cake|tteok/i, emoji: "🍡" },
    { pattern: /candy|gummy|jelly/i, emoji: "🍬" },
    { pattern: /cookie|biscuit/i, emoji: "🍪" },
    { pattern: /chip|snack/i, emoji: "🍿" },
    { pattern: /honey/i, emoji: "🍯" },
    { pattern: /coffee/i, emoji: "☕" },
    { pattern: /green tea|\btea\b/i, emoji: "🍵" },
    { pattern: /strawberry/i, emoji: "🍓" },
  ],
  "k-beauty": [
    { pattern: /snail/i, emoji: "🐌" },
    { pattern: /sunscreen|spf/i, emoji: "☀️" },
    { pattern: /sheet mask|\bmask\b/i, emoji: "🎭" },
    { pattern: /cleanser|cleansing|foam/i, emoji: "🫧" },
    { pattern: /toner/i, emoji: "💧" },
    { pattern: /lipstick|lip tint|lip balm/i, emoji: "💄" },
    { pattern: /cica|centella/i, emoji: "🌱" },
    { pattern: /green tea/i, emoji: "🍵" },
    { pattern: /serum|essence|ampoule/i, emoji: "✨" },
    { pattern: /cream|moistur/i, emoji: "🧴" },
  ],
  "baby-kids": [
    { pattern: /diaper/i, emoji: "👶" },
    { pattern: /wipe/i, emoji: "🧴" },
    { pattern: /strawberry/i, emoji: "🍓" },
    { pattern: /lotion/i, emoji: "🧴" },
    { pattern: /food storage|container/i, emoji: "🥣" },
    { pattern: /bottle|feeding|pacifier/i, emoji: "🍼" },
    { pattern: /\btoy\b/i, emoji: "🧸" },
  ],
  "ipx-goods": [
    { pattern: /plush|doll/i, emoji: "🧸" },
    { pattern: /sticker/i, emoji: "🏷️" },
    { pattern: /tumbler|\bcup\b|mug|bottle/i, emoji: "🥤" },
    { pattern: /keychain|keyring/i, emoji: "🔑" },
    { pattern: /cushion|pillow/i, emoji: "🛋️" },
    { pattern: /figure|figurine/i, emoji: "🎎" },
  ],
};

export function pickEmoji(text: string, category: CategorySlug): string {
  const rules = CATEGORY_EMOJI_RULES[category] ?? [];
  for (const rule of rules) {
    if (rule.pattern.test(text)) return rule.emoji;
  }
  return categoryBases.find((c) => c.slug === category)?.emoji ?? "📦";
}
