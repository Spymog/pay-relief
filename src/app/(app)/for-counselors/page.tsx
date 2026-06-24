import type { Metadata } from "next";
import { CounselorsHero } from "@/components/sections/counselors/counselors-hero";
import { CounselorsplatformPreview } from "@/components/sections/counselors/counselors-platform-preview";
import { CounselorsHowItWorks } from "@/components/sections/counselors/counselors-how-it-works";
import { CounselorsPerkss } from "@/components/sections/counselors/counselors-perks";
import { CounselorsSpecializations } from "@/components/sections/counselors/counselors-specializations";
import { CounselorsEarnings } from "@/components/sections/counselors/counselors-earnings";
import { CounselorsApplyForm } from "@/components/sections/counselors/counselors-apply-form";
import { CounselorsFAQ } from "@/components/sections/counselors/counselors-faq";
import { CounselorsFinalCTA } from "@/components/sections/counselors/counselors-final-cta";

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
      {/* <CounselorsFinalCTA /> */}
    </div>
  );
}
