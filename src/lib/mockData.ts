// Expanded mock data for Revistra enterprise dashboard — STAMP-BASED loyalty

export const cafes = [
  { id: "1", name: "The Roasted Bean" },
  { id: "2", name: "Morning Brew Café" },
  { id: "3", name: "Espresso Lane" },
];

export const kpiData = {
  repeatRate: { value: 68, change: +4.2 },
  activeCustomers: { value: 1247, change: +12.3 },
  newCustomers: { value: 89, change: -2.1 },
  checkInsMonth: { value: 3421, change: +8.7 },
  redemptionRate: { value: 42, change: +5.6 },
  inactiveCustomers: { value: 233, change: -3.4 },
};

export const retentionFunnel = [
  { stage: "Total Customers", count: 2480, pct: 100 },
  { stage: "Active Customers", count: 1247, pct: 50.3 },
  { stage: "Repeat Customers", count: 843, pct: 34.0 },
  { stage: "Reward Redeemers", count: 312, pct: 12.6 },
];

export const retentionTrend = {
  weekly: [
    { label: "Mon", value: 62 }, { label: "Tue", value: 58 }, { label: "Wed", value: 71 },
    { label: "Thu", value: 65 }, { label: "Fri", value: 78 }, { label: "Sat", value: 82 }, { label: "Sun", value: 74 },
  ],
  monthly: [
    { label: "Jan", value: 54 }, { label: "Feb", value: 58 }, { label: "Mar", value: 62 },
    { label: "Apr", value: 59 }, { label: "May", value: 67 }, { label: "Jun", value: 71 },
  ],
  sixMonths: [
    { label: "Oct", value: 48 }, { label: "Nov", value: 52 }, { label: "Dec", value: 55 },
    { label: "Jan", value: 58 }, { label: "Feb", value: 64 }, { label: "Mar", value: 68 },
  ],
};

export const todayActivity = {
  checkIns: 47,
  rewardsRedeemed: 12,
  newCustomers: 5,
};

export const customers = [
  { id: "1", name: "Sarah Chen", phone: "+91 9876543101", totalVisits: 34, stamps: 4, lastVisit: "2026-03-05", status: "High Value", ltv: 62000 },
  { id: "2", name: "Marcus Johnson", phone: "+91 9876543102", totalVisits: 22, stamps: 3, lastVisit: "2026-03-04", status: "Active", ltv: 41000 },
  { id: "3", name: "Aisha Patel", phone: "+91 9876543103", totalVisits: 45, stamps: 5, lastVisit: "2026-03-06", status: "High Value", ltv: 84000 },
  { id: "4", name: "Tom Williams", phone: "+91 9876543104", totalVisits: 8, stamps: 2, lastVisit: "2026-02-15", status: "Inactive", ltv: 14500 },
  { id: "5", name: "Elena Rodriguez", phone: "+91 9876543105", totalVisits: 15, stamps: 4, lastVisit: "2026-03-03", status: "Active", ltv: 28000 },
  { id: "6", name: "James Kim", phone: "+91 9876543106", totalVisits: 3, stamps: 1, lastVisit: "2026-01-20", status: "Inactive", ltv: 5500 },
  { id: "7", name: "Olivia Brown", phone: "+91 9876543107", totalVisits: 29, stamps: 5, lastVisit: "2026-03-06", status: "Active", ltv: 52500 },
  { id: "8", name: "David Lee", phone: "+91 9876543108", totalVisits: 51, stamps: 3, lastVisit: "2026-03-05", status: "High Value", ltv: 96000 },
  { id: "9", name: "Maria Garcia", phone: "+91 9876543109", totalVisits: 18, stamps: 2, lastVisit: "2026-03-01", status: "Active", ltv: 33500 },
  { id: "10", name: "Robert Taylor", phone: "+91 9876543110", totalVisits: 6, stamps: 0, lastVisit: "2026-02-08", status: "Inactive", ltv: 11000 },
];

export const customerVisitHistory = [
  { date: "2026-03-06", time: "09:15 AM", items: "Latte, Croissant", stamps: "+1", amount: 320, paymentType: "UPI" as const, paymentId: "UPI2603061234" },
  { date: "2026-03-05", time: "08:30 AM", items: "Espresso", stamps: "+1", amount: 180, paymentType: "Cash" as const, paymentId: "—" },
  { date: "2026-03-03", time: "10:00 AM", items: "Cappuccino, Muffin", stamps: "+1", amount: 350, paymentType: "Card" as const, paymentId: "TXN9087654321" },
  { date: "2026-03-01", time: "07:45 AM", items: "Cold Brew", stamps: "+1", amount: 220, paymentType: "UPI" as const, paymentId: "UPI2603011456" },
  { date: "2026-02-28", time: "09:30 AM", items: "Mocha", stamps: "+1", amount: 250, paymentType: "UPI" as const, paymentId: "UPI2602281789" },
];

