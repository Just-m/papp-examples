const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addWebpackAlias,
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');
module.exports = override(addWebpackPlugin(new AntdDayjsWebpackPlugin()));

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#000000' },
  }),
  addWebpackAlias({
    '@actions': path.resolve(__dirname, './src/actions'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@utils': path.resolve(__dirname, './src/utils'),
    '@routes': path.resolve(__dirname, './src/routes'),
    '@components': path.resolve(__dirname, './src/components'),
    '@services': path.resolve(__dirname, './src/services'),
    '@selector': path.resolve(__dirname, './src/selector'),
    '@configs': path.resolve(__dirname, './src/configs'),
    '@reducers': path.resolve(__dirname, './src/reducers'),
    '@saga': path.resolve(__dirname, './src/saga'),
    '@action': path.resolve(__dirname, './src/action'),
  })
);
