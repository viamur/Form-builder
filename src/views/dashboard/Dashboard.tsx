import { Suspense } from 'react';
import { StatsCards } from '@/components/stats-cards/StatsCards';
import StatsCardsWrapper from '@/components/stats-cards/StatsCardsWrapper';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/views/dashboard/components/buttons/CreateFormBtn';
import FormCardSkeleton from '@/views/dashboard/components/form-cards/FormCardsSkeleton';
import FormCards from '@/views/dashboard/components/form-cards/FormCards';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Dashboard() {
    return (
        <ScrollArea className="w-full" type="auto">
            <div className="container py-4">
                <Suspense fallback={<StatsCards loading />}>
                    <StatsCardsWrapper />
                </Suspense>

                <Separator className="my-6" />
                <h2 className="text-4xl font-bold col-span-2">Your Forms:</h2>
                <Separator className="my-6" />

                <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CreateFormBtn />
                    <Suspense fallback={<FormCardSkeleton />}>
                        <FormCards />
                    </Suspense>
                </div>
            </div>
        </ScrollArea>
    );
}
