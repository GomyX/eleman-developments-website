export interface Project {
  id: string;
  slug: string;
  name: {
    ar: string;
    en: string;
  };
  location: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  shortDescription: {
    ar: string;
    en: string;
  };
  startingPrice: number;
  deliveryDate: string;
  status: 'under-construction' | 'ready-for-delivery' | 'planning';
  totalUnits: number;
  projectArea: number; // in square meters
  images: string[];
  amenities: {
    ar: string[];
    en: string[];
  };
  unitTypes: {
    type: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
    startingPrice: number;
  }[];
  masterPlan: {
    ar: string;
    en: string;
  };
  paymentPlans: {
    name: string;
    downPayment: number;
    installments: number;
    description: string;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'saffron-gardens',
    name: {
      ar: 'حدائق الزعفران',
      en: 'Saffron Gardens'
    },
    location: {
      ar: 'مدينة نصر الجديدة، القاهرة',
      en: 'New Cairo, Cairo'
    },
    description: {
      ar: 'مشروع سكني فاخر في قلب مدينة نصر الجديدة، يجمع بين الأناقة المعمارية والراحة العائلية. يوفر المشروع مجموعة متنوعة من الوحدات السكنية مع مرافق متكاملة ومساحات خضراء واسعة.',
      en: 'A luxury residential project in the heart of New Cairo, combining architectural elegance with family comfort. The project offers a variety of residential units with integrated facilities and extensive green spaces.'
    },
    shortDescription: {
      ar: 'مشروع سكني فاخر في مدينة نصر الجديدة مع مرافق متكاملة',
      en: 'Luxury residential project in New Cairo with integrated facilities'
    },
    startingPrice: 2500000,
    deliveryDate: '2025-12-31',
    status: 'under-construction',
    totalUnits: 450,
    projectArea: 85000,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
    ],
    amenities: {
      ar: [
        'مسبح أولمبي',
        'صالة رياضية متكاملة',
        'حديقة أطفال',
        'مطاعم وكافيهات',
        'مركز تجاري',
        'مدرسة دولية',
        'مستشفى خاص',
        'نادي اجتماعي'
      ],
      en: [
        'Olympic Swimming Pool',
        'Integrated Gym',
        'Children\'s Garden',
        'Restaurants & Cafes',
        'Shopping Center',
        'International School',
        'Private Hospital',
        'Social Club'
      ]
    },
    unitTypes: [
      {
        type: 'شقة 2 غرفة',
        area: 120,
        bedrooms: 2,
        bathrooms: 2,
        startingPrice: 2500000
      },
      {
        type: 'شقة 3 غرفة',
        area: 150,
        bedrooms: 3,
        bathrooms: 2,
        startingPrice: 3200000
      },
      {
        type: 'دوبلكس 4 غرفة',
        area: 200,
        bedrooms: 4,
        bathrooms: 3,
        startingPrice: 4500000
      }
    ],
    masterPlan: {
      ar: 'المخطط العام للمشروع يتضمن 12 برج سكني مع مرافق متكاملة ومساحات خضراء تشكل 40% من إجمالي مساحة المشروع.',
      en: 'The master plan includes 12 residential towers with integrated facilities and green spaces covering 40% of the total project area.'
    },
    paymentPlans: [
      {
        name: 'الدفعة المقدمة 10%',
        downPayment: 10,
        installments: 60,
        description: 'دفعة مقدمة 10% والباقي على 60 شهر'
      },
      {
        name: 'الدفعة المقدمة 20%',
        downPayment: 20,
        installments: 48,
        description: 'دفعة مقدمة 20% والباقي على 48 شهر'
      }
    ],
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    featured: true
  },
  {
    id: '2',
    slug: 'golden-sands-resort',
    name: {
      ar: 'منتجع الرمال الذهبية',
      en: 'Golden Sands Resort'
    },
    location: {
      ar: 'الساحل الشمالي، مصر',
      en: 'North Coast, Egypt'
    },
    description: {
      ar: 'منتجع سكني فاخر على الساحل الشمالي، يوفر إطلالات خلابة على البحر الأبيض المتوسط. المشروع يجمع بين الفخامة والراحة مع مرافق ترفيهية متكاملة.',
      en: 'A luxury residential resort on the North Coast, offering stunning views of the Mediterranean Sea. The project combines luxury and comfort with integrated recreational facilities.'
    },
    shortDescription: {
      ar: 'منتجع فاخر على الساحل الشمالي مع إطلالات بحرية خلابة',
      en: 'Luxury resort on the North Coast with stunning sea views'
    },
    startingPrice: 3500000,
    deliveryDate: '2026-06-30',
    status: 'planning',
    totalUnits: 280,
    projectArea: 120000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop'
    ],
    amenities: {
      ar: [
        'شاطئ خاص',
        'مسبح لاجوني',
        'مرسى للقوارب',
        'ملعب جولف',
        'سبا ومركز صحي',
        'مطاعم بحرية',
        'نادي شاطئي',
        'مركز مائي'
      ],
      en: [
        'Private Beach',
        'Lagoon Pool',
        'Marina',
        'Golf Course',
        'Spa & Wellness Center',
        'Seafood Restaurants',
        'Beach Club',
        'Water Sports Center'
      ]
    },
    unitTypes: [
      {
        type: 'شاليه 2 غرفة',
        area: 80,
        bedrooms: 2,
        bathrooms: 2,
        startingPrice: 3500000
      },
      {
        type: 'فيلا 3 غرفة',
        area: 150,
        bedrooms: 3,
        bathrooms: 3,
        startingPrice: 5500000
      },
      {
        type: 'فيلا 4 غرفة',
        area: 200,
        bedrooms: 4,
        bathrooms: 4,
        startingPrice: 7500000
      }
    ],
    masterPlan: {
      ar: 'المخطط العام يتضمن فيلات وشاليهات متناثرة على مساحة 120 ألف متر مربع مع شاطئ خاص بطول 500 متر.',
      en: 'The master plan includes villas and chalets spread over 120,000 square meters with a 500-meter private beach.'
    },
    paymentPlans: [
      {
        name: 'الدفعة المقدمة 15%',
        downPayment: 15,
        installments: 72,
        description: 'دفعة مقدمة 15% والباقي على 72 شهر'
      },
      {
        name: 'الدفعة المقدمة 25%',
        downPayment: 25,
        installments: 60,
        description: 'دفعة مقدمة 25% والباقي على 60 شهر'
      }
    ],
    coordinates: {
      lat: 31.2357,
      lng: 29.9857
    },
    featured: true
  },
  {
    id: '3',
    slug: 'emerald-heights',
    name: {
      ar: 'مرتفعات الزمرد',
      en: 'Emerald Heights'
    },
    location: {
      ar: 'مدينة الشيخ زايد، الجيزة',
      en: 'Sheikh Zayed City, Giza'
    },
    description: {
      ar: 'مجمع أبراج سكنية فاخرة في مدينة الشيخ زايد، يوفر إطلالات بانورامية على المدينة. المشروع مصمم بأحدث التقنيات والمواد العالية الجودة.',
      en: 'A luxury residential tower complex in Sheikh Zayed City, offering panoramic city views. The project is designed with the latest technologies and high-quality materials.'
    },
    shortDescription: {
      ar: 'أبراج سكنية فاخرة في الشيخ زايد مع إطلالات بانورامية',
      en: 'Luxury residential towers in Sheikh Zayed with panoramic views'
    },
    startingPrice: 1800000,
    deliveryDate: '2025-09-30',
    status: 'under-construction',
    totalUnits: 320,
    projectArea: 65000,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
    ],
    amenities: {
      ar: [
        'مسبح على السطح',
        'صالة رياضية 24/7',
        'مطعم فاخر',
        'حديقة معلقة',
        'مركز تجاري',
        'موقف سيارات تحت الأرض',
        'نظام أمان متطور',
        'خدمة الكونسيرج'
      ],
      en: [
        'Rooftop Pool',
        '24/7 Gym',
        'Fine Dining Restaurant',
        'Hanging Garden',
        'Shopping Center',
        'Underground Parking',
        'Advanced Security System',
        'Concierge Service'
      ]
    },
    unitTypes: [
      {
        type: 'استوديو',
        area: 60,
        bedrooms: 1,
        bathrooms: 1,
        startingPrice: 1800000
      },
      {
        type: 'شقة 2 غرفة',
        area: 100,
        bedrooms: 2,
        bathrooms: 2,
        startingPrice: 2500000
      },
      {
        type: 'شقة 3 غرفة',
        area: 140,
        bedrooms: 3,
        bathrooms: 2,
        startingPrice: 3500000
      }
    ],
    masterPlan: {
      ar: 'المخطط العام يتضمن 4 أبراج سكنية بارتفاعات مختلفة مع مرافق مشتركة ومساحات خضراء في الطوابق العليا.',
      en: 'The master plan includes 4 residential towers of varying heights with shared facilities and green spaces on upper floors.'
    },
    paymentPlans: [
      {
        name: 'الدفعة المقدمة 10%',
        downPayment: 10,
        installments: 48,
        description: 'دفعة مقدمة 10% والباقي على 48 شهر'
      },
      {
        name: 'الدفعة المقدمة 20%',
        downPayment: 20,
        installments: 36,
        description: 'دفعة مقدمة 20% والباقي على 36 شهر'
      }
    ],
    coordinates: {
      lat: 30.0444,
      lng: 30.9756
    },
    featured: true
  }
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}