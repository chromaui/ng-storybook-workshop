export interface Donut {
  id?: string;
  name: string;
  icon: string; // 'caramel-swirl', 'glazed-fudge', 'just-chocolate', 'sour-supreme', 'strawberry-glaze', 'vanilla-sundae', 'zesty-lemon'
  price: number;
  promo?: 'new' | 'limited';
  description: string;
}
