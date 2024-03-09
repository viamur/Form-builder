import { FaCheck } from 'react-icons/fa';

export default function FormSubmittedSuccessfully() {
    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-gray-700/20 rounded-xl">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <FaCheck className="w-[26px] h-[26px] fill-green-700" />
                    <h1 className="text-2xl font-bold text-center">Form Submitted</h1>
                </div>
                <p className="text-muted-foreground text-center">
                    Thank you for submitting the form. This page will close in a few seconds.
                </p>
            </div>
        </div>
    );
}
