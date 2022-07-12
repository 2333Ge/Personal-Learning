#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run push 'deploy'
npm run build

# 进入生成的文件夹
cd docs

# git init
# git add -A
# git commit -m 'deploy'
# git remote add origin https://gitee.com/i2333g3/personal-learning-blog.git
# git push -u -f origin master

cd -

echo "$(date +"%Y-%m-%d %H:%M:%S")" >> my_actions

