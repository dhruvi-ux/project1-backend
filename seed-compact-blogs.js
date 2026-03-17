const mongoose = require("mongoose");
require("dotenv").config();
const Blog = require("./models/Blog");

const compactBlogs = [
  {
    title: "Ultimate Travel Guide: Essential Tips for Every Destination",
    excerpt: "Quick and practical travel tips to make your journey smooth, safe, and memorable wherever you go.",
    content: `Planning a trip can be overwhelming, but with these essential tips, you'll be prepared for any destination. This guide covers everything you need for a successful journey.

## Must-Know Travel Tips

**Before You Go**
- Check visa requirements and passport validity (6+ months)
- Get travel insurance
- Make copies of important documents
- Notify your bank about travel dates
- Download offline maps

**Packing Essentials**
- Universal power adapter
- Portable charger
- First-aid kit with basic medicines
- Comfortable walking shoes
- Light, versatile clothing

## Budget Guide

**Daily Budget Estimates:**
- Budget Travel: $30-50 per day
- Mid-Range: $80-150 per day
- Luxury: $200+ per day

**Money-Saving Tips:**
- Eat at local restaurants
- Use public transportation
- Book accommodations in advance
- Travel during off-season
- Carry reusable water bottle

## Best Time to Travel

**Peak Season:** June-August (Summer)
- Pros: Best weather, all attractions open
- Cons: Crowded, expensive

**Shoulder Season:** April-May, September-October
- Pros: Good weather, fewer crowds, better prices
- Cons: Some attractions may have limited hours

**Off-Season:** November-March
- Pros: Cheapest prices, authentic local experience
- Cons: Cold weather, some places closed

## Safety Instructions

- Keep valuables in hotel safe
- Stay aware of surroundings
- Avoid displaying expensive items
- Use licensed taxis or ride apps
- Share itinerary with family/friends
- Trust your instincts

## Highlight Tips

**Must-Do Activities:**
- Try local street food
- Take a free walking tour
- Visit local markets
- Learn basic local phrases
- Wake up early for sunrise views
- Talk to locals for insider tips

**Photography Tips:**
- Golden hour (sunrise/sunset) for best photos
- Respect "no photography" signs
- Ask permission before photographing people
- Backup photos daily

**Health & Wellness:**
- Stay hydrated
- Get enough sleep
- Wash hands frequently
- Carry hand sanitizer
- Take breaks to avoid burnout`,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Travel Expert",
    category: "Travel Tips",
    readTime: "5 min read",
    published: true,
    tags: ["travel tips", "guide", "planning", "budget travel"]
  },
  {
    title: "Romantic Paris: Perfect Getaway for Couples",
    excerpt: "Experience the magic of Paris with this guide to the most romantic spots, dining, and activities in the City of Love.",
    content: `Paris is the ultimate romantic destination. From iconic landmarks to hidden gems, this guide will help you create unforgettable memories with your loved one.

## Must-See Destinations

- Eiffel Tower
- Montmartre & Sacré-Cœur
- Seine River
- Luxembourg Gardens
- Pont des Arts
- Louvre Museum
- Versailles Palace

## About Paris

Paris, the capital of France, is renowned for its art, fashion, gastronomy, and culture. The city's 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond iconic landmarks like the Eiffel Tower and Notre-Dame cathedral, Paris is known for its café culture and designer boutiques. It's a city that celebrates love, making it perfect for couples seeking romance.

## Budget Guide

**Accommodation:**
- Budget: €50-80 per night (hostels, budget hotels)
- Mid-Range: €100-200 per night (3-star hotels)
- Luxury: €300+ per night (4-5 star hotels)

**Daily Expenses:**
- Meals: €30-60 per person
- Transportation: €15-20 (metro pass)
- Attractions: €15-30 per site
- Total Daily: €100-150 per person

**Money-Saving Tips:**
- Buy Museum Pass for multiple attractions
- Picnic in parks with local food
- Use metro instead of taxis
- Visit free attractions (Notre-Dame exterior, Sacré-Cœur)

## Best Time to Visit

**Spring (April-May):** Perfect weather, blooming gardens, fewer crowds
**Summer (June-August):** Warm, long days, but very crowded
**Fall (September-October):** Beautiful colors, pleasant weather, ideal for walking
**Winter (November-March):** Festive atmosphere, fewer tourists, can be cold

**Recommended:** April-May or September-October for best experience

## Common Instructions

- Learn basic French phrases (Bonjour, Merci, S'il vous plaît)
- Dress smart-casual for restaurants
- Validate metro tickets before boarding
- Tipping: 5-10% in restaurants (service included)
- Many shops close on Sundays
- Book popular restaurants in advance

## Highlight Tips

**Romantic Experiences:**
- Watch sunset from Eiffel Tower
- Take evening Seine River cruise
- Stroll through Montmartre at dawn
- Share crêpes from street vendors
- Visit Versailles gardens
- Enjoy wine and cheese picnic

**Best Photo Spots:**
- Trocadéro for Eiffel Tower views
- Montmartre steps
- Pont Alexandre III bridge
- Louvre pyramid at night

**Local Secrets:**
- Visit Marché des Enfants Rouges (oldest market)
- Explore Canal Saint-Martin neighborhood
- Try authentic baguette from local boulangerie
- Watch street performers at Sacré-Cœur`,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Romance Travel Writer",
    category: "Romance",
    readTime: "6 min read",
    published: true,
    tags: ["paris", "romance", "couples", "france", "europe"]
  },
  {
    title: "Kyoto Cultural Experience: Ancient Japan Awaits",
    excerpt: "Discover authentic Japanese culture in Kyoto through temples, traditions, and timeless beauty.",
    content: `Kyoto, Japan's ancient capital, offers an unparalleled journey into traditional Japanese culture with over 2,000 temples, gardens, and preserved districts.

## Must-See Destinations

- Fushimi Inari Shrine (10,000 torii gates)
- Kinkaku-ji (Golden Pavilion)
- Arashiyama Bamboo Grove
- Kiyomizu-dera Temple
- Gion District (Geisha area)
- Nijo Castle
- Philosopher's Path

## About Kyoto

Kyoto served as Japan's capital for over 1,000 years and is considered the cultural heart of the nation. The city is home to numerous Buddhist temples, Shinto shrines, palaces, and gardens. Traditional wooden houses, tea ceremonies, and geisha culture are preserved here. Kyoto perfectly blends ancient traditions with modern life, offering visitors a glimpse into authentic Japan.

## Budget Guide

**Accommodation:**
- Budget: ¥3,000-6,000 per night (hostels, guesthouses)
- Mid-Range: ¥8,000-15,000 per night (business hotels)
- Luxury: ¥20,000+ per night (ryokan, luxury hotels)

**Daily Expenses:**
- Meals: ¥2,000-4,000 per person
- Transportation: ¥600-1,000 (bus pass)
- Temple Entry: ¥300-600 per site
- Total Daily: ¥6,000-10,000 per person ($40-70)

**Money-Saving Tips:**
- Buy one-day bus pass
- Eat at local ramen shops
- Visit free temples and shrines
- Rent bicycle for exploring

## Best Time to Visit

**Spring (March-April):** Cherry blossoms, perfect weather, very crowded
**Summer (June-August):** Hot and humid, festivals, fewer tourists
**Fall (October-November):** Autumn colors, ideal weather, popular season
**Winter (December-February):** Cold, fewer crowds, snow-covered temples

**Recommended:** Late March-April or November for best experience

## Common Instructions

- Remove shoes when entering temples and homes
- Don't eat while walking
- Bow when greeting
- No photography inside some temples
- Speak quietly in public places
- Don't tip (considered rude)
- Respect geisha privacy (no chasing or blocking)

## Highlight Tips

**Cultural Experiences:**
- Attend tea ceremony
- Wear kimono for a day
- Try kaiseki (traditional multi-course meal)
- Watch geisha in Gion (evening)
- Visit morning markets
- Participate in meditation at temple

**Best Activities:**
- Hike Fushimi Inari at sunrise
- Explore Arashiyama early morning
- Take cooking class
- Visit sake brewery
- Stroll Philosopher's Path

**Food Must-Try:**
- Matcha desserts
- Yudofu (tofu hot pot)
- Kaiseki ryori
- Ramen
- Wagashi (traditional sweets)`,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Cultural Explorer",
    category: "Culture",
    readTime: "6 min read",
    published: true,
    tags: ["kyoto", "japan", "culture", "temples", "asia"]
  },
  {
    title: "Swiss Alps Adventure: Hiking Paradise",
    excerpt: "Experience breathtaking mountain scenery and world-class hiking trails in the stunning Swiss Alps.",
    content: `The Swiss Alps offer spectacular hiking experiences with pristine landscapes, charming villages, and well-maintained trails for all skill levels.

## Must-See Destinations

- Zermatt & Matterhorn
- Jungfrau Region
- Interlaken
- Grindelwald
- Lauterbrunnen Valley
- Lucerne
- St. Moritz

## About Swiss Alps

The Swiss Alps are part of the larger Alpine mountain range and cover about 60% of Switzerland. Known for their dramatic peaks, pristine lakes, and picturesque villages, the Alps offer year-round outdoor activities. The region features excellent infrastructure with mountain railways, cable cars, and well-marked hiking trails. Swiss hospitality and chocolate add to the alpine charm.

## Budget Guide

**Accommodation:**
- Budget: CHF 30-60 per night (hostels, mountain huts)
- Mid-Range: CHF 100-180 per night (hotels)
- Luxury: CHF 250+ per night (luxury resorts)

**Daily Expenses:**
- Meals: CHF 30-50 per person
- Transportation: CHF 50-100 (cable cars, trains)
- Activities: CHF 20-80
- Total Daily: CHF 120-200 per person ($130-220)

**Money-Saving Tips:**
- Buy Swiss Travel Pass
- Stay in mountain huts
- Pack picnic lunches
- Hike instead of taking cable cars
- Visit in shoulder season

## Best Time to Visit

**Summer (June-September):** Best hiking weather, all trails open, peak season
**Spring (April-May):** Wildflowers, fewer crowds, some trails still snowy
**Fall (October-November):** Autumn colors, clear days, some facilities closing
**Winter (December-March):** Skiing season, winter sports, cold

**Recommended:** July-August for hiking, December-February for skiing

## Common Instructions

- Check weather before hiking
- Start hikes early (afternoon storms common)
- Carry Swiss Francs (many places don't accept cards)
- Respect trail markers and stay on paths
- Book mountain huts in advance
- Bring layers (weather changes quickly)
- Emergency number: 1414 (mountain rescue)

## Highlight Tips

**Top Hiking Trails:**
- Five Lakes Walk (Zermatt) - Easy, 2.5 hours
- Männlichen to Kleine Scheidegg - Easy, 1.5 hours
- First to Bachalpsee - Easy, 1 hour
- Eiger Trail - Moderate, 2.5 hours

**Must-Do Activities:**
- Ride Jungfraujoch railway (Top of Europe)
- Visit Matterhorn Glacier Paradise
- Paragliding in Interlaken
- Boat cruise on Lake Lucerne
- Try Swiss fondue

**Packing Essentials:**
- Sturdy hiking boots
- Waterproof jacket
- Sunscreen (SPF 50+)
- Sunglasses
- Water bottle
- Trekking poles
- Warm layers

**Photography Tips:**
- Sunrise at mountain lakes
- Matterhorn reflection in Riffelsee
- Wildflower meadows in June-July`,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Mountain Guide",
    category: "Adventure",
    readTime: "6 min read",
    published: true,
    tags: ["swiss alps", "hiking", "adventure", "mountains", "europe"]
  },
  {
    title: "Hidden Europe: Off-the-Beaten-Path Gems",
    excerpt: "Discover Europe's best-kept secrets with charming villages, stunning landscapes, and authentic experiences.",
    content: `Escape the tourist crowds and explore Europe's hidden treasures. These lesser-known destinations offer authentic culture, natural beauty, and unforgettable experiences.

## Must-See Destinations

- Hallstatt, Austria
- Colmar, France
- Cinque Terre, Italy
- Bruges, Belgium
- Cesky Krumlov, Czech Republic
- Plitvice Lakes, Croatia
- Ronda, Spain
- Kotor, Montenegro

## About Hidden Europe

Beyond the famous capitals, Europe is filled with enchanting small towns and natural wonders that offer authentic experiences without the crowds. These destinations preserve traditional architecture, local customs, and natural beauty. They're perfect for travelers seeking genuine cultural immersion and stunning photography opportunities.

## Budget Guide

**Accommodation:**
- Budget: €25-50 per night
- Mid-Range: €60-100 per night
- Luxury: €120+ per night

**Daily Expenses:**
- Meals: €20-40 per person
- Transportation: €10-30
- Attractions: €10-25
- Total Daily: €60-120 per person

**Money-Saving Tips:**
- Visit Eastern European destinations (cheaper)
- Stay in guesthouses or Airbnb
- Eat at local taverns
- Use regional trains
- Travel in shoulder season

## Best Time to Visit

**Spring (April-June):** Mild weather, blooming flowers, fewer tourists
**Summer (July-August):** Warm, busy, highest prices
**Fall (September-October):** Beautiful colors, pleasant weather, good prices
**Winter (November-March):** Quiet, cheapest, some places closed

**Recommended:** May-June or September for best balance

## Common Instructions

- Book accommodations early (limited options)
- Rent car for flexibility in remote areas
- Learn basic local phrases
- Respect local customs and quiet hours
- Bring cash (many small towns don't accept cards)
- Check opening hours (many close mid-week)

## Highlight Tips

**Top Experiences:**
- Boat ride in Hallstatt
- Wine tasting in Colmar
- Hiking Cinque Terre coastal trail
- Canal tour in Bruges
- Explore Cesky Krumlov castle
- Swim in Plitvice Lakes waterfalls

**Photography Spots:**
- Hallstatt village reflection
- Colmar's Little Venice
- Cinque Terre colorful houses
- Bruges medieval streets
- Plitvice waterfalls

**Local Specialties:**
- Austrian apple strudel (Hallstatt)
- Alsatian wine (Colmar)
- Fresh seafood (Cinque Terre)
- Belgian waffles (Bruges)
- Czech beer (Cesky Krumlov)

**Travel Tips:**
- Visit weekdays to avoid crowds
- Arrive early morning for best photos
- Stay overnight (day-trippers leave by evening)
- Use public transport when available
- Book popular restaurants in advance`,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Travel Explorer",
    category: "Europe",
    readTime: "6 min read",
    published: true,
    tags: ["europe", "hidden gems", "villages", "authentic travel"]
  },
  {
    title: "Southeast Asia Backpacking: Budget Adventure",
    excerpt: "Your essential guide to backpacking through Southeast Asia with tips on destinations, budget, and experiences.",
    content: `Southeast Asia is the ultimate backpacker's paradise offering incredible experiences at unbeatable prices. From beaches to temples, this region has it all.

## Must-See Destinations

- Bangkok, Thailand
- Chiang Mai, Thailand
- Hanoi & Ha Long Bay, Vietnam
- Hoi An, Vietnam
- Siem Reap (Angkor Wat), Cambodia
- Luang Prabang, Laos
- Bali, Indonesia
- Singapore

## About Southeast Asia

Southeast Asia comprises 11 countries known for tropical beaches, ancient temples, delicious street food, and warm hospitality. The region offers diverse experiences from bustling cities to peaceful islands, all at budget-friendly prices. Well-established backpacker routes make it easy to travel independently with excellent infrastructure for tourists.

## Budget Guide

**Accommodation:**
- Dorm beds: $5-10 per night
- Private rooms: $15-25 per night
- Mid-range hotels: $30-50 per night

**Daily Expenses:**
- Meals: $5-10 per day
- Transportation: $5-15 per day
- Activities: $10-30 per day
- Total Daily: $25-50 per person

**Money-Saving Tips:**
- Stay in hostels
- Eat street food
- Use local buses
- Book flights in advance
- Travel during low season

## Best Time to Visit

**Dry Season (November-April):** Best weather, peak tourist season
**Wet Season (May-October):** Afternoon rains, fewer tourists, better prices

**By Country:**
- Thailand: November-February (cool season)
- Vietnam: March-April or September-November
- Indonesia: April-October (dry season)

**Recommended:** November-February for most countries

## Common Instructions

- Get travel insurance
- Check visa requirements
- Vaccinations: Hepatitis A/B, Typhoid
- Drink bottled water
- Bargain at markets (politely)
- Dress modestly at temples
- Remove shoes indoors
- Respect local customs

## Highlight Tips

**Must-Do Experiences:**
- Sunrise at Angkor Wat
- Ha Long Bay cruise
- Thai cooking class
- Elephant sanctuary visit (ethical only)
- Island hopping in Thailand
- Lantern festival in Hoi An

**Top Activities:**
- Scuba diving (Koh Tao, Gili Islands)
- Rock climbing (Railay Beach)
- Trekking (Chiang Mai, Sapa)
- Motorbiking (Vietnam coast)
- Yoga retreats (Bali, Ubud)

**Food Must-Try:**
- Pad Thai (Thailand)
- Pho (Vietnam)
- Nasi Goreng (Indonesia)
- Amok (Cambodia)
- Laksa (Malaysia/Singapore)

**Safety Tips:**
- Keep valuables secure
- Avoid common scams
- Use licensed taxis or Grab app
- Don't leave drinks unattended
- Share travel plans with someone

**Packing Essentials:**
- Lightweight backpack (40-50L)
- Quick-dry clothes
- Flip-flops and walking shoes
- Sarong (multi-purpose)
- Insect repellent
- Sunscreen SPF 50+`,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Backpacker Pro",
    category: "Asia",
    readTime: "6 min read",
    published: true,
    tags: ["southeast asia", "backpacking", "budget travel", "asia", "adventure"]
  },
  {
    title: "Greek Islands Paradise: Sun, Sea & History",
    excerpt: "Explore the stunning Greek Islands with crystal-clear waters, white-washed villages, and ancient history.",
    content: `The Greek Islands offer the perfect blend of natural beauty, rich history, delicious cuisine, and warm hospitality. From party islands to peaceful retreats, there's an island for everyone.

## Must-See Destinations

- Santorini
- Mykonos
- Crete
- Rhodes
- Paros
- Naxos
- Milos
- Corfu

## About Greek Islands

Greece has over 200 inhabited islands scattered across the Aegean and Ionian Seas. Each island has its unique character - from Santorini's dramatic caldera to Mykonos' vibrant nightlife, Crete's ancient ruins to Paros' traditional villages. The islands are famous for whitewashed buildings, blue-domed churches, fresh seafood, and stunning sunsets.

## Budget Guide

**Accommodation:**
- Budget: €25-50 per night (hostels, basic rooms)
- Mid-Range: €60-120 per night (hotels)
- Luxury: €150+ per night (cave hotels, resorts)

**Daily Expenses:**
- Meals: €20-40 per person
- Transportation: €10-30 (ferries, buses)
- Activities: €15-40
- Total Daily: €60-130 per person

**Money-Saving Tips:**
- Visit in shoulder season (May-June, September)
- Stay away from Oia/Mykonos town
- Eat at local tavernas
- Use local buses
- Book ferries in advance

## Best Time to Visit

**Peak Season (July-August):** Hot, crowded, expensive, best weather
**Shoulder Season (May-June, September-October):** Perfect weather, fewer crowds, better prices
**Low Season (November-April):** Quiet, cheap, many places closed

**Recommended:** Late May-June or September for ideal conditions

## Common Instructions

- Don't flush toilet paper (use bin provided)
- Siesta time: 2-5 PM (shops close)
- Tipping: 5-10% in restaurants
- Dress modestly at monasteries
- Book ferries early (summer)
- Bring cash (many places don't accept cards)
- Learn basic Greek phrases

## Highlight Tips

**Island Hopping Route:**
- 1 Week: Athens → Mykonos (2 days) → Santorini (3 days)
- 2 Weeks: Add Paros (2 days) → Naxos (3 days) → Crete (4 days)

**Must-Do Activities:**
- Watch Santorini sunset in Oia
- Party in Mykonos beach clubs
- Explore Knossos Palace (Crete)
- Sail around islands
- Visit ancient ruins
- Try Greek cooking class

**Best Beaches:**
- Red Beach (Santorini)
- Paradise Beach (Mykonos)
- Elafonisi (Crete)
- Navagio Beach (Zakynthos)

**Food Must-Try:**
- Greek salad with feta
- Moussaka
- Souvlaki
- Fresh grilled octopus
- Baklava
- Ouzo (anise spirit)

**Photography Spots:**
- Blue domes in Oia (Santorini)
- Mykonos windmills
- Little Venice (Mykonos)
- Sunset from Fira (Santorini)`,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Island Explorer",
    category: "Europe",
    readTime: "6 min read",
    published: true,
    tags: ["greece", "greek islands", "santorini", "mykonos", "beach", "europe"]
  },
  {
    title: "Nepal Trekking: Himalayan Adventure",
    excerpt: "Trek through the world's highest mountains with stunning views, friendly locals, and unforgettable experiences.",
    content: `Nepal offers world-class trekking experiences in the Himalayas with routes for all fitness levels. From Everest Base Camp to Annapurna Circuit, adventure awaits.

## Must-See Destinations

- Everest Base Camp
- Annapurna Circuit
- Annapurna Base Camp
- Langtang Valley
- Poon Hill
- Kathmandu
- Pokhara

## About Nepal Trekking

Nepal is home to eight of the world's fourteen highest peaks, including Mount Everest. The country offers diverse trekking routes through stunning mountain landscapes, traditional villages, and Buddhist monasteries. Well-established teahouse networks make trekking accessible without camping. The warm Nepali hospitality and rich culture add to the adventure.

## Budget Guide

**Trekking Costs:**
- Permits: $30-50
- Accommodation: $5-10 per night (teahouses)
- Meals: $15-25 per day
- Guide: $25-30 per day (optional)
- Porter: $20-25 per day (optional)
- Total: $500-1,000 for 2-week trek

**Money-Saving Tips:**
- Trek independently (no guide needed for popular routes)
- Eat dal bhat (unlimited refills)
- Bring own snacks
- Share porter with others
- Trek in shoulder season

## Best Time to Visit

**Spring (March-May):** Clear views, rhododendrons blooming, warmer
**Autumn (September-November):** Best visibility, stable weather, peak season
**Winter (December-February):** Clear skies, very cold, fewer trekkers
**Monsoon (June-August):** Rain, leeches, cloudy views (avoid)

**Recommended:** October-November or March-April

## Common Instructions

- Acclimatize properly (ascend slowly)
- Stay hydrated (3-4 liters daily)
- Start early (avoid afternoon storms)
- Bring cash (no ATMs on trails)
- Get travel insurance (including helicopter rescue)
- Respect local culture and environment
- Pack out all trash

## Highlight Tips

**Popular Treks:**
- Everest Base Camp: 12-14 days, challenging
- Annapurna Circuit: 15-20 days, moderate
- Annapurna Base Camp: 7-10 days, moderate
- Poon Hill: 4-5 days, easy

**Packing Essentials:**
- Sleeping bag (-10°C rated)
- Trekking poles
- Headlamp
- Water purification tablets
- Sunscreen SPF 50+
- Warm layers
- Sturdy hiking boots

**Altitude Sickness Prevention:**
- Ascend slowly (max 500m per day above 3,000m)
- Rest days for acclimatization
- Drink plenty of water
- Avoid alcohol
- Descend if symptoms worsen

**Best Experiences:**
- Sunrise from Kala Patthar (Everest)
- Thorong La Pass crossing (Annapurna)
- Stay in mountain teahouses
- Try dal bhat (traditional meal)
- Visit Buddhist monasteries
- Meet friendly Sherpa people

**Photography Tips:**
- Early morning for clear mountain views
- Bring extra batteries (cold drains them)
- Protect camera from dust
- Capture local culture respectfully`,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Mountain Trekker",
    category: "Adventure",
    readTime: "6 min read",
    published: true,
    tags: ["nepal", "trekking", "himalayas", "everest", "adventure", "asia"]
  }
];

async function seedCompactBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log("🗑️  Cleared existing blogs");

    // Insert compact blogs
    const blogs = await Blog.insertMany(compactBlogs);
    console.log(`✅ Successfully seeded ${blogs.length} compact blog posts`);

    console.log("\n📝 Seeded blogs:");
    blogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   Category: ${blog.category} | Read Time: ${blog.readTime}`);
    });

    console.log("\n✨ All blogs now feature:");
    console.log("   - Must-see destinations list");
    console.log("   - Brief 3-4 line description");
    console.log("   - Budget guide with estimates");
    console.log("   - Best time to visit");
    console.log("   - Common instructions");
    console.log("   - Highlight tips");
    console.log("   - Compact, fast-loading content");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding blogs:", error);
    process.exit(1);
  }
}

seedCompactBlogs();
