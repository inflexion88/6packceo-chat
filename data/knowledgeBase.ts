// DEPRECATED: No longer used in system prompt as of 2025-12-18
// Reason: JSON injection was causing hallucinations. Simplified system prompt now relies on GPT-4o-mini's training data for accurate macros.
// Kept for historical reference.

export const CORE_PHILOSOPHY = `
1. **The Body is a Business**: We manage it with KPIs (Key Performance Indicators). ROI (Return on Ingestion) must be positive.
2. **Binary Nutrition**: Foods are either an ASSET (Fuel) or a LIABILITY (Toxin). There is no neutral ground.
3. **Outcome over Comfort**: We do not eat for entertainment; we eat for execution.
4. **The 1% Rule**: We do what the 99% won't, to have what the 99% can't.
`;

export const NUTRITION_DATABASE = {
  proteins: [
    { item: "Ribeye Steak (Grass-fed)", rating: "S-Tier", notes: "The ultimate anabolic compound." },
    { item: "Bison", rating: "S-Tier", notes: "Leaner than beef, higher nutrient density." },
    { item: "Wild Caught Salmon", rating: "A-Tier", notes: "Essential for cognitive function (Omega-3s)." },
    { item: "Chicken Thighs", rating: "B-Tier", notes: "Acceptable, but inferior to red meat profile." },
    { item: "Egg Whites + Yolks", rating: "A-Tier", notes: "Nature's multivitamin. Eat the yolks." }
  ],
  carbs: [
    { item: "Jasmine Rice", rating: "S-Tier", notes: "Pure glycogen replenishment. Zero gut irritation." },
    { item: "Sweet Potato", rating: "A-Tier", notes: "Slower release, good for lunch." },
    { item: "Blueberries/Raspberries", rating: "A-Tier", notes: "Antioxidant load. Low glycemic." },
    { item: "Oats", rating: "C-Tier", notes: "Only if tolerated. Often causes bloating. Proceed with caution." }
  ],
  fats: [
    { item: "Avocado", rating: "S-Tier", notes: "Hormonal support." },
    { item: "Grass-fed Butter/Ghee", rating: "S-Tier", notes: "Cook everything in this." },
    { item: "Extra Virgin Olive Oil", rating: "A-Tier", notes: "Do not heat. Use raw." }
  ],
  banned: [
    "Seed Oils (Canola, Sunflower, Soybean)",
    "Soy Protein",
    "High Fructose Corn Syrup",
    "Processed Wheat",
    "Tap Water (Estrogenic)"
  ]
};

export const SUPPLEMENT_STACK = {
  essentials: [
    { name: "Magnesium Glycinate", timing: "Pre-bed", dose: "400mg", reason: "Sleep depth and nervous system recovery." },
    { name: "Creatine Monohydrate", timing: "Daily", dose: "5g", reason: "Cognitive function and ATP production." },
    { name: "Vitamin D3 + K2", timing: "Morning", dose: "5000IU", reason: "Hormonal backbone." },
    { name: "Electrolytes (Sodium/Potassium)", timing: "Intra-workout", dose: "1000mg Na", reason: "Pump and neural firing." }
  ],
  garbage: [
    "BCAAs (Useless if eating protein)",
    "Fat Burners (Just caffeine and marketing)",
    "Testosterone Boosters (Herbal placebos)"
  ]
};

export const ALCOHOL_PROTOCOL = {
  rule: "Alcohol is a poison that halts fat oxidation for 24-48 hours. If you must drink for business networking, mitigate damage.",
  approved_drinks: [
    "Tequila (Blanco) + Soda Water + 3 Limes",
    "Vodka + Soda Water",
    "Dry Farm Wines (Red only)"
  ],
  forbidden_drinks: [
    "Beer (Estrogenic hops + gluten)",
    "Sweet Cocktails (Sugar bomb hangover)",
    "Dark Liquors with mixers"
  ],
  mitigation_tactics: [
    "1:1 Ratio: One glass of water for every drink.",
    "NAC (N-Acetyl Cysteine): 600mg before drinking to protect liver.",
    "Charcoal: Take before bed to bind toxins."
  ]
};

export const TRAVEL_SURVIVAL = {
  gas_station: "Beef Jerky (Check sugar content), Sparkling Water, Almonds (Raw), Hard Boiled Eggs (if available).",
  airport: "Skip the food court. Fast until you land. Or find a steakhouse terminal restaurant.",
  hotel_room: "Instacart these immediately upon arrival: Water cases, Greek Yogurt, Berries, Rotisserie Chicken."
};

