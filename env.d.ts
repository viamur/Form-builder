declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string;
            NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
            NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
            NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
            NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
            POSTGRES_PRISMA_URL: string;
            POSTGRES_URL_NON_POOLING: string;
        }
    }
}

export {};
