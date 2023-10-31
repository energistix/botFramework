import * as esbuild from "esbuild"
import fs from "fs/promises"

const dev = process.argv.includes("--dev")

const context = await esbuild.context({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  platform: "node",
  ...(dev ? {} : { drop: ["console", "debugger"] }),
})

if (dev) {
  const watcher = fs.watch("src", { recursive: true })
  console.log("Watching...")
  for await (const event of watcher) {
    console.log(`${event.filename} was ${event.eventType}d, rebuilding`)
    const start = Date.now()
    await context.rebuild()
    console.log(`rebuilt in ${Date.now() - start}ms`)
  }
} else {
  console.log("Done.")
  context.dispose()
}
