import { FaRegCopy } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type Props = {
    link: string;
};

export default function CopyLinkBtn({ link }: Props) {
    const onCopyLink = () => {
        navigator.clipboard.writeText(link).then(() => {
            toast({
                title      : 'Copied!',
                description: 'Link copied to clipboard',
            });
        });
    };

    return (
        <Button className="w-[200px] flex-shrink-0" onClick={onCopyLink}>
            <FaRegCopy className="mr-2 h-4 w-4" />
            Copy link
        </Button>
    );
}
