export const demoRequest =
  'ขอราคา Pump รุ่น XP-200 จำนวน 50 ตัว ส่งระยอง ขอภายในวันนี้';

export const workflowSteps = [
  {
    title: 'เข้าใจคำขอของลูกค้า',
    detail: 'ตรวจพบคำขอใบเสนอราคาแบบเร่งด่วน',
  },
  {
    title: 'แยกข้อมูลสำคัญ',
    detail: 'XP-200, 50 ตัว, ปลายทางระยอง',
  },
  {
    title: 'ค้นหาข้อมูลสินค้า',
    detail: 'พบสินค้าและข้อมูลจำเพาะใน Product Catalog',
  },
  {
    title: 'ตรวจสอบราคาและสต็อก',
    detail: 'ราคา 18,500 บาทต่อตัว, พร้อมส่ง 68 ตัว',
  },
  {
    title: 'ใช้กฎทางธุรกิจ',
    detail: 'ส่วนลดโครงการ 7% และจัดส่งฟรี',
  },
  {
    title: 'สร้างเอกสาร',
    detail: 'จัดทำใบเสนอราคาและข้อความตอบลูกค้า',
  },
  {
    title: 'รอการอนุมัติ',
    detail: 'ส่งให้พนักงานตรวจสอบก่อนส่งถึงลูกค้า',
  },
];

export const extractedRequest = [
  { label: 'ความต้องการ', value: 'ขอใบเสนอราคา' },
  { label: 'สินค้า', value: 'Industrial Pump XP-200' },
  { label: 'จำนวน', value: '50 ตัว' },
  { label: 'ปลายทาง', value: 'จังหวัดระยอง' },
  { label: 'ความเร่งด่วน', value: 'ภายในวันนี้' },
];

export const quotation = {
  number: 'QTN-2026-0914-001',
  customer: 'บริษัท ระยองโปรเซสซิ่ง จำกัด',
  product: 'Industrial Centrifugal Pump XP-200',
  sku: 'EIS-PMP-XP200',
  quantity: 50,
  unitPrice: 18_500,
  subtotal: 925_000,
  discountRate: 7,
  discount: 64_750,
  delivery: 0,
  beforeVat: 860_250,
  vat: 60_217.5,
  total: 920_467.5,
  leadTime: 'จัดส่งภายใน 3 วันทำการ',
  validity: 'ราคาใช้ได้ 15 วัน',
};

export const sources = [
  {
    name: 'Product Catalog 2026',
    reference: 'หน้า 18-19',
    usedFor: 'รุ่นสินค้าและข้อมูลจำเพาะ',
    path: '/demo-data/product-catalog.md',
  },
  {
    name: 'Price List September 2026',
    reference: 'รายการ EIS-PMP-XP200',
    usedFor: 'ราคาขายมาตรฐาน',
    path: '/demo-data/price-list.md',
  },
  {
    name: 'Sales Discount Policy SD-04',
    reference: 'หัวข้อ 3.2',
    usedFor: 'ส่วนลดโครงการ 7%',
    path: '/demo-data/discount-policy.md',
  },
  {
    name: 'Delivery Policy DL-02',
    reference: 'Rayong Industrial Zone',
    usedFor: 'จัดส่งฟรีและระยะเวลาส่ง',
    path: '/demo-data/delivery-policy.md',
  },
  {
    name: 'Stock Snapshot 5 Sep 2026',
    reference: 'Warehouse RYG-A',
    usedFor: 'สินค้าพร้อมส่ง 68 ตัว',
    path: '/demo-data/stock-snapshot.md',
  },
];

export const initialCustomerReply = `เรียน ทีมจัดซื้อ บริษัท ระยองโปรเซสซิ่ง จำกัด

ตามที่สอบถาม Pump รุ่น XP-200 จำนวน 50 ตัว ทางเราจัดทำใบเสนอราคาให้เรียบร้อยแล้ว สินค้ามีพร้อมส่งและสามารถจัดส่งถึงจังหวัดระยองได้ภายใน 3 วันทำการ

ราคาหลังหักส่วนลดโครงการ 7% และรวมภาษีมูลค่าเพิ่มแล้วอยู่ที่ 920,467.50 บาท โดยไม่มีค่าจัดส่งเพิ่มเติม

กรุณาตรวจสอบรายละเอียดในใบเสนอราคาที่แนบมาพร้อมข้อความนี้`;
