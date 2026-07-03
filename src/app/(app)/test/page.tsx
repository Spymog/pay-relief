// import { Suspense } from "react";
// import { BankDefermentLookup } from "@/components/sections/deferment/bank-deferment-lookup";
// import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";

// export default function DefermentPage() {
//   return (
//     <>
//       <div className="w-full max-w-lg space-y-8">
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">Bill Deferment</h1>
//           <p className="text-muted-foreground">
//             Find the right number to call and request a payment deferment for
//             your bill.
//           </p>
//         </div>

//         {/* Suspense handles the async Supabase fetch */}
//         <Suspense fallback={<BankSelectorSkeleton />}>
//           <BankDefermentLookup />
//         </Suspense>
//       </div>
//     </>
//   );
// }

// function BankSelectorSkeleton() {
//   return (
//     <div className="space-y-2">
//       <Skeleton className="h-4 w-24" />
//       <Skeleton className="h-12 w-full" />
//     </div>
//   );
// }

export default function TestPage() {
  return <div>This is a test page</div>;
}
