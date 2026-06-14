export const unpaidInvoices = [
  { no: '02500514', date: '13-10-2025', po: '—', desc: 'Supply Laundry Marking Items (Tagging Gun & Tag Pins)', type: 'supply', amount: 898.0 },
  { no: '02500531', date: '25-10-2025', po: '—', desc: 'Repair Bakery Mixer Machine – Bearing & Belt Change', type: 'repair', amount: 2235.0 },
  { no: '02600066', date: '11-02-2026', po: '—', desc: 'Repair Washing Machine No.2 – 2-Way Water Valve Change', type: 'repair', amount: 992.4 },
  { no: '02600099', date: '05-03-2026', po: 'LH0107317', desc: 'Monthly Laundry Service – March 2026', type: 'service', amount: 1296.0 },
  { no: '02600176', date: '23-04-2026', po: 'LH0111889', desc: 'Repair Washer No.3 – Drain Valve Change, Sink Parts & Hose Clip (Lvl 7)', type: 'repair', amount: 1877.9 },
  { no: '02600198', date: '04-05-2026', po: '—', desc: 'Hot Plate Pressure – Repair Steam Pipe Line', type: 'repair', amount: 1382.4 },
  { no: '02600199', date: '04-05-2026', po: '—', desc: 'Dryer No.1 – Repair Return Steam Pipe Line', type: 'repair', amount: 1282.4 },
  { no: '02600219', date: '16-05-2026', po: 'LH0116910', desc: 'Monthly Laundry Service – May 2026', type: 'service', amount: 1296.0 },
  { no: '02600223', date: '18-05-2026', po: '—', desc: 'Pony Iron Board – Padding Change', type: 'repair', amount: 1688.0 },
  { no: '02600224', date: '18-05-2026', po: '—', desc: 'Pad & Cover Supply – Cissell Hot Plate 2026', type: 'supply', amount: 1789.6 },
  { no: '02600226', date: '15-05-2026', po: '—', desc: 'Steam Pipe – Welding Work', type: 'repair', amount: 1968.4 },
  { no: '02600230', date: '06-06-2026', po: '—', desc: 'Supply & Install Wash Basin (Stainless Steel)', type: 'supply', amount: 5900.0 },
  { no: '02600237', date: '06-06-2026', po: '—', desc: 'Two-Way Water Valve Change – Washing Machine No.1', type: 'repair', amount: 1282.4 },
  { no: '02600225', date: '10-06-2026', po: '—', desc: 'Pony Dry Clean Press – Repair', type: 'repair', amount: 3762.4 },
  { no: '02600263', date: '11-06-2026', po: '—', desc: 'Monthly Laundry Service – June 2026', type: 'service', amount: 1296.0 },
]

export const paidInvoices = [
  { no: '02600026', invoiceDate: '20-01-2026', paidDate: '03-04-2026', desc: 'Monthly Laundry Service – January 2026', amount: 1296.0 },
  { no: '02600032', invoiceDate: '23-01-2026', paidDate: '03-04-2026', desc: 'Repair Steam Pipe – Dryclean Press No.1', amount: 4357.2 },
  { no: '02600033', invoiceDate: '23-01-2026', paidDate: '03-04-2026', desc: 'Supply Items – Tagging Gun & Tag Pins', amount: 720.0 },
  { no: '02600040', invoiceDate: '28-01-2026', paidDate: '03-04-2026', desc: 'Repair Washer No.1 – Door Handle Change', amount: 2400.4 },
  { no: '02600041', invoiceDate: '28-01-2026', paidDate: '03-04-2026', desc: 'Repair Washer No.3 – Door Handle Change', amount: 2400.4 },
  { no: '02600062', invoiceDate: '10-02-2026', paidDate: '01-05-2026', desc: 'Repair Washing Machine No.2 (Motor/Bearing)', amount: 1498.4 },
  { no: '02600064', invoiceDate: '10-02-2026', paidDate: '01-05-2026', desc: 'Monthly Laundry Service – February 2026', amount: 1296.0 },
  { no: '02600148', invoiceDate: '03-04-2026', paidDate: '27-05-2026', desc: 'Monthly Laundry Service – April 2026', amount: 1296.0 },
]

export const paymentReceipts = [
  { date: '09-01-2026', method: 'Online Transfer', amount: 13750.0, invoices: '02500461, 02500478, 02500529, 02500530, 02500565, 02500352' },
  { date: '04-02-2026', method: 'Online Transfer', amount: 4440.0, invoices: '02500626, 02500617, 02500647 (part)' },
  { date: '28-02-2026', method: 'Online Transfer', amount: 1200.0, invoices: '02500614' },
  { date: '03-04-2026', method: 'Online Transfer', amount: 11174.0, invoices: '02600026, 02600032, 02600033, 02600040, 02600041' },
  { date: '01-05-2026', method: 'Online Transfer', amount: 2794.4, invoices: '02600064, 02600062' },
  { date: '27-05-2026', method: 'Online Transfer', amount: 1296.0, invoices: '02600148' },
]

export const outstandingByCategory = [
  { label: 'Monthly Service (3)', amount: 3888 },
  { label: 'Washer Repair (4)', amount: 5452.7 },
  { label: 'Steam Pipe Works (3)', amount: 4633.2 },
  { label: 'Padding / Press (2)', amount: 3477.6 },
  { label: 'Supply & Install (2)', amount: 6798 },
  { label: 'Pony Dry Clean (1)', amount: 3762.4 },
]

export const paymentsMonthly = [
  { month: 'Jan 2026', amount: 13750 },
  { month: 'Feb 2026', amount: 5640 },
  { month: 'Mar 2026', amount: 0 },
  { month: 'Apr 2026', amount: 11174 },
  { month: 'May 2026', amount: 4090.4 },
  { month: 'Jun 2026', amount: 0 },
]
