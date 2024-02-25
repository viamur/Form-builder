import { Skeleton } from '@/components/ui/skeleton';

const quantityFormCards = 4;

function FormCardSkeleton() {
    return (
        <>
            {[...Array(quantityFormCards)].fill(0).map((_, i) => (
                <Skeleton key={i} className="border-2 border-primary-/20 h-[190px] w-full" />
            ))}
        </>
    );
}

export default FormCardSkeleton;
