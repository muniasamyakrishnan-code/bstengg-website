export const productCategories = [
  {
    id: 'flatwork',
    title: 'Flatwork Ironers',
    icon: '🗜️',
    products: [
      { id: 'eagle-flatwork-ironer', name: 'Eagle 2.0', brand: 'Pony', desc: 'High-capacity flatwork ironer for linen, sheets and tablecloths' },
      { id: 'superplatine-a', name: 'Superplatine A', brand: 'Pony', desc: 'Professional flatwork ironer with advanced steam system' },
      { id: 'superplatine-sc-sd', name: 'Superplatine SC/SD', brand: 'Pony', desc: 'Heavy-duty flatwork ironer for large volume operations' },
    ],
  },
  {
    id: 'shirt-finishers',
    title: 'Shirt & Garment Finishers',
    icon: '👔',
    products: [
      { id: 'angel-shirt-finisher', name: 'Angel 3.0', brand: 'Pony', desc: 'Automated shirt finisher for hotel uniform and garment care' },
      { id: 'genus', name: 'Genus', brand: 'Pony', desc: 'Garment finisher for jackets, shirts and delicate fabrics' },
      { id: 'kappa', name: 'Kappa', brand: 'Pony', desc: 'Versatile garment finisher suitable for all fabric types' },
      { id: 'prelude', name: 'Prelude', brand: 'Pony', desc: 'Compact shirt finisher for medium-volume operations' },
      { id: 'record', name: 'Record', brand: 'Pony', desc: 'Professional shirt finisher with precise steam control' },
      { id: 'classic', name: 'Classic', brand: 'Pony', desc: 'Classic shirt finisher — reliable performance for daily use' },
      { id: 'cosmos', name: 'Cosmos', brand: 'Pony', desc: 'Advanced garment finishing system for hospitality laundries' },
    ],
  },
  {
    id: 'presses',
    title: 'Press Machines',
    icon: '⚙️',
    products: [
      { id: 'brava-press', name: 'Brava / Colox / Standard', brand: 'Pony', desc: 'Multi-purpose press machines for garments, collars and cuffs' },
      { id: 'lav-press', name: 'LAV Press', brand: 'Pony', desc: 'Laundry press for uniform and garment finishing' },
      { id: 'mg', name: 'MG', brand: 'Pony', desc: 'Heavy-duty press machine for professional laundry operations' },
      { id: 'mg321', name: 'MG321', brand: 'Pony', desc: 'High-performance press for hotel and commercial laundries' },
      { id: 'mp-mpt', name: 'MP / MPT', brand: 'Pony', desc: 'Trouser and garment press system for dry cleaning operations' },
      { id: 'inox', name: 'Inox', brand: 'Pony', desc: 'Stainless steel press for hygienic high-volume operations' },
      { id: 'washer-403-404', name: '403 / 404', brand: 'Pony', desc: 'Professional press for collars, cuffs and shirt details' },
    ],
  },
  {
    id: 'ironing-tables',
    title: 'Ironing Tables & Irons',
    icon: '🏠',
    products: [
      { id: 'baby-ironing-table', name: 'Baby', brand: 'Pony', desc: 'Semi-professional ironing table with vacuum and blowing system' },
      { id: 'puff-irons', name: 'Puff Irons', brand: 'Pony', desc: 'Professional steam irons for garment and linen finishing' },
      { id: 'tas', name: 'TAS', brand: 'Pony', desc: 'Professional ironing station with steam and vacuum features' },
      { id: 'fvc-ta', name: 'FVC-TA', brand: 'Pony', desc: 'Vacuum ironing board system for professional garment care' },
    ],
  },
  {
    id: 'steam',
    title: 'Steam Generators & Boilers',
    icon: '💨',
    products: [
      { id: 'generator-1234', name: 'Generators 1–4', brand: 'Pony', desc: 'Steam generators for powering press machines and ironing stations' },
      { id: 'generator-816', name: 'Generators 8–16', brand: 'Pony', desc: 'Heavy-duty steam generators for large laundry operations' },
      { id: 'goliath-generator', name: 'Goliath Generators', brand: 'Pony', desc: 'Industrial-grade steam boiler for high-demand hotel laundries' },
      { id: 'vaporetta-vb-vc', name: 'Vaporetta VB/VC', brand: 'Pony', desc: 'Compact steam generator for ironing and garment finishing' },
      { id: 'steam-sanitising', name: 'Steam Sanitising', brand: 'Pony', desc: 'Steam sanitising system for hygienic garment and linen care' },
    ],
  },
  {
    id: 'specialised',
    title: 'Specialised Equipment',
    icon: '🔩',
    products: [
      { id: 'ozocab', name: 'Ozocab', brand: 'Pony', desc: 'Ozone dry cleaning cabinet for chemical-free garment care' },
      { id: 'ozocubo', name: 'Ozocubo', brand: 'Pony', desc: 'Ozone treatment unit for odour removal and sanitisation' },
      { id: 'eco-clever', name: 'Eco Clever', brand: 'Pony', desc: 'Energy-efficient laundry finishing system' },
      { id: 'bagging-machine', name: 'Bagging Machine', brand: 'Pony', desc: 'Automated garment bagging system for dry cleaning operations' },
    ],
  },
]

export const allProducts = productCategories.flatMap(c => c.products)
