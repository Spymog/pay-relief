import type { Metadata } from "next";
import { CounselorsHero } from "@/components/sections/counselors-hero";
import { CounselorsplatformPreview } from "@/components/sections/counselors-platform-preview";
import { CounselorsHowItWorks } from "@/components/sections/counselors-how-it-works";
import { CounselorsPerkss } from "@/components/sections/counselors-perks";
import { CounselorsSpecializations } from "@/components/sections/counselors-specializations";
import { CounselorsEarnings } from "@/components/sections/counselors-earnings";
import { CounselorsApplyForm } from "@/components/sections/counselors-apply-form";
import { CounselorsFAQ } from "@/components/sections/counselors-faq";
import { CounselorsFinalCTA } from "@/components/sections/counselors-final-cta";

export const metadata: Metadata = {
  title: "For Counselors — PayRelief",
  description: "Join our founding cohort of elite financial counselors.",
};

export default function ForCounselorsPage() {
  return (
    <div className="w-full">
      <CounselorsHero />
      <CounselorsplatformPreview />
      <CounselorsHowItWorks />
      <CounselorsPerkss />
      {/* <CounselorsSpecializations /> */}
      <CounselorsEarnings />
      <CounselorsApplyForm />
      {/* <CounselorsFAQ /> */}
      <CounselorsFinalCTA />
    </div>
  );
}
