# Code Oracle Extension Dev

`codeoracle-vscode`项目是基于CodeLlama大模型开发的支持[Visual Studio Code](https://code.visualstudio.com/Download)的智能编码助手插件，支持python、java、c++/c、javascript、go等多种编程语言，为开发者提供代码生成、代码补全、注释生成等功能。

## 环境要求

- [node](https://nodejs.org/en)版本v18及以上
- Visual Studio Code版本要求 1.68.1 及以上
- [CodeLlama 模型服务]

## 编译插件

如果要从源码进行打包，需要安装 `node` v18 以上版本，并执行以下命令：

```zsh
git clone "这里预留git仓库地址，方便以后用户自行下载源码"
cd codeoracle-vscode
npm install
npm exec vsce package
```

然后会得到一个名为`codeoracle-vscode-${VERSION_NAME}.vsix`的文件。

##  模型服务


### 下载模型


### 加载模型


## 配置插件

VSCode扩展(ctrl+shift+x)中执行`Install from VSIX...`命令，选择`codeoracle-vscode-${VERSION_NAME}.vsix`，完成插件安装。

- 设置CodeLlama大模型服务地址
- 配置是否自动触发代码补全建议
```zsh
    "codeoracle.auto_completion_enable.title": "启用 自动触发补全",
    "codeoracle.auto_completion_disable.title": "停用 自动触发补全"
```
- 配置自动触发代码补全建议的时间延迟
- 配置补全的最大tokens数量


## 功能特性

### 1. 代码补全

- 自动触发代码建议

在编码过程中，当停止输入时，代码补全建议可自动触发（在配置选项`Auto Completion Delay`中可设置为1~3秒）。

当插件提供代码建议时，建议内容以灰色显示在编辑器光标位置，您可以按下Tab键来接受该建议，或者继续输入以忽略该建议。

![代码建议截图](https://github.com/orienlink/codeoracle-vscode/blob/master/assets/readme/code_generation.png)
