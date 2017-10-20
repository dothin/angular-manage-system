# angular-manage-system

 ### 开发命令行
  ``` bash 
  # install dependencies
  npm/cnpm install
  
  # serve with hot reload at localhost:3000
  gulp browserSync
 
  # build for production with minification
  gulp build

  ```
 ### 关于hash解决缓存问题，需要添加如下配置
 
 ```text
 打开node_modules\gulp-rev\index.js：
 大概在144行: manifest[originalFile] = revisionedFile;
 改为：manifest[originalFile] = originalFile + '?v=' + file.revHash;
 打开node_modules\gulp-rev\node_modules\rev-path\index.js：
 在10行: return filename + '-' + hash + ext;
 改为：return filename + ext;
 打开node_modules\gulp-rev-collector\index.js:
 可能在40行：
 let cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );
 改为：let cleanReplacement =  path.basename(json[key]).split('?')[0];
```

 
