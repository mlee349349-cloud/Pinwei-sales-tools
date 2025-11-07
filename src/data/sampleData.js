export const recentFabrics = [
  {
    id: '1',
    name: 'Premium Wool Blend',
    price: '$45 / m',
    image: 'https://images.unsplash.com/photo-1586287004271-2b2d0c6a3b3c?w=400',
    tags: ['Warm', 'Wool', 'Durable'],
    description: 'A luxurious wool blend perfect for winter garments with excellent insulation properties.',
    pros: ['Excellent warmth retention', 'Durable and long-lasting', 'Natural breathability', 'Wrinkle-resistant'],
    cons: ['Requires dry cleaning', 'Can be itchy for sensitive skin'],
  },
  {
    id: '2',
    name: 'Silk Chiffon',
    price: '$28 / m',
    image: 'https://images.unsplash.com/photo-1586287004271-2b2d0c6a3b3c?w=400',
    tags: ['Lightweight', 'Silky', 'Elegant'],
    description: 'Delicate and flowing silk chiffon ideal for elegant evening wear and special occasions.',
    pros: ['Lightweight and airy', 'Beautiful drape', 'Luxurious feel', 'Perfect for formal wear'],
    cons: ['Delicate - requires careful handling', 'Can be expensive'],
  },
  {
    id: '3',
    name: 'Organic Cotton Twill',
    price: '$22 / m',
    image: 'https://images.unsplash.com/photo-1586287004271-2b2d0c6a3b3c?w=400',
    tags: ['Breathable', 'Sustainable', 'Soft'],
    description: 'Eco-friendly organic cotton twill with a soft, comfortable feel perfect for everyday wear.',
    pros: ['Environmentally friendly', 'Very soft to touch', 'Breathable fabric', 'Easy to care for'],
    cons: ['Can wrinkle easily', 'May shrink if not cared for properly'],
  },
  {
    id: '4',
    name: 'Linen Blend',
    price: '$35 / m',
    image: 'https://images.unsplash.com/photo-1586287004271-2b2d0c6a3b3c?w=400',
    tags: ['Breathable', 'Summer', 'Natural'],
    description: 'Lightweight linen blend perfect for warm weather garments with natural cooling properties.',
    pros: ['Excellent for hot weather', 'Natural and breathable', 'Eco-friendly', 'Durable'],
    cons: ['Wrinkles easily', 'Can feel stiff initially'],
  },
];

export const matchedFabrics = [
  ...recentFabrics,
  {
    id: '5',
    name: 'Cashmere Blend',
    price: '$85 / m',
    image: 'https://images.unsplash.com/photo-1586287004271-2b2d0c6a3b3c?w=400',
    tags: ['Luxury', 'Warm', 'Soft'],
    description: 'Ultra-soft cashmere blend offering unparalleled comfort and warmth.',
    pros: ['Extremely soft', 'Excellent warmth', 'Lightweight', 'Luxurious feel'],
    cons: ['Premium pricing', 'Requires delicate care'],
  },
  {
    id: '6',
    name: 'Structured Denim',
    price: '$32 / m',
    image: 'https://images.unsplash.com/photo-1586287004271-2b2d0c6a3b3c?w=400',
    tags: ['Structured', 'Durable', 'Casual'],
    description: 'Heavy-weight structured denim perfect for jackets and casual wear.',
    pros: ['Very durable', 'Structured appearance', 'Timeless style', 'Easy maintenance'],
    cons: ['Can be stiff', 'May fade over time'],
  },
];

export const savedProposals = [
  recentFabrics[0],
  recentFabrics[1],
];