export const customerRewardHistory = [
  { date: "2026-03-04", reward: "Free Coffee", status: "Redeemed" },
  { date: "2026-02-20", reward: "Free Pastry", status: "Redeemed" },
];

export const customerTimeline = [
  { date: "2026-03-06", event: "Checked in — earned 1 stamp", type: "checkin" },
  { date: "2026-03-05", event: "Checked in — earned 1 stamp", type: "checkin" },
  { date: "2026-03-04", event: "Redeemed Free Coffee reward", type: "reward" },
  { date: "2026-03-03", event: "Checked in — earned 1 stamp", type: "checkin" },
  { date: "2026-03-01", event: "Stamp card completed — new cycle started", type: "milestone" },
  { date: "2026-02-28", event: "Checked in — earned 1 stamp", type: "checkin" },
];

export const recentCheckIns = [
  { name: "Sarah Chen", time: "09:15 AM", rewardStatus: "1 stamp away" },
  { name: "David Lee", time: "09:02 AM", rewardStatus: "Reward earned!" },
  { name: "Olivia Brown", time: "08:48 AM", rewardStatus: "Reward ready!" },
  { name: "Aisha Patel", time: "08:30 AM", rewardStatus: "Card full!" },
  { name: "Marcus Johnson", time: "08:15 AM", rewardStatus: "2 stamps away" },
];

export const analyticsRetention = [
  { month: "Oct", rate: 48 }, { month: "Nov", rate: 52 }, { month: "Dec", rate: 55 },
  { month: "Jan", rate: 58 }, { month: "Feb", rate: 64 }, { month: "Mar", rate: 68 },
];

export const analyticsRevenue = [
  { month: "Oct", loyalty: 120000, nonLoyalty: 260000 },
  { month: "Nov", loyalty: 140000, nonLoyalty: 250000 },
  { month: "Dec", loyalty: 160000, nonLoyalty: 240000 },
  { month: "Jan", loyalty: 155000, nonLoyalty: 230000 },
  { month: "Feb", loyalty: 180000, nonLoyalty: 220000 },
  { month: "Mar", loyalty: 205000, nonLoyalty: 210000 },
];

export const analyticsRedemption = [
  { name: "Free Coffee", value: 45 },
  { name: "Free Pastry", value: 25 },
  { name: "50% Off", value: 20 },
  { name: "Free Meal", value: 10 },
];

export const settingsRoles = [
  { name: "Alex Martinez", role: "Owner", email: "alex@roastedbean.com", lastActive: "2026-03-06" },
  { name: "Jamie Lin", role: "Manager", email: "jamie@roastedbean.com", lastActive: "2026-03-05" },
  { name: "Sam Kimura", role: "Staff", email: "sam@roastedbean.com", lastActive: "2026-03-06" },
];

export const cafeSettings = {
  name: "The Roasted Bean",
  location: "123 MG Road, Bengaluru, KA 560001",
  phone: "+91 9876543210",
  email: "hello@roastedbean.com",
  plan: "Growth",
  planPrice: "₹1,499/mo",
};

// Segments — no VIP/Gold/Silver tiers, only customer segments
export const segments = [
  { id: "1", name: "All Customers", rule: "All registered customers", count: 2480, icon: "users" },
  { id: "2", name: "Active", rule: "Visited in last 30 days", count: 1247, icon: "repeat" },
  { id: "3", name: "Inactive", rule: "No visit in 30+ days", count: 233, icon: "clock" },
  { id: "4", name: "High Value", rule: "LTV > ₹50,000", count: 187, icon: "crown" },
];

// Campaigns
export const campaigns = [
  { id: "1", name: "Come Back For Coffee!", segment: "Inactive", type: "Visit Reminder", delivery: "WhatsApp", status: "Active", sent: 128, opened: 89, converted: 34, createdAt: "2026-03-01" },
  { id: "2", name: "1 Stamp Away!", segment: "Active", type: "Reward Reminder", delivery: "SMS", status: "Active", sent: 245, opened: 198, converted: 67, createdAt: "2026-02-28" },
  { id: "3", name: "Weekend Special 20% Off", segment: "All Customers", type: "Special Offer", delivery: "In-App", status: "Scheduled", sent: 0, opened: 0, converted: 0, createdAt: "2026-03-05" },
  { id: "4", name: "Double Stamp Tuesday", segment: "Active", type: "Special Offer", delivery: "WhatsApp", status: "Completed", sent: 412, opened: 356, converted: 142, createdAt: "2026-02-20" },
];

// Feedback
export const feedbacks = [
  { id: "1", customerName: "Sarah Chen", rating: 5, comment: "Best latte in town! Love the loyalty program.", date: "2026-03-06", response: "Thank you Sarah! We're glad you enjoy it." },
  { id: "2", customerName: "Marcus Johnson", rating: 4, comment: "Great coffee, but the wait time has been longer lately.", date: "2026-03-05", response: null },
  { id: "3", customerName: "Aisha Patel", rating: 5, comment: "The stamp card is so easy to use. Already got 2 free coffees!", date: "2026-03-04", response: "Awesome! Keep those stamps coming ☕" },
  { id: "4", customerName: "Tom Williams", rating: 3, comment: "Coffee is good but the pastries could be fresher.", date: "2026-03-03", response: null },
  { id: "5", customerName: "Elena Rodriguez", rating: 5, comment: "Love the ambiance and the rewards program.", date: "2026-03-02", response: null },
];

