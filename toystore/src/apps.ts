
export type MFEType = "React" | "HTML";
export interface App {
    path: string;
    url: string;
    name: string;
    type: MFEType
}

export const apps: App[] = [
    {
        path: "art-promptz",
        name: "Art promptz",
        url: "https://art-promptz.scottharwood.dev",
        type: "HTML"
    },
    {
        path: "soundbooty",
        name: "Sound Booty",
        url: "https://localhost:3001",
        type: "React"
    }
]