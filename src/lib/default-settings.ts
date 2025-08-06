export const DefaultSettings = (userId: string) => ({
    userId,
    searchProvider: "firecrawl" as const,
    searchIncludeSourcesByDefault: false,
    coreAIProviders: {},
    customAIProviders: {},
    customModels: {},
    titleGenerationModel: "gemini-2.0-flash-lite" as const,
    customThemes: [] as string[],
    mcpServers: [] as any[],
    generalProviders: {
        supermemory: undefined,
        firecrawl: undefined,
        tavily: undefined,
        brave: undefined,
        serper: undefined
    },
    customization: undefined,
    onboardingCompleted: false
})
