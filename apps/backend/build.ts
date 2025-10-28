await Bun.build({
    entrypoints: ['./src/main.ts'],
    outdir: './dist',
    target: "bun",
    external: [
        "@nestjs/microservices",
        "@nestjs/websockets",
        "class-transformer",
        "class-validator"
    ]

});
console.log("Build Completed")

export { };
