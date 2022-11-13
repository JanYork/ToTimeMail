const inject = require('@rollup/plugin-inject')

export default defineConfig(({ mode, command }) => {
    return {
        base: '/',
        plugins: [createVitePlugins(env, command === 'build', monacoEditorPlugin()), inject({
            $: "jquery",
            "jQuery": "jquery",
            "jquery": "jquery",
            "windows.jQuery": "jquery"
        })],
    }
})