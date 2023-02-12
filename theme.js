const FORCE_SETTINGS = {
    "refined-now-playing-refined-control-bar": "false",
};

for (const setting in FORCE_SETTINGS) {
    window.localStorage.setItem(setting, FORCE_SETTINGS[setting]);
}

plugin.onAllPluginsLoaded(async function (plugins) {
    if (plugins.StyleSnippet?.addExternalSnippet == undefined) {
        async function addTips() {
            (await betterncm.utils.waitForElement("header")).prepend(
                dom("div", {
                    innerText:
                        "请安装/更新 StyleSnippet 插件，否则 ArkTheme 将不会生效。",
                    style: {
                        width: "100%",
                        height: "30px",
                        lineHeight: "30px",
                        background: "#ec414188",
                        color: "white",
                        textAlign: "center",
                        zIndex: 999,
                        position: "absolute",
                        pointerEvents: "none",
                    },
                })
            );
        }

        setTimeout(addTips, 1000);
    }

    plugins.StyleSnippet.addExternalSnippet(
        await betterncm.fs.readFileText(this.pluginPath + "./theme.less"),
        "ArkTheme",
        "ark-theme-release"
    );

    window.localStorage.setItem("refined-now-playing-hide-comments", "true");
});

betterncm.utils.waitForElement(".m-tool > .skin").then((item) => {
    item.onclick = (e) => {
        e.stopPropagation();
        alert(1);
    };
});
