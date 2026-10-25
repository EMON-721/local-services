import type { FooterLinkGroup, SocialLink } from "@/types/home";

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Home Repair", href: "/services/home-repair" },
      { label: "Cleaning", href: "/services/cleaning" },
      { label: "Electrical", href: "/services/electrical" },
      { label: "Plumbing", href: "/services/plumbing" },
      { label: "Painting", href: "/services/painting" },
      { label: "Transport", href: "/services/transport" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Safety", href: "/safety" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "facebook",
    href: "https://facebook.com/servicelagbe",
    ariaLabel: "Follow us on Facebook",
  },
  {
    platform: "twitter",
    href: "https://twitter.com/servicelagbe",
    ariaLabel: "Follow us on Twitter",
  },
  {
    platform: "instagram",
    href: "https://instagram.com/servicelagbe",
    ariaLabel: "Follow us on Instagram",
  },
  {
    platform: "linkedin",
    href: "https://linkedin.com/company/servicelagbe",
    ariaLabel: "Follow us on LinkedIn",
  },
];

export const CONTACT_INFO = {
  email: "support@servicelagbe.com",
  phone: "+880 1234-567890",
  address: "Dhaka, Bangladesh",
};
