declare namespace _default {
    let content: string[];
    namespace theme {
        namespace extend {
            namespace colors {
                let ink: string;
                let parchment: string;
                let linen: string;
                let brass: string;
                let moss: string;
                let muted: string;
                namespace accent {
                    let DEFAULT: string;
                    let light: string;
                    let dark: string;
                }
                namespace success {
                    let DEFAULT_1: string;
                    export { DEFAULT_1 as DEFAULT };
                    let light_1: string;
                    export { light_1 as light };
                    let dark_1: string;
                    export { dark_1 as dark };
                }
                namespace danger {
                    let DEFAULT_2: string;
                    export { DEFAULT_2 as DEFAULT };
                    let light_2: string;
                    export { light_2 as light };
                    let dark_2: string;
                    export { dark_2 as dark };
                }
                namespace warning {
                    let DEFAULT_3: string;
                    export { DEFAULT_3 as DEFAULT };
                    let light_3: string;
                    export { light_3 as light };
                }
            }
            namespace fontFamily {
                let display: string[];
                let body: string[];
            }
            let keyframes: {
                "fade-in": {
                    from: {
                        opacity: string;
                        transform: string;
                    };
                    to: {
                        opacity: string;
                        transform: string;
                    };
                };
                "fade-in-up": {
                    from: {
                        opacity: string;
                        transform: string;
                    };
                    to: {
                        opacity: string;
                        transform: string;
                    };
                };
                "scale-in": {
                    from: {
                        opacity: string;
                        transform: string;
                    };
                    to: {
                        opacity: string;
                        transform: string;
                    };
                };
                "overlay-in": {
                    from: {
                        opacity: string;
                    };
                    to: {
                        opacity: string;
                    };
                };
                "slide-up": {
                    from: {
                        opacity: string;
                        transform: string;
                    };
                    to: {
                        opacity: string;
                        transform: string;
                    };
                };
                counter: {
                    from: {
                        opacity: string;
                        transform: string;
                    };
                    to: {
                        opacity: string;
                        transform: string;
                    };
                };
            };
            let animation: {
                "fade-in": string;
                "fade-in-up": string;
                "scale-in": string;
                "overlay-in": string;
                "slide-up": string;
                counter: string;
            };
        }
    }
    let plugins: never[];
}
export default _default;
