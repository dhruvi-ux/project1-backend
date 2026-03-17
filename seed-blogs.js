const mongoose = require("mongoose");
require("dotenv").config();
const Blog = require("./models/Blog");

const sampleBlogs = [
  {
    title: "Top 10 Hidden Gems in Europe",
    excerpt: "Discover the secret spots that most tourists miss in Europe's most beautiful destinations.",
    content: `Europe is filled with incredible destinations that go beyond the typical tourist hotspots. While Paris, Rome, and Barcelona are amazing, there's a whole world of hidden gems waiting to be explored.

1. Hallstatt, Austria - This picturesque village looks like it's straight out of a fairy tale, with its alpine houses reflected in the crystal-clear lake.

2. Sintra, Portugal - A magical town filled with colorful palaces, mysterious gardens, and stunning mountain views.

3. Colmar, France - Often called "Little Venice," this Alsatian town features half-timbered houses and flower-lined canals.

4. Giethoorn, Netherlands - Known as the "Venice of the North," this village has no roads, only canals and footpaths.

5. Ronda, Spain - A dramatic town perched on a cliff, offering breathtaking views of the surrounding countryside.

6. Cesky Krumlov, Czech Republic - A medieval town that feels frozen in time, with its castle overlooking the Vltava River.

7. Plitvice Lakes, Croatia - A stunning national park with cascading waterfalls and turquoise lakes.

8. Meteora, Greece - Ancient monasteries built on top of towering rock formations create an otherworldly landscape.

9. Bruges, Belgium - A perfectly preserved medieval city with cobblestone streets and romantic canals.

10. Cinque Terre, Italy - Five colorful fishing villages perched on cliffs along the Italian Riviera.

Each of these destinations offers unique experiences, authentic culture, and fewer crowds than the major tourist cities. Plan your visit during shoulder season for the best experience!`,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Travel Expert",
    category: "Europe",
    readTime: "8 min read",
    published: true,
    tags: ["europe", "hidden gems", "travel tips", "destinations"]
  },
  {
    title: "Ultimate Guide to Backpacking Asia",
    excerpt: "Everything you need to know about backpacking through Asia on a budget.",
    content: `Asia is a backpacker's paradise, offering incredible experiences at affordable prices. Whether you're exploring ancient temples, relaxing on pristine beaches, or tasting exotic street food, Asia has something for every traveler.

**Planning Your Route**
Start with Southeast Asia if you're new to backpacking. Thailand, Vietnam, Cambodia, and Laos offer excellent infrastructure for travelers, affordable accommodation, and amazing food.

**Budget Tips**
- Stay in hostels or guesthouses ($5-15 per night)
- Eat street food and local restaurants ($2-5 per meal)
- Use local transportation (buses, trains, tuk-tuks)
- Book flights in advance for better deals
- Travel during shoulder season for lower prices

**Must-Visit Destinations**
1. Bangkok, Thailand - Vibrant street life, temples, and incredible food
2. Hanoi, Vietnam - Rich history, French colonial architecture, and amazing coffee
3. Siem Reap, Cambodia - Home to the magnificent Angkor Wat temples
4. Luang Prabang, Laos - Peaceful riverside town with Buddhist monasteries
5. Bali, Indonesia - Beautiful beaches, rice terraces, and spiritual culture

**Safety Tips**
- Keep copies of important documents
- Get travel insurance
- Stay aware of your surroundings
- Trust your instincts
- Connect with other travelers

**What to Pack**
- Lightweight backpack (40-50L)
- Quick-dry clothing
- Universal adapter
- First aid kit
- Water bottle with filter
- Headlamp
- Padlock for lockers

**Cultural Considerations**
Respect local customs and dress codes, especially when visiting temples. Learn basic phrases in the local language. Be mindful of cultural differences and always ask before taking photos of people.

Backpacking Asia is an adventure of a lifetime that will challenge you, inspire you, and leave you with unforgettable memories!`,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Adventure Seeker",
    category: "Asia",
    readTime: "10 min read",
    published: true,
    tags: ["asia", "backpacking", "budget travel", "adventure"]
  },
  {
    title: "Best Time to Visit Santorini",
    excerpt: "Plan your perfect Santorini vacation with our comprehensive guide to the island's seasons.",
    content: `Santorini is one of Greece's most iconic destinations, famous for its white-washed buildings, blue-domed churches, and spectacular sunsets. But when is the best time to visit this stunning island?

**Peak Season (June-August)**
Summer is the busiest time in Santorini. The weather is hot and sunny, perfect for beach days and swimming. However, expect large crowds, higher prices, and fully booked hotels. Book well in advance if visiting during these months.

Pros:
- Perfect beach weather
- Long sunny days
- Vibrant nightlife
- All attractions open

Cons:
- Very crowded
- High prices
- Extremely hot (30-35°C)
- Difficult to find accommodation

**Shoulder Season (April-May, September-October)**
This is arguably the best time to visit Santorini. The weather is still beautiful, but the crowds are smaller and prices are more reasonable.

Spring (April-May):
- Mild temperatures (20-25°C)
- Wildflowers in bloom
- Easter celebrations
- Lower prices than summer

Fall (September-October):
- Warm sea temperatures
- Fewer tourists
- Beautiful sunsets
- Wine harvest season

**Low Season (November-March)**
Winter in Santorini is quiet, with many hotels and restaurants closed. However, it offers a unique perspective on local life.

Pros:
- Very affordable
- Authentic local experience
- No crowds
- Mild winter weather

Cons:
- Many businesses closed
- Cooler temperatures
- Occasional rain
- Limited ferry schedules

**Best Time for Different Activities**

Wine Tasting: August-September (harvest season)
Photography: April-May or September-October (golden light, fewer people)
Hiking: April-May or October-November (comfortable temperatures)
Swimming: June-September (warmest water)
Budget Travel: November-March (lowest prices)

**Our Recommendation**
For the perfect balance of good weather, manageable crowds, and reasonable prices, visit Santorini in late April-May or September-early October. You'll enjoy beautiful weather, experience the island's charm without the summer chaos, and save money on accommodation and activities.

No matter when you visit, Santorini's breathtaking beauty and romantic atmosphere will leave you spellbound!`,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Greece Specialist",
    category: "Greece",
    readTime: "7 min read",
    published: true,
    tags: ["santorini", "greece", "travel planning", "best time to visit"]
  },
  {
    title: "Adventure Travel: Hiking the Swiss Alps",
    excerpt: "Experience the thrill of hiking through some of the world's most spectacular mountain scenery.",
    content: `The Swiss Alps offer some of the most breathtaking hiking experiences in the world. From gentle valley walks to challenging mountain ascents, there's a trail for every level of hiker.

**Top Hiking Regions**

1. Zermatt
Home to the iconic Matterhorn, Zermatt offers countless hiking trails with stunning mountain views. The car-free village is a perfect base for alpine adventures.

Must-do hikes:
- Five Lakes Walk (2.5 hours, easy)
- Gornergrat to Riffelberg (3 hours, moderate)
- Höhbalmen Trail (4 hours, moderate)

2. Jungfrau Region
This UNESCO World Heritage site features dramatic peaks, glaciers, and alpine meadows.

Must-do hikes:
- Männlichen to Kleine Scheidegg (1.5 hours, easy)
- First to Bachalpsee (1 hour, easy)
- Schynige Platte Panorama Trail (3 hours, moderate)

3. Engadine Valley
Known for its pristine lakes and charming villages, the Engadine offers diverse hiking opportunities.

Must-do hikes:
- Muottas Muragl Panorama Trail (2 hours, easy)
- Diavolezza to Morteratsch Glacier (3 hours, moderate)
- Swiss National Park trails (various difficulties)

**When to Go**
The best hiking season is June to September when trails are snow-free and mountain huts are open. July and August are busiest but offer the most reliable weather.

**What to Pack**
- Sturdy hiking boots
- Layered clothing (weather changes quickly)
- Rain jacket and warm layer
- Sun protection (hat, sunglasses, sunscreen)
- Water and snacks
- First aid kit
- Map and compass/GPS
- Swiss Army knife

**Safety Tips**
- Check weather forecasts before setting out
- Start early to avoid afternoon thunderstorms
- Stay on marked trails
- Tell someone your hiking plans
- Carry emergency contact numbers
- Know your limits and turn back if conditions worsen

**Mountain Huts**
Swiss mountain huts (SAC huts) offer accommodation and meals along many trails. Book in advance during peak season. They're a great way to experience alpine hospitality and extend your hiking adventures.

**Transportation**
Switzerland's excellent public transportation system makes hiking easy. Many trails are accessible by train, cable car, or gondola. The Swiss Travel Pass offers unlimited travel on most routes.

**Difficulty Levels**
- T1 (Easy): Well-maintained paths, suitable for all
- T2 (Mountain hiking): Clear trails, some steep sections
- T3 (Demanding): Exposed sections, sure-footedness required
- T4-T6 (Alpine routes): Technical skills and equipment needed

Whether you're seeking gentle walks with panoramic views or challenging alpine ascents, the Swiss Alps deliver unforgettable hiking experiences. The combination of stunning scenery, excellent infrastructure, and Swiss hospitality makes it a hiker's paradise!`,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Mountain Guide",
    category: "Adventure",
    readTime: "9 min read",
    published: true,
    tags: ["hiking", "swiss alps", "adventure", "mountains"]
  },
  {
    title: "Romantic Getaways: Paris for Couples",
    excerpt: "Discover the most romantic experiences in the City of Love.",
    content: `Paris has earned its reputation as the world's most romantic city. From intimate cafés to stunning architecture, every corner of Paris seems designed for romance.

**Most Romantic Spots**

1. Eiffel Tower at Sunset
Watch the city light up as the sun sets, then stay for the sparkling light show that occurs every hour after dark. Book a table at Le Jules Verne restaurant inside the tower for an unforgettable dining experience.

2. Montmartre
Wander the charming cobblestone streets of this artistic neighborhood. Visit Sacré-Cœur Basilica for panoramic city views, then enjoy a portrait by a street artist in Place du Tertre.

3. Seine River Cruise
A sunset cruise along the Seine offers magical views of Paris's illuminated monuments. Many cruises include dinner and champagne for the ultimate romantic experience.

4. Luxembourg Gardens
Stroll hand-in-hand through these beautiful gardens, rent a small sailboat for the pond, or simply relax on the iconic green chairs.

5. Pont des Arts
While the love locks have been removed, this pedestrian bridge still offers beautiful views and a romantic atmosphere.

**Romantic Restaurants**

Le Comptoir du Relais
Intimate bistro in Saint-Germain-des-Prés serving classic French cuisine.

L'Ambroisie
Three-Michelin-star restaurant in Place des Vosges for a special occasion.

Le Coupe-Chou
Medieval cellar restaurant with candlelit ambiance and traditional French dishes.

**Romantic Activities**

Picnic in the Park
Buy fresh bread, cheese, wine, and pastries from local shops and enjoy a picnic in Champ de Mars or Parc des Buttes-Chaumont.

Visit Versailles
Take a day trip to the magnificent Palace of Versailles and stroll through its romantic gardens.

Explore Le Marais
This historic district offers charming streets, vintage shops, and cozy cafés perfect for couples.

Attend a Show
Experience the glamour of Moulin Rouge or enjoy a classical concert at Sainte-Chapelle.

**Best Time to Visit**
Spring (April-May) and fall (September-October) offer pleasant weather and fewer crowds. Winter can be magical with Christmas markets and festive decorations.

**Romantic Hotels**

Budget: Hotel des Grandes Écoles (Latin Quarter)
Mid-range: Hotel Fabric (Marais)
Luxury: Le Meurice (near Louvre)

**Tips for Couples**

- Learn a few French phrases (locals appreciate the effort)
- Book restaurants in advance
- Wear comfortable shoes for walking
- Visit popular sites early morning or late evening
- Get lost in the side streets (that's where the magic happens)
- Share a crêpe from a street vendor
- Kiss under the Eiffel Tower (it's tradition!)

**Hidden Romantic Gems**

Musée Rodin Gardens
Beautiful sculpture garden perfect for a peaceful stroll.

Canal Saint-Martin
Trendy neighborhood with tree-lined canals and hip cafés.

Parc des Buttes-Chaumont
Less touristy park with a romantic temple overlooking the city.

Paris is more than just a destination; it's an experience that celebrates love in all its forms. Whether it's your honeymoon, anniversary, or just a romantic escape, Paris will capture your hearts!`,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Romance Travel Writer",
    category: "Romance",
    readTime: "8 min read",
    published: true,
    tags: ["paris", "romance", "couples", "honeymoon"]
  },
  {
    title: "Cultural Immersion in Kyoto",
    excerpt: "Experience authentic Japanese culture in Japan's ancient capital.",
    content: `Kyoto, Japan's former imperial capital, is a city where ancient traditions seamlessly blend with modern life. With over 2,000 temples, traditional gardens, and preserved geisha districts, Kyoto offers an unparalleled cultural experience.

**Must-Visit Temples and Shrines**

1. Fushimi Inari Shrine
Famous for its thousands of vermillion torii gates creating tunnels up the mountain. Arrive early morning to avoid crowds and enjoy the mystical atmosphere.

2. Kinkaku-ji (Golden Pavilion)
This stunning gold-leaf covered temple reflected in the pond is one of Japan's most iconic images.

3. Kiyomizu-dera
Built on a hillside, this wooden temple offers spectacular views of Kyoto, especially during cherry blossom and autumn foliage seasons.

4. Ryoan-ji
Home to Japan's most famous rock garden, perfect for meditation and contemplation.

**Traditional Experiences**

Tea Ceremony
Participate in a traditional tea ceremony to understand the philosophy of "ichi-go ichi-e" (one time, one meeting). Many tea houses offer ceremonies for visitors.

Geisha District (Gion)
Stroll through Gion's historic streets in the evening for a chance to spot geishas and maikos heading to appointments. Remember to be respectful and ask before taking photos.

Kimono Rental
Rent a kimono for the day and explore Kyoto's temples and gardens in traditional attire. Many rental shops offer hair styling and photo services.

Zen Meditation
Several temples offer zazen (seated meditation) sessions for visitors, providing insight into Buddhist practices.

**Traditional Crafts**

Kyoto is renowned for its traditional crafts:
- Kyo-yuzen (silk dyeing)
- Kiyomizu-yaki (pottery)
- Nishijin-ori (textile weaving)
- Japanese paper making

Visit workshops to see artisans at work and try your hand at these ancient crafts.

**Seasonal Highlights**

Spring (March-April)
Cherry blossoms transform the city into a pink wonderland. Visit Maruyama Park and Philosopher's Path for spectacular hanami (flower viewing).

Summer (June-August)
Experience summer festivals and enjoy kaiseki (traditional multi-course) dining on riverside terraces.

Autumn (October-November)
Fall foliage creates stunning red and gold landscapes. Tofuku-ji and Eikando temples are particularly beautiful.

Winter (December-February)
Fewer tourists, snow-dusted temples, and illumination events create a magical atmosphere.

**Food Culture**

Kyoto cuisine (Kyo-ryori) emphasizes seasonal ingredients and beautiful presentation:

- Kaiseki: Multi-course haute cuisine
- Shojin-ryori: Buddhist vegetarian cuisine
- Yudofu: Tofu hot pot
- Obanzai: Traditional home-style dishes
- Matcha desserts: Green tea sweets and treats

**Day Trips**

Arashiyama Bamboo Grove
Walk through towering bamboo forests and visit the monkey park for city views.

Nara
Feed friendly deer and visit Todai-ji temple with its giant Buddha statue (45 minutes by train).

**Practical Tips**

- Buy a bus day pass for unlimited travel
- Visit popular sites early morning or late afternoon
- Remove shoes when entering temples and traditional buildings
- Respect photography restrictions
- Learn basic Japanese phrases
- Stay in a traditional ryokan for the full experience

**Best Areas to Stay**

Gion: Traditional atmosphere, close to temples
Downtown: Modern amenities, shopping, nightlife
Arashiyama: Peaceful, nature-focused
Kyoto Station: Convenient for day trips

**Cultural Etiquette**

- Bow when greeting
- Don't eat while walking
- Speak quietly in public spaces
- Follow temple and shrine protocols
- Respect geisha privacy

Kyoto offers a rare opportunity to experience authentic Japanese culture. Take your time, embrace the slower pace, and allow yourself to be transported to ancient Japan. The memories and insights gained from cultural immersion in Kyoto will stay with you forever.`,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Cultural Explorer",
    category: "Culture",
    readTime: "10 min read",
    published: true,
    tags: ["kyoto", "japan", "culture", "temples", "traditions"]
  }
];

async function seedBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Blog.deleteMany({});
    console.log("🗑️  Cleared existing blogs");

    const blogs = await Blog.insertMany(sampleBlogs);
    console.log(`✅ Successfully seeded ${blogs.length} blog posts`);

    console.log("\n📝 Seeded blogs:");
    blogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (${blog.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding blogs:", error);
    process.exit(1);
  }
}

seedBlogs();
