import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import * as AlertDialogComponents from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { toast } from "../../ui/use-toast";

function PublishFormBtn({ id }: { id: number }) {
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {
            await PublishForm(id);
            toast({
                title: "Success",
                description: "Your form is now available to the public",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
            });
        }
    }

    return (
        <AlertDialogComponents.AlertDialog>
            <AlertDialogComponents.AlertDialogTrigger asChild>
                <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
                    <MdOutlinePublish className="h-4 w-4" />
                    Publish
                </Button>
            </AlertDialogComponents.AlertDialogTrigger>
            <AlertDialogComponents.AlertDialogContent>
                <AlertDialogComponents.AlertDialogHeader>
                    <AlertDialogComponents.AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogComponents.AlertDialogTitle>
                    <AlertDialogComponents.AlertDialogDescription>
                        This action cannot be undone. After publishing you will not be able to edit this form. <br />
                        <br />
                        <span className="font-medium">
              By publishing this form you will make it available to the public and you will be able to collect
              submissions.
            </span>
                    </AlertDialogComponents.AlertDialogDescription>
                </AlertDialogComponents.AlertDialogHeader>
                <AlertDialogComponents.AlertDialogFooter>
                    <AlertDialogComponents.AlertDialogCancel>
                        Cancel
                    </AlertDialogComponents.AlertDialogCancel>
                    <AlertDialogComponents.AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            startTransition(publishForm);
                        }}
                    >
                        Proceed {loading && <FaSpinner className="animate-spin" />}
                    </AlertDialogComponents.AlertDialogAction>
                </AlertDialogComponents.AlertDialogFooter>
            </AlertDialogComponents.AlertDialogContent>
        </AlertDialogComponents.AlertDialog>
    );
}

export default PublishFormBtn;
