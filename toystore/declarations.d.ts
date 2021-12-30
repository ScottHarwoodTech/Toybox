
declare module "@rebass/preset" {
    import { Theme } from "theme-ui";
    const theme: Theme = {}
    export default theme
}

declare module "emotion-theming" {
    export const ThemeProvider: any = {}
}
