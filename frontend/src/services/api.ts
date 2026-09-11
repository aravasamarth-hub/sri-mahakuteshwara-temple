/**
 * API client service for Sri Kshetra Mahakuteshwara Temple
 */

export interface ContactData {
  fullName: string;
  phone: string;
  email?: string;
  message: string;
  language?: string;
}

export interface PoojaBookingData {
  poojaId: string;
  poojaName: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  nakshatra?: string;
  amount: number;
  language?: string;
}

export interface RoomBookingData {
  fullName: string;
  phone: string;
  email?: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
  numberOfGuests: number;
  roomType?: string;
  language?: string;
}

export interface HallBookingData {
  fullName: string;
  phone: string;
  email?: string;
  hallType: string;
  eventDate: string;
  estimatedGuests?: string;
  additionalDetails?: string;
  language?: string;
}

export interface DonationData {
  sevaCategory: string;
  amount: number;
  fullName: string;
  phone: string;
  email?: string;
  panNumber?: string;
  language?: string;
}

export interface TempleTimingsData {
  morningDarshan: string;
  eveningDarshan: string;
  morningAbhisheka: string;
  mahaMangalarathi: string;
  specialDaysNote: string;
}

export interface FestivalData {
  id?: string;
  titleEn: string;
  titleKn: string;
  titleHi: string;
  dateString: string;
  descriptionEn: string;
  descriptionKn: string;
  descriptionHi: string;
  bannerImage?: string;
  isActive?: boolean;
}

const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const authToken = token || localStorage.getItem("mahakuta_admin_token");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  return headers;
};

export const api = {
  // Public submissions
  async submitContact(data: ContactData) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitPoojaBooking(data: PoojaBookingData) {
    const res = await fetch("/api/pooja-booking", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitRoomBooking(data: RoomBookingData) {
    const res = await fetch("/api/room-booking", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitHallBooking(data: HallBookingData) {
    const res = await fetch("/api/hall-booking", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitDonation(data: DonationData) {
    const res = await fetch("/api/donation", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async uploadPaymentVerification(formData: FormData) {
    const res = await fetch("/api/payment-verification", {
      method: "POST",
      body: formData,
    });
    return res.json();
  },

  async getTimings(): Promise<TempleTimingsData> {
    const res = await fetch("/api/timings");
    return res.json();
  },

  async getFestivals(): Promise<FestivalData[]> {
    const res = await fetch("/api/festivals");
    return res.json();
  },

  async checkRoomAvailability(checkIn: string, checkOut: string) {
    const res = await fetch(`/api/room-availability?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`);
    return res.json();
  },

  // Admin APIs
  async adminLogin(username: string, password: string) {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },

  async getAdminStats() {
    const res = await fetch("/api/admin/stats", {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getAdminBookings(status?: string, kind?: string, search?: string) {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (kind) params.append("kind", kind);
    if (search) params.append("search", search);
    const res = await fetch(`/api/admin/bookings?${params.toString()}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getAdminInquiries(search?: string) {
    const url = search ? `/api/admin/inquiries?search=${encodeURIComponent(search)}` : "/api/admin/inquiries";
    const res = await fetch(url, { headers: getHeaders() });
    return res.json();
  },

  async getAdminDonations(search?: string) {
    const url = search ? `/api/admin/donations?search=${encodeURIComponent(search)}` : "/api/admin/donations";
    const res = await fetch(url, { headers: getHeaders() });
    return res.json();
  },

  async getAdminPayments(status?: string) {
    const url = status ? `/api/admin/payments?status=${encodeURIComponent(status)}` : "/api/admin/payments";
    const res = await fetch(url, { headers: getHeaders() });
    return res.json();
  },

  async updateStatus(id: string, collection: string, status: string, notes?: string) {
    const res = await fetch(`/api/admin/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ collection, status, notes }),
    });
    return res.json();
  },

  async verifyPayment(id: string, status: "Verified" | "Rejected", notes?: string) {
    const res = await fetch(`/api/admin/payments/${id}/verify`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status, notes }),
    });
    return res.json();
  },

  async updateTimings(timings: TempleTimingsData) {
    const res = await fetch("/api/admin/timings", {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(timings),
    });
    return res.json();
  },

  async createFestival(festival: FestivalData) {
    const res = await fetch("/api/admin/festivals", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(festival),
    });
    return res.json();
  },

  async deleteFestival(id: string) {
    const res = await fetch(`/api/admin/festivals/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },

  getExportCsvUrl(kind: "bookings" | "donations" | "inquiries") {
    return `/api/admin/export-csv?kind=${kind}`;
  },
};