export const RESTAURANT_STRATEGIES = {
  steakhouse: {
    strategy: "The Power Move",
    order: "Bone-in Ribeye (Medium Rare). Double Asparagus. No potato. Sparkling Water.",
    avoid: "The bread basket. It is a poverty trap."
  },
  sushi: {
    strategy: "The Omega Load",
    order: "Sashimi platter (Salmon/Tuna/Yellowtail). One specialty roll (limit rice).",
    avoid: "Tempura (Deep fried seed oils) and Spicy Mayo (Soybean oil)."
  },
  italian: {
    strategy: "Damage Control",
    order: "Bistecca Fiorentina or Branzino. Grilled vegetables.",
    avoid: "Pasta. If you must, 50g portion maximum. Do not fill up on bread."
  }
};

export const MEAL_PLANS = {
  "2200_cut": [
    { meal: "Breakfast", items: "4 Whole Eggs, 1/2 Avocado, Black Coffee", macros: "30g P / 25g F / 5g C" },
    { meal: "Lunch", items: "8oz Sirloin, 150g Jasmine Rice", macros: "50g P / 15g F / 45g C" },
    { meal: "Dinner", items: "10oz Salmon, Asparagus (Unlimited)", macros: "60g P / 30g F / 0g C" },
    { meal: "Snack", items: "Whey Isolate Shake or Beef Jerky", macros: "25g P / 0g F / 0g C" }
  ],
  "3000_bulk": [
    { meal: "Breakfast", items: "5 Eggs, 100g Oats, Berries", macros: "35g P / 25g F / 60g C" },
    { meal: "Lunch", items: "10oz 80/20 Ground Beef, 250g Rice", macros: "60g P / 40g F / 70g C" },
    { meal: "Pre-Workout", items: "Banana, Honey, Pink Salt", macros: "0g P / 0g F / 40g C" },
    { meal: "Dinner", items: "12oz Ribeye, Sweet Potato", macros: "70g P / 50g F / 50g C" }
  ]
};

export const QUICK_SNACKS = {
  "100_150_calories": [
    { item: "2 Hard Boiled Eggs", macros: "12g P / 10g F / 0g C", calories: "140" },
    { item: "Greek Yogurt (100g)", macros: "10g P / 3g F / 5g C", calories: "85" },
    { item: "Beef Jerky (28g)", macros: "9g P / 1g F / 3g C", calories: "70" },
    { item: "1/2 Avocado", macros: "2g P / 15g F / 9g C", calories: "120" }
  ],
  "200_300_calories": [
    { item: "Whey Protein Shake", macros: "25g P / 2g F / 3g C", calories: "130" },
    { item: "4oz Chicken Breast", macros: "35g P / 4g F / 0g C", calories: "180" },
    { item: "1/4 Cup Almonds", macros: "6g P / 14g F / 6g C", calories: "170" },
    { item: "Greek Yogurt (200g) + Berries", macros: "20g P / 6g F / 20g C", calories: "210" }
  ],
  pre_workout: [
    { item: "1 Banana + Pink Salt", macros: "1g P / 0g F / 27g C", calories: "105", notes: "Quick energy." },
    { item: "Rice Cakes + Honey", macros: "2g P / 0g F / 35g C", calories: "150", notes: "Fast-digesting carbs." },
    { item: "Dates (3-4)", macros: "1g P / 0g F / 36g C", calories: "140", notes: "Natural glucose spike." }
  ],
  post_workout: [
    { item: "Whey Shake + Banana", macros: "26g P / 2g F / 30g C", calories: "240", notes: "Immediate recovery." },
    { item: "6oz Salmon + Sweet Potato (small)", macros: "40g P / 18g F / 25g C", calories: "420", notes: "Full muscle repair." },
    { item: "4 Eggs + Jasmine Rice (100g)", macros: "30g P / 20g F / 30g C", calories: "400", notes: "Anabolic window." }
  ]
};

export const COMMON_SUBSTITUTIONS = {
  lactose_intolerant: {
    avoid: "Milk, Cheese, Whey Protein, Greek Yogurt",
    use_instead: "Lactose-free milk, Beef Isolate Protein, Coconut Yogurt, Almond Milk (unsweetened)"
  },
  dont_like_chicken: {
    alternatives: "Turkey breast, White fish (cod/halibut), Lean bison, Egg whites"
  },
  dont_like_beef: {
    alternatives: "Bison, Lamb, Venison, Wild-caught salmon"
  },
  vegetarian_protein: {
    note: "Not ideal for 6pack goals, but workable.",
    options: "Eggs (if allowed), Greek Yogurt, Whey Isolate, Tempeh (fermented soy only), Lentils"
  },
  no_rice_available: {
    alternatives: "Sweet potato, White potato (peeled), Oats, Quinoa"
  }
};

export const OBJECTIONS = {
  "too_hard": "Hard is where the value is. If it were easy, everyone would have a 6-pack. You are paying for the result, not the ease.",
  "hungry": "Hunger is just your body detoxing from dopamine addiction. Drink 1L of water and get back to work.",
  "social_pressure": "Leaders eat differently than followers. Do not apologize for your standards."
};