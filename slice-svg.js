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
const svgTransform = 'transform="translate(0 900)scale(1 -1)"';

// svg 文件模板
const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1584762969678" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="12392" width="200" height="200"><defs><style type="text/css"/></defs><path d="__PATH__" ${svgTransform}/></svg>`;

// 输出文件的存储路径
const outputPath = resolve(__dirname, './output/');

readFile(resolve(__dirname, svgPath), 'utf8', (err, res) => {
    if(!err){
        const iconArray = res.match(/<glyph[^\n]*\/>/g);
        const unicodeMap = {};
        iconArray.forEach(item => {
            const unicode = item.match(/unicode="&#(\d+);"/)[1];
            const className = item.match(/glyph-name="([\w-_]+)"/)[1];

            unicodeMap[className] = (+unicode).toString(16);

            writeFile(
                resolve(outputPath, className/*.replace(/(\d)$/, (match, num) => `${num}___`)*/ + '.svg'),
                svgTemplate.replace('__PATH__', item.match(/\ d="([^"]*)"/)[1]),
                function(err){if(err){throw err}}
            );
            writeFile(
                resolve(outputPath, 'unicode-map.js'),
                'module.exports=' + JSON.stringify(unicodeMap),
                function(err){if(err){throw err}}
            )
        });
    } else {
        throw err
    }
});