// Transactions
export const transactions = [
  { id: "1", customer: "Sarah Chen", type: "Stamp Added", stampsAdded: 1, date: "2026-03-06 09:15 AM", staff: "Sam Kimura", location: "Main St", amount: 320, paymentType: "UPI" as const, paymentId: "UPI2603061234" },
  { id: "2", customer: "David Lee", type: "Reward Redeemed", stampsAdded: 0, date: "2026-03-06 09:02 AM", staff: "Jamie Lin", location: "Main St", amount: 0, paymentType: "—" as const, paymentId: "—" },
  { id: "3", customer: "Olivia Brown", type: "Stamp Added", stampsAdded: 1, date: "2026-03-06 08:48 AM", staff: "Sam Kimura", location: "Main St", amount: 280, paymentType: "Card" as const, paymentId: "TXN9087654321" },
  { id: "4", customer: "Aisha Patel", type: "Stamp Added", stampsAdded: 1, date: "2026-03-06 08:30 AM", staff: "Jamie Lin", location: "Park Ave", amount: 350, paymentType: "UPI" as const, paymentId: "UPI2603061567" },
  { id: "5", customer: "Marcus Johnson", type: "Reward Redeemed", stampsAdded: 0, date: "2026-03-06 08:15 AM", staff: "Sam Kimura", location: "Main St", amount: 0, paymentType: "—" as const, paymentId: "—" },
  { id: "6", customer: "Elena Rodriguez", type: "Stamp Added", stampsAdded: 1, date: "2026-03-05 14:20 PM", staff: "Jamie Lin", location: "Park Ave", amount: 220, paymentType: "Cash" as const, paymentId: "—" },
  { id: "7", customer: "Maria Garcia", type: "Stamp Added", stampsAdded: 1, date: "2026-03-05 11:30 AM", staff: "Sam Kimura", location: "Main St", amount: 180, paymentType: "UPI" as const, paymentId: "UPI2603051890" },
  { id: "8", customer: "James Kim", type: "Stamp Added", stampsAdded: 1, date: "2026-03-04 09:45 AM", staff: "Jamie Lin", location: "Main St", amount: 290, paymentType: "Card" as const, paymentId: "TXN7654321098" },
];

// Reservations
export const reservations = [
  { id: "1", customerName: "Sarah Chen", phone: "+91 9876543101", date: "2026-03-08", time: "10:00 AM", guests: 2, status: "Confirmed" },
  { id: "2", customerName: "Aisha Patel", phone: "+91 9876543103", date: "2026-03-08", time: "11:30 AM", guests: 4, status: "Confirmed" },
  { id: "3", customerName: "David Lee", phone: "+91 9876543108", date: "2026-03-09", time: "09:00 AM", guests: 1, status: "Pending" },
  { id: "4", customerName: "Olivia Brown", phone: "+91 9876543107", date: "2026-03-09", time: "02:00 PM", guests: 3, status: "Confirmed" },
  { id: "5", customerName: "Marcus Johnson", phone: "+91 9876543102", date: "2026-03-10", time: "10:30 AM", guests: 2, status: "Pending" },
];

// Reward rules — no expiry
export const rewardRules = [
  { id: "1", name: "Free Coffee", stampsRequired: 5, type: "Free Item", status: "Active", redeemed: 156 },
  { id: "2", name: "Free Dessert", stampsRequired: 10, type: "Free Item", status: "Active", redeemed: 42 },
  { id: "3", name: "50% Off Specialty", stampsRequired: 15, type: "Discount", status: "Active", redeemed: 78 },
  { id: "4", name: "Free Meal Combo", stampsRequired: 30, type: "Free Item", status: "Draft", redeemed: 0 },
];

// Visit trend chart data
export const visitTrendData = [
  { month: "Oct", visits: 2100 }, { month: "Nov", visits: 2340 }, { month: "Dec", visits: 2580 },
  { month: "Jan", visits: 2750 }, { month: "Feb", visits: 3100 }, { month: "Mar", visits: 3421 },
];

export const repeatGrowthData = [
  { month: "Oct", rate: 52 }, { month: "Nov", rate: 55 }, { month: "Dec", rate: 58 },
  { month: "Jan", rate: 61 }, { month: "Feb", rate: 65 }, { month: "Mar", rate: 68 },
];

export const redemptionTrendData = [
  { month: "Oct", redeemed: 85 }, { month: "Nov", redeemed: 102 }, { month: "Dec", redeemed: 118 },
  { month: "Jan", redeemed: 124 }, { month: "Feb", redeemed: 145 }, { month: "Mar", redeemed: 156 },
];
