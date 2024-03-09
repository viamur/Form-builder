import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/views/dashboard/buttons/CreateFormBtn';
import StatsCardsWrapper from '@/components/stats-cards/StatsCardsWrapper';
import { StatsCards } from '@/components/stats-cards/StatsCards';
import FormCardSkeleton from '@/views/dashboard/form-cards/FormCardsSkeleton';
import FormCards from '@/views/dashboard/form-cards/FormCards';

export default function Home() {
    return (
        <div className="container py-4">
            <Suspense fallback={<StatsCards loading={true} />}>
                <StatsCardsWrapper />
            </Suspense>

            <Separator className="my-6" />
            <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
            <Separator className="my-6" />

            <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateFormBtn />
                <Suspense fallback={<FormCardSkeleton />}>
                    <FormCards />
                </Suspense>
            </div>
        </div>
    );
}
