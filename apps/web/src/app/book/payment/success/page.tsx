import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Calendar, Clock, MapPin, CreditCard } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { AnimatedCheckIcon } from "@/components/booking";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    tran_id?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const tranId = params.tran_id;

  if (!tranId) {
    redirect("/book/error?type=payment&message=Invalid payment reference");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <AnimatedCheckIcon size="lg" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Your payment has been processed successfully. Your booking is now confirmed.
            </p>

            {/* Transaction Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Transaction ID: <span className="font-mono font-medium text-gray-900">{tranId}</span></span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4" />
              Payment Confirmed
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/dashboard/bookings"
                className="block w-full py-3 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                View My Bookings
              </Link>
              <Link
                href="/services"
                className="block w-full py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Book Another Service
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            A confirmation email has been sent to your registered email address.
            If you have any questions, please contact our support team.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
