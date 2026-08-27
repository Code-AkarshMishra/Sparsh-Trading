export type LocationData = {
  slug: string;
  name: string;
  hindiName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  distanceFromPratapgarh: string;
  localities: string[];
  serviceHighlights: string[];
  popularProjects: string[];
  localReview: {
    author: string;
    locality: string;
    quote: string;
    rating: number;
  };
  faqs: { q: string; a: string }[];
};

export const locationsDatabase: LocationData[] = [
  {
    slug: "pratapgarh",
    name: "Pratapgarh",
    hindiName: "प्रतापगढ़",
    tagline: "Headquarters & Dedicated Manufacturing Workshop in Pratapgarh",
    metaTitle: "Steel Fabrication, uPVC Windows & Modular Kitchen in Pratapgarh | Sparsh Trading",
    metaDescription: "#1 architectural metal fabrication in Pratapgarh. Tata steel door frames (Chaukhat), soundproof uPVC sliding windows, toughened glass railings & modular kitchens. Visit workshop.",
    headline: "Architectural Steel, uPVC Windows & Modular Kitchen Hub in Pratapgarh",
    distanceFromPratapgarh: "Central Workshop & Showroom (Meera Bhawan / Ashtbhuja Nagar)",
    localities: [
      "Meera Bhawan Chauraha", "Civil Lines", "Katra Road", "Ajeet Nagar",
      "City Road", "Bela Pratapgarh", "Sagra Dhalayi", "Patti", "Kunda",
      "Lalganj Ajhara", "Raniganj", "Sangramgarh", "Kohndaur", "Mandhata"
    ],
    serviceHighlights: [
      "Same-day on-site laser measurement across Pratapgarh city",
      "Direct workshop fabrication with zero third-party middleman markup",
      "Extensive stock of Tata Structura steel, PPGI frames, and lead-free uPVC profiles",
      "Custom acrylic & marine ply modular kitchens with 3D layout consultation"
    ],
    popularProjects: [
      "Modern L-Shaped Modular Kitchen (Civil Lines)",
      "12mm Toughened Glass Balcony Railings (Katra Road)",
      "CNC Laser Cut Heavy Main Entrance Gate (Meera Bhawan Road)",
      "3-Track Soundproof uPVC Windows (Ajeet Nagar)"
    ],
    localReview: {
      author: "Virendra Singh",
      locality: "Civil Lines, Pratapgarh",
      quote: "Sparsh Trading provided the best steel chaukhat and modular kitchen fitting for our new home in Civil Lines. Millimeter precision and solid quality!",
      rating: 5
    },
    faqs: [
      {
        q: "Where is Sparsh Trading workshop located in Pratapgarh?",
        a: "Our main fabrication workshop and office is located at Meera Bhawan, Near Meera Bhawan Chauraha, Ashtbhuja Nagar, Pratapgarh, UP 230001."
      },
      {
        q: "Do you offer free on-site measurements in Pratapgarh?",
        a: "Yes. Our team visits any site in Pratapgarh city and surrounding tehsils (Kunda, Patti, Lalganj, Raniganj) free of charge to take exact digital laser measurements."
      }
    ]
  },
  {
    slug: "sultanpur",
    name: "Sultanpur",
    hindiName: "सुलतानपुर",
    tagline: "Fast Daily Delivery & Expert Fitting Coverage Across Sultanpur District",
    metaTitle: "uPVC Windows, Steel Fabrication & Kitchens in Sultanpur | Sparsh Trading",
    metaDescription: "Top manufacturer of soundproof uPVC windows, Tata steel chaukhat, and glass railings for homes & commercial sites in Sultanpur, UP. Get direct factory quote.",
    headline: "Premium Steel Fabrication, uPVC Windows & Railings in Sultanpur",
    distanceFromPratapgarh: "Approx. 40 km (Daily Delivery & Site Team Active)",
    localities: [
      "Civil Lines Sultanpur", "Payagipur Chauraha", "Kurwar Road", "Golaghat",
      "Amhat", "Badgaon", "Kadipur", "Musafirkhana", "Lambhua", "Jaisinghpur"
    ],
    serviceHighlights: [
      "Rapid 48-hour delivery from our Pratapgarh workshop to Sultanpur",
      "Toughened glass balcony railings and soundproof uPVC sliding windows",
      "Wholesale PPGI pre-painted door frames for builders and contractors",
      "Turnkey modular kitchen design and installation"
    ],
    popularProjects: [
      "Soundproof 3-Track uPVC Sliding Windows (Payagipur, Sultanpur)",
      "Tata Steel Heavy Chaukhat Supply (Civil Lines, Sultanpur)"
    ],
    localReview: {
      author: "Er. Alok Srivastava",
      locality: "Payagipur, Sultanpur",
      quote: "Ordered 14 uPVC sliding windows for our bungalow in Sultanpur. The noise reduction from the main highway is unbelievable. Highly recommended!",
      rating: 5
    },
    faqs: [
      {
        q: "How quickly can you deliver steel frames and windows to Sultanpur?",
        a: "Standard sizes are delivered within 48 hours. Custom fabrication orders are manufactured and installed on-site in Sultanpur within 4 to 6 working days."
      }
    ]
  },
  {
    slug: "jaunpur",
    name: "Jaunpur",
    hindiName: "जौनपुर",
    tagline: "Architectural Glass Railings, Steel Gates & uPVC Systems in Jaunpur",
    metaTitle: "Toughened Glass Railing & Steel Fabrication in Jaunpur | Sparsh Trading",
    metaDescription: "Architectural 12mm glass railings, steel door frames & modular kitchens in Jaunpur, UP. SS 304 spigots, precision CNC gates. Request free quotation.",
    headline: "Modern Architectural Glass Railings & Steel Fabrication in Jaunpur",
    distanceFromPratapgarh: "Approx. 65 km (Regular Supply Route)",
    localities: [
      "Olandganj", "Line Bazar", "Shahganj Road", "Wazidpur Tiraha",
      "Mariahu", "Machhlishahr", "Kerakat", "Badlapur", "Zafarabad"
    ],
    serviceHighlights: [
      "Specialized in frameless 12mm toughened glass balustrades with SS 304 spigots",
      "Heavy Tata steel door frames for modern homes and commercial complexes",
      "Modular kitchen acrylic cabinets tailored for Indian cooking",
      "CNC laser-cut stainless steel entrance gates"
    ],
    popularProjects: [
      "Frameless Balcony Glass Railing Installation (Line Bazar, Jaunpur)",
      "Heavy Duty Main Entrance Gate (Olandganj, Jaunpur)"
    ],
    localReview: {
      author: "Dr. Sandeep Yadav",
      locality: "Line Bazar, Jaunpur",
      quote: "Fitted 80 running feet of frameless glass balcony railings. The SS 304 spigots and crystal clear glass give our house an ultra-modern look.",
      rating: 5
    },
    faqs: [
      {
        q: "Do you supply glass railings and steel frames to Jaunpur?",
        a: "Yes. We have completed numerous residential and commercial projects in Jaunpur city, Badlapur, Machhlishahr, and Mariahu."
      }
    ]
  },
  {
    slug: "prayagraj",
    name: "Prayagraj",
    hindiName: "प्रयागराज (इलाहाबाद)",
    tagline: "High-Volume Steel Fabrication, uPVC Windows & Glass Solutions for Prayagraj",
    metaTitle: "Steel Fabrication, uPVC Windows & Railings in Prayagraj | Sparsh Trading",
    metaDescription: "Leading supplier of Tata steel door frames, soundproof uPVC windows, glass railings & modular kitchens in Prayagraj (Allahabad). Best direct factory rates.",
    headline: "Architectural Steel & Fenestration Solutions for Prayagraj",
    distanceFromPratapgarh: "Approx. 55 km (Daily Transport via NH 330)",
    localities: [
      "Civil Lines Prayagraj", "Naini Industrial Area", "Jhalwa", "Phaphamau",
      "Katra", "George Town", "Tagore Town", "Dhoomanganj", "Shantipuram"
    ],
    serviceHighlights: [
      "Bulk supply of Tata Structura steel frames for builders and duplex bungalows",
      "Acoustic uPVC window systems for noisy arterial road locations",
      "Luxury acrylic and PU modular kitchens",
      "Commercial facade structural glazing and terrace railings"
    ],
    popularProjects: [
      "Residential Duplex Steel Chaukhat & Railing Package (Civil Lines, Prayagraj)",
      "Soundproof 3-Track uPVC Windows (Jhalwa, Prayagraj)"
    ],
    localReview: {
      author: "Rajeshwar Pandey",
      locality: "Civil Lines, Prayagraj",
      quote: "Sparsh Trading provided factory-direct rates for Tata steel chaukhat that beat local Prayagraj market prices by 15% with superior build quality.",
      rating: 5
    },
    faqs: [
      {
        q: "Can your team visit Prayagraj for laser site measurements?",
        a: "Yes. Our measurement team is in Prayagraj multiple times a week via NH 330 and provides free site consultations."
      }
    ]
  },
  {
    slug: "varanasi",
    name: "Varanasi",
    hindiName: "वाराणसी (बनारस)",
    tagline: "Custom Architectural Metalwork, CNC Gates & Glass Balustrades in Varanasi",
    metaTitle: "Steel Fabrication, CNC Gates & uPVC Windows in Varanasi | Sparsh Trading",
    metaDescription: "Custom CNC laser cut steel gates, toughened glass railings, and uPVC windows in Varanasi. High quality fabrication, durable finishes, on-site installation.",
    headline: "Custom Steel Fabrication & Glass Railings for Varanasi",
    distanceFromPratapgarh: "Approx. 125 km (Scheduled Supply Route)",
    localities: [
      "Sigra", "Mahmoorganj", "Lanka", "Shivpur", "Bhelupur",
      "Cantonment", "Pandeypur", "Sarnath", "Ramnagar"
    ],
    serviceHighlights: [
      "Artisan CNC laser-cut decorative gates and jaali partitions",
      "12mm toughened glass balustrades for hotels and luxury residences",
      "Waterproof BWP marine ply modular kitchens",
      "Heavy structural steel shed and staircase fabrication"
    ],
    popularProjects: [
      "CNC Designer Main Entrance Gate (Sigra, Varanasi)",
      "Luxury Acrylic Kitchen Setup (Mahmoorganj, Varanasi)"
    ],
    localReview: {
      author: "Abhishek Agarwal",
      locality: "Mahmoorganj, Varanasi",
      quote: "Outstanding CNC gate and balcony glass railing work. The finish and alignment are truly top-class.",
      rating: 5
    },
    faqs: [
      {
        q: "Do you take up turnkey fabrication and window projects in Varanasi?",
        a: "Yes. We handle end-to-end site survey, custom workshop fabrication, safe transport, and on-site fitting in Varanasi."
      }
    ]
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    hindiName: "लखनऊ",
    tagline: "Premium Fenestration, Steel Chaukhat & Modular Interiors for Lucknow",
    metaTitle: "uPVC Windows, Tata Steel Frames & Kitchens in Lucknow | Sparsh Trading",
    metaDescription: "Supply & installation of Tata steel door frames, soundproof uPVC windows, glass railings & modular kitchens in Lucknow, UP. Direct manufacturer pricing.",
    headline: "Modern Fenestration & Architectural Metalwork for Lucknow",
    distanceFromPratapgarh: "Approx. 165 km (Connected via NH 330 / Raebareli Highway)",
    localities: [
      "Gomti Nagar", "Alambagh", "Hazratganj", "Raebareli Road", "Indira Nagar",
      "Mahanagar", "Sushant Golf City", "Vrindavan Yojna", "Jankipuram"
    ],
    serviceHighlights: [
      "Direct manufacturer pricing on heavy steel frames and uPVC systems",
      "Architectural CNC laser-cut room dividers and mandir backdrops",
      "B2B contractor bulk pricing for residential projects",
      "Premium soft-close acrylic and marine ply modular kitchens"
    ],
    popularProjects: [
      "Soundproof uPVC Windows (Gomti Nagar, Lucknow)",
      "PPGI Door Frames Wholesale Supply (Sushant Golf City, Lucknow)"
    ],
    localReview: {
      author: "Manish Chandra",
      locality: "Gomti Nagar, Lucknow",
      quote: "Got custom Tata steel door frames for our villa. The welding and primer finish were superior to what we found in local retail shops in Lucknow.",
      rating: 5
    },
    faqs: [
      {
        q: "Do you supply bulk orders to builders and architects in Lucknow?",
        a: "Yes. We supply truckload and customized order quantities of steel chaukhat, PPGI frames, and uPVC windows directly to project sites in Lucknow."
      }
    ]
  },
  {
    slug: "ayodhya",
    name: "Ayodhya",
    hindiName: "अयोध्या / फैजाबाद",
    tagline: "Heritage & Modern Architectural Metal Fabrication in Ayodhya",
    metaTitle: "Steel Fabrication, CNC Gates & Glass Railings in Ayodhya | Sparsh Trading",
    metaDescription: "Custom steel fabrication, decorative CNC gates, uPVC windows, and glass railings for hotels, ashrams & homes in Ayodhya / Faizabad. Request quote.",
    headline: "Architectural Metalwork & Fenestration Solutions in Ayodhya",
    distanceFromPratapgarh: "Approx. 95 km (Direct Highway Route)",
    localities: [
      "Civil Lines Faizabad", "Naya Ghat", "Rekabganj", "Rambabu Mandir Road",
      "Devkali", "Sahadatganj", "Naka Bypass", "Rampur Bhawanipur"
    ],
    serviceHighlights: [
      "Decorative laser-cut brass and steel entrance gates for hotels and ashrams",
      "Heavy-duty soundproof uPVC windows for guest houses and residences",
      "12mm toughened glass railings for terraces and viewing decks",
      "Rapid delivery and experienced fitting crew on standby"
    ],
    popularProjects: [
      "Grand Entrance Decorative Gate (Civil Lines, Ayodhya)",
      "uPVC Fenestration Package for Guest House (Ayodhya)"
    ],
    localReview: {
      author: "Pradeep Tripathi",
      locality: "Devkali, Ayodhya",
      quote: "Sparsh Trading fabricated our grand entrance gate and uPVC windows for our hotel project in Ayodhya on time and with extreme precision.",
      rating: 5
    },
    faqs: [
      {
        q: "Do you fabricate custom traditional and temple-style metal motifs?",
        a: "Yes. Our CNC laser cutting systems can produce intricate traditional motifs, floral jaalis, and sacred patterns for temples, ashrams, and hotels in Ayodhya."
      }
    ]
  },
  {
    slug: "raebareli",
    name: "Raebareli",
    hindiName: "रायबरेली",
    tagline: "Tata Steel Frames, uPVC Windows & Modular Kitchens in Raebareli",
    metaTitle: "Steel Fabrication & uPVC Windows in Raebareli | Sparsh Trading",
    metaDescription: "Best manufacturer of Tata steel door frames (Chaukhat), soundproof uPVC windows, glass railings & modular kitchens in Raebareli, UP. Fast on-site fitting.",
    headline: "Quality Steel Fabrication & Interior Solutions in Raebareli",
    distanceFromPratapgarh: "Approx. 90 km",
    localities: [
      "Civil Lines Raebareli", "Degree College Chauraha", "Super Market",
      "Gora Bazar", "Indira Nagar", "Lalganj Raebareli", "Unchahar", "Salon"
    ],
    serviceHighlights: [
      "Tata Structura anti-rust door frames for residential construction",
      "Multi-chamber 3-track uPVC sliding windows with mosquito mesh",
      "BWP Marine Ply modular kitchens with soft-close hardware",
      "Prompt on-site measurement and direct delivery"
    ],
    popularProjects: [
      "Tata Steel Double Rebate Chaukhat (Civil Lines, Raebareli)",
      "Modular Kitchen Installation (Gora Bazar, Raebareli)"
    ],
    localReview: {
      author: "Ashok Verma",
      locality: "Civil Lines, Raebareli",
      quote: "Great experience with Sparsh Trading. The steel door frames were delivered straight to our site in Raebareli with zero hassle.",
      rating: 5
    },
    faqs: [
      {
        q: "How do I book a site measurement in Raebareli?",
        a: "Simply call +91 8795662161 or submit an enquiry online. Our technician will coordinate a convenient date and time to visit your site in Raebareli."
      }
    ]
  }
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locationsDatabase.find((loc) => loc.slug.toLowerCase() === slug.toLowerCase());
}
