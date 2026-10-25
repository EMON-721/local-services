"use client";

import { Plus, Download, Eye, Edit2, Ban, CheckCircle2, Star, Phone, MapPin } from "lucide-react";
import { DataTable } from "@/components/dashboard";

// Mock technicians data
const mockTechnicians = [
  { id: "TECH-001", name: "Karim Hossain", phone: "+880 1712-345678", services: ["AC Servicing", "Electrical"], area: "Dhanmondi", rating: 4.8, jobs: 234, earnings: 456000, status: "active", verified: true },
  { id: "TECH-002", name: "Jamal Uddin", phone: "+880 1812-456789", services: ["Cleaning"], area: "Gulshan", rating: 4.6, jobs: 189, earnings: 378000, status: "active", verified: true },
  { id: "TECH-003", name: "Abdul Karim", phone: "+880 1912-567890", services: ["Electrical", "Plumbing"], area: "Uttara", rating: 4.9, jobs: 312, earnings: 624000, status: "active", verified: true },
  { id: "TECH-004", name: "Salam Mia", phone: "+880 1612-678901", services: ["Home Repair"], area: "Mirpur", rating: 4.5, jobs: 156, earnings: 234000, status: "active", verified: true },
  { id: "TECH-005", name: "Rafiq Ahmed", phone: "+880 1512-789012", services: ["Painting"], area: "Mohammadpur", rating: 4.7, jobs: 98, earnings: 196000, status: "inactive", verified: true },
  { id: "TECH-006", name: "Mokhles Ali", phone: "+880 1712-890123", services: ["Plumbing"], area: "Banani", rating: 4.4, jobs: 67, earnings: 134000, status: "active", verified: false },
  { id: "TECH-007", name: "Fatima Team", phone: "+880 1812-901234", services: ["Cleaning"], area: "Dhanmondi", rating: 4.9, jobs: 445, earnings: 890000, status: "active", verified: true },
  { id: "TECH-008", name: "Rahim Contractor", phone: "+880 1912-012345", services: ["Home Repair", "Painting"], area: "Gulshan", rating: 3.8, jobs: 23, earnings: 46000, status: "pending", verified: false },
];

export default function TechniciansPage() {
  const columns = [
    {
      key: "name",
      label: "Technician",
      render: (item: typeof mockTechnicians[0]) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {item.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            {item.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">{item.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact & Area",
      render: (item: typeof mockTechnicians[0]) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-3.5 h-3.5" />
            {item.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-3.5 h-3.5" />
            {item.area}
          </div>
        </div>
      ),
    },
    {
      key: "services",
      label: "Services",
      render: (item: typeof mockTechnicians[0]) => (
        <div className="flex flex-wrap gap-1">
          {item.services.map((service) => (
            <span key={service} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-lg">
              {service}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (item: typeof mockTechnicians[0]) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-medium text-gray-900">{item.rating}</span>
          <span className="text-gray-500 text-sm">({item.jobs})</span>
        </div>
      ),
    },
    {
      key: "earnings",
      label: "Earnings",
      render: (item: typeof mockTechnicians[0]) => (
        <span className="font-semibold text-gray-900">৳{item.earnings.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: typeof mockTechnicians[0]) => {
        const styles = {
          active: "bg-green-100 text-green-700",
          inactive: "bg-gray-100 text-gray-600",
          pending: "bg-amber-100 text-amber-700",
        };
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[item.status as keyof typeof styles]}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        );
      },
    },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pl-14 lg:pl-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Technicians</h1>
          <p className="text-sm text-gray-500 mt-1">Manage service providers</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
            <Plus className="w-4 h-4" />
            Add Technician
          </button>
        </div>
      </div>

      <div>
        <DataTable
          data={mockTechnicians}
          columns={columns}
          searchPlaceholder="Search technicians..."
          actions={(item) => (
            <div className="flex items-center justify-end gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                <Eye className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                <Edit2 className="w-4 h-4 text-gray-500" />
              </button>
              {item.status === "active" ? (
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Deactivate">
                  <Ban className="w-4 h-4 text-red-500" />
                </button>
              ) : (
                <button className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Activate">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </button>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
