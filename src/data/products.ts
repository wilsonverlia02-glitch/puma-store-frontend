export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  colors: string[];
  sizes: string[];
  soldOutSizes?: string[];
  images: string[];
  description: string;
  stock: 'In Stock' | 'Low Stock' | 'Sold Out';
  badge: string;
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
}

export interface SizeChartRow {
  uk: number;
  eur: number;
  us: number;
  cm: number;
}

export const sizeChart: SizeChartRow[] = [
  { uk: 6, eur: 39, us: 7, cm: 24.5 },
  { uk: 7, eur: 40, us: 8, cm: 25.5 },
  { uk: 8, eur: 42, us: 9, cm: 26.5 },
  { uk: 9, eur: 43, us: 10, cm: 27.5 },
  { uk: 10, eur: 44, us: 11, cm: 28.5 },
  { uk: 11, eur: 45, us: 12, cm: 29.5 },
];

export const colorHexMap: Record<string, string> = {
  White: '#ffffff',
  Black: '#111116',
  'Dark Green': '#1f4d3a',
  'Sky Blue': '#7ec8e3',
  Grey: '#9ca3af',
  Gold: '#d4af37',
  Navy: '#1e2a4a',
  Red: '#dc1818',
};

export const colorOptions = ['White', 'Black', 'Dark Green', 'Sky Blue', 'Grey', 'Gold', 'Navy', 'Red'];
export const categoryOptions = ['Sneakers', 'Suede Collection', 'Sports', 'New Arrivals'];
export const allSizes = ['UK6', 'UK7', 'UK8', 'UK9', 'UK10', 'UK11'];

