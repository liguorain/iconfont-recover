/**
 * 将 iconfont 生成的 svg 图片中的单个图标提取出来
 */

const fs = require('fs');
const path = require('path');

const { resolve } = path;
const { readFile, writeFile } = fs;

// 需要处理的 SVG 文件
const svgPath = './iconfont.svg';

// 处理 SVG 的形变
// fixme 各个项目所需形变参数可能不一样，故此参数需要针对项目进行调整
const svgTransform = 'transform="translate(0 900)scale(1 -1)"';

// svg 文件模板
const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1584762969678" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="12392" width="200" height="200"><defs><style type="text/css"/></defs><path d="__PATH__" ${svgTransform}/></svg>`;

// 输出文件的存储路径
const outputPath = resolve(__dirname, './output/');

const errHandler = err => {
    if(Boolean(err)){
        throw err
    }
}

readFile(resolve(__dirname, svgPath), 'utf8', (err, res) => {
    errHandler(err);
    const iconArray = res.match(/<glyph[^\n]*\/>/g);
    const unicodeMap = {};
    iconArray.forEach(item => {
        const unicode = item.match(/unicode="&#(\d+);"/)[1];
        const className = item.match(/glyph-name="([\w-_]+)"/)[1];

        // 个别项目使用 Unicode 来引用图标，而上传图标到 iconfont 的时候 Unicode 会被修改，
        // 这就导致此类项目的图标恢复出来后不能直接使用，所以这里保留了原本的 Unicode - className 映射
        // 以便部署图标库的时候以此为参考修改 Unicode
        unicodeMap[className] = (+unicode).toString(16);

        writeFile(
            resolve(outputPath, className/*.replace(/(\d)$/, (match, num) => `${num}___`)*/ + '.svg'),
            svgTemplate.replace('__PATH__', item.match(/\ d="([^"]*)"/)[1]),
            errHandler
        );
        writeFile(
            resolve(outputPath, 'unicode-map.js'),
            'module.exports=' + JSON.stringify(unicodeMap),
            errHandler
        )
    });
});

