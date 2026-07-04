import { CategoryContent, ProductContent, PostContent, CategorySlug } from "@/lib/types";

export const categories: Record<CategorySlug, CategoryContent> = {
  "korean-food": {
    name: "Korean Food",
    description:
      "Ramyun, snacks, and pantry staples from Korea — spotted on Amazon and worth adding to your cart.",
  },
  "k-beauty": {
    name: "K-Beauty",
    description: "Skincare and cosmetics from trusted Korean beauty brands, all available on Amazon.",
  },
  "baby-kids": {
    name: "Baby & Kids",
    description: "Korean baby care essentials parents keep coming back to, sold on Amazon.",
  },
  "ipx-goods": {
    name: "BT21 & IPX Goods",
    description: "BT21 and other IPX character merchandise, from plush toys to everyday accessories.",
  },
};

export const products: Record<string, ProductContent> = {
  "shin-ramyun-multipack": {
    name: "Shin Ramyun Multipack",
    brand: "Nongshim",
    summary: "Korea's most iconic ramyun, in a multipack that's cheaper per serving.",
    description:
      "A spicy beef-broth ramyun with chewy noodles that's been a household staple in Korea for decades. Buying the multipack instead of single packs brings the per-serving cost down noticeably, which matters if you're restocking regularly.",
    highlights: [
      "Bold, spicy beef-broth flavor",
      "Multipack lowers the cost per serving versus buying singles",
      "Just needs a pot — no microwave required",
    ],
  },
  "buldak-hot-chicken-noodle": {
    name: "Buldak Hot Chicken Noodles",
    brand: "Samyang",
    summary: "The original fire noodles behind the viral spicy-noodle challenge.",
    description:
      "The noodle that launched a thousand YouTube challenge videos. If you or someone you know likes extreme spice, this is the benchmark. Beyond the original, look out for Carbonara and Jjajang variants, which are milder and worth comparing on price per pack.",
    highlights: [
      "The noodle behind the viral spice challenge",
      "Carbonara and Jjajang variants available at different price points",
      "Stir-fry style, no broth",
    ],
  },
  "orion-choco-pie": {
    name: "Orion Choco Pie",
    brand: "Orion",
    summary: "Soft marshmallow sandwiched in chocolate-coated cake — a Korean snack classic.",
    description:
      "Two soft cake layers, a marshmallow center, and a chocolate coating. It's a snack-aisle staple in Korea and travels well, which is why boxes show up often at good per-unit prices on Amazon. Good for stocking a snack drawer or gifting.",
    highlights: [
      "Individually wrapped, easy to portion out",
      "Shelf-stable — no special storage needed",
      "Box format tends to have a better per-piece price than loose snacks",
    ],
  },
  "roasted-seaweed-snack": {
    name: "Roasted Seaweed Snacks",
    brand: "Gwangcheon",
    summary: "Crispy, lightly salted seaweed snacks with a sesame oil finish.",
    description:
      "Individually packaged sheets seasoned with sesame oil and salt. Low calorie, easy to toss in a bag, and a snack that works for kids and adults alike. Multi-pack boxes generally beat single-pack pricing per sheet.",
    highlights: [
      "Individually packed for freshness and portability",
      "Low-calorie snack option",
      "Multi-packs typically cost less per sheet",
    ],
  },
  "cosrx-snail-mucin-essence": {
    name: "COSRX Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    summary: "The K-beauty cult-favorite hydrating essence.",
    description:
      "Made with 96% snail secretion filtrate, this essence has stayed a long-running best-seller for a reason: it's lightweight, hydrating, and gentle enough for sensitive skin. A reasonable entry point if you're new to Korean skincare.",
    highlights: [
      "96% snail secretion filtrate",
      "Lightweight gel texture that absorbs quickly",
      "One of the longest-running K-beauty best-sellers",
    ],
  },
  "innisfree-green-tea-serum": {
    name: "Innisfree Green Tea Seed Serum",
    brand: "Innisfree",
    summary: "A hydrating serum built around Jeju green tea seed extract.",
    description:
      "Formulated with green tea seed oil and extract grown on Jeju Island. The watery texture absorbs fast without feeling heavy, making it a solid daily-use option even for oily or combination skin.",
    highlights: [
      "Made with Jeju-grown green tea seed oil",
      "Lightweight, fast-absorbing texture",
      "Works well for oily and combination skin types",
    ],
  },
  "drjart-cicapair-cream": {
    name: "Dr. Jart+ Cicapair Cream",
    brand: "Dr. Jart+",
    summary: "A centella-based cream that calms redness and irritation.",
    description:
      "Built around centella asiatica extract, this cream is designed for calming sensitized or irritated skin. Its green tint also does color-correcting duty, so some people use it as a makeup base on redness-prone days.",
    highlights: [
      "Centella asiatica-based calming formula",
      "Green tint helps color-correct redness",
      "A long-standing pick for sensitive skin",
    ],
  },
  "missha-time-revolution-essence": {
    name: "Missha Time Revolution The First Treatment Essence",
    brand: "Missha",
    summary: "A fermented-yeast essence that's one of K-beauty's better value picks.",
    description:
      "Formulated with fermented yeast filtrate, this essence is a popular daily step for smoothing skin texture. It's often cited as one of the more budget-friendly ways to try a fermentation-based K-beauty essence.",
    highlights: [
      "Fermented yeast filtrate formula",
      "Lightweight enough for daily use",
      "One of the better-value K-beauty essences on the market",
    ],
  },
  "baby-water-wipes": {
    name: "MotherK Baby Water Wipes",
    brand: "MotherK",
    summary: "Gentle newborn-safe wipes sold in bulk packs that lower the cost per wipe.",
    description:
      "Formulated to be gentle enough for newborn skin. Buying in bulk brings the per-wipe cost down meaningfully compared to single packs, which adds up fast for parents going through wipes daily. Consider keeping a small pack for outings and a bulk refill at home.",
    highlights: [
      "Gentle enough for newborn skin",
      "Bulk packs cost less per wipe than singles",
      "Good split: travel pack for outings, bulk refill at home",
    ],
  },
  "baby-strawberry-lotion": {
    name: "Gung Baby Strawberry Lotion",
    brand: "Gung",
    summary: "A mild, fast-absorbing lotion for post-bath baby skincare.",
    description:
      "A lightly scented lotion designed for sensitive newborn skin, meant to be used right after bath time. It absorbs quickly without feeling greasy, which keeps the bedtime routine short.",
    highlights: [
      "Low-irritant formula suitable from newborn age",
      "Absorbs quickly with minimal residue",
      "Sized well for a daily post-bath routine",
    ],
  },
  "premium-baby-diapers": {
    name: "Sundooni Premium Diapers",
    brand: "Sundooni",
    summary: "Thin but absorbent diapers sold by size, worth comparing per-diaper cost across sizes.",
    description:
      "A thin diaper that still holds up well on absorbency, using a breathable material that's more comfortable for extended wear. Comes in sizes from newborn through toddler — worth checking the per-diaper price at each size since box counts vary.",
    highlights: [
      "Thin profile without sacrificing absorbency",
      "Breathable material for longer wear",
      "Sold across newborn-to-toddler sizes — compare per-diaper cost by box",
    ],
  },
  "baby-food-storage-set": {
    name: "Agad Baby Food Storage Set",
    brand: "Agad",
    summary: "Freezer-safe storage containers with measurement markings for portioning baby food.",
    description:
      "Designed for portioning and freezing homemade baby food, with volume markings printed on the container so you can measure without extra tools. Made from a material that's safe for both the microwave and steaming, which simplifies reheating.",
    highlights: [
      "Volume markings make portioning easy",
      "Microwave- and steamer-safe material",
      "Built for freezer storage and quick reheating",
    ],
  },
  "bt21-mini-plush-set": {
    name: "BT21 Mini Plush Set",
    brand: "BT21 (IPX)",
    summary: "A set of mini plush toys featuring the core BT21 characters.",
    description:
      "A compact plush set covering fan-favorite BT21 characters like Cooky, Tata, and Koya. Small enough to clip onto a bag or sit on a desk, and a common pick for gifting to a BT21 fan.",
    highlights: [
      "Includes fan-favorite characters like Cooky, Tata, and Koya",
      "Compact size, good for bags or desks",
      "A popular gift option for BT21 fans",
    ],
  },
  "bt21-baby-cushion": {
    name: "BT21 Baby Character Cushion",
    brand: "BT21 (IPX)",
    summary: "A soft cushion featuring the BT21 Baby character line.",
    description:
      "A plush cushion in the BT21 Baby line's rounder, softer character design. Works as both a collectible and a genuinely usable throw pillow for a couch or bed.",
    highlights: [
      "Soft, plush material",
      "Doubles as home decor and a fan collectible",
      "BT21 Baby line character design",
    ],
  },
  "bt21-sticker-pack": {
    name: "BT21 Sticker Pack",
    brand: "BT21 (IPX)",
    summary: "A set of BT21 character stickers for decorating notebooks, laptops, and more.",
    description:
      "A budget-friendly way to get into BT21 merch — good for decorating a planner, laptop, or phone case. Many packs use waterproof coating, so they hold up on water bottles and other items that get handled outdoors.",
    highlights: [
      "Low-cost entry point into BT21 merch",
      "Waterproof coating on many packs",
      "Good for laptops, planners, and phone cases",
    ],
  },
  "bt21-tumbler": {
    name: "BT21 Character Tumbler",
    brand: "BT21 (IPX)",
    summary: "A daily-use tumbler printed with BT21 characters.",
    description:
      "An insulated tumbler with BT21 character graphics, built for regular use on a commute or at school. A practical option if you want a BT21 item that gets used every day rather than sitting on a shelf.",
    highlights: [
      "Insulated for hot or cold drinks",
      "BT21 character print",
      "A practical daily-use item, also popular as a gift",
    ],
  },
};

