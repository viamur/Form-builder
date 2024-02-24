import { GetFormById } from "@/actions/form";
import React from "react";

type BuilderPageProps = {
    params: {
        id: string;
    };
}

async function BuilderPage({
    params,
}: BuilderPageProps) {
    const form = await GetFormById(Number(params.id));
    if (!form) {
        throw new Error("form not found");
    }
    return <div>BuilderPage</div>;
}

export default BuilderPage;
