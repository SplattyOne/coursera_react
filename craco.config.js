const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
    plugins: [
        {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig, pluginOptions, context: { paths } }) => {

                    webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
                    return webpackConfig;
                },
            },
        }
    ]
};