export const products: Product[] = [
  {
    id: 1,
    name: 'Puma Speedcat White/Black Sneaker',
    price: 4500,
    originalPrice: 5500,
    category: 'Sneakers',
    colors: ['White', 'Black'],
    sizes: allSizes,
    soldOutSizes: ['UK11'],
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2562992/pexels-photo-2562992.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Classic white leather sneaker with black side stripe and Puma cat logo. Lace-up closure with cushioned sole for all-day comfort. Iconic street style that pairs with everything.',
    stock: 'In Stock',
    badge: 'Best Seller',
    rating: 4.7,
    reviewsCount: 128,
    reviews: [
      { id: 'r1', name: 'Arjun M.', rating: 5, date: '2025-05-12', text: 'Super comfortable and looks premium. Worth every rupee.' },
      { id: 'r2', name: 'Sara K.', rating: 4, date: '2025-04-28', text: 'Great fit, sole is bouncy. Color matches the photos.' },
      { id: 'r3', name: 'Rahul V.', rating: 5, date: '2025-04-10', text: 'Best sneaker I own. Goes with every outfit.' },
    ],
  },
  {
    id: 2,
    name: 'Puma Speedcat Dark Green Suede Sneaker',
    price: 5200,
    originalPrice: 6200,
    category: 'Suede Collection',
    colors: ['Dark Green'],
    sizes: allSizes,
    soldOutSizes: [],
    images: [
      'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Premium suede sneaker in dark green with white side panel and gold Puma branding. Soft textile lining and durable rubber tread sole for grip and style.',
    stock: 'In Stock',
    badge: 'New Arrival',
    rating: 4.8,
    reviewsCount: 64,
    reviews: [
      { id: 'r1', name: 'Neha P.', rating: 5, date: '2025-05-20', text: 'The suede feels luxurious. Green color is stunning in person.' },
      { id: 'r2', name: 'Karan S.', rating: 5, date: '2025-05-01', text: 'Got compliments day one. Premium finish.' },
    ],
  },
  {
    id: 3,
    name: 'Puma Speedcat Sky Blue Suede Sneaker',
    price: 4800,
    category: 'Suede Collection',
    colors: ['Sky Blue'],
    sizes: allSizes,
    soldOutSizes: ['UK6', 'UK7'],
    images: [
      'https://images.pexels.com/photos/1456736/pexels-photo-1456736.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Sky blue suede sneaker with navy accent stripe, soft textile lining, and rubber tread sole. A fresh pop of color for your rotation.',
    stock: 'Low Stock',
    badge: 'New Arrival',
    rating: 4.6,
    reviewsCount: 41,
    reviews: [
      { id: 'r1', name: 'Aisha R.', rating: 5, date: '2025-05-18', text: 'Blue is even prettier in person. Fits true to size.' },
      { id: 'r2', name: 'Dev J.', rating: 4, date: '2025-04-22', text: 'Lovely color, slightly narrow toe box.' },
    ],
  },
  {
    id: 4,
    name: 'Puma Speedcat Black Suede Sneaker',
    price: 5000,
    originalPrice: 5800,
    category: 'Suede Collection',
    colors: ['Black', 'Gold'],
    sizes: allSizes,
    soldOutSizes: [],
    images: [
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'All-black suede sneaker with white side panel and signature gold Puma logo detailing. Sleek, versatile, and built for the streets.',
    stock: 'In Stock',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 156,
    reviews: [
      { id: 'r1', name: 'Imran T.', rating: 5, date: '2025-05-25', text: 'Black on black is elite. Gold logo pops nicely.' },
      { id: 'r2', name: 'Meera L.', rating: 5, date: '2025-05-09', text: 'My third pair. Never disappoints.' },
      { id: 'r3', name: 'Zayan F.', rating: 4, date: '2025-03-30', text: 'Looks amazing, needs a bit of break-in.' },
    ],
  },
  {
    id: 5,
    name: 'Puma Speedcat Grey Suede Sneaker',
    price: 5000,
    category: 'Suede Collection',
    colors: ['Grey'],
    sizes: allSizes,
    soldOutSizes: ['UK10'],
    images: [
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Light grey suede sneaker with contrast grey stripe and reflective Puma branding. Understated elegance meets everyday comfort.',
    stock: 'In Stock',
    badge: '',
    rating: 4.5,
    reviewsCount: 38,
    reviews: [
      { id: 'r1', name: 'Priya N.', rating: 5, date: '2025-05-14', text: 'Grey goes with everything. So comfy.' },
      { id: 'r2', name: 'Aman G.', rating: 4, date: '2025-04-15', text: 'Nice muted tone, good build quality.' },
    ],
  },
  {
    id: 6,
    name: 'Puma Nitro Running Sports Shoe',
    price: 6200,
    originalPrice: 7200,
    category: 'Sports',
    colors: ['Black', 'Red'],
    sizes: allSizes,
    soldOutSizes: [],
    images: [
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'High-performance running shoe with NITRO foam midsole for responsive cushioning. Engineered mesh upper keeps your feet cool on every run.',
    stock: 'In Stock',
    badge: 'New Arrival',
    rating: 4.8,
    reviewsCount: 92,
    reviews: [
      { id: 'r1', name: 'Vikram R.', rating: 5, date: '2025-05-22', text: 'Lightest running shoe I have worn. Nitro foam is unreal.' },
      { id: 'r2', name: 'Tara M.', rating: 5, date: '2025-04-30', text: 'Perfect for my morning runs. Great support.' },
    ],
  },
  {
    id: 7,
    name: 'Puma RS-X Retro Sneaker',
    price: 5400,
    category: 'Sneakers',
    colors: ['White', 'Red'],
    sizes: allSizes,
    soldOutSizes: ['UK6'],
    images: [
      'https://images.pexels.com/photos/2562992/pexels-photo-2562992.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Bold retro-inspired silhouette with chunky sole and multi-layer upper. The RS-X brings back 80s attitude with modern comfort tech.',
    stock: 'In Stock',
    badge: '',
    rating: 4.6,
    reviewsCount: 73,
    reviews: [
      { id: 'r1', name: 'Rohit K.', rating: 5, date: '2025-05-11', text: 'Chunky in the best way. Super cushy.' },
      { id: 'r2', name: 'Anika S.', rating: 4, date: '2025-04-18', text: 'Love the retro vibe. Runs slightly big.' },
    ],
  },
  {
    id: 8,
    name: 'Puma Smash V2 Canvas Sneaker',
    price: 3200,
    originalPrice: 3900,
    category: 'Sneakers',
    colors: ['White', 'Navy'],
    sizes: allSizes,
    soldOutSizes: [],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Lightweight canvas sneaker inspired by the tennis court. Breathable upper, soft sockliner, and rubber outsole for everyday wear.',
    stock: 'In Stock',
    badge: '',
    rating: 4.4,
    reviewsCount: 210,
    reviews: [
      { id: 'r1', name: 'Sana B.', rating: 5, date: '2025-05-19', text: 'Perfect budget sneaker. Light and breezy.' },
      { id: 'r2', name: 'Faisal A.', rating: 4, date: '2025-04-25', text: 'Great value. Sole could be thicker.' },
    ],
  },
  {
    id: 9,
    name: 'Puma Ferrari Future Sneaker',
    price: 7800,
    originalPrice: 8900,
    category: 'Sports',
    colors: ['Black', 'Red', 'Gold'],
    sizes: allSizes,
    soldOutSizes: ['UK11'],
    images: [
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Collaboration with Scuderia Ferrari. Premium leather upper with Ferrari shield and Puma cat. A statement piece for motorsport fans.',
    stock: 'Low Stock',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 47,
    reviews: [
      { id: 'r1', name: 'Hassan M.', rating: 5, date: '2025-05-24', text: 'The Ferrari details are gorgeous. Premium feel.' },
      { id: 'r2', name: 'Leila J.', rating: 5, date: '2025-05-07', text: 'Gift for my brother, he was thrilled.' },
    ],
  },
  {
    id: 10,
    name: 'Puma Palermo Vintage Suede',
    price: 4600,
    category: 'Suede Collection',
    colors: ['Navy', 'White'],
    sizes: allSizes,
    soldOutSizes: [],
    images: [
      'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Retro terrace-inspired suede trainer with T-toe construction and gold foil branding. A heritage silhouette reimagined for today.',
    stock: 'In Stock',
    badge: 'New Arrival',
    rating: 4.7,
    reviewsCount: 55,
    reviews: [
      { id: 'r1', name: 'Omar D.', rating: 5, date: '2025-05-21', text: 'Terrace classic. Fits perfectly and looks sharp.' },
      { id: 'r2', name: 'Yuki T.', rating: 4, date: '2025-04-12', text: 'Beautiful suede, takes a little breaking in.' },
    ],
  },
  {
    id: 11,
    name: 'Puma Clyde Court Basketball',
    price: 6800,
    originalPrice: 7800,
    category: 'Sports',
    colors: ['Black', 'White'],
    sizes: allSizes,
    soldOutSizes: ['UK6', 'UK7'],
    images: [
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'Basketball shoe with ProFoam midsole and high-traction outsole. Supportive fit built for quick cuts and explosive jumps on the court.',
    stock: 'Low Stock',
    badge: '',
    rating: 4.5,
    reviewsCount: 31,
    reviews: [
      { id: 'r1', name: 'Jordan L.', rating: 5, date: '2025-05-15', text: 'Great court grip. Ankle support is solid.' },
      { id: 'r2', name: 'Chris P.', rating: 4, date: '2025-04-08', text: 'Good hoops shoe, runs a touch narrow.' },
    ],
  },
  {
    id: 12,
    name: 'Puma Suede Classic Burgundy',
    price: 4900,
    category: 'Suede Collection',
    colors: ['Red', 'White'],
    sizes: allSizes,
    soldOutSizes: [],
    images: [
      'https://images.pexels.com/photos/1456736/pexels-photo-1456736.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'The legendary Suede Classic in deep burgundy. Iconic Formstripe, narrow profile, and durable rubber outsole. A streetwear staple since 1968.',
    stock: 'In Stock',
    badge: 'Best Seller',
    rating: 4.8,
    reviewsCount: 184,
    reviews: [
      { id: 'r1', name: 'Maya R.', rating: 5, date: '2025-05-23', text: 'Timeless. The burgundy is so rich.' },
      { id: 'r2', name: 'Tom B.', rating: 5, date: '2025-05-02', text: 'Owned Suedes for years. This pair is flawless.' },
    ],
  },
];

export interface Category {
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const categories: Category[] = [
  {
    name: "Men's Sneakers",
    description: 'Everyday classics & street style',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'Sneakers',
  },
  {
    name: 'Suede Collection',
    description: 'Premium suede in rich tones',
    image: 'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'Suede Collection',
  },
  {
    name: 'Sports Shoes',
    description: 'Run, train & perform',
    image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'Sports',
  },
  {
    name: 'New Arrivals',
    description: 'Fresh drops & latest drops',
    image: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'New Arrivals',
  },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'The suede collection is unreal. Quality is premium and delivery was super fast. Puma Sports Store is my go-to now.',
  },
  {
    id: 2,
    name: 'Priya Reddy',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Loved the white Speedcats! The size chart helped me pick the right fit. Cash on delivery made it stress-free.',
  },
  {
    id: 3,
    name: 'Karan Mehta',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4,
    text: 'Great prices and authentic products. The Nitro running shoes shaved time off my daily runs. Highly recommend.',
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'The black suede with gold logo is gorgeous. Packaging was premium and the WhatsApp support team was so helpful.',
  },
  {
    id: 5,
    name: 'Rohan Das',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Ordered the Ferrari Future sneaker — absolute fire. The fly-to-cart animation on the site is a nice touch too!',
  },
];

export const heroSlides = [
  {
    id: 1,
    eyebrow: 'New Season Drop',
    title: 'Step Into Style',
    subtitle: 'The all-new Puma Speedcat collection. Premium suede, bold colors, unmatched comfort.',
    image: 'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=1600',
    cta: 'Shop Suede',
    link: '/shop?category=Suede+Collection',
    accent: 'from-ink-950/80 to-transparent',
  },
  {
    id: 2,
    eyebrow: 'Limited Time',
    title: 'Flat 20% Off',
    subtitle: 'Best sellers now at unbeatable prices. Use code PUMA20 at checkout. Hurry, ends soon.',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1600',
    cta: 'Grab Deals',
    link: '/shop',
    accent: 'from-brand-900/80 to-transparent',
  },
  {
    id: 3,
    eyebrow: 'Performance Edge',
    title: 'Engineered to Win',
    subtitle: 'Nitro foam, racing-inspired design. The sports collection built for athletes.',
    image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1600',
    cta: 'Shop Sports',
    link: '/shop?category=Sports',
    accent: 'from-ink-950/80 to-transparent',
  },
];
