"use client";

import { Plus, Download, Eye, Edit2, Trash2, Ban, CheckCircle2, Mail, Phone } from "lucide-react";
import { DataTable } from "@/components/dashboard";

// Mock users data
const mockUsers = [
  { id: "USR-001", name: "Rahim Ahmed", email: "rahim@example.com", phone: "+880 1712-345678", bookings: 15, spent: 45000, status: "active", joined: "2024-01-15" },
  { id: "USR-002", name: "Fatima Begum", email: "fatima@example.com", phone: "+880 1812-456789", bookings: 8, spent: 28000, status: "active", joined: "2024-03-22" },
  { id: "USR-003", name: "Nasir Khan", email: "nasir@example.com", phone: "+880 1912-567890", bookings: 3, spent: 8500, status: "active", joined: "2024-06-10" },
  { id: "USR-004", name: "Shirin Akter", email: "shirin@example.com", phone: "+880 1612-678901", bookings: 22, spent: 89000, status: "active", joined: "2023-11-05" },
  { id: "USR-005", name: "Imran Hossain", email: "imran@example.com", phone: "+880 1512-789012", bookings: 1, spent: 1500, status: "blocked", joined: "2024-09-18" },
  { id: "USR-006", name: "Nadia Rahman", email: "nadia@example.com", phone: "+880 1712-890123", bookings: 12, spent: 56000, status: "active", joined: "2024-02-28" },
  { id: "USR-007", name: "Kamal Uddin", email: "kamal@example.com", phone: "+880 1812-901234", bookings: 6, spent: 18000, status: "active", joined: "2024-05-14" },
  { id: "USR-008", name: "Rashida Khatun", email: "rashida@example.com", phone: "+880 1912-012345", bookings: 0, spent: 0, status: "inactive", joined: "2024-10-01" },
];

export default function UsersPage() {
  const columns = [
    {
      key: "name",
      label: "User",
      render: (item: typeof mockUsers[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {item.name.split(" ").map(n => n[0]).join("")}
            </span>
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
      label: "Contact",
      render: (item: typeof mockUsers[0]) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-3.5 h-3.5" />
            {item.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-3.5 h-3.5" />
            {item.phone}
          </div>
        </div>
      ),
    },
    {
      key: "bookings",
      label: "Bookings",
      render: (item: typeof mockUsers[0]) => (
        <span className="font-medium text-gray-900">{item.bookings}</span>
      ),
    },
    {
      key: "spent",
      label: "Total Spent",
      render: (item: typeof mockUsers[0]) => (
        <span className="font-semibold text-gray-900">৳{item.spent.toLocaleString()}</span>
      ),
    },
    {
      key: "joined",
      label: "Joined",
      render: (item: typeof mockUsers[0]) => (
        <span className="text-gray-600">{item.joined}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: typeof mockUsers[0]) => {
        const styles = {
          active: "bg-green-100 text-green-700",
          inactive: "bg-gray-100 text-gray-600",
          blocked: "bg-red-100 text-red-700",
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
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      <div>
        <DataTable
          data={mockUsers}
          columns={columns}
          searchPlaceholder="Search users..."
          actions={(item) => (
            <div className="flex items-center justify-end gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                <Eye className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                <Edit2 className="w-4 h-4 text-gray-500" />
              </button>
              {item.status !== "blocked" ? (
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Block">
                  <Ban className="w-4 h-4 text-red-500" />
                </button>
              ) : (
                <button className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Unblock">
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