export const posts: Record<string, PostContent> = {
  "korean-snacks-summer-top-picks": {
    title: "4 Korean Snacks Worth Ordering on Amazon This Summer",
    excerpt:
      "No Korean grocery store nearby? Here are four snacks and ramyun picks that consistently show up as good buys on Amazon.",
    body: [
      "If you're craving Korean food but don't have a Korean grocery store nearby, ordering a multipack online is often the most practical option. Here are four snacks that keep coming up as solid picks for US-based shoppers browsing Amazon.",
      "First up is Shin Ramyun — a spicy beef-broth ramyun that's often the first thing people restock once they've tried it. Buying the multipack instead of single packs brings the per-serving price down, which is worth it if you're eating it regularly.",
      "If you like heat, Buldak Hot Chicken Noodles are the noodle behind the viral spice challenge videos. It's a stir-fry style noodle rather than a soup, so it's a different experience from Shin Ramyun — worth trying both.",
      "For something sweet, Orion Choco Pie pairs two soft cake layers with a marshmallow center and a chocolate coating. It comes in a box, which tends to be a better per-piece deal than buying loose snacks, and it travels well for lunchboxes or office snacking.",
      "Last, if you want something lighter or are watching calories, roasted seaweed snacks are a crisp, lightly salted option. Individually packed sheets make them easy to toss in a bag, and multi-packs are usually the better buy per sheet.",
      "If you haven't tried one of these yet, it might be worth adding to your next Amazon order.",
    ],
  },
  "k-beauty-daily-skincare-routine-guide": {
    title: "A Simple 4-Step K-Beauty Routine for Beginners",
    excerpt:
      "K-beauty has a reputation for 10-step routines, but you can get solid results with just four products.",
    body: [
      "K-beauty is often associated with elaborate 10-step routines, but you don't need that many products to see results. Here's a simple 4-step routine for anyone just getting started, using products that are easy to find on Amazon.",
      "Step one is a hydrating essence. Applied right after cleansing, something like COSRX's Snail Mucin Essence is a good starting point — it's gentle enough for sensitive skin and has stayed a best-seller for a reason.",
      "Step two is a fermented essence. Missha's Time Revolution essence uses fermented yeast filtrate and is often mentioned as one of the better-value options if you want to try a fermentation-based product without spending a lot.",
      "Step three is a serum. Innisfree's Green Tea Seed Serum has a watery texture that works well even on oily or combination skin, making it a solid daily pick.",
      "Step four is a cream to finish. On days when your skin feels irritated or red, Dr. Jart+'s Cicapair Cream is built around centella asiatica to calm things down, and its green tint doubles as a color-correcting base under makeup.",
      "You don't need to buy all four products at once — start with whichever step matches your current skin concern, and build the rest of the routine from there.",
    ],
  },
  "newborn-essentials-checklist": {
    title: "A Newborn Essentials Checklist for First-Time Parents",
    excerpt:
      "Not sure where to start preparing for a newborn? Here's a checklist of essentials worth having ready.",
    body: [
      "Preparing for a newborn comes with an overwhelming list of things to buy. Here are four essentials worth prioritizing before the baby arrives, based on what tends to run out fastest.",
      "Wipes are the item you'll go through fastest. Buying a gentle, newborn-safe wipe in bulk brings the per-wipe cost down significantly compared to single packs — useful during the sleep-deprived early weeks when you don't want to be reordering constantly.",
      "A mild lotion for after bath time is next. A lightly scented, low-irritant lotion keeps the bedtime routine short and works well for sensitive newborn skin.",
      "Diapers are worth buying in small amounts across a few sizes and brands at first, since babies vary in body shape and fit. Once you find one that works, buying that size in bulk is where the real per-diaper savings show up.",
      "Once you start solids, freezer-safe storage containers with volume markings make portioning baby food much easier — look for ones that are also microwave- and steamer-safe so reheating is simple.",
      "You don't need to have everything ready at once. Start with these essentials and add items as your baby's needs change.",
    ],
  },
  "bt21-ipx-goods-beginner-guide": {
    title: "A Beginner's Guide to BT21 Merch: Where to Start",
    excerpt:
      "New to BT21? Here's a rundown of the merch categories and which one makes the most sense to start with.",
    body: [
      "BT21, the character IP from IPX, has built a loyal global fanbase thanks to its characters. If you're new to collecting and not sure where to start, here's a breakdown by merch category.",
      "The lowest-commitment entry point is a sticker pack — cheap, and a good way to get familiar with the characters while decorating a notebook or laptop. Look for waterproof-coated packs if you want them to hold up on water bottles too.",
      "If you want something you'll actually use daily, a tumbler is a solid pick. It's an easy way to work BT21 into your routine without it just sitting on a shelf.",
      "Ready to start a proper collection? A mini plush set covering characters like Cooky, Tata, and Koya is a common next step — small enough to clip onto a bag, and a popular gift for fans.",
      "If you want something for your room, a BT21 Baby line cushion is soft, doubles as an actual throw pillow, and still counts as a collectible.",
      "Whichever category you start with, a small piece of BT21 merch is an easy way to add a bit of fun to your day.",
    ],
  },
};
