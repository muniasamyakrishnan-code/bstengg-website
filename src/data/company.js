export const provider = {
  name: 'Best Sun Tech Engineering Sdn Bhd',
  brn: '200601006749 (726498-D)',
  tin: 'C20506530090',
  sst: 'W10-1808-31022726',
  address: 'C-03-A, Putra Majestik, No.2A, Jalan Kasipillay, off Jalan Ipoh, 51200 Kuala Lumpur',
  hp: '019-2828 9180',
  tel: '03-4041 0250',
  fax: '03-4051 0250',
  email: 'bstengg@yahoo.com',
  invoiceTerms: 'Net 30 days after invoice date',
  tagline: 'One Stop Solution for Your Laundry Business',
  description:
    'Best Sun Tech Engineering Sdn Bhd is a well-established specialist in commercial and industrial laundry equipment, spare parts supply and engineering services in Malaysia since 2011. We provide technical services and world-leading equipment from top global brands for 5-star hotels, resorts, commercial laundry operators and industrial clients across Malaysia.',
  mission:
    'We strive to provide our customers with quality, reliable and affordable products together with excellent after-sales service and maintenance.',
  established: '2011',
}

export const productOfferings = [
  { icon: '🏭', label: 'Commercial & Industrial Laundry Equipment' },
  { icon: '💧', label: 'Aqua Wet Cleaning & Dry Cleaning' },
  { icon: '👔', label: 'Washing & Drying Services' },
  { icon: '🗜️', label: 'Ironing & Flatwork Finishing' },
  { icon: '🧹', label: 'Carpet Cleaning' },
  { icon: '🧪', label: 'Stain & Colour Removal' },
  { icon: '🔩', label: 'All Laundry Equipment Spare Parts' },
  { icon: '🔧', label: 'Repairing & Servicing' },
  { icon: '⚙️', label: 'Customised Engineering Works' },
  { icon: '🤝', label: 'After-Sales Service' },
  { icon: '🔄', label: 'Trade-In Used Machines' },
  { icon: '🧴', label: 'Laundry Accessories & Detergents' },
  { icon: '🎓', label: 'Aqua Wet Cleaning Chemical & Training (Theory & Practical)' },
  { icon: '🏪', label: 'Launderette Services' },
]

export const availableBrands = ['IPSO', 'Electrolux', 'Huebsch', 'Cissell', 'Girbau', 'Pony', 'Realstar', 'Earlstar', 'ADC', 'Rema']

export const providerIN = {
  name: 'Best Sun Tech Engineering Pvt Ltd',
  gstin: '33AANCB0327K1ZS',
  address: 'Flat No.184, Senthoor Nagar, Manjampatti Village, Natham Main Road, Madurai - 625014, Tamil Nadu, India',
  hp: '+91 86376 15010',
  tel: '+91 82484 75435',
  email: 'bstengg@yahoo.com',
}

export function getProvider(branch) {
  return branch === 'IN' ? providerIN : provider
}

export const bankDetails = {
  bank: 'ABC Bank',
  accountNo: '1234567990',
  swift: 'CNBR09675',
  footerEmail: 'muniasamykrishnan@gmail.com',
  website: 'bestsuntech.com',
}

export const client = {
  name: 'Daito Asia Development (M) II Sdn Bhd',
  tradingAs: 'Hilton Kuala Lumpur',
  tin: 'C10093151000',
  address: 'No 3, Jalan Stesen Sentral, 50470 Kuala Lumpur',
  tel: '03-2246 2264 / 03-2264 2264',
  fax: '03-2264 2202',
  billingAttn: 'A/C Department',
  apEmail: 'kulhi_ap@hilton.com',
  paymentMethod: 'Online Bank Transfer',
}

export const financials = {
  totalOutstanding: 28946.9,
  unpaidInvoiceCount: 15,
  totalPaid2026: 34454,
  paymentBatches: 6,
  monthlyRetainer: 1296,
  monthlyRetainerBase: 1200,
  sstRate: 8,
  largestInvoice: { amount: 5900, ref: '02600230', desc: 'Stainless Wash Basin' },
  oldestUnpaid: { date: 'Oct 2025', ref: '02500514', amount: 898, months: 8 },
  reportDate: '13 June 2026',
}
