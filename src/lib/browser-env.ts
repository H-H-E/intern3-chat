type Env = {
    VITE_CONVEX_URL: string
    VITE_CONVEX_API_URL: string
    VITE_POSTHOG_KEY: string
    VITE_POSTHOG_HOST: string
}

export const browserEnv = (key: keyof Env) => {
    const value = (import.meta as unknown as { env: Env }).env[key]
    if (!value) {
        console.error(`Missing environment variable(browser): ${key}`)
        console.log(
            "Available env vars:",
            Object.keys((import.meta as unknown as { env: Env }).env)
        )
        throw new Error(`Missing environment variable(browser): ${key}`)
    }
    return value
}
