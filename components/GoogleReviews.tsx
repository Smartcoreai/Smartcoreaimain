import { Star, Quote } from "lucide-react";

// Static reviews — replace with real Google Places API data if desired
const REVIEWS = [
  {
    name: "Sarah M.",
    business: "Bloom Florist",
    rating: 5,
    text: "SmartcoreAI set up our chatbot in 2 days. It now handles 60% of our customer questions automatically. My team finally has time to focus on actual work.",
    avatar: "SM",
    date: "2 weeks ago",
  },
  {
    name: "Carlos R.",
    business: "TechFix Repairs",
    rating: 5,
    text: "The workflow automation they built saves me 10 hours a week on invoicing and follow-ups. Best investment I've made for the business.",
    avatar: "CR",
    date: "1 month ago",
  },
  {
    name: "Linda K.",
    business: "Coastal Realty",
    rating: 5,
    text: "Their analytics dashboard finally gave us visibility into what listings perform. We closed 30% more deals last quarter.",
    avatar: "LK",
    date: "3 weeks ago",
  },
  {
    name: "James T.",
    business: "Tasty Bites Cafe",
    rating: 5,
    text: "Setup was shockingly easy. The AI chatbot handles reservations and FAQs overnight while we sleep. Customers love the instant responses.",
    avatar: "JT",
    date: "1 month ago",
  },
  {
    name: "Priya S.",
    business: "Studio Glow",
    rating: 5,
    text: "Tried other AI tools before — none of them worked for a small business like mine. SmartcoreAI actually listened to what I needed and delivered.",
    avatar: "PS",
    date: "2 months ago",
  },
  {
    name: "Mark D.",
    business: "Peak Fitness",
    rating: 4,
    text: "Onboarding was smooth and the team was responsive. The automation reduced our no-show rate significantly. Highly recommend.",
    avatar: "MD",
    date: "3 months ago",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section id="reviews" className="section bg-gray-50">
      <div className="container-max mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Customer Reviews</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by small businesses</h2>

          {/* Google badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm mt-4">
            <svg viewBox="0 0 48 48" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.6 30.2 0 24 0 14.7 0 6.7 5.4 2.6 13.3l7.8 6.1C12.4 13 17.8 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.2 7-17.1z"/>
              <path fill="#FBBC05" d="M10.4 28.6c-.6-1.7-.9-3.6-.9-5.5s.3-3.8.9-5.5l-7.8-6.1C.9 14.9 0 19.4 0 24s.9 9.1 2.6 12.5l7.8-5.9z"/>
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.2-8.3 2.2-6.2 0-11.6-4.2-13.5-9.9l-7.8 5.9C6.7 42.6 14.7 48 24 48z"/>
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg">{avg}</span>
                <Stars rating={5} />
              </div>
              <div className="text-xs text-gray-500">{REVIEWS.length} Google Reviews</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="card hover:shadow-md transition-shadow relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-100" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.business}</div>
                </div>
              </div>
              <Stars rating={r.rating} />
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="text-xs text-gray-400 mt-3">{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
