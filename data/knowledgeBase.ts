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

export const OBJECTIONS = {
  "too_hard": "Hard is where the value is. If it were easy, everyone would have a 6-pack. You are paying for the result, not the ease.",
  "hungry": "Hunger is just your body detoxing from dopamine addiction. Drink 1L of water and get back to work.",
  "social_pressure": "Leaders eat differently than followers. Do not apologize for your standards."
};