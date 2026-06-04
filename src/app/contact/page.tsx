import { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Contact — Gordon Bie" };

const NAVBAR_H = 77;

export default function ContactPage() {
  return (
    <main style={{ paddingTop: NAVBAR_H }}>
      {/* Wave top */}
      <WaveDivider />

      {/* Split header */}
      <div className="flex flex-col md:flex-row min-h-[50vh]">
        {/* Left — big heading */}
        <div className="flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border-light px-6 sm:px-12 lg:px-16 py-12">
          <div>
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2">
              Get in touch
            </p>
            <h1
              className="font-display italic font-semibold text-fg leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              Contact.
            </h1>
          </div>

          <div>
            <div className="h-px bg-border-light mb-6" />
            <p className="font-sans text-sm text-fg-muted leading-relaxed max-w-xs">
              {profile.contactDescription}
            </p>
            <p className="font-mono text-[9px] text-fg-subtle uppercase tracking-[0.12em] mt-4">
              {profile.contactStatus}
            </p>

            {/* Direct links */}
            <div className="mt-8 space-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="block font-sans text-sm text-fg hover:text-accent transition-colors"
              >
                {profile.email}
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-sm text-fg-muted hover:text-accent transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="md:w-[44%] px-6 sm:px-12 py-12">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
