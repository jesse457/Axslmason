// resources/js/constants/data.ts

export const CATEGORIES = [
    { id: 1, name: 'Power Tools', slug: 'power-tools', products_count: 124 },
    { id: 2, name: 'Welding', slug: 'welding', products_count: 42 },
    { id: 3, name: 'Air Tools', slug: 'air-tools', products_count: 18 },
    { id: 4, name: 'Outdoor Power', slug: 'outdoor-power', products_count: 56 },
    { id: 5, name: 'Cleaning Equipment', slug: 'cleaning-equipment', products_count: 29 },
    { id: 6, name: 'Storage & Boxes', slug: 'storage', products_count: 31 },
];

export const BRANDS = ['ProForce', 'TitanMax', 'IronCraft', 'VoltPro', 'AquaJet'];

export const PRODUCTS = [
    {
        id: 1,
        name: 'ProForce 20V Cordless Drill Kit with 2 Batteries',
        brand: 'ProForce',
        category: 'Power Tools',
        price: 189.99,
        original_price: 249.99,
        discount: 24,
        slug: 'drill-kit',
        in_stock: true,
        rating: 4.8,
        reviews: 342,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
        ],
        description: "Equip your workshop with the ultimate power and versatility. The ProForce 20V Cordless Drill Kit delivers up to 500 in-lbs of torque. Features a compact, lightweight design that fits into tight areas.",
        features: [
            "High-performance brushless motor",
            "2-speed transmission (0-400 / 0-1,500 RPM)",
            "1/2 in. heavy-duty ratcheting chuck",
            "Includes 2x 2.0Ah 20V Lithium-Ion batteries"
        ]
    },
    {
        id: 2,
        name: 'TitanMax 7-1/4" Magnesium Circular Saw',
        brand: 'TitanMax',
        category: 'Power Tools',
        price: 159.99,
        original_price: 199.99,
        discount: 20,
        slug: 'circular-saw',
        in_stock: true,
        rating: 4.6,
        reviews: 218,
        image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'],
        description: "The TitanMax Circular Saw features magnesium construction for a lightweight tool that stays durable on the job site.",
        features: ["15 Amp motor", "5,800 RPM", "56-degree bevel capacity", "Integrated dust blower"]
    },
    {
        id: 3,
        name: 'VoltPro MIG 200 Multi-Process Welder',
        brand: 'VoltPro',
        category: 'Welding',
        price: 549.99,
        original_price: 699.99,
        discount: 21,
        slug: 'mig-welder',
        in_stock: true,
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1533604101037-90fb4481005a?auto=format&fit=crop&w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1533604101037-90fb4481005a?auto=format&fit=crop&w=800&q=80'],
        description: "Professional grade multi-process welder capable of MIG, Stick, and TIG welding.",
        features: ["Dual voltage 120V/230V", "Inverter technology", "Digital display", "Synergic control"]
    },
    {
        id: 4,
        name: 'AquaJet 3000 PSI Gas Pressure Washer',
        brand: 'AquaJet',
        category: 'Cleaning Equipment',
        price: 299.99,
        original_price: 349.99,
        discount: 14,
        slug: 'pressure-washer',
        in_stock: true,
        rating: 4.7,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'],
        description: "Blast away grime with the AquaJet gas-powered pressure washer. Perfect for driveways and siding.",
        features: ["2.5 GPM flow rate", "Maintenance-free pump", "5 quick-connect tips", "Heavy-duty steel frame"]
    },
    {
        id: 5,
        name: 'IronCraft 4-1/2 in. Angle Grinder',
        brand: 'IronCraft',
        category: 'Power Tools',
        price: 49.99,
        original_price: 64.99,
        discount: 23,
        slug: 'angle-grinder',
        in_stock: true,
        rating: 4.5,
        reviews: 512,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80', // Reusing drill for demo
        gallery: [],
        description: "Compact and powerful grinder for cutting, grinding and polishing metal.",
        features: ["6.0 Amp motor", "11,000 RPM", "Two-position side handle", "Tool-free guard"]
    },
    {
        id: 6,
        name: 'TitanMax Self-Propelled Lawn Mower',
        brand: 'TitanMax',
        category: 'Outdoor Power',
        price: 399.99,
        original_price: 459.99,
        discount: 13,
        slug: 'lawn-mower',
        in_stock: false,
        rating: 4.8,
        reviews: 204,
        image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=800&q=80',
        gallery: [],
        description: "Take the effort out of lawn care with our premium self-propelled mower.",
        features: ["21-inch steel deck", "Rear wheel drive", "3-in-1 mulch/bag/discharge", "7 height positions"]
    }
];

export const FOOTER_LINKS = {
    shop: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products?sort=newest' },
        { name: 'Sale', href: '/products?on_sale=true' },
        { name: 'Brands', href: '#' },
    ],
    support: [
        { name: 'Shipping Policy', href: '#' },
        { name: 'Returns & Refunds', href: '#' },
        { name: 'Track Order', href: '#' },
        { name: 'FAQ', href: '#' },
    ],
    company: [
        { name: 'About AUGIMEN', href: '#' },
        { name: 'Store Locator', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact Us', href: '#' },
    ]
};